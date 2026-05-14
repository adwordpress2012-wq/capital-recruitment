import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  Heart,
  Handshake,
  Target,
  ArrowRight,
} from "lucide-react";
import { employersTeam } from "@/lib/images";
import { BUSINESS_ADDRESS } from "@/lib/site";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About — Recruitment Agency Liverpool NSW | Capital Recruitment Agency",
      },
      {
        name: "description",
        content:
          "Learn how Capital Recruitment Agency supports Australian employers and candidates with safety-led labour hire, industrial staffing and workforce solutions from Liverpool NSW.",
      },
      {
        name: "keywords",
        content:
          "recruitment agency Liverpool NSW, workforce solutions Australia, labour hire Liverpool NSW, employer workforce solutions",
      },
      { property: "og:title", content: "About Capital Recruitment Agency" },
      {
        property: "og:description",
        content:
          "Australian recruitment partner focused on safety, reliability and long-term relationships.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: ShieldCheck,
    t: "Safety",
    d: "Recruitment and placement decisions are made with WHS, induction readiness and site discipline in mind.",
  },
  {
    icon: Award,
    t: "Reliability",
    d: "We aim for predictable attendance, clear communication and follow-through on commitments.",
  },
  {
    icon: Heart,
    t: "Respect",
    d: "Candidates and clients are treated fairly — honest role briefs, timely updates and professional conduct.",
  },
  {
    icon: Target,
    t: "Outcomes",
    d: "We focus on measurable workforce outcomes, not volume for its own sake.",
  },
  {
    icon: Handshake,
    t: "Partnership",
    d: "We prefer long-term relationships built on trust, transparency and continuous improvement.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="container-x pt-12 pb-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="eyebrow mb-4">● About us</div>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              Your recruitment partner for{" "}
              <span className="text-gradient-lime italic">industrial Australia</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Every day, Capital Recruitment Agency connects businesses with people who are ready to
              work safely and productively. Our consultants take time to understand site realities —
              roster pressure, compliance expectations and the behaviours that make a placement
              successful.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We are influenced by the same principles that underpin strong Australian labour hire
              firms: disciplined screening, respectful candidate care, and a safety culture that is
              reinforced from first contact through to mobilisation.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Liverpool NSW office supporting Greater Sydney industry corridors",
                "Safety-led recruitment and placement support",
                "Straightforward advice — we will tell you what is realistic and what is not",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-[color:var(--lime-soft)]" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img
                src={employersTeam}
                alt="Capital Recruitment workplace partnership"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-10">
        <div className="grid gap-6 rounded-[2rem] grad-cta p-8 text-white md:grid-cols-3 md:p-10">
          <div>
            <div className="text-sm text-white/75">Office</div>
            <div className="mt-2 text-lg font-semibold leading-snug">{BUSINESS_ADDRESS.full}</div>
          </div>
          <div>
            <div className="text-sm text-white/75">Service footprint</div>
            <div className="mt-2 text-lg font-semibold leading-snug">
              Greater Sydney, Western Sydney logistics hubs and selected regional assignments by
              agreement.
            </div>
          </div>
          <div>
            <div className="text-sm text-white/75">Focus sectors</div>
            <div className="mt-2 text-lg font-semibold leading-snug">
              Warehousing, construction, manufacturing, transport, hospitality, civil, mining,
              administration and security.
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Our mission"
        title="Connecting people. Powering success."
        intro="We help employers build capable teams — and help candidates find roles where their skills, reliability and safety habits are valued."
      />

      <Section eyebrow="Our values" title="What guides our work">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="card-soft">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl grad-lime">
                <Icon className="size-5 text-[color:var(--navy)]" />
              </div>
              <h3 className="mb-1 font-bold">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-x">
        <div className="flex flex-col gap-6 rounded-[2rem] grad-cta p-10 text-white md:flex-row md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to talk roster, recruitment or your next role?
            </h2>
            <p className="mt-2 text-white/75">
              We will respond with clear next steps and realistic timelines.
            </p>
          </div>
          <Link to="/contact" className="btn-primary">
            Get in touch <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
