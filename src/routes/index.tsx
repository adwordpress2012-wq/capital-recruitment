import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Zap,
  Layers,
  MapPin,
  Briefcase,
  CheckCircle2,
  Wrench,
  HardHat,
  Truck,
  UtensilsCrossed,
  Factory,
  Building2,
  Quote,
  Pickaxe,
  Shield,
} from "lucide-react";
import {
  heroMain,
  employersTeam,
  jobSeekersCareer,
  indWarehousing,
  indConstruction,
  indManufacturing,
  indTransport,
  indHospitality,
  indCivil,
  indMining,
  indAdministration,
  indSecurity,
  testimonialOps,
  testimonialSite,
  testimonialHr,
} from "@/lib/images";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Capital Recruitment Agency — Labour Hire Sydney & Liverpool NSW",
      },
      {
        name: "description",
        content:
          "Australian labour hire and workforce solutions from Liverpool NSW. Warehousing recruitment, construction labour hire, security labour hire, industrial staffing and employer workforce solutions — safety-led and responsive.",
      },
      {
        name: "keywords",
        content:
          "labour hire Sydney, labour hire Liverpool NSW, recruitment agency Liverpool NSW, workforce solutions Australia, warehousing recruitment, construction labour hire, security labour hire, industrial staffing, employer workforce solutions",
      },
    ],
  }),
  component: HomePage,
});

const WHY = [
  {
    icon: Users,
    title: "Quality workforce",
    desc: "Screened, work-ready people matched to your site, shift pattern and safety standards.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-led recruitment",
    desc: "We recruit with WHS front of mind — clear expectations, induction readiness and PPE discipline.",
  },
  {
    icon: Zap,
    title: "Rapid mobilisation",
    desc: "When timelines tighten, we move quickly with structured shortlisting and compliant placement.",
  },
  {
    icon: Layers,
    title: "Flexible engagement",
    desc: "Casual, temporary, project, shutdown and permanent — scaled to your operational rhythm.",
  },
  {
    icon: MapPin,
    title: "Greater Sydney focus",
    desc: "Based in Liverpool NSW with reach across Sydney, Western Sydney and key industrial corridors.",
  },
  {
    icon: Briefcase,
    title: "Industry depth",
    desc: "Strong experience across warehousing, construction, logistics, manufacturing, hospitality, civil, mining, administration and security.",
  },
];

const INDUSTRIES = [
  { name: "Warehousing & Logistics", img: indWarehousing, icon: Wrench },
  { name: "Construction", img: indConstruction, icon: HardHat },
  { name: "Manufacturing", img: indManufacturing, icon: Factory },
  { name: "Transport", img: indTransport, icon: Truck },
  { name: "Hospitality", img: indHospitality, icon: UtensilsCrossed },
  { name: "Civil", img: indCivil, icon: HardHat },
  { name: "Mining", img: indMining, icon: Pickaxe },
  { name: "Administration", img: indAdministration, icon: Building2 },
  { name: "Security", img: indSecurity, icon: Shield },
];

