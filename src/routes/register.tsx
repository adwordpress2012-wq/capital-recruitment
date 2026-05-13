import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Candidate Registration — Capital Recruitment" },
      { name: "description", content: "Register as a candidate with Capital Recruitment Agency. Upload your resume and let our team match you with the right role." },
      { property: "og:title", content: "Register as a Candidate" },
      { property: "og:description", content: "Upload your resume and start your next role." },
    ],
  }),
  component: RegisterPage,
});

const INDUSTRIES = ["Warehousing & Logistics", "Construction", "Manufacturing", "Transport & Distribution", "Hospitality & Events", "Civil", "Mining", "Administration"];

function RegisterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Candidate Registration</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Register your <span className="text-gradient-lime italic">interest</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us about you and upload your resume — we'll be in touch with opportunities that match your skills.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <Reveal>
            <form className="card-soft grid gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" type="text" />
                <Field label="Last name" type="text" />
                <Field label="Email" type="email" />
                <Field label="Phone" type="tel" />
                <Field label="Suburb / City" type="text" />
                <SelectField label="Preferred industry" options={INDUSTRIES} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField label="Work rights" options={["Australian citizen", "Permanent resident", "Working visa", "Other"]} />
                <SelectField label="Availability" options={["Immediately", "1 week", "2+ weeks", "Casual / on-call"]} />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tickets & licences (optional)</label>
                <input type="text" placeholder="e.g. White card, LF licence, RSA" className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">Upload resume</label>
                <label
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => {
                    e.preventDefault(); setDrag(false);
                    const f = e.dataTransfer.files?.[0]; if (f) setFile(f);
                  }}
                  className={`mt-1 block cursor-pointer rounded-xl border border-dashed px-4 py-8 text-center transition ${drag ? "bg-[color:var(--surface)] border-[color:var(--lime-soft)]" : "hover:bg-[color:var(--surface)]"}`}
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <FileText className="size-5 text-[color:var(--lime-soft)]" />
                      <span className="font-semibold">{file.name}</span>
                      <span className="text-muted-foreground">({Math.round(file.size / 1024)} KB)</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto size-6 mb-2 text-[color:var(--lime-soft)]" />
                      <div className="text-sm font-semibold">Drag & drop your resume here</div>
                      <div className="text-xs text-muted-foreground mt-1">or click to browse — PDF, DOC, DOCX (max 5MB)</div>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">A few words about your experience</label>
                <textarea rows={4} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="mt-0.5" />
                I agree to the Privacy Policy and Terms & Conditions.
              </label>

              <button className="btn-primary justify-center">Submit registration <ArrowRight className="size-4" /></button>
            </form>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-soft">
              <h3 className="text-lg font-bold">Why register with us</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Access to roles before they're advertised",
                  "Personal recruitment consultant",
                  "Weekly pay & competitive rates",
                  "Career growth across multiple industries",
                  "Safety-first inductions and PPE support",
                ].map((t) => (
                  <li key={t} className="flex gap-3"><CheckCircle2 className="size-5 text-[color:var(--lime-soft)] shrink-0" /> {t}</li>
                ))}
              </ul>
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
