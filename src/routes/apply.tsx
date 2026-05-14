import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import type { Job } from "@/data/jobs";
import { getLiveJobByIdFn, submitApplicationFn } from "@/capital/capital-fns";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>) => ({
    jobId: typeof search.jobId === "string" ? search.jobId : "",
  }),
  loader: async ({ location }) => {
    const jobId =
      typeof location.search === "object" &&
      location.search &&
      "jobId" in location.search &&
      typeof (location.search as { jobId?: unknown }).jobId === "string"
        ? (location.search as { jobId: string }).jobId
        : "";
    if (!jobId) return { job: null as Job | null };
    const job = await getLiveJobByIdFn({ data: jobId });
    return { job };
  },
  head: () => ({
    meta: [
      { title: "Apply for a role — Capital Recruitment" },
      {
        name: "description",
        content: "Submit your application and resume for an open role with Capital Recruitment.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { jobId } = Route.useSearch();
  const { job } = Route.useLoaderData();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!jobId) {
    return (
      <section className="container-x py-16">
        <h1 className="text-2xl font-bold">Choose a role first</h1>
        <p className="mt-2 text-muted-foreground">
          Applications are linked to a specific job listing. Please pick a role from the jobs page.
        </p>
        <Link to="/jobs" className="btn-primary mt-6 inline-flex">
          Browse jobs
        </Link>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="container-x py-16">
        <h1 className="text-2xl font-bold">Role not found</h1>
        <p className="mt-2 text-muted-foreground">
          This job may no longer be open for applications.
        </p>
        <Link to="/jobs" className="btn-primary mt-6 inline-flex">
          Browse jobs
        </Link>
      </section>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await submitApplicationFn({ data: fd });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("We could not submit your application. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Application</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Apply for <span className="text-gradient-lime italic">{job.title}</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            {job.location} · {job.type}. Upload your resume (PDF or Word) and tell us briefly why you
            are a strong fit.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {done ? (
              <div className="card-soft grid gap-4">
                <div className="inline-flex items-center gap-2 text-lg font-bold text-[color:var(--teal-deep)]">
                  <CheckCircle2 className="size-6 text-[color:var(--lime-soft)]" /> Application received.
                </div>
                <p className="text-sm text-muted-foreground">
                  Thank you — our team will review your details and resume. We will contact you using
                  the email or phone number you provided.
                </p>
                <Link to="/jobs" className="btn-outline w-fit">
                  Back to jobs
                </Link>
              </div>
            ) : (
              <form className="card-soft grid gap-5" onSubmit={(e) => void onSubmit(e)}>
                <input type="hidden" name="job_id" value={jobId} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Full name</label>
                    <input
                      name="full_name"
                      required
                      autoComplete="name"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Location (optional)</label>
                    <input
                      name="location"
                      autoComplete="address-level2"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                      placeholder="e.g. Western Sydney, NSW"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Resume (PDF, DOC, or DOCX — max 5MB)
                  </label>
                  <input
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    className="mt-2 block w-full text-sm"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5" />I have read the{" "}
                  <Link to="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link to="/candidate-privacy-notice" className="underline">
                    Candidate Privacy Collection Notice
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="underline">
                    Terms &amp; Conditions
                  </Link>
                  .
                </label>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="btn-primary justify-center" disabled={pending}>
                  Submit application <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </Reveal>
          <Reveal delay={120}>
            <div className="card-soft">
              <h3 className="text-lg font-bold">Role summary</h3>
              <p className="mt-3 text-sm text-muted-foreground">{job.summary}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                Need the full candidate registration form instead?{" "}
                <Link
                  to="/register"
                  search={{ role: "" }}
                  className="font-semibold underline-offset-2 hover:underline"
                >
                  General registration
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
