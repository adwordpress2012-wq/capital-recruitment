import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, ArrowRight, Filter } from "lucide-react";
import { JOBS } from "@/data/jobs";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs — Find Work | Capital Recruitment" },
      { name: "description", content: "Browse open jobs across warehousing, construction, manufacturing, transport and hospitality. Apply with Capital Recruitment Agency today." },
      { property: "og:title", content: "Open Jobs — Capital Recruitment" },
      { property: "og:description", content: "Find your next role across Australia." },
    ],
  }),
  component: JobsPage,
});

const INDUSTRIES = ["All", ...Array.from(new Set(JOBS.map((j) => j.industry)))];
const TYPES = ["All", "Full-time", "Casual", "Contract", "Temporary"];

function JobsPage() {
  const matches = useMatches();
  const isJobDetail = matches.some((m) => m.routeId === "/jobs/$jobId");
  if (isJobDetail) {
    return <Outlet />;
  }

  const [q, setQ] = useState("");
  const [industry, setIndustry] = useState("All");
  const [type, setType] = useState("All");

  const results = useMemo(() => {
    return JOBS.filter((j) => {
      if (industry !== "All" && j.industry !== industry) return false;
      if (type !== "All" && j.type !== type) return false;
      if (q) {
        const s = `${j.title} ${j.location} ${j.industry}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q, industry, type]);

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Open Roles</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Find your next <span className="text-gradient-lime italic">opportunity</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Browse current openings across Australia. New roles added every week.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <Reveal>
          <div className="card-soft grid md:grid-cols-[1fr_auto_auto_auto] gap-3">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search role, location or keyword"
                className="w-full rounded-lg border bg-background pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
              />
            </label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="rounded-lg border bg-background px-3 py-3 text-sm">
              {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-lg border bg-background px-3 py-3 text-sm">
              {TYPES.map((i) => <option key={i}>{i}</option>)}
            </select>
            <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm font-semibold">
              <Filter className="size-4" /> {results.length} results
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4">
          {results.length === 0 && (
            <div className="card-soft text-center text-muted-foreground">No jobs match your filters — try broadening your search.</div>
          )}
          {results.map((j, i) => (
            <Reveal key={j.id} delay={i * 60}>
              <Link
                to="/jobs/$jobId"
                params={{ jobId: j.id }}
                className="group card-soft flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full grad-lime px-2.5 py-1 text-[11px] font-bold text-[color:var(--navy)]">{j.type}</span>
                    <span className="text-xs text-muted-foreground">{j.posted}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-[color:var(--teal-deep)]">{j.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Briefcase className="size-3.5" /> {j.industry}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" /> {j.location}</span>
                    <span className="font-semibold text-foreground">{j.rate}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="btn-primary">View role <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
