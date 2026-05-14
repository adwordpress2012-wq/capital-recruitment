import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

import type { Job } from "@/data/jobs";
import { jobsById, SEED_JOBS } from "@/data/jobs";
import { getLiveJobsForPublic } from "@/lib/jobs-repo";
import {
  isAdminAuthConfigured,
  isSupabaseBackendConfigured,
  isSupabasePublicConfigured,
  readCapitalServerEnv,
} from "@/capital/capital-config";
import {
  jobRowToJob,
  jobToDbRow,
  slugJobIdFromTitle,
  type CapitalJobRow,
} from "@/capital/capital-job-map";
import { createAdminSessionToken, verifyAdminSessionToken } from "@/capital/capital-session";

const RESUME_BUCKET = "capital-resumes";
/** Vercel serverless default body limit is ~4.5 MB; keep well under it. */
const MAX_RESUME_BYTES = 4 * 1024 * 1024; // 4 MB

type PostgrestishError = {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
};

/** Safe server logs — no tokens, no keys. */
function logCapital(action: string, err: PostgrestishError) {
  console.error(`[capital] ${action}`, { code: err.code, message: err.message });
}

/** Structured debug log (safe — never logs secret values). */
function dbg(tag: string, payload: Record<string, unknown>) {
  console.log(`[cap-debug] ${tag}`, JSON.stringify(payload));
}

function formGetTrim(form: FormData, keys: string[]): string {
  for (const key of keys) {
    const raw = form.get(key);
    if (raw == null) continue;
    const s = String(raw).trim();
    if (s !== "") return s;
  }
  return "";
}

function anonClient() {
  const env = readCapitalServerEnv();
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function serviceClient() {
  const env = readCapitalServerEnv();
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function fallbackLiveJobs(): Job[] {
  return getLiveJobsForPublic(SEED_JOBS);
}

export const listLiveJobsFn = createServerFn({ method: "GET" }).handler(async () => {
  const env = readCapitalServerEnv();
  const pubOk = isSupabasePublicConfigured(env);
  const svcOk = isSupabaseBackendConfigured(env);
  dbg("listLiveJobsFn", { publicConfigured: pubOk, serviceRolePresent: svcOk });

  if (!pubOk) {
    dbg("listLiveJobsFn", { result: "fallback-seeds", reason: "public-not-configured" });
    return fallbackLiveJobs();
  }
  const { data, error } = await anonClient()
    .from("capital_jobs")
    .select("*")
    .eq("status", "live")
    .order("created_at", { ascending: false });
  if (error) {
    logCapital("capital_jobs.select(public live list)", error);
    dbg("listLiveJobsFn", { result: "error", code: error.code ?? null });
    return [];
  }
  dbg("listLiveJobsFn", { result: "ok", count: (data ?? []).length });
  return (data as CapitalJobRow[]).map(jobRowToJob);
});

export const getLiveJobByIdFn = createServerFn({ method: "GET" })
  .inputValidator((id: unknown) => z.string().min(1).parse(id))
  .handler(async ({ data: id }) => {
    const env = readCapitalServerEnv();
    const pubOk = isSupabasePublicConfigured(env);
    dbg("getLiveJobByIdFn", { id, publicConfigured: pubOk });

    if (!pubOk) {
      const j = jobsById[id];
      dbg("getLiveJobByIdFn", { result: "fallback-seed", found: Boolean(j) });
      return j?.status === "Live" ? j : null;
    }
    const { data, error } = await anonClient()
      .from("capital_jobs")
      .select("*")
      .eq("id", id)
      .eq("status", "live")
      .maybeSingle();
    if (error) {
      logCapital("capital_jobs.select(public live by id)", error);
      dbg("getLiveJobByIdFn", { result: "error", code: error.code ?? null });
      return null;
    }
    dbg("getLiveJobByIdFn", { result: "ok", found: Boolean(data) });
    if (!data) return null;
    return jobRowToJob(data as CapitalJobRow);
  });

const adminTokenSchema = z.object({
  adminToken: z.string().min(10),
});

function requireAdminToken(token: string) {
  const env = readCapitalServerEnv();
  if (!isAdminAuthConfigured(env)) throw new Error("Admin authentication is not configured.");
  if (!verifyAdminSessionToken(token, env.adminSessionSecret)) {
    throw new Error("Admin session expired. Please login again.");
  }
}

export const adminLoginFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const env = readCapitalServerEnv();
    const authOk = isAdminAuthConfigured(env);
    dbg("adminLoginFn", { authConfigured: authOk });
    if (!authOk) {
      return { ok: false as const, error: "Admin login is not configured on the server." };
    }
    const a = Buffer.from(data.password, "utf8");
    const b = Buffer.from(env.adminPassword, "utf8");
    const ok = a.length === b.length && timingSafeEqual(a, b);
    dbg("adminLoginFn", { result: ok ? "ok" : "invalid-password" });
    if (!ok) return { ok: false as const, error: "Invalid password." };
    const token = createAdminSessionToken(env.adminSessionSecret);
    return { ok: true as const, token };
  });

