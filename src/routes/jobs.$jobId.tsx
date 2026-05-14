import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, CheckCircle2, Send } from "lucide-react";
import { jobsById } from "@/data/jobs";
import { getJobById, readJobs } from "@/lib/jobs-repo";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const seedJob = jobsById[params.jobId] ?? null;
    return { jobId: params.jobId, seedJob };
  },
  head: ({ loaderData }) => {
    const j = loaderData?.seedJob;
    return {
      meta: j
        ? [
            { title: `${j.title} — ${j.location} | Capital Recruitment` },
            { name: "description", content: j.summary },
            {
              name: "keywords",
              content: `${j.industry}, labour hire, recruitment agency Liverpool NSW, industrial staffing`,
            },
            { property: "og:title", content: `${j.title} — Capital Recruitment` },
            { property: "og:description", content: j.summary },
          ]
        : [
            { title: "Job listing — Capital Recruitment" },
            {
              name: "description",
              content: "View role details and apply with Capital Recruitment Agency.",
            },
          ],
    };
  },
  component: JobPage,
});

function JobPage() {
  const { jobId, seedJob } = Route.useLoaderData();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const job = useMemo(() => {
    if (seedJob) return seedJob;
    if (!hydrated) return null;
    return getJobById(readJobs(), jobId) ?? null;
  }, [seedJob, hydrated, jobId]);

  if (hydrated && !job) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-bold">Role not found</h1>
        <p className="mt-2 text-muted-foreground">This role may be filled, closed or removed.</p>
        <Link to="/jobs" className="btn-primary mt-6">
          Browse all jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container-x py-24 text-center text-muted-foreground">
        <p>Loading role…</p>
      </div>
    );
  }

  if (job.status !== "Published") {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-bold">This listing is not available</h1>
        <p className="mt-2 text-muted-foreground">
          This role is not currently published for public applications.
        </p>
        <Link to="/jobs" className="btn-primary mt-6">
          Browse all jobs
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="container-x pt-10 pb-6">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to all jobs
        </Link>
        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full grad-lime px-2.5 py-1 text-[11px] font-bold text-[color:var(--navy)]">
              {job.type}
            </span>
            <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-[1.05]">{job.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{job.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="size-4 text-[color:var(--lime-soft)]" /> {job.industry}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-[color:var(--lime-soft)]" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <DollarSign className="size-4 text-[color:var(--lime-soft)]" /> {job.rate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-[color:var(--lime-soft)]" /> {job.type}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="container-x grid gap-8 pb-16 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          <div className="card-soft">
            <h2 className="text-xl font-bold">About the role</h2>
            <ul className="mt-4 space-y-3">
              {job.description.map((d: string) => (
                <li key={d} className="flex gap-3 text-sm">
                  <CheckCircle2 className="size-5 shrink-0 text-[color:var(--lime-soft)]" /> {d}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-xl font-bold">What you&apos;ll bring</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((d: string) => (
                <li key={d} className="flex gap-3 text-sm">
                  <CheckCircle2 className="size-5 shrink-0 text-[color:var(--lime-soft)]" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="card-soft lg:sticky lg:top-24">
            <h3 className="text-lg font-bold">Apply now</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit your details and resume — our team reviews every application carefully.
            </p>
            <Link
              to="/register"
              search={{ role: job.title }}
              className="btn-primary mt-5 flex w-full justify-center"
            >
              <Send className="size-4" /> Apply for this role
            </Link>
            <Link to="/jobs" className="btn-outline mt-3 flex w-full justify-center">
              View all jobs
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
