import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, ArrowRight, Filter } from "lucide-react";
import type { Job } from "@/data/jobs";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { listLiveJobsFn } from "@/capital/capital-fns";

export const Route = createFileRoute("/jobs")({
  loader: async () => ({ initialJobs: await listLiveJobsFn() }),
  head: () => ({
    meta: [
      {
        title: "Jobs — Labour Hire & Industrial Staffing | Capital Recruitment Liverpool NSW",
      },
      {
        name: "description",
        content:
          "Browse published roles across Sydney, Liverpool NSW and Australia. Warehousing recruitment, construction labour hire, security labour hire, transport and industrial staffing — Capital Recruitment Agency.",
      },
      {
        name: "keywords",
        content:
          "labour hire Sydney, labour hire Liverpool NSW, warehousing recruitment, construction labour hire, security labour hire, industrial staffing, candidate applications",
      },
      { property: "og:title", content: "Open Jobs — Capital Recruitment" },
      {
        property: "og:description",
        content: "Find your next role with a safety-focused recruitment partner.",
      },
    ],
  }),
  component: JobsPage,
});

const TYPES = ["All", "Full-time", "Casual", "Contract", "Temporary"] as const;

function JobsPage() {
  const { initialJobs } = Route.useLoaderData();
  const matches = useMatches();
  const isJobDetail = matches.some((m) => m.routeId === "/jobs/$jobId");

  const jobs = initialJobs;

  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All");
  const [type, setType] = useState("All");

  const industries = useMemo(() => {
    const set = new Set(jobs.map((j) => j.industry));
    return ["All", ...Array.from(set).sort()];
  }, [jobs]);

  const results = useMemo(() => {
    return jobs.filter((j) => {
      if (industry !== "All" && j.industry !== industry) return false;
      if (type !== "All" && j.type !== type) return false;
      if (q) {
        const s = `${j.title} ${j.location} ${j.industry}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q, industry, type, jobs]);

  if (isJobDetail) {
    return <Outlet />;
  }

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Open Roles</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Find your next <span className="text-gradient-lime italic">opportunity</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Published roles across our key industries. Listings are curated from live vacancies — new
            positions are added as roles are confirmed. Check back regularly or{" "}
            <Link to="/upload-resume" className="font-semibold text-foreground underline-offset-2 hover:underline">
              upload your resume
            </Link>{" "}
            so we can match you when suitable work opens.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <Reveal>
          <div className="card-soft flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch">
            <label className="relative min-w-0 flex-1 lg:min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search role, location or keyword"
                className="w-full rounded-lg border bg-background pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
              />
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-3 text-sm lg:w-auto lg:min-w-[200px]"
            >
              {industries.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-3 text-sm lg:w-auto lg:min-w-[160px]"
            >
              {TYPES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <div className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm font-semibold lg:w-auto">
              <Filter className="size-4" /> {results.length} results
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4">
          {results.length === 0 && (
            <div className="card-soft text-center text-muted-foreground">
              No jobs match your filters — try broadening your search.
            </div>
          )}
          {results.map((j, i) => (
            <Reveal key={j.id} delay={i * 60}>
              <Link
                to="/jobs/$jobId"
                params={{ jobId: j.id }}
                className="group card-soft flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full grad-lime px-2.5 py-1 text-[11px] font-bold text-[color:var(--navy)]">
                      {j.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{j.posted}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-[color:var(--teal-deep)]">
                    {j.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="size-3.5" /> {j.industry}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" /> {j.location}
                    </span>
                    <span className="font-semibold text-foreground">{j.rate}</span>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <span className="btn-primary flex w-full justify-center md:inline-flex md:w-auto">
                    View role{" "}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