const SOLUTIONS = [
  {
    title: "Labour hire",
    desc: "Dependable crews for short bursts, seasonal peaks and ongoing roster support.",
  },
  {
    title: "Permanent recruitment",
    desc: "Structured search and assessment for hires that stick — culture, competency and compliance.",
  },
  {
    title: "Workforce management",
    desc: "Coordinated support across onboarding, documentation, communication and site expectations.",
  },
  {
    title: "Temporary staffing",
    desc: "Fast cover for leave, demand spikes and project ramp-ups without compromising safety.",
  },
  {
    title: "Shutdown crews",
    desc: "Mobilised teams for maintenance windows, plant outages and turnaround schedules.",
  },
  {
    title: "Project staffing",
    desc: "Role scoping, sourcing and placement aligned to your programme milestones.",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Discovery",
    d: "We clarify scope, risks, roster patterns and the profile of a great hire for your site.",
  },
  {
    n: "02",
    t: "Workforce plan",
    d: "We align timelines, compliance checks, induction needs and measurable outcomes.",
  },
  {
    n: "03",
    t: "Shortlisting",
    d: "We interview, reference and verify skills, licences and safety behaviours.",
  },
  {
    n: "04",
    t: "Mobilisation",
    d: "Workers arrive prepared — briefed, inducted and equipped to start productively.",
  },
  {
    n: "05",
    t: "Ongoing partnership",
    d: "We stay close to performance, feedback and retention — adjusting quickly when priorities shift.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Operations Manager, Logistics",
    quote:
      "Capital understands warehouse tempo — attendance is strong, communication is clear, and safety expectations are taken seriously.",
    img: testimonialOps,
  },
  {
    name: "James P.",
    role: "Site Supervisor, Construction",
    quote:
      "The crews arrive ready for site rules. Induction paperwork is organised and the team is easy to reach when shifts change.",
    img: testimonialSite,
  },
  {
    name: "Linda K.",
    role: "HR Manager, Manufacturing",
    quote:
      "From shutdown support to permanent hires, they have been a steady partner — transparent, professional and outcomes-focused.",
    img: testimonialHr,
  },
];

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="eyebrow mb-5">● Labour hire &amp; recruitment</div>
            <h1 className="font-display text-5xl font-bold leading-[1.02] md:text-6xl lg:text-7xl">
              Connecting people.
              <br />
              Powering <span className="text-gradient-lime italic">success.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Capital Recruitment Agency supports Australian employers with dependable labour hire
              and recruitment — built on safety, speed and straight talk. Based in Liverpool NSW, we
              service industrial and commercial clients across Greater Sydney and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/employers" className="btn-primary">
                For employers <ArrowRight className="size-4" />
              </Link>
              <Link to="/candidates" className="btn-outline">
                For candidates <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { icon: Users, t: "Quality people", s: "Skilled, reliable and job-ready" },
                { icon: ShieldCheck, t: "Safety first", s: "WHS-aware recruitment and placement" },
                { icon: Layers, t: "Flexible models", s: "Casual, project and permanent" },
              ].map(({ icon: Icon, t, s }) => (
                <div key={t} className="flex flex-col gap-2">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-[color:var(--surface)] text-[color:var(--lime-soft)]">
                    <Icon className="size-4" />
                  </span>
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img
                src={heroMain}
                alt="Industrial workforce in a modern logistics environment"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-4 shadow-[var(--shadow-card)] md:block">
              <div className="flex items-center gap-3">
                <div className="rounded-xl grad-lime p-3">
                  <CheckCircle2 className="size-5 text-[color:var(--navy)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Trusted partner</div>
                  <div className="text-sm font-bold">Safety-led recruitment &amp; labour hire</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Tailored solutions"
        title={
          <>
            We connect great people <br />
            with great <span className="text-gradient-lime italic">opportunities</span>.
          </>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              img: employersTeam,
              label: "For employers",
              desc: "Workforce planning, compliant placements and dependable communication — from Western Sydney logistics hubs to major construction programmes.",
              to: "/employers",
              cta: "Explore employer solutions",
            },
            {
              img: jobSeekersCareer,
              label: "For candidates",
              desc: "Clear guidance, respectful screening and roles across warehousing, construction, manufacturing, transport, hospitality, civil, mining, administration and security.",
              to: "/candidates",
              cta: "View pathways & apply",
            },
          ].map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="group relative overflow-hidden rounded-3xl border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full grad-lime p-2">
                    <Briefcase className="size-4 text-[color:var(--navy)]" />
                  </span>
                  <h3 className="text-xl font-bold">{c.label}</h3>
                </div>
                <p className="text-muted-foreground">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--lime-soft)]">
                  {c.cta}{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Why Capital"
        title="Workforce solutions built on trust"
        intro="A direct, corporate-grade service model — responsive account contact, disciplined compliance checks and candidates who understand site expectations."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-soft">
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl grad-lime">
                <Icon className="size-5 text-[color:var(--navy)]" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Industries we support"
        title={
          <>
            Workforce solutions across <br />
            <span className="text-gradient-lime italic">key sectors</span>.
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {INDUSTRIES.map(({ name, img, icon: Icon }) => (
            <div
              key={name}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border"
            >
              <img
                src={img}
                alt={name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/85 via-[color:var(--navy)]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full grad-lime">
                  <Icon className="size-4 text-[color:var(--navy)]" />
                </span>
                <div className="text-sm font-bold leading-tight">{name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/industries" className="btn-outline">
            View industries in detail <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Workforce solutions"
        title="Recruitment support for every stage"
        intro="From surge labour to permanent hiring, we keep the process orderly — clear role definitions, transparent updates and safety-aligned placements."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="card-soft">
              <div className="mb-3 flex items-center gap-3">
                <span className="size-2.5 rounded-full grad-lime" />
                <h3 className="text-lg font-bold">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Trusted partner" title="What our clients say">
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-soft">
              <div className="mb-4 flex items-center gap-3">
                <img src={t.img} alt="" className="size-12 rounded-full object-cover" />
                <Quote className="size-7 text-[color:var(--lime-soft)]" />
              </div>
              <p className="text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-5 border-t pt-5">
                <div className="text-sm font-bold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="How we work" title="A clear recruitment workflow">
        <div className="relative grid gap-5 md:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.n} className="relative card-soft">
              <div className="text-3xl font-display font-bold text-gradient-lime">{s.n}</div>
              <h3 className="mt-3 text-base font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-x">
        <div className="relative grad-cta overflow-hidden rounded-[2rem] p-10 text-white md:p-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[color:var(--lime-soft)]/12"
            aria-hidden
          />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="eyebrow mb-4 text-[color:var(--lime)]">● Next step</div>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Need dependable labour hire or recruitment support?
              </h2>
              <p className="mt-4 max-w-lg text-white/75">
                Tell us about your roster, project or hiring brief — we will respond with practical
                next steps.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="btn-primary">
                Contact Liverpool NSW <ArrowRight className="size-4" />
              </Link>
              <Link to="/submit-vacancy" className="btn-ghost-light">
                Submit a vacancy
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
