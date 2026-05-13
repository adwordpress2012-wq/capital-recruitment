import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Building2, Users, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/employer-enquiry")({
  head: () => ({
    meta: [
      { title: "Employer Enquiry — Capital Recruitment" },
      { name: "description", content: "Tell us about your workforce needs. A Capital Recruitment consultant will respond within one business day." },
      { property: "og:title", content: "Employer Enquiry — Capital Recruitment" },
      { property: "og:description", content: "Workforce solutions tailored to your business." },
    ],
  }),
  component: EmployerEnquiryPage,
});

const INDUSTRIES = ["Warehousing & Logistics", "Construction", "Manufacturing", "Transport & Distribution", "Hospitality & Events", "Civil", "Mining", "Administration", "Other"];
const SERVICES = ["Labour Hire", "Permanent Recruitment", "Casual Staffing", "Workforce Management", "Shutdown Staffing", "Project Staffing"];

function EmployerEnquiryPage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Employer Enquiry</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Let's build your <span className="text-gradient-lime italic">workforce</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Share a few details and our team will respond with a tailored workforce plan within one business day.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <Reveal>
            <form className="card-soft grid gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Company name" type="text" />
                <Field label="Contact person" type="text" />
                <Field label="Email" type="email" />
                <Field label="Phone" type="tel" />
                <SelectField label="Industry" options={INDUSTRIES} />
                <Field label="Location / site" type="text" />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Services of interest</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <label key={s} className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm hover:bg-muted cursor-pointer">
                      <input type="checkbox" /> {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Workers required" type="number" />
                <SelectField label="Start date" options={["Immediately", "Within 1 week", "Within 1 month", "Planning ahead"]} />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tell us about your workforce needs</label>
                <textarea rows={4} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="mt-0.5" />
                I agree to the Privacy Policy and Terms & Conditions.
              </label>

              <button className="btn-primary justify-center">Submit enquiry <ArrowRight className="size-4" /></button>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-soft">
              <h3 className="text-lg font-bold">What happens next</h3>
              <ol className="mt-4 space-y-4 text-sm">
                {[
                  { Icon: Users, t: "Discovery call", d: "We learn your operation, roles and timelines." },
                  { Icon: Building2, t: "Workforce plan", d: "A tailored proposal scoped to your requirements." },
                  { Icon: ShieldCheck, t: "Mobilisation", d: "Compliant, PPE-ready workers on site, fast." },
                ].map(({ Icon, t, d }, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="size-9 rounded-lg grad-lime inline-flex items-center justify-center text-[color:var(--navy)] font-bold shrink-0">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <div className="font-bold">{i + 1}. {t}</div>
                      <div className="text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 pt-6 border-t space-y-2 text-sm">
                {["Australian owned & operated", "WHS compliant workforce", "Single point of contact"].map((t) => (
                  <div key={t} className="flex gap-2"><CheckCircle2 className="size-4 text-[color:var(--lime-soft)]" /> {t}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input type={type} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
    </div>
  );
}
function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <select className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]">
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
