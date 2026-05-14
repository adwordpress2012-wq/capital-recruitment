import { SEED_JOBS, type Job } from "@/data/jobs";

const STORAGE_KEY = "capital-recruitment-jobs-v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/** Full job list from local override, or seed when unset / invalid. */
export function readJobs(): Job[] {
  if (!isBrowser()) return SEED_JOBS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...SEED_JOBS];
    const parsed = JSON.parse(raw) as Job[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [...SEED_JOBS];
    return parsed;
  } catch {
    return [...SEED_JOBS];
  }
}

export function writeJobs(jobs: Job[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function resetJobsToSeed(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getPublishedJobs(jobs: Job[]): Job[] {
  return jobs.filter((j) => j.status === "Published");
}

export function getJobById(jobs: Job[], id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
