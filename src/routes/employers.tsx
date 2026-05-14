import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HardHat,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { heroMain } from "@/lib/images";
import { FORMSPREE_EMPLOYER_ACTION } from "@/lib/forms";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/employers")({
  head: () => ({
    meta: [
      {
        title: "Employers — Workforce Solutions & Labour Hire Sydney | Capital Recruitment",
      },
      {
        name: "description",
        content:
          "Employer workforce solutions across Greater Sydney — labour hire, temporary staffing, shutdown crews and permanent recruitment. Safety-led mobilisation from Liverpool NSW.",
      },
      {
        name: "keywords",
        content:
          "employer workforce solutions, labour hire Sydney, industrial staffing, workforce solutions Australia, recruitment agency Liverpool NSW",
      },
      { property: "og:title", content: "Employer workforce solutions — Capital Recruitment" },
      {
        property: "og:description",
        content: "Reliable labour hire and recruitment support for Australian operations.",
      },
    ],
  }),
  component: EmployersPage,
});

const SERVICES = [
  {
    t: "Labour hire",
    d: "Structured sourcing for short spikes, ongoing rosters and specialist site requirements.",
  },
  {
    t: "Permanent recruitment",
    d: "Role scoping, competency verification and candidate care through offer and onboarding.",
  },
  {
    t: "Casual staffing",
    d: "Fast, compliant cover for demand peaks, leave and seasonal programmes.",
  },
  {
    t: "Workforce coordination",
    d: "Clear communication channels, documentation support and alignment to your site rules.",
  },
  {
    t: "Shutdown staffing",
    d: "Mobilisation planning for maintenance windows and turnaround schedules.",
  },
  {
    t: "Project staffing",
    d: "Volume hiring with consistent screening standards and induction readiness.",
  },
];

const SAFETY = [
  "WHS-aware recruitment and placement support",
  "Site-ready workers with appropriate PPE expectations",
  "Licence and competency checks aligned to role risk",
  "Transparent escalation when issues arise on shift",
];

function EmployersPage() {
  return (
    <>
      <section className="container-x pt-12 pb-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-4">● For employers</div>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              Workforce solutions aligned to your{" "}
              <span className="text-gradient-lime italic">operational reality</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Whether you are scaling a distribution centre, delivering a construction programme or
              stabilising a manufacturing line, we provide recruitment and labour hire support that
              respects your safety systems and productivity targets.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Recruitment support for blue-collar and industrial roles",
                "Clear candidate summaries — skills, licences, availability and work history",
                "A partner mindset — we advise early if requirements need adjusting",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-[color:var(--lime-soft)]" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Request a call back <ArrowRight className="size-4" />
              </Link>
              <Link to="/industries" className="btn-outline">
                Industries we support
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img
                src={heroMain}
                alt="Industrial employer workforce planning"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Our services" title="Tailored workforce solutions">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.t} className="card-soft">
              <h3 className="mb-2 text-lg font-bold">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Safety & compliance" title="Site-ready people. Every shift.">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {[ShieldCheck, HardHat, ClipboardCheck, Users].map((Icon, i) => (
              <div key={SAFETY[i]} className="card-soft">
                <Icon className="mb-3 size-6 text-[color:var(--lime-soft)]" />
                <p className="text-sm font-semibold">{SAFETY[i]}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-muted-foreground">
              Safety is not a slogan — it is a recruitment filter. We ask the right questions,
              verify the right tickets and set expectations before workers arrive on your site. When
              requirements change, we work with you to keep placements compliant and sustainable.
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
  const action = FORMSPREE_EMPLOYER_ACTION;
  const useFormspree = Boolean(action);

  return (
    <section className="container-x">
      <div className="grid gap-10 rounded-[2rem] grad-cta p-8 text-white md:p-12 lg:grid-cols-2">
        <div>
          <div className="eyebrow mb-3 text-[color:var(--lime)]">● Employer enquiry</div>
          <h2 className="text-3xl font-bold md:text-4xl">
            Tell us about your workforce priorities.
          </h2>
          <p className="mt-3 text-white/75">
            Share volumes, timelines and site requirements — a consultant will respond with
            practical next steps.
          </p>
        </div>
        {useFormspree ? (
          <form
            className="grid gap-4 rounded-2xl bg-card p-6 text-foreground"
            action={action}
            method="POST"
          >
            <input
              type="hidden"
              name="_subject"
              value="Employer enquiry — Capital Recruitment website"
            />
            {[
              { l: "Company name", n: "company_name", t: "text" },
              { l: "Contact person", n: "contact_person", t: "text" },
              { l: "Email", n: "email", t: "email" },
              { l: "Phone", n: "phone", t: "tel" },
            ].map((f) => (
              <div key={f.l}>
                <label className="text-xs font-semibold text-muted-foreground">{f.l}</label>
                <input
                  name={f.n}
                  type={f.t}
                  required={f.t !== "tel"}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Workforce needs</label>
              <textarea
                name="workforce_needs"
                required
                rows={3}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Submit enquiry <ArrowRight className="size-4" />
            </button>
          </form>
        ) : (
          <form
            className="grid gap-4 rounded-2xl bg-card p-6 text-foreground"
            onSubmit={(e) => e.preventDefault()}
          >
            {[
              { l: "Company name", t: "text" },
              { l: "Contact person", t: "text" },
              { l: "Email", t: "email" },
              { l: "Phone", t: "tel" },
            ].map((f) => (
              <div key={f.l}>
                <label className="text-xs font-semibold text-muted-foreground">{f.l}</label>
                <input
                  type={f.t}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Workforce needs</label>
              <textarea
                rows={3}
                className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
              />
            </div>
            <button type="submit" className="btn-primary w-full opacity-60" disabled>
              Submit enquiry <ArrowRight className="size-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
