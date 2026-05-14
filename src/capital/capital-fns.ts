import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

import type { Job } from "@/data/jobs";
import { jobsById, SEED_JOBS } from "@/data/jobs";
import { getLiveJobsForPublic } from "@/lib/jobs-repo";
import { isAdminAuthConfigured, isSupabaseBackendConfigured, readCapitalServerEnv } from "@/capital/capital-config";
import {
  jobRowToJob,
  jobToDbRow,
  slugJobIdFromTitle,
  type CapitalJobRow,
} from "@/capital/capital-job-map";
import { createAdminSessionToken, verifyAdminSessionToken } from "@/capital/capital-session";

const RESUME_BUCKET = "capital-resumes";

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
  if (!isSupabaseBackendConfigured(env)) return fallbackLiveJobs();
  const { data, error } = await anonClient()
    .from("capital_jobs")
    .select("*")
    .eq("status", "live")
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return (data as CapitalJobRow[]).map(jobRowToJob);
});

export const getLiveJobByIdFn = createServerFn({ method: "GET" })
  .inputValidator((id: unknown) => z.string().min(1).parse(id))
  .handler(async ({ data: id }) => {
    const env = readCapitalServerEnv();
    if (!isSupabaseBackendConfigured(env)) {
      const j = jobsById[id];
      return j?.status === "Live" ? j : null;
    }
    const { data, error } = await anonClient()
      .from("capital_jobs")
      .select("*")
      .eq("id", id)
      .eq("status", "live")
      .maybeSingle();
    if (error) {
      console.error(error);
      return null;
    }
    if (!data) return null;
    return jobRowToJob(data as CapitalJobRow);
  });

const adminTokenSchema = z.object({
  adminToken: z.string().min(10),
});

function requireAdminToken(token: string) {
  const env = readCapitalServerEnv();
  if (!isAdminAuthConfigured(env)) throw new Error("Admin authentication is not configured.");
  if (!verifyAdminSessionToken(token, env.adminSessionSecret)) throw new Error("Unauthorized");
}

export const adminLoginFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ password: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const env = readCapitalServerEnv();
    if (!isAdminAuthConfigured(env)) {
      return { ok: false as const, error: "Admin login is not configured on the server." };
    }
    const a = Buffer.from(data.password, "utf8");
    const b = Buffer.from(env.adminPassword, "utf8");
    const ok = a.length === b.length && timingSafeEqual(a, b);
    if (!ok) return { ok: false as const, error: "Invalid password." };
    const token = createAdminSessionToken(env.adminSessionSecret);
    return { ok: true as const, token };
  });

export const adminListJobsFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => adminTokenSchema.parse(input))
  .handler(async ({ data }) => {
    requireAdminToken(data.adminToken);
    const env = readCapitalServerEnv();
    if (!isSupabaseBackendConfigured(env)) return [] as Job[];
    const { data: rows, error } = await serviceClient()
      .from("capital_jobs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      throw new Error("Could not load jobs.");
    }
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

function formatSupabaseWriteError(err: { message?: string; code?: string; details?: string | null; hint?: string | null }) {
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
    if (!isSupabaseBackendConfigured(env)) throw new Error("Supabase is not configured.");
    const incoming = data.job;
    const id = incoming.id?.trim() ? incoming.id.trim() : slugJobIdFromTitle(incoming.title || "job");
    const job: Job = { ...incoming, id } as Job;
    const row = jobToDbRow(job);
    const { error } = await serviceClient().from("capital_jobs").upsert(row, { onConflict: "id" });
    if (error) {
      console.error(error);
      throw new Error(`Could not save job: ${formatSupabaseWriteError(error)}`);
    }
    return { ok: true as const };
  });

export const adminDeleteJobFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ adminToken: z.string().min(10), id: z.string().min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    requireAdminToken(data.adminToken);
    const env = readCapitalServerEnv();
    if (!isSupabaseBackendConfigured(env)) throw new Error("Supabase is not configured.");
    const { error } = await serviceClient().from("capital_jobs").delete().eq("id", data.id);
    if (error) {
      console.error(error);
      throw new Error("Could not delete job.");
    }
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
    if (!isSupabaseBackendConfigured(env)) return [] as AdminApplicationRow[];
    const sb = serviceClient();
    const { data: rows, error } = await sb.from("candidate_applications").select("*").order("created_at", {
      ascending: false,
    });
    if (error) {
      console.error(error);
      throw new Error("Could not load applications.");
    }
    const list = rows ?? [];
    const jobIds = [...new Set(list.map((r: { job_id: string | null }) => r.job_id).filter(Boolean))] as string[];
    let titleById: Record<string, string> = {};
    if (jobIds.length > 0) {
      const { data: jrows } = await sb.from("capital_jobs").select("id,title").in("id", jobIds);
      titleById = Object.fromEntries((jrows ?? []).map((j: { id: string; title: string }) => [j.id, j.title]));
    }
    const out: AdminApplicationRow[] = [];
    for (const r of list as Array<{
      id: string;
      applicant_name: string;
      phone: string;
      email: string;
      resume_storage_path: string;
      resume_filename: string | null;
      created_at: string;
      job_id: string | null;
    }>) {
      let resumeSigned: string | null = null;
      if (r.resume_storage_path) {
        const signed = await sb.storage.from(RESUME_BUCKET).createSignedUrl(r.resume_storage_path, 3600);
        resumeSigned = signed.data?.signedUrl ?? null;
      }
      out.push({
        id: r.id,
        applicant_name: r.applicant_name,
        job_title: r.job_id ? titleById[r.job_id] ?? r.job_id : null,
        phone: r.phone,
        email: r.email,
        resume_signed_url: resumeSigned,
        created_at: r.created_at,
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
    if (!isSupabaseBackendConfigured(env)) {
      return { ok: false as const, error: "Applications are not available (database not configured)." };
    }
    const jobId = String(form.get("jobId") ?? "").trim();
    const applicantName = String(form.get("applicantName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const file = form.get("resume");

    if (!jobId || !applicantName || !email || !phone || !message) {
      return { ok: false as const, error: "Please fill in all required fields." };
    }
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false as const, error: "Please attach your resume." };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { ok: false as const, error: "Resume must be 5MB or smaller." };
    }

    const ext = safeResumeExt(file.name);
    if (!ext) return { ok: false as const, error: "Resume must be PDF, DOC, or DOCX." };

    const sb = serviceClient();
    const { data: job, error: jobErr } = await sb
      .from("capital_jobs")
      .select("id")
      .eq("id", jobId)
      .eq("status", "live")
      .maybeSingle();
    if (jobErr || !job) {
      return { ok: false as const, error: "This job is not open for applications." };
    }

    const { randomUUID } = await import("node:crypto");
    const objectPath = `applications/${randomUUID()}/resume.${ext}`;

    const buf = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await sb.storage.from(RESUME_BUCKET).upload(objectPath, buf, {
      contentType: file.type || guessMime(ext),
      upsert: false,
    });
    if (upErr) {
      console.error(upErr);
      return { ok: false as const, error: "Could not upload resume. Please try again." };
    }

    const { error: insErr } = await sb.from("candidate_applications").insert({
      job_id: jobId,
      applicant_name: applicantName,
      email,
      phone,
      message,
      resume_storage_path: objectPath,
      resume_filename: file.name,
    });
    if (insErr) {
      console.error(insErr);
      await sb.storage.from(RESUME_BUCKET).remove([objectPath]);
      return { ok: false as const, error: "Could not save your application. Please try again." };
    }

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
      return { ok: false as const, error: "Employer enquiry is not available (database not configured)." };
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
