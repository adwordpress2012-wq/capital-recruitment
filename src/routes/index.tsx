import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ShieldCheck, Users, Zap, Sparkles, MapPin, Briefcase,
  CheckCircle2, Search, Wrench, HardHat, Truck, UtensilsCrossed,
  Factory, Building2, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-workforce.jpg";
import employersImg from "@/assets/employers.jpg";
import jobseekersImg from "@/assets/jobseekers.jpg";
import indWarehouse from "@/assets/ind-warehousing.jpg";
import indConstruction from "@/assets/ind-construction.jpg";
import indManufacturing from "@/assets/ind-manufacturing.jpg";
import indTransport from "@/assets/ind-transport.jpg";
import indHospitality from "@/assets/ind-hospitality.jpg";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Capital Recruitment Agency — Labour Hire Australia" },
      { name: "description", content: "Australian labour hire and workforce solutions. Skilled, reliable, safety-focused workers for warehousing, construction, manufacturing, transport and more." },
    ],
  }),
  component: HomePage,
});

const WHY = [
  { icon: Users, title: "Quality Workforce", desc: "Vetted, skilled and job-ready workers matched to your operation." },
  { icon: ShieldCheck, title: "Safety Focused", desc: "WHS compliance and PPE-ready people on every site, every shift." },
  { icon: Zap, title: "Fast Placement", desc: "Rapid mobilisation when you need workforce on the ground today." },
  { icon: Sparkles, title: "Flexible Solutions", desc: "Casual, temporary, project, shutdown and permanent — built around you." },
  { icon: MapPin, title: "Australian Owned", desc: "Local teams supporting clients and candidates Australia-wide." },
  { icon: Briefcase, title: "Industry Experienced", desc: "Decades of combined expertise across blue and white-collar sectors." },
];

const INDUSTRIES = [
  { name: "Warehousing & Logistics", img: indWarehouse, icon: Wrench },
  { name: "Construction", img: indConstruction, icon: HardHat },
  { name: "Manufacturing", img: indManufacturing, icon: Factory },
  { name: "Transport & Distribution", img: indTransport, icon: Truck },
  { name: "Hospitality & Events", img: indHospitality, icon: UtensilsCrossed },
];

const SOLUTIONS = [
  { title: "Labour Hire", desc: "Reliable on-demand crews for short and long-term assignments." },
  { title: "Permanent Recruitment", desc: "Hire-for-life talent matched to your culture and operation." },
  { title: "Workforce Management", desc: "Compliance, rostering and reporting handled end-to-end." },
  { title: "Temporary Staffing", desc: "Fast, flexible cover for peaks, leave and seasonal demand." },
  { title: "Shutdown Crews", desc: "Specialised teams mobilised for plant shutdowns and turnarounds." },
  { title: "Project Staffing", desc: "End-to-end teams scoped, sourced and managed for your project." },
];

