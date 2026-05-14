import type { EmploymentType, Job, JobStatus } from "@/data/jobs";

/** Normalise list fields for JSONB columns (arrays, or legacy JSON/string values). */
export function normalizeJobStringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((x) => String(x));
  if (typeof value === "string") {
    const t = value.trim();
    if (!t) return [];
    try {
      const parsed: unknown = JSON.parse(t);
      if (Array.isArray(parsed)) return parsed.map((x) => String(x));
    } catch {
      /* treat as single paragraph */
    }
    return [value];
  }
  return [];
}

/** Generate a URL-safe primary key when the client did not send one. */
export function slugJobIdFromTitle(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `${base || "job"}-${Math.random().toString(36).slice(2, 8)}`;
}

export type CapitalJobRow = {
  id: string;
  title: string;
  industry: string;
  location: string;
  employment_type: string;
  rate: string;
  posted_label: string;
  summary: string;
  description: unknown;
  requirements: unknown;
  status: string;
};

const DB_STATUS = {
  Draft: "draft",
  Live: "live",
  Closed: "closed",
} as const;

const UI_STATUS: Record<string, JobStatus> = {
  draft: "Draft",
  live: "Live",
  closed: "Closed",
};

export function jobRowToJob(row: CapitalJobRow): Job {
  const desc = normalizeJobStringList(row.description);
  const req = normalizeJobStringList(row.requirements);
  const st = UI_STATUS[row.status] ?? "Draft";
  return {
    id: row.id,
    title: row.title,
    industry: row.industry,
    location: row.location,
    type: row.employment_type as EmploymentType,
    rate: row.rate,
    posted: row.posted_label,
    summary: row.summary,
    description: desc,
    requirements: req,
    status: st,
  };
}

export function jobToDbRow(job: Job): Omit<CapitalJobRow, "status"> & { status: string } {
  const status = DB_STATUS[job.status] ?? "draft";
  const description = normalizeJobStringList(job.description);
  const requirements = normalizeJobStringList(job.requirements);
  return {
    id: job.id,
    title: job.title,
    industry: job.industry,
    location: job.location,
    employment_type: job.type,
    rate: job.rate,
    posted_label: job.posted,
    summary: job.summary,
    description,
    requirements,
    status,
  };
}
