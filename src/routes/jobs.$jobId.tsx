import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, CheckCircle2, Send } from "lucide-react";
import { jobsById } from "@/data/jobs";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const job = jobsById[params.jobId];
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.job.title} — ${loaderData.job.location} | Capital Recruitment` },
          { name: "description", content: loaderData.job.summary },
          { property: "og:title", content: `${loaderData.job.title} — Capital Recruitment` },
          { property: "og:description", content: loaderData.job.summary },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Role not found</h1>
      <p className="mt-2 text-muted-foreground">This role may have been filled.</p>
      <Link to="/jobs" className="btn-primary mt-6">Browse all jobs</Link>
    </div>
  ),
  component: JobPage,
});

function JobPage() {
  const { job } = Route.useLoaderData();
  return (
    <>
      <section className="container-x pt-10 pb-6">
        <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to all jobs
        </Link>
        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full grad-lime px-2.5 py-1 text-[11px] font-bold text-[color:var(--navy)]">{job.type}</span>
            <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-[1.05]">{job.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{job.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2"><Briefcase className="size-4 text-[color:var(--lime-soft)]" /> {job.industry}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-[color:var(--lime-soft)]" /> {job.location}</span>
            <span className="inline-flex items-center gap-2"><DollarSign className="size-4 text-[color:var(--lime-soft)]" /> {job.rate}</span>
            <span className="inline-flex items-center gap-2"><Clock className="size-4 text-[color:var(--lime-soft)]" /> {job.type}</span>
          </div>
        </Reveal>
      </section>

      <section className="container-x grid lg:grid-cols-[2fr_1fr] gap-8 pb-16">
        <Reveal>
          <div className="card-soft">
            <h2 className="text-xl font-bold">About the role</h2>
            <ul className="mt-4 space-y-3">
              {job.description.map((d: string) => (
                <li key={d} className="flex gap-3 text-sm"><CheckCircle2 className="size-5 text-[color:var(--lime-soft)] shrink-0" /> {d}</li>
              ))}
            </ul>
            <h2 className="mt-8 text-xl font-bold">What you'll bring</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((d: string) => (
                <li key={d} className="flex gap-3 text-sm"><CheckCircle2 className="size-5 text-[color:var(--lime-soft)] shrink-0" /> {d}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="card-soft sticky top-24">
            <h3 className="text-lg font-bold">Apply now</h3>
            <p className="mt-2 text-sm text-muted-foreground">Submit your details and our team will be in touch.</p>
            <Link to="/register" className="btn-primary mt-5 w-full"><Send className="size-4" /> Apply for this role</Link>
            <Link to="/jobs" className="btn-outline mt-3 w-full">View all jobs</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
