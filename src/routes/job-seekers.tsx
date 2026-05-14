import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Upload,
  Search,
  MessageSquare,
  Briefcase,
  Calendar,
} from "lucide-react";
import { jobSeekersCareer } from "@/lib/images";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/job-seekers")({
  head: () => ({
    meta: [
      {
        title: "Job Seekers — Labour Hire & Industrial Roles | Capital Recruitment Liverpool NSW",
      },
      {
        name: "description",
        content:
          "Apply for labour hire and industrial roles across Greater Sydney. Candidate applications for warehousing recruitment, construction labour hire, security labour hire and more — Capital Recruitment Agency.",
      },
      {
        name: "keywords",
        content:
          "candidate applications, labour hire Liverpool NSW, industrial staffing, recruitment agency Liverpool NSW",
      },
      { property: "og:title", content: "Find work with Capital Recruitment" },
      {
        property: "og:description",
        content: "Practical support for your next role — apply online today.",
      },
    ],
  }),
  component: JobSeekersPage,
});

const BENEFITS = [
  "Roles across warehousing, construction, manufacturing, transport, hospitality, civil, mining, administration and security",
  "Consultants who explain site expectations clearly — safety, rostering and pay cycles",
  "Support through screening, interview coordination and start-day readiness",
  "A professional process — respectful, timely and transparent",
];

const PROCESS = [
  {
    icon: Upload,
    t: "Apply",
    d: "Submit your details and resume online — tell us what you are looking for.",
  },
  {
    icon: MessageSquare,
    t: "Screening",
    d: "A consultant will contact you to confirm skills, licences and availability.",
  },
  {
    icon: Calendar,
    t: "Interview",
    d: "Where required, we coordinate interviews and site inductions with the client.",
  },
  {
    icon: Briefcase,
    t: "Placement",
    d: "When a match is confirmed, we support mobilisation and first-shift expectations.",
  },
];

function JobSeekersPage() {
  return (
    <>
      <section className="container-x pt-12 pb-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-4">● For job seekers</div>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              Find work that fits your{" "}
              <span className="text-gradient-lime italic">skills and goals</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Whether you want ongoing casual shifts, a project contract or a permanent move, we
              help you present your experience clearly — licences, safety habits and reliability
              matter.
            </p>
            <ul className="mt-6 space-y-3">
              {BENEFITS.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-[color:var(--lime-soft)]" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn-primary">
                <Search className="size-4" /> Browse jobs
              </Link>
              <Link to="/register" search={{ role: "" }} className="btn-outline">
                <Upload className="size-4" /> Apply online
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img
                src={jobSeekersCareer}
                alt="Job seeker exploring industrial career opportunities"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Application process" title="From application to placement">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="card-soft">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex size-11 items-center justify-center rounded-xl grad-lime">
                  <Icon className="size-5 text-[color:var(--navy)]" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mb-1 font-bold">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-x">
        <div className="grid gap-10 rounded-[2rem] grad-cta p-8 text-white md:p-12 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-3 text-[color:var(--lime)]">● Apply</div>
            <h2 className="text-3xl font-bold md:text-4xl">Submit your application in minutes.</h2>
            <p className="mt-3 text-white/75">
              Upload your resume, confirm work rights and availability, and tell us the roles you
              want. Applications are reviewed by our team — you can also email{" "}
              <span className="font-semibold text-white">paul@capitalrecruitment.com.au</span>{" "}
              directly if you prefer.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link to="/register" search={{ role: "" }} className="btn-primary w-full justify-center">
              Start application <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/jobs"
              className="btn-ghost-light w-full justify-center border border-white/25"
            >
              Browse current jobs
            </Link>
          </div>
        </div>
      </section>
      <div className="h-10" />

      <section className="container-x">
        <div className="card-soft flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold">Want to understand our industries first?</h3>
            <p className="text-sm text-muted-foreground">
              Explore the sectors we recruit for most often.
            </p>
          </div>
          <Link to="/industries" className="btn-outline">
            View industries <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
