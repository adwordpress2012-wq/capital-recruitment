import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import indWarehouse from "@/assets/ind-warehousing.jpg";
import indConstruction from "@/assets/ind-construction.jpg";
import indManufacturing from "@/assets/ind-manufacturing.jpg";
import indTransport from "@/assets/ind-transport.jpg";
import indHospitality from "@/assets/ind-hospitality.jpg";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Capital Recruitment" },
      { name: "description", content: "Workforce solutions across warehousing & logistics, construction, manufacturing, transport, hospitality, civil, mining and administration." },
      { property: "og:title", content: "Industries — Capital Recruitment" },
      { property: "og:description", content: "Skilled workers across key Australian industries." },
    ],
  }),
  component: IndustriesPage,
});

const ITEMS = [
  { name: "Warehousing & Logistics", img: indWarehouse, d: "Pickers, packers, forklift operators, storepersons and team leaders." },
  { name: "Construction", img: indConstruction, d: "Labourers, trades assistants, traffic controllers and skilled trades." },
  { name: "Manufacturing", img: indManufacturing, d: "Process workers, machine operators, QA and production leads." },
  { name: "Transport & Distribution", img: indTransport, d: "MR, HR, HC drivers, dispatch and yard operations." },
  { name: "Hospitality & Events", img: indHospitality, d: "Front and back-of-house, baristas, event crew and stewards." },
  { name: "Civil", img: indConstruction, d: "Plant operators, civil labourers and site crews." },
  { name: "Mining", img: indManufacturing, d: "Site-ready crews for mining and resources operations." },
  { name: "Administration", img: indHospitality, d: "Reception, data entry, coordinators and office support." },
];

function IndustriesPage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Industries</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Workforce solutions across <span className="text-gradient-lime italic">key industries</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We deliver skilled labour hire solutions across a wide range of industries Australia-wide.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((i) => (
            <div key={i.name} className="group rounded-2xl border bg-card overflow-hidden card-soft p-0">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={i.img} alt={i.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">{i.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--lime-soft)]">
                  Enquire <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-x">
        <div className="grad-cta rounded-[2rem] p-10 text-white flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Don't see your industry?</h2>
            <p className="mt-2 text-white/75">Our recruitment specialists support a wide range of sectors — let's chat.</p>
          </div>
          <Link to="/contact" className="btn-primary">Talk to us <ArrowRight className="size-4" /></Link>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
