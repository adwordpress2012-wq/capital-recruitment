import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Building2, Users, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { INDUSTRY_LABELS } from "@/data/industries";
import { FORMSPREE_EMPLOYER_ACTION } from "@/lib/forms";

export const Route = createFileRoute("/employer-enquiry")({
  head: () => ({
    meta: [
      {
        title: "Employer Enquiry — Workforce Solutions Australia | Capital Recruitment",
      },
      {
        name: "description",
        content:
          "Request labour hire, temporary staffing or permanent recruitment support from Capital Recruitment Agency — Liverpool NSW base, servicing Greater Sydney industry clients.",
      },
      {
        name: "keywords",
        content:
          "employer workforce solutions, labour hire Sydney, industrial staffing, workforce solutions Australia",
      },
      { property: "og:title", content: "Employer enquiry — Capital Recruitment" },
      {
        property: "og:description",
        content: "Tell us about your workforce needs — we will respond with next steps.",
      },
    ],
  }),
  component: EmployerEnquiryPage,
});

const INDUSTRIES = [...INDUSTRY_LABELS, "Other"] as const;
const SERVICES = [
  "Labour Hire",
  "Permanent Recruitment",
  "Casual Staffing",
  "Workforce Management",
  "Shutdown Staffing",
  "Project Staffing",
];

function EmployerEnquiryPage() {
  const action = FORMSPREE_EMPLOYER_ACTION;
  const useFormspree = Boolean(action);

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Employer enquiry</div>
          <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
            Let&apos;s scope your <span className="text-gradient-lime italic">workforce plan</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Share site context, volumes and timelines. A consultant will respond with practical
            recommendations — including what is realistic on sourcing and mobilisation.
          </p>
          {!useFormspree && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <strong>TODO:</strong> Set{" "}
              <code className="rounded bg-white/80 px-1">VITE_FORMSPREE_EMPLOYER_ACTION</code> to
              enable automatic email delivery of this enquiry form.
            </p>
          )}
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {useFormspree ? (
              <form className="card-soft grid gap-5" action={action} method="POST">
                <input
                  type="hidden"
                  name="_subject"
                  value="Employer enquiry (detailed) — Capital Recruitment website"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="company_name" label="Company name" type="text" required />
                  <Field name="contact_person" label="Contact person" type="text" required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="phone" label="Phone" type="tel" />
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Industry</label>
                    <select
                      name="industry"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field name="site_location" label="Location / site" type="text" required />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Services of interest
                  </label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {SERVICES.map((s) => (
                      <label
                        key={s}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm hover:bg-muted"
                      >
                        <input type="checkbox" name="services" value={s} /> {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="workers_required" label="Workers required (approx.)" type="number" />
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">
                      Start timing
                    </label>
                    <select
                      name="start_timing"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {["Immediately", "Within 1 week", "Within 1 month", "Planning ahead"].map(
                        (o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Tell us about your workforce needs
                  </label>
                  <textarea
                    name="details"
                    required
                    rows={4}
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" name="consent" required className="mt-0.5" />I agree to the{" "}
                  <Link className="underline" to="/privacy">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link className="underline" to="/terms">
                    Terms &amp; Conditions
                  </Link>
                  .
                </label>

                <button type="submit" className="btn-primary justify-center">
                  Submit enquiry <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              <form className="card-soft grid gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldRO label="Company name" />
                  <FieldRO label="Contact person" />
                  <FieldRO label="Email" type="email" />
                  <FieldRO label="Phone" type="tel" />
                  <SelectRO label="Industry" options={[...INDUSTRIES]} />
                  <FieldRO label="Location / site" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Services of interest
                  </label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {SERVICES.map((s) => (
                      <label
                        key={s}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm hover:bg-muted"
                      >
                        <input type="checkbox" /> {s}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldRO label="Workers required" type="number" />
                  <SelectRO
                    label="Start date"
                    options={["Immediately", "Within 1 week", "Within 1 month", "Planning ahead"]}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Tell us about your workforce needs
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" className="mt-0.5" />I agree to the Privacy Policy and
                  Terms &amp; Conditions.
                </label>

                <button type="submit" className="btn-primary justify-center opacity-60" disabled>
                  Submit enquiry (configure Formspree) <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="card-soft">
              <h3 className="text-lg font-bold">What happens next</h3>
              <ol className="mt-4 space-y-4 text-sm">
                {[
                  {
                    Icon: Users,
                    t: "Discovery call",
                    d: "We confirm scope, risks, roster patterns and compliance expectations.",
                  },
                  {
                    Icon: Building2,
                    t: "Workforce plan",
                    d: "We outline sourcing strategy, timelines and any constraints we see early.",
                  },
                  {
                    Icon: ShieldCheck,
                    t: "Mobilisation",
                    d: "We support compliant placement and induction readiness for day one.",
                  },
                ].map(({ Icon, t, d }, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg grad-lime font-bold text-[color:var(--navy)]">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <div className="font-bold">
                        {i + 1}. {t}
                      </div>
                      <div className="text-muted-foreground">{d}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 space-y-2 border-t pt-6 text-sm">
                {[
                  "Australian recruitment partner",
                  "Safety-aware sourcing and placement",
                  "Single point of contact for your enquiry",
                ].map((t) => (
                  <div key={t} className="flex gap-2">
                    <CheckCircle2 className="size-4 text-[color:var(--lime-soft)]" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
      />
    </div>
  );
}

function FieldRO({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
      />
    </div>
  );
}

function SelectRO({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <select className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
