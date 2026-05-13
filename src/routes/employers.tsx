import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, ShieldCheck, HardHat, ClipboardCheck, Users } from "lucide-react";
import heroImg from "@/assets/hero-workforce.jpg";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      { title: "Employers — Workforce Solutions | Capital Recruitment" },
      { name: "description", content: "Workforce solutions built around your business. Labour hire, permanent recruitment, casual staffing and shutdown crews across Australia." },
      { property: "og:title", content: "Workforce Solutions for Employers" },
      { property: "og:description", content: "Reliable, compliant and scalable labour hire across Australia." },
    ],
  }),
  component: EmployersPage,
});

const SERVICES = [
  { t: "Labour Hire", d: "Flexible casual and ongoing labour for any volume." },
  { t: "Permanent Recruitment", d: "Long-term hires sourced, screened and matched." },
  { t: "Casual Staffing", d: "Coverage for peaks, leave and seasonal demand." },
  { t: "Workforce Management", d: "End-to-end compliance, rostering and payroll." },
  { t: "Shutdown Staffing", d: "Specialised crews mobilised for turnarounds." },
  { t: "Project Staffing", d: "Scoped teams for the lifecycle of your project." },
];

const SAFETY = [
  "WHS compliance and safety inductions",
  "Site-ready, PPE-equipped workers",
  "Documented competency & licensing checks",
  "Active risk management & incident reporting",
];

function EmployersPage() {
  return (
    <>
      <section className="container-x pt-12 pb-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow mb-4">● For Employers</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
              Workforce solutions built around your <span className="text-gradient-lime italic">business needs</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We partner with businesses of all sizes to deliver skilled, reliable and flexible labour hire solutions.
            </p>
            <ul className="mt-6 space-y-3">
              {["Short & long-term labour hire", "Compliant, job-ready candidates", "Scalable workforce solutions"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-[color:var(--lime-soft)]" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Request a callback <ArrowRight className="size-4" /></Link>
              <Link to="/industries" className="btn-outline">Industries we serve</Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img src={heroImg} alt="Employer and worker on site" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Our Services" title="Tailored workforce solutions">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div key={s.t} className="card-soft">
              <h3 className="text-lg font-bold mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Safety & Compliance" title="Site-ready people. Every shift.">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="grid sm:grid-cols-2 gap-4">
            {[ShieldCheck, HardHat, ClipboardCheck, Users].map((Icon, i) => (
              <div key={i} className="card-soft">
                <Icon className="size-6 text-[color:var(--lime-soft)] mb-3" />
                <p className="text-sm font-semibold">{SAFETY[i]}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-muted-foreground">
              Safety isn't a checkbox — it's the foundation of how we recruit, induct and place workers on your site.
              Our compliance team ensures every worker is qualified, ticketed and PPE-ready before day one.
            </p>
          </div>
        </div>
      </Section>

      <EmployerForm />
      <div className="h-10" />
    </>
  );
}

function EmployerForm() {
  return (
    <section className="container-x">
      <div className="grad-cta rounded-[2rem] p-8 md:p-12 text-white grid lg:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow text-[color:var(--lime)] mb-3">● Get in touch</div>
          <h2 className="text-3xl md:text-4xl font-bold">Tell us about your workforce needs.</h2>
          <p className="mt-3 text-white/75">A consultant will respond within one business day.</p>
        </div>
        <form className="bg-card rounded-2xl p-6 grid gap-4 text-foreground" onSubmit={(e) => e.preventDefault()}>
          {[
            { l: "Company name", t: "text" },
            { l: "Contact person", t: "text" },
            { l: "Email", t: "email" },
            { l: "Phone", t: "tel" },
          ].map((f) => (
            <div key={f.l}>
              <label className="text-xs font-semibold text-muted-foreground">{f.l}</label>
              <input type={f.t} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Workforce needs</label>
            <textarea rows={3} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
          </div>
          <button className="btn-primary w-full">Submit enquiry <ArrowRight className="size-4" /></button>
        </form>
      </div>
    </section>
  );
}