export const adminListJobsFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => adminTokenSchema.parse(input))
  .handler(async ({ data }) => {
    requireAdminToken(data.adminToken);
    const env = readCapitalServerEnv();
    const svcOk = isSupabaseBackendConfigured(env);
    dbg("adminListJobsFn", { backendConfigured: svcOk });
    if (!svcOk) return [] as Job[];
    const { data: rows, error } = await serviceClient()
      .from("capital_jobs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      logCapital("capital_jobs.select(admin list)", error);
      throw new Error(`Could not load jobs: ${formatSupabaseWriteError(error)}`);
    }
    dbg("adminListJobsFn", { result: "ok", count: (rows ?? []).length });
    return (rows as CapitalJobRow[]).map(jobRowToJob);
  });

const jobSaveSchema = z.object({
  adminToken: z.string().min(10),
  job: z.object({
    id: z.string().optional(),
    title: z.string(),
    industry: z.string(),
    location: z.string(),
    /** DB allows any label; keep loose so legacy rows still save after load. */
    type: z.string().min(1),
    rate: z.string(),
    posted: z.string(),
    summary: z.string(),
    description: z.array(z.string()),
    requirements: z.array(z.string()),
    status: z.enum(["Draft", "Live", "Closed"]),
  }),
});

function formatSupabaseWriteError(err: {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
}) {
  const parts = [err.message, err.code, err.details, err.hint].filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
  return parts.join(" — ") || "Database write failed.";
}

export const adminSaveJobFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => jobSaveSchema.parse(input))
  .handler(async ({ data }) => {
    requireAdminToken(data.adminToken);
    const env = readCapitalServerEnv();
    const svcOk = isSupabaseBackendConfigured(env);
    dbg("adminSaveJobFn", {
      backendConfigured: svcOk,
      incomingId: data.job.id ?? "(none)",
      title: data.job.title,
      status: data.job.status,
      descriptionCount: data.job.description.length,
      requirementsCount: data.job.requirements.length,
    });
    if (!svcOk) throw new Error("Supabase is not configured.");

    const incoming = data.job;
    const id = incoming.id?.trim() ? incoming.id.trim() : slugJobIdFromTitle(incoming.title || "job");
    const job: Job = { ...incoming, id } as Job;
    const row = jobToDbRow(job);
    dbg("adminSaveJobFn", { upsertId: row.id, upsertStatus: row.status });

    const { error } = await serviceClient()
      .from("capital_jobs")
      .upsert(row, { onConflict: "id", ignoreDuplicates: false });
    if (error) {
      logCapital("capital_jobs.upsert(admin save)", error);
      dbg("adminSaveJobFn", { result: "upsert-error", code: error.code ?? null, message: error.message ?? null });
      throw new Error(`Could not save job: ${formatSupabaseWriteError(error)}`);
    }
    dbg("adminSaveJobFn", { result: "ok", savedId: row.id });
    return { ok: true as const };
  });

export const adminDeleteJobFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ adminToken: z.string().min(10), id: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    requireAdminToken(data.adminToken);
    const env = readCapitalServerEnv();
    const svcOk = isSupabaseBackendConfigured(env);
    dbg("adminDeleteJobFn", { backendConfigured: svcOk, id: data.id });
    if (!svcOk) throw new Error("Supabase is not configured.");
    const { error } = await serviceClient().from("capital_jobs").delete().eq("id", data.id);
    if (error) {
      logCapital("capital_jobs.delete(admin)", error);
      dbg("adminDeleteJobFn", { result: "error", code: error.code ?? null });
      throw new Error(`Could not delete job: ${formatSupabaseWriteError(error)}`);
    }
    dbg("adminDeleteJobFn", { result: "ok", deletedId: data.id });
    return { ok: true as const };
  });

