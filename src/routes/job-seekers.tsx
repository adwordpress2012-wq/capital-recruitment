import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Upload, Search, MessageSquare, Briefcase, Calendar } from "lucide-react";
import jsImg from "@/assets/jobseekers.jpg";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/job-seekers")({
  head: () => ({
    meta: [
      { title: "Job Seekers — Find Work in Australia | Capital Recruitment" },
      { name: "description", content: "Find rewarding job opportunities across warehousing, construction, manufacturing and more. Flexible work, weekly pay and a supportive recruitment team." },
      { property: "og:title", content: "Find Work with Capital Recruitment" },
      { property: "og:description", content: "Build your future. Apply with us today." },
    ],
  }),
  component: JobSeekersPage,
});

const BENEFITS = [
  "Wide range of job opportunities",
  "Ongoing work & career growth",
  "Support every step of the way",
  "Weekly pay & competitive rates",
];

const PROCESS = [
  { icon: Upload, t: "Apply", d: "Upload your resume and tell us about you." },
  { icon: MessageSquare, t: "Screening", d: "Quick chat with our recruitment team." },
  { icon: Calendar, t: "Interview", d: "Meet the team or hiring manager." },
  { icon: Briefcase, t: "Placement", d: "Start your next role with full support." },
];

function JobSeekersPage() {
  return (
    <>
      <section className="container-x pt-12 pb-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow mb-4">● For Job Seekers</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
              Find opportunities. Build your <span className="text-gradient-lime italic">future</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We connect skilled and motivated people with rewarding job opportunities across Australia.
            </p>
            <ul className="mt-6 space-y-3">
              {BENEFITS.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-[color:var(--lime-soft)]" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#apply" className="btn-primary"><Search className="size-4" /> Search jobs</a>
              <a href="#apply" className="btn-outline"><Upload className="size-4" /> Upload your resume</a>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img src={jsImg} alt="Job seeker in workforce" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Application Process" title="From application to placement">
        <div className="grid md:grid-cols-4 gap-5">
          {PROCESS.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="card-soft">
              <div className="flex items-center justify-between mb-3">
                <div className="size-11 rounded-xl grad-lime inline-flex items-center justify-center">
                  <Icon className="size-5 text-[color:var(--navy)]" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="font-bold mb-1">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="apply" className="container-x">
        <div className="grad-cta rounded-[2rem] p-8 md:p-12 text-white grid lg:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow text-[color:var(--lime)] mb-3">● Apply now</div>
            <h2 className="text-3xl md:text-4xl font-bold">Register your interest.</h2>
            <p className="mt-3 text-white/75">Submit your details and our team will be in touch with opportunities that match your skills.</p>
          </div>
          <form className="bg-card rounded-2xl p-6 grid gap-4 text-foreground" onSubmit={(e) => e.preventDefault()}>
            {[["Full name", "text"], ["Email", "email"], ["Phone", "tel"], ["Preferred industry", "text"]].map(([l, t]) => (
              <div key={l}>
                <label className="text-xs font-semibold text-muted-foreground">{l}</label>
                <input type={t} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Resume</label>
              <div className="mt-1 rounded-lg border border-dashed px-3 py-6 text-center text-sm text-muted-foreground">
                <Upload className="mx-auto size-5 mb-2 text-[color:var(--lime-soft)]" />
                Drag & drop or click to upload (.pdf, .doc)
              </div>
            </div>
            <button className="btn-primary w-full">Send application <ArrowRight className="size-4" /></button>
          </form>
        </div>
      </section>
      <div className="h-10" />

      <section className="container-x">
        <div className="card-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Looking for something specific?</h3>
            <p className="text-sm text-muted-foreground">Browse open roles across our active industries.</p>
          </div>
          <Link to="/industries" className="btn-outline">Browse industries <ArrowRight className="size-4" /></Link>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
