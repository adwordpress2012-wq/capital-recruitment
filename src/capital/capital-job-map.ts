import type { EmploymentType, Job, JobStatus } from "@/data/jobs";

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
  const desc = Array.isArray(row.description)
    ? row.description.map(String)
    : typeof row.description === "string"
      ? [row.description]
      : [];
  const req = Array.isArray(row.requirements)
    ? row.requirements.map(String)
    : typeof row.requirements === "string"
      ? [row.requirements]
      : [];
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
  return {
    id: job.id,
    title: job.title,
    industry: job.industry,
    location: job.location,
    employment_type: job.type,
    rate: job.rate,
    posted_label: job.posted,
    summary: job.summary,
    description: job.description,
    requirements: job.requirements,
    status: DB_STATUS[job.status],
  };
}
