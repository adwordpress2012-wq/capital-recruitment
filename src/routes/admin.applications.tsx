import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Section } from "@/components/Section";
import { readAdminToken } from "@/lib/admin-token";
import { adminListApplicationsFn, type AdminApplicationRow } from "@/capital/capital-fns";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [
      { title: "Admin — Applications | Capital Recruitment" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminApplicationsPage,
});

function AdminApplicationsPage() {
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<AdminApplicationRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const token = readAdminToken();
    if (!token) return;
    setError(null);
    try {
      const data = await adminListApplicationsFn({ data: { adminToken: token } });
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load applications.");
    }
  }, []);

  useEffect(() => {
    const token = readAdminToken();
    if (!token) {
      window.location.assign("/admin/login");
      return;
    }
    setReady(true);
    void load();
  }, [load]);

  if (!ready) {
    return (
      <div className="container-x py-16 text-sm text-muted-foreground">
        Checking session…
      </div>
    );
  }

  return (
    <>
      <section className="container-x pt-10 pb-4">
        <div className="eyebrow mb-3">● Admin</div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Applications</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          Candidate applications submitted from the website. Resume links are time-limited signed
          URLs.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/admin/jobs" className="btn-outline px-4 py-2 text-sm">
            Job listings
          </Link>
          <Link to="/" className="btn-outline px-4 py-2 text-sm">
            Website home
          </Link>
        </div>
      </section>

      <Section className="!py-8">
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[960px] text-sm">
            <thead className="bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Job</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No applications yet.
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{r.applicant_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.job_title ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[140px] truncate" title={r.location ?? ""}>
                    {r.location ?? "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-muted-foreground max-w-[220px] truncate"
                    title={r.message_preview ?? ""}
                  >
                    {r.message_preview ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.phone}</td>
                  <td className="px-4 py-3">
                    <a className="underline-offset-2 hover:underline" href={`mailto:${r.email}`}>
                      {r.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {r.resume_signed_url ? (
                      <a
                        href={r.resume_signed_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[color:var(--teal-deep)] underline-offset-2 hover:underline"
                      >
                        Download <ExternalLink className="size-3.5" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {format(new Date(r.created_at), "dd MMM yyyy HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