export type AdminApplicationRow = {
  id: string;
  applicant_name: string;
  job_title: string | null;
  phone: string;
  email: string;
  resume_signed_url: string | null;
  created_at: string;
};

export const adminListApplicationsFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => adminTokenSchema.parse(input))
  .handler(async ({ data }) => {
    requireAdminToken(data.adminToken);
    const env = readCapitalServerEnv();
    const svcOk = isSupabaseBackendConfigured(env);
    dbg("adminListApplicationsFn", { backendConfigured: svcOk });
    if (!svcOk) return [] as AdminApplicationRow[];

    const sb = serviceClient();
    const { data: rows, error } = await sb
      .from("candidate_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      logCapital("candidate_applications.select(admin list)", error);
      throw new Error(`Could not load applications: ${formatSupabaseWriteError(error)}`);
    }
    dbg("adminListApplicationsFn", { result: "ok", count: (rows ?? []).length });

    const list = (rows ?? []) as Record<string, unknown>[];
    const jobIds = [...new Set(list.map((r) => r.job_id).filter(Boolean))] as string[];
    let titleById: Record<string, string> = {};
    if (jobIds.length > 0) {
      const { data: jrows } = await sb.from("capital_jobs").select("id,title").in("id", jobIds);
      titleById = Object.fromEntries(
        (jrows ?? []).map((j: { id: string; title: string }) => [j.id, j.title]),
      );
    }
    const out: AdminApplicationRow[] = [];
    for (const r of list) {
      const applicantName = String(r.full_name ?? r.applicant_name ?? "");
      const resumeKey = String(r.resume_path ?? r.resume_storage_path ?? "");
      let resumeSigned: string | null = null;
      if (resumeKey) {
        const signed = await sb.storage.from(RESUME_BUCKET).createSignedUrl(resumeKey, 3600);
        dbg("adminListApplicationsFn", {
          signedUrlOk: Boolean(signed.data?.signedUrl),
          signedUrlError: signed.error?.message ?? null,
        });
        resumeSigned = signed.data?.signedUrl ?? null;
      }
      out.push({
        id: String(r.id),
        applicant_name: applicantName,
        job_title: r.job_id ? (titleById[String(r.job_id)] ?? String(r.job_id)) : null,
        phone: String(r.phone ?? ""),
        email: String(r.email ?? ""),
        resume_signed_url: resumeSigned,
        created_at: String(r.created_at ?? ""),
      });
    }
    return out;
  });

