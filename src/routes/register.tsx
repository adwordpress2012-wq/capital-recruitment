import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Upload, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { INDUSTRY_LABELS } from "@/data/industries";
import { getBrowserSupabaseConfig } from "@/lib/capital-env";
import { EMAIL_PAUL } from "@/lib/site";
import { submitApplicationFn } from "@/capital/capital-fns";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: typeof search.role === "string" ? search.role : "",
  }),
  head: () => ({
    meta: [
      {
        title: "Candidate Applications — Register & Apply | Capital Recruitment Liverpool NSW",
      },
      {
        name: "description",
        content:
          "Apply for labour hire and industrial roles across Greater Sydney. Upload your resume for warehousing recruitment, construction labour hire, security labour hire and more — Capital Recruitment Agency.",
      },
      {
        name: "keywords",
        content:
          "candidate applications, labour hire Liverpool NSW, industrial staffing, recruitment agency Liverpool NSW",
      },
      { property: "og:title", content: "Apply with Capital Recruitment" },
      {
        property: "og:description",
        content: "Submit your resume and work preferences — our consultants will be in touch.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { role: roleFromUrl } = Route.useSearch();
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const useSupabase = Boolean(getBrowserSupabaseConfig());
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultRole = useMemo(() => roleFromUrl || "", [roleFromUrl]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!useSupabase) return;
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const baseMessage = String(fd.get("message") ?? "").trim();
    const role = String(fd.get("role_applying_for") ?? "").trim();
    const industry = String(fd.get("preferred_industry") ?? "").trim();
    const workRights = String(fd.get("work_rights") ?? "").trim();
    const availability = String(fd.get("availability") ?? "").trim();
    const tickets = String(fd.get("tickets_licences") ?? "").trim();
    const extra = [
      "— Application details —",
      role && `Role applying for: ${role}`,
      industry && `Preferred industry: ${industry}`,
      workRights && `Work rights: ${workRights}`,
      availability && `Availability: ${availability}`,
      tickets && `Tickets & licences: ${tickets}`,
    ]
      .filter(Boolean)
      .join("\n");
    const composed = extra ? `${baseMessage}\n\n${extra}` : baseMessage;
    fd.set("message", composed);
    const resumeFromInput = form.querySelector<HTMLInputElement>('input[name="resume"]')?.files?.[0];
    const resumeFile = resumeFromInput && resumeFromInput.size > 0 ? resumeFromInput : file;
    if (!resumeFile || resumeFile.size === 0) {
      setError("Please attach your resume.");
      setPending(false);
      return;
    }
    fd.set("resume", resumeFile, resumeFile.name);
    try {
      const res = await submitApplicationFn({ data: fd });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setDone(true);
      setFile(null);
      form.reset();
    } catch {
      setError("We could not submit your application. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Candidate application</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Apply with <span className="text-gradient-lime italic">Capital Recruitment</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us about your experience, work rights and availability. Applications and resumes
            are reviewed by our consultants. We will contact you using the details you provide.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Applying for a specific advertised role?{" "}
            <Link to="/jobs" className="font-semibold text-foreground underline-offset-2 hover:underline">
              Browse jobs
            </Link>{" "}
            and use Apply on the listing so your application is linked to that vacancy.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {!useSupabase ? (
              <div className="card-soft grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Online registration is unavailable until the site database is configured. Please
                  email{" "}
                  <a className="font-semibold underline-offset-2 hover:underline" href={`mailto:${EMAIL_PAUL}`}>
                    {EMAIL_PAUL}
                  </a>{" "}
                  with your resume, or{" "}
                  <Link to="/jobs" className="font-semibold underline-offset-2 hover:underline">
                    browse open roles
                  </Link>{" "}
                  when the site is fully connected.
                </p>
              </div>
            ) : done ? (
              <div className="card-soft grid gap-4">
                <div className="inline-flex items-center gap-2 text-lg font-bold text-[color:var(--teal-deep)]">
                  <CheckCircle2 className="size-6 text-[color:var(--lime-soft)]" /> Application received.
                </div>
                <p className="text-sm text-muted-foreground">
                  Thank you — our team will review your details and resume. We will contact you using
                  the email or phone number you provided.
                </p>
                <Link to="/jobs" className="btn-outline w-fit">
                  Browse jobs
                </Link>
              </div>
            ) : (
              <form
                key={`candidate-reg-${defaultRole}`}
                className="card-soft grid gap-5"
                onSubmit={(e) => void onSubmit(e)}
              >
                <input type="hidden" name="job_id" value="" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <NativeField label="Full name" name="full_name" type="text" required />
                  <NativeField label="Email" name="email" type="email" required />
                  <NativeField label="Phone" name="phone" type="tel" required />
                  <NativeField
                    label="Location (suburb / city)"
                    name="location"
                    type="text"
                    required
                  />
                  <NativeField
                    label="Role applying for"
                    name="role_applying_for"
                    type="text"
                    required
                    defaultValue={defaultRole}
                  />
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">
                      Preferred industry
                    </label>
                    <select
                      name="preferred_industry"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {INDUSTRY_LABELS.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Work rights</label>
                    <select
                      name="work_rights"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {[
                        "Australian citizen",
                        "Permanent resident",
                        "Valid work visa",
                        "Seeking sponsorship",
                        "Other",
                      ].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">Availability</label>
                    <select
                      name="availability"
                      className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {[
                        "Immediately",
                        "Within 1 week",
                        "Within 2–4 weeks",
                        "Casual / on-call only",
                      ].map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Tickets &amp; licences (optional)
                  </label>
                  <input
                    type="text"
                    name="tickets_licences"
                    placeholder="e.g. White Card, LF, RSA, security licence"
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Resume (PDF, DOC, or DOCX — max 5MB)
                  </label>
                  <label
                    onDragOver={(ev) => {
                      ev.preventDefault();
                      setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(ev) => {
                      ev.preventDefault();
                      setDrag(false);
                      const f = ev.dataTransfer.files?.[0];
                      if (f) setFile(f);
                    }}
                    className={`mt-2 block cursor-pointer rounded-xl border border-dashed px-4 py-8 text-center transition ${drag ? "border-[color:var(--lime-soft)] bg-[color:var(--surface)]" : "hover:bg-[color:var(--surface)]"}`}
                  >
                    {file ? (
                      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                        <FileText className="size-5 text-[color:var(--lime-soft)]" />
                        <span className="font-semibold">{file.name}</span>
                        <span className="text-muted-foreground">
                          ({Math.round(file.size / 1024)} KB)
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto mb-2 size-6 text-[color:var(--lime-soft)]" />
                        <div className="text-sm font-semibold">Drag &amp; drop your resume here</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          or click to browse — PDF, DOC, DOCX (max 5MB)
                        </div>
                      </>
                    )}
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(ev) => setFile(ev.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" name="consent" required className="mt-0.5" />I have read the{" "}
                  <Link to="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  ,{" "}
                  <Link to="/candidate-privacy-notice" className="underline">
                    Candidate Privacy Collection Notice
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="underline">
                    Terms &amp; Conditions
                  </Link>
                  .
                </label>

                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" className="btn-primary justify-center" disabled={pending}>
                  Submit application <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="card-soft">
              <h3 className="text-lg font-bold">Why apply with us</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Safety-first placements and clear site expectations",
                  "Consultants who understand blue-collar and industrial roles",
                  "Roles across warehousing, construction, logistics, security and more",
                  "Transparent process — no surprises",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-[color:var(--lime-soft)]" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function NativeField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
      />
    </div>
  );
}
