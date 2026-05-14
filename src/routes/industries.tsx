import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  indWarehousing,
  indConstruction,
  indManufacturing,
  indTransport,
  indHospitality,
  indCivil,
  indMining,
  indAdministration,
  indSecurity,
} from "@/lib/images";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      {
        title:
          "Industries — Warehousing, Construction & Security Labour Hire | Capital Recruitment",
      },
      {
        name: "description",
        content:
          "Industrial staffing across warehousing & logistics, construction, manufacturing, transport, hospitality, civil, mining, administration and security labour hire — Capital Recruitment Agency, Liverpool NSW.",
      },
      {
        name: "keywords",
        content:
          "warehousing recruitment, construction labour hire, security labour hire, industrial staffing, labour hire Liverpool NSW, workforce solutions Australia",
      },
      { property: "og:title", content: "Industries — Capital Recruitment" },
      {
        property: "og:description",
        content: "Skilled workforce solutions across core Australian sectors.",
      },
    ],
  }),
  component: IndustriesPage,
});

const ITEMS = [
  {
    name: "Warehousing & Logistics",
    img: indWarehousing,
    d: "Storepersons, pickers and packers, forklift operators, inventory support and team leaders for 3PL, retail DC and FMCG operations.",
  },
  {
    name: "Construction",
    img: indConstruction,
    d: "Labourers, trades assistants, skilled trades support and site-ready crews for commercial and industrial building programmes.",
  },
  {
    name: "Manufacturing",
    img: indManufacturing,
    d: "Process workers, machine operators, quality assistants and production support for regulated and high-volume environments.",
  },
  {
    name: "Transport",
    img: indTransport,
    d: "MR/HR/HC drivers, yard support and distribution roles with a focus on compliance, fatigue awareness and customer service.",
  },
  {
    name: "Hospitality",
    img: indHospitality,
    d: "Front-of-house, events, food production support and venue operations — presentation, RSA requirements and peak-time reliability.",
  },
  {
    name: "Civil",
    img: indCivil,
    d: "Civil labourers, plant support and site crews for infrastructure projects with disciplined SWMS and communication routines.",
  },
  {
    name: "Mining",
    img: indMining,
    d: "Site-ready support roles aligned to client induction standards, remote logistics and safety-critical workflows.",
  },
  {
    name: "Administration",
    img: indAdministration,
    d: "Coordinators, data entry, reception and back-office support for operational and corporate teams.",
  },
  {
    name: "Security",
    img: indSecurity,
    d: "Licensed security officers for corporate, logistics and asset protection environments — patrols, access control and professional reporting.",
  },
];

function IndustriesPage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Industries</div>
          <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
            Workforce solutions across{" "}
            <span className="text-gradient-lime italic">core industries</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Capital Recruitment Agency supplies labour hire and recruitment support where safety,
            attendance and communication matter. If your sector is not listed, still reach out — we
            regularly support adjacent industrial categories.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((i) => (
            <div
              key={i.name}
              className="card-soft group overflow-hidden rounded-2xl border bg-card p-0"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={i.img}
                  alt={i.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{i.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--lime-soft)]"
                >
                  Discuss your brief{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-x">
        <div className="flex flex-col gap-6 rounded-[2rem] grad-cta p-10 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Do not see your industry listed?</h2>
            <p className="mt-2 text-white/75">
              Share your operation and roster needs — we will advise honestly on fit, timelines and
              compliance.
            </p>
          </div>
          <Link to="/contact" className="btn-primary">
            Talk to our team <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
