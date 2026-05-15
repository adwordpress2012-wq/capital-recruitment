import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Building2, Users, ShieldCheck } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { INDUSTRY_LABELS } from "@/data/industries";
import { EMAIL_PAUL } from "@/lib/site";
import { getBrowserSupabaseConfig } from "@/lib/capital-env";
import { submitEmployerEnquiryFn } from "@/capital/capital-fns";

const INDUSTRIES = [...INDUSTRY_LABELS, "Other"] as const;
const SERVICES = [
  "Labour Hire",
  "Permanent Recruitment",
  "Casual Staffing",
  "Workforce Management",
  "Shutdown Staffing",
  "Project Staffing",
];

type EmployerLeadFormSectionProps = {
  submitButtonLabel?: string;
  detailsLabel?: string;
};

export function EmployerLeadFormSection({
  submitButtonLabel = "Submit enquiry",
  detailsLabel = "Tell us about your workforce needs",
}: EmployerLeadFormSectionProps) {
  const useSupabase = Boolean(getBrowserSupabaseConfig());
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmitSupabase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const services = fd.getAll("services").map(String);
    const workersRaw = String(fd.get("workers_required") ?? "").trim();
    const workers = workersRaw ? Number.parseInt(workersRaw, 10) : null;
    try {
      const res = await submitEmployerEnquiryFn({
        data: {
          company_name: String(fd.get("company_name") ?? ""),
          contact_person: String(fd.get("contact_person") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? "") || undefined,
          industry: String(fd.get("industry") ?? "") || undefined,
          site_location: String(fd.get("site_location") ?? ""),
          services,
          workers_required: Number.isFinite(workers) ? workers : null,
          start_timing: String(fd.get("start_timing") ?? ""),
          details: String(fd.get("details") ?? ""),
        },
      });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setDone(true);
      e.currentTarget.reset();
    } catch {
      setErr("We could not submit your enquiry. Please try again or email us directly.");
    } finally {
      setPending(false);
    }
  };

  return (
    <Section className="!py-12">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          {useSupabase ? (
            <form className="card-soft grid gap-5" onSubmit={(e) => void onSubmitSupabase(e)}>
              {done && (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-950">
                  Thanks, your enquiry has been received.
                </p>
              )}
              {err && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
                  {err}
                </p>
              )}
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
                  <label className="text-xs font-semibold text-muted-foreground">Start timing</label>
                  <select
                    name="start_timing"
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {["Immediately", "Within 1 week", "Within 1 month", "Planning ahead"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground">{detailsLabel}</label>
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

              <button type="submit" className="btn-primary justify-center" disabled={pending}>
                {submitButtonLabel} <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <div className="card-soft grid gap-5">
              <p className="text-sm text-muted-foreground">
                This form is unavailable until the site database is configured. Please email{" "}
                <a className="font-semibold underline-offset-2 hover:underline" href={`mailto:${EMAIL_PAUL}`}>
                  {EMAIL_PAUL}
                </a>{" "}
                with your workforce requirements.
              </p>
            </div>
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
