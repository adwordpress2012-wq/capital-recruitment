import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { INDUSTRY_LABELS } from "@/data/industries";
import type { EmploymentType, Job, JobStatus } from "@/data/jobs";
import { readJobs, writeJobs } from "@/lib/jobs-repo";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/admin/jobs")({
  head: () => ({
    meta: [
      { title: "Admin — Job Listings | Capital Recruitment" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Internal job listing management. Data is stored in this browser until a database is connected.",
      },
    ],
  }),
  component: AdminJobsPage,
});

const EMPLOYMENT: EmploymentType[] = ["Full-time", "Casual", "Contract", "Temporary"];
const STATUSES: JobStatus[] = ["Draft", "Published", "Closed"];

function slugId(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `${base || "job"}-${Math.random().toString(36).slice(2, 8)}`;
}

function emptyForm(): Omit<Job, "id"> {
  return {
    title: "",
    industry: INDUSTRY_LABELS[0],
    location: "",
    type: "Casual",
    rate: "",
    posted: "Recently listed",
    summary: "",
    description: [""],
    requirements: [""],
    status: "Draft",
  };
}

function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(() => readJobs());
  const [editing, setEditing] = useState<Job | null>(null);
  const [creating, setCreating] = useState(false);

  const persist = useCallback((next: Job[]) => {
    setJobs(next);
    writeJobs(next);
  }, []);

  const startCreate = () => {
    setCreating(true);
    setEditing({ id: slugId("new-role"), ...emptyForm() });
  };

  const startEdit = (job: Job) => {
    setCreating(false);
    setEditing({ ...job });
  };

  const cancelEdit = () => {
    setEditing(null);
    setCreating(false);
  };

  const saveJob = () => {
    if (!editing) return;
    const nextId = creating ? slugId(editing.title || "job") : editing.id;
    const normalized: Job = {
      ...editing,
      id: nextId,
      description: editing.description.map((s) => s.trim()).filter(Boolean),
      requirements: editing.requirements.map((s) => s.trim()).filter(Boolean),
    };
    if (!normalized.title.trim()) return;

    let next: Job[];
    if (creating) {
      next = [...jobs, normalized];
    } else {
      next = jobs.map((j) => (j.id === editing.id ? normalized : j));
    }
    persist(next);
    cancelEdit();
  };

  const deleteJob = (id: string) => {
    if (!window.confirm("Delete this job? This cannot be undone from the admin screen.")) return;
    persist(jobs.filter((j) => j.id !== id));
    if (editing?.id === id) cancelEdit();
  };

  const form = editing;

  const industryOptions = useMemo(() => [...INDUSTRY_LABELS], []);

  return (
    <>
      <section className="container-x pt-10 pb-4">
        <div className="eyebrow mb-3">● Admin</div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Job listings</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground text-sm md:text-base">
          Simple in-browser management for now. Jobs are saved to{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">localStorage</code> on this device.
          Replace with Supabase (or similar) by swapping the read/write layer in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">src/lib/jobs-repo.ts</code> — keep
          the <code className="rounded bg-muted px-1 py-0.5 text-xs">Job</code> type as your table
          guide.
        </p>
        <button type="button" className="btn-primary mt-6" onClick={startCreate}>
          <Plus className="size-4" /> Add job
        </button>
      </section>

      <Section className="!py-8">
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{j.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{j.industry}</td>
                  <td className="px-4 py-3 text-muted-foreground">{j.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{j.type}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold">
                      {j.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        className="btn-outline px-3 py-1.5 text-xs"
                        onClick={() => startEdit(j)}
                      >
                        <Pencil className="size-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        className="btn-outline px-3 py-1.5 text-xs text-red-600 border-red-200"
                        onClick={() => deleteJob(j.id)}
                      >
                        <Trash2 className="size-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {form && (
        <section className="container-x pb-16">
          <div className="card-soft grid gap-4 max-w-3xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{creating ? "New job" : "Edit job"}</h2>
              <button
                type="button"
                className="btn-outline px-3 py-1.5 text-xs"
                onClick={cancelEdit}
              >
                <X className="size-3.5" /> Close
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Job title">
                <input
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.title}
                  onChange={(e) => setEditing({ ...form, title: e.target.value })}
                />
              </Field>
              <Field label="Industry">
                <select
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.industry}
                  onChange={(e) => setEditing({ ...form, industry: e.target.value })}
                >
                  {industryOptions.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Location">
                <input
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.location}
                  onChange={(e) => setEditing({ ...form, location: e.target.value })}
                />
              </Field>
              <Field label="Employment type">
                <select
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.type}
                  onChange={(e) => setEditing({ ...form, type: e.target.value as EmploymentType })}
                >
                  {EMPLOYMENT.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Rate / salary">
                <input
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.rate}
                  onChange={(e) => setEditing({ ...form, rate: e.target.value })}
                />
              </Field>
              <Field label="Posted label">
                <input
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.posted}
                  onChange={(e) => setEditing({ ...form, posted: e.target.value })}
                  placeholder="e.g. Recently listed"
                />
              </Field>
              <Field label="Status">
                <select
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e) => setEditing({ ...form, status: e.target.value as JobStatus })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Short description">
              <textarea
                rows={3}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm"
                value={form.summary}
                onChange={(e) => setEditing({ ...form, summary: e.target.value })}
              />
            </Field>

            <Field label="Full description (one bullet per line)">
              <textarea
                rows={6}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono"
                value={form.description.join("\n")}
                onChange={(e) => setEditing({ ...form, description: e.target.value.split("\n") })}
              />
            </Field>

            <Field label="Requirements (one per line)">
              <textarea
                rows={5}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono"
                value={form.requirements.join("\n")}
                onChange={(e) => setEditing({ ...form, requirements: e.target.value.split("\n") })}
              />
            </Field>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" onClick={saveJob}>
                <Save className="size-4" /> Save job
              </button>
              <button type="button" className="btn-outline" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
