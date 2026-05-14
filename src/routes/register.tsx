import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Upload, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { INDUSTRY_LABELS } from "@/data/industries";
import { FORMSPREE_CANDIDATE_ACTION, FORMSPREE_CANDIDATE_FILE_UPLOAD_ENABLED } from "@/lib/forms";
import { EMAIL_APPLICATIONS } from "@/lib/site";

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

  const action = FORMSPREE_CANDIDATE_ACTION;
  const useFormspree = Boolean(action);
  const resumeUploadViaFormspree = FORMSPREE_CANDIDATE_FILE_UPLOAD_ENABLED;

  const defaultRole = useMemo(() => roleFromUrl || "", [roleFromUrl]);

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
            are reviewed by our consultants and routed to{" "}
            <span className="font-medium text-foreground">{EMAIL_APPLICATIONS}</span> once your form
            handler is connected.
          </p>
          {!useFormspree && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <strong>TODO:</strong> Add a Formspree (or similar) form action in{" "}
              <code className="rounded bg-white/80 px-1">VITE_FORMSPREE_CANDIDATE_ACTION</code>{" "}
              inside your environment variables so submissions email {EMAIL_APPLICATIONS}. Until
              then, this form will not send.
            </p>
          )}
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            {useFormspree ? (
              <form
                key={`candidate-fs-${defaultRole}`}
                className="card-soft grid gap-5"
                action={action}
                method="POST"
                encType={resumeUploadViaFormspree ? "multipart/form-data" : undefined}
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="Candidate application — Capital Recruitment website"
                />

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
                    <label className="text-xs font-semibold text-muted-foreground">
                      Work rights
                    </label>
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
                    <label className="text-xs font-semibold text-muted-foreground">
                      Availability
                    </label>
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
                  {!resumeUploadViaFormspree && (
                    <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-950">
                      Resume upload will be enabled shortly. For now, please email your resume to
                      paul@capitalrecruitment.com.au.
                    </p>
                  )}
                  <label className="text-xs font-semibold text-muted-foreground">
                    Resume (PDF or Word)
                  </label>
                  <input
                    type="file"
                    {...(resumeUploadViaFormspree
                      ? { name: "attachment", required: true }
                      : { required: false })}
                    accept=".pdf,.doc,.docx"
                    className="mt-2 block w-full text-sm"
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" name="consent" required className="mt-0.5" />I have read
                  the{" "}
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

                <button type="submit" className="btn-primary justify-center">
                  Submit application <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              <form
                key={`candidate-local-${defaultRole}`}
                className="card-soft grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" />
                  <Field label="Email" type="email" />
                  <Field label="Phone" type="tel" />
                  <Field label="Location (suburb / city)" />
                  <Field label="Role applying for" defaultValue={defaultRole} />
                  <SelectField label="Preferred industry" options={[...INDUSTRY_LABELS]} />
                  <SelectField
                    label="Work rights"
                    options={[
                      "Australian citizen",
                      "Permanent resident",
                      "Valid work visa",
                      "Seeking sponsorship",
                      "Other",
                    ]}
                  />
                  <SelectField
                    label="Availability"
                    options={[
                      "Immediately",
                      "Within 1 week",
                      "Within 2–4 weeks",
                      "Casual / on-call only",
                    ]}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Tickets &amp; licences (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. White Card, LF, RSA, security licence"
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Message</label>
                  <textarea
                    rows={4}
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Resume</label>
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDrag(false);
                      const f = e.dataTransfer.files?.[0];
                      if (f) setFile(f);
                    }}
                    className={`mt-1 block cursor-pointer rounded-xl border border-dashed px-4 py-8 text-center transition ${drag ? "border-[color:var(--lime-soft)] bg-[color:var(--surface)]" : "hover:bg-[color:var(--surface)]"}`}
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
                        <div className="text-sm font-semibold">
                          Drag &amp; drop your resume here
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          or click to browse — PDF, DOC, DOCX (max 5MB)
                        </div>
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
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" className="mt-0.5" />I agree to the Privacy Policy and
                  Terms &amp; Conditions.
                </label>
                <button type="submit" className="btn-primary justify-center opacity-60" disabled>
                  Submit application (configure Formspree) <ArrowRight className="size-4" />
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

function Field({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
      />
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <select className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