export const submitApplicationFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    if (!(input instanceof FormData)) throw new Error("Expected FormData");
    return input;
  })
  .handler(async ({ data: form }) => {
    const env = readCapitalServerEnv();
    const svcOk = isSupabaseBackendConfigured(env);
    dbg("submitApplicationFn", { backendConfigured: svcOk });

    if (!svcOk) {
      return { ok: false as const, error: "Applications are not available (database not configured)." };
    }

    const jobId = formGetTrim(form, ["job_id", "jobId"]);
    const fullName = formGetTrim(form, ["full_name", "applicantName"]);
    const email = formGetTrim(form, ["email"]);
    const phone = formGetTrim(form, ["phone"]);
    const location = formGetTrim(form, ["location"]);
    const messageTrimmed = String(form.get("message") ?? "").trim();
    const file = form.get("resume");

    dbg("submitApplicationFn", {
      jobId,
      hasFullName: Boolean(fullName),
      hasEmail: Boolean(email),
      hasPhone: Boolean(phone),
      hasMessage: Boolean(messageTrimmed),
      fileType: file instanceof File ? file.type : typeof file,
      fileSizeBytes: file instanceof File ? file.size : null,
    });

    if (!jobId || !fullName || !email || !phone || !messageTrimmed) {
      return { ok: false as const, error: "Please fill in all required fields." };
    }
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false as const, error: "Please attach your resume." };
    }
    if (file.size > MAX_RESUME_BYTES) {
      return { ok: false as const, error: "Resume must be 4 MB or smaller." };
    }

    const ext = safeResumeExt(file.name);
    if (!ext) return { ok: false as const, error: "Resume must be PDF, DOC, or DOCX." };

    const sb = serviceClient();

    // Verify the job is live before accepting the application
    const { data: job, error: jobErr } = await sb
      .from("capital_jobs")
      .select("id")
      .eq("id", jobId)
      .eq("status", "live")
      .maybeSingle();
    if (jobErr) {
      logCapital("capital_jobs.select(apply verify live)", jobErr);
      dbg("submitApplicationFn", { result: "job-verify-error", code: jobErr.code ?? null });
      return {
        ok: false as const,
        error: `Could not verify job: ${formatSupabaseWriteError(jobErr)}`,
      };
    }
    dbg("submitApplicationFn", { jobVerified: Boolean(job) });
    if (!job) {
      return { ok: false as const, error: "This job is not open for applications." };
    }

    const { randomUUID } = await import("node:crypto");
    const objectPath = `applications/${randomUUID()}/resume.${ext}`;
    dbg("submitApplicationFn", { uploadPath: objectPath, contentType: file.type || guessMime(ext) });

    const buf = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await sb.storage.from(RESUME_BUCKET).upload(objectPath, buf, {
      contentType: file.type || guessMime(ext),
      upsert: false,
    });
    if (upErr) {
      logCapital("storage.capital-resumes.upload(apply)", upErr as PostgrestishError);
      dbg("submitApplicationFn", {
        result: "upload-error",
        message: (upErr as { message?: string }).message ?? null,
      });
      return {
        ok: false as const,
        error: `Could not upload resume: ${formatSupabaseWriteError(upErr as PostgrestishError)}`,
      };
    }
    dbg("submitApplicationFn", { result: "upload-ok" });

    const insertRow = {
      job_id: jobId,
      full_name: fullName,
      email,
      phone,
      location: location || null,
      message: messageTrimmed,
      resume_path: objectPath,
      resume_filename: file.name,
    };
    dbg("submitApplicationFn", { insertColumns: Object.keys(insertRow) });

    const { error: insErr } = await sb.from("candidate_applications").insert(insertRow);
    if (insErr) {
      logCapital("candidate_applications.insert(apply)", insErr);
      dbg("submitApplicationFn", {
        result: "insert-error",
        code: insErr.code ?? null,
        message: insErr.message ?? null,
      });
      await sb.storage.from(RESUME_BUCKET).remove([objectPath]);
      return {
        ok: false as const,
        error: `Could not save your application: ${formatSupabaseWriteError(insErr)}`,
      };
    }
    dbg("submitApplicationFn", { result: "ok" });
    return { ok: true as const };
  });

function safeResumeExt(filename: string): "pdf" | "doc" | "docx" | null {
  const m = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  const e = m?.[1];
  if (e === "pdf" || e === "doc" || e === "docx") return e;
  return null;
}

function guessMime(ext: string): string {
  if (ext === "pdf") return "application/pdf";
  if (ext === "doc") return "application/msword";
  return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
}

const contactSchema = z.object({
  full_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1),
});

export const submitContactMessageFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const env = readCapitalServerEnv();
    if (!isSupabaseBackendConfigured(env)) {
      return { ok: false as const, error: "Contact form is not available (database not configured)." };
    }
    const { error } = await serviceClient().from("contact_messages").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message,
    });
    if (error) {
      console.error(error);
      return { ok: false as const, error: "Could not send your message. Please try again." };
    }
    return { ok: true as const };
  });

const employerSchema = z.object({
  company_name: z.string().min(1),
  contact_person: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  site_location: z.string().min(1),
  services: z.array(z.string()).default([]),
  workers_required: z.coerce.number().int().nonnegative().optional().nullable(),
  start_timing: z.string().min(1),
  details: z.string().min(1),
});

export const submitEmployerEnquiryFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => employerSchema.parse(input))
  .handler(async ({ data }) => {
    const env = readCapitalServerEnv();
    if (!isSupabaseBackendConfigured(env)) {
      return {
        ok: false as const,
        error: "Employer enquiry is not available (database not configured).",
      };
    }
    const { error } = await serviceClient().from("employer_enquiries").insert({
      company_name: data.company_name,
      contact_person: data.contact_person,
      email: data.email,
      phone: data.phone || null,
      industry: data.industry || null,
      site_location: data.site_location,
      services: data.services,
      workers_required: data.workers_required ?? null,
      start_timing: data.start_timing,
      details: data.details,
    });
    if (error) {
      console.error(error);
      return { ok: false as const, error: "Could not submit your enquiry. Please try again." };
    }
    return { ok: true as const };
  });
