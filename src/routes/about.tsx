import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Award, Heart, Handshake, Target, ArrowRight } from "lucide-react";
import employersImg from "@/assets/employers.jpg";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Capital Recruitment — Australian Workforce Solutions" },
      { name: "description", content: "Capital Recruitment is an Australian workforce solutions company connecting skilled workers with trusted businesses across the country." },
      { property: "og:title", content: "About Capital Recruitment Agency" },
      { property: "og:description", content: "Australian-owned workforce solutions partner." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: ShieldCheck, t: "Safety", d: "Every site, every shift — safety leads everything we do." },
  { icon: Award, t: "Reliability", d: "Show-up rates and quality you can build a roster on." },
  { icon: Heart, t: "Integrity", d: "Honest conversations, transparent process and fair outcomes." },
  { icon: Target, t: "Performance", d: "Outcomes-focused matching that lifts productivity." },
  { icon: Handshake, t: "Relationships", d: "Long-term partnerships with clients and candidates." },
];

const STATS = [
  { v: "12+", l: "Years in Business" },
  { v: "5K+", l: "People Placed" },
  { v: "1K+", l: "Happy Clients" },
  { v: "98%", l: "Client Retention" },
];

function AboutPage() {
  return (
    <>
      <section className="container-x pt-12 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow mb-4">● About Us</div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
              Your trusted partner in workforce <span className="text-gradient-lime italic">solutions</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Capital Recruitment Agency was founded on the belief that strong relationships create stronger results.
              With a people-first approach and deep industry knowledge, we connect skilled workers with leading
              businesses across Australia.
            </p>
            <ul className="mt-7 space-y-3">
              {["Australian owned & operated", "Safety & compliance focused", "Reliable, responsive & results driven"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="size-5 text-[color:var(--lime-soft)]" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border shadow-[var(--shadow-elegant)]">
              <img src={employersImg} alt="Capital Recruitment team" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x mt-10">
        <div className="grad-cta rounded-[2rem] p-8 md:p-10 text-white grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-4xl md:text-5xl font-display font-bold text-gradient-lime">{s.v}</div>
              <div className="mt-2 text-sm text-white/75">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow="Our Mission" title="Connecting people. Powering success." intro="We exist to match great people with the businesses where they will thrive — building careers, productivity and partnerships that last." />

      <Section eyebrow="Our Values" title="What we stand for">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {VALUES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="card-soft">
              <div className="size-11 rounded-xl grad-lime inline-flex items-center justify-center mb-4">
                <Icon className="size-5 text-[color:var(--navy)]" />
              </div>
              <h3 className="font-bold mb-1">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="container-x">
        <div className="grad-cta rounded-[2rem] p-10 md:p-14 text-white flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Let's build a better workforce together.</h2>
            <p className="mt-2 text-white/75">Speak with our recruitment consultants today.</p>
          </div>
          <Link to="/contact" className="btn-primary">Get in touch <ArrowRight className="size-4" /></Link>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