const STEPS = [
  { n: "01", t: "Consultation", d: "We meet your team to understand your goals and requirements." },
  { n: "02", t: "Workforce Planning", d: "We map out role profiles, timelines and compliance needs." },
  { n: "03", t: "Candidate Matching", d: "We screen, interview and shortlist the right talent fast." },
  { n: "04", t: "Placement", d: "Workers mobilised on site with full induction and PPE." },
  { n: "05", t: "Ongoing Support", d: "Account management, performance and retention support." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Operations Manager, Logistics", quote: "Capital consistently deliver reliable workers — fast. They've become an extension of our ops team." },
  { name: "James P.", role: "Site Supervisor, Construction", quote: "The crew turns up on time, geared up and safety-ready. Communication is best in class." },
  { name: "Linda K.", role: "HR Director, Manufacturing", quote: "From shutdowns to permanent hires, Capital has been a true long-term partner for us." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 py-16 lg:py-24 items-center">
          <div>
            <div className="eyebrow mb-5">● Labour Hire Solutions</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02]">
              Connecting people.
              <br />
              Powering <span className="text-gradient-lime italic">success.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Capital Recruitment is your trusted partner in labour hire — providing skilled,
              reliable and safety-focused workers across Australia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/employers" className="btn-primary">For Employers <ArrowRight className="size-4" /></Link>
              <Link to="/job-seekers" className="btn-outline">For Job Seekers <ArrowRight className="size-4" /></Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { icon: Users, t: "Quality People", s: "Skilled, reliable and job-ready" },
                { icon: ShieldCheck, t: "Safety First", s: "Committed to safe workplaces" },
                { icon: Sparkles, t: "Flexible", s: "Scalable workforce on demand" },
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
            <div className="absolute -inset-4 grad-lime opacity-20 blur-3xl rounded-[3rem]" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)] border">
              <img src={heroImg} alt="Australian workforce in modern warehouse" width={1600} height={1200} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-[var(--shadow-card)] border hidden md:block">
              <div className="flex items-center gap-3">
                <div className="grad-lime rounded-xl p-3"><CheckCircle2 className="size-5 text-[color:var(--navy)]" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">Trusted by</div>
                  <div className="text-sm font-bold">1,000+ Australian businesses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT */}
      <Section
        eyebrow="Tailored Solutions"
        title={<>We connect great people <br />with great <span className="text-gradient-lime italic">opportunities</span>.</>}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { img: employersImg, label: "For Employers", desc: "Reliable labour hire solutions tailored to your business needs.", to: "/employers", cta: "Learn more" },
            { img: jobseekersImg, label: "For Job Seekers", desc: "Find rewarding job opportunities and build your career with us.", to: "/job-seekers", cta: "Search jobs" },
          ].map((c) => (
            <Link key={c.label} to={c.to} className="group relative overflow-hidden rounded-3xl border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-2">
                  <span className="grad-lime rounded-full p-2"><Briefcase className="size-4 text-[color:var(--navy)]" /></span>
                  <h3 className="text-xl font-bold">{c.label}</h3>
                </div>
                <p className="text-muted-foreground">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--lime-soft)]">
                  {c.cta} <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section eyebrow="Why Capital" title="Workforce solutions built on trust" intro="A people-first approach backed by safety, speed and deep industry knowledge.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-soft">
              <div className="size-12 rounded-xl grad-lime inline-flex items-center justify-center mb-5">
                <Icon className="size-5 text-[color:var(--navy)]" />
              </div>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section
        eyebrow="Industries We Support"
        title={<>Workforce solutions across <br />a wide range of <span className="text-gradient-lime italic">industries</span>.</>}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map(({ name, img, icon: Icon }) => (
            <div key={name} className="group relative overflow-hidden rounded-2xl border aspect-[4/5]">
              <img src={img} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)]/85 via-[color:var(--navy)]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="inline-flex size-9 items-center justify-center rounded-full grad-lime mb-3">
                  <Icon className="size-4 text-[color:var(--navy)]" />
                </span>
                <div className="text-sm font-bold leading-tight">{name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/industries" className="btn-outline">View all industries <ArrowRight className="size-4" /></Link>
        </div>
      </Section>

      {/* SOLUTIONS */}
      <Section eyebrow="Workforce Solutions" title="End-to-end recruitment for every stage" intro="From flexible labour hire to permanent placements, we deliver the right people, fast.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="card-soft">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2.5 rounded-full grad-lime" />
                <h3 className="text-lg font-bold">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Trusted Partner" title="What our clients say">
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-soft">
              <Quote className="size-7 text-[color:var(--lime-soft)] mb-4" />
              <p className="text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-5 pt-5 border-t">
                <div className="text-sm font-bold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section eyebrow="How We Work" title="A simple, proven recruitment process">
        <div className="relative grid md:grid-cols-5 gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="relative card-soft">
              <div className="text-3xl font-display font-bold text-gradient-lime">{s.n}</div>
              <h3 className="mt-3 text-base font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA STRIP */}
      <section className="container-x">
        <div className="relative grad-cta overflow-hidden rounded-[2rem] p-10 md:p-16 text-white">
          <div className="absolute -top-32 -right-32 size-96 rounded-full grad-lime opacity-25 blur-3xl" aria-hidden />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="eyebrow text-[color:var(--lime)] mb-4">● Let's talk</div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Need reliable workforce solutions?</h2>
              <p className="mt-4 text-white/75 max-w-lg">Speak with our team about your next project, shutdown or permanent hire.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="btn-primary">Speak with our team <ArrowRight className="size-4" /></Link>
              <Link to="/contact" className="btn-ghost-light">Submit enquiry</Link>
            </div>
          </div>
        </div>
      </section>
      <div className="h-10" />
    </>
  );
}
