import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";
import {
  BUSINESS_ADDRESS,
  EMAIL_ACCOUNTS,
  EMAIL_HR,
  EMAIL_PAUL,
  MAP_EMBED_QUERY,
  PHONE_DISPLAY,
} from "@/lib/site";
import { FORMSPREE_CONTACT_ACTION } from "@/lib/forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact — Labour Hire Liverpool NSW | Capital Recruitment Agency",
      },
      {
        name: "description",
        content:
          "Contact Capital Recruitment Agency in Liverpool NSW for employer workforce solutions, labour hire Sydney wide, and candidate support. Email hr@capitalrecruitment.com.au or paul@capitalrecruitment.com.au.",
      },
      {
        name: "keywords",
        content:
          "recruitment agency Liverpool NSW, labour hire Liverpool NSW, labour hire Sydney, workforce solutions Australia, employer workforce solutions",
      },
      { property: "og:title", content: "Contact Capital Recruitment" },
      {
        property: "og:description",
        content: "Speak with our Liverpool NSW team about workforce and recruitment support.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const action = FORMSPREE_CONTACT_ACTION;
  const useFormspree = Boolean(action);

  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Contact</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Let&apos;s talk <span className="text-gradient-lime italic">workforce</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Whether you are scaling a site team or looking for your next role, our Liverpool NSW
            office supports employers and candidates across Greater Sydney and beyond.
          </p>
          {!useFormspree && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <strong>TODO:</strong> Set{" "}
              <code className="rounded bg-white/80 px-1">VITE_FORMSPREE_CONTACT_ACTION</code> to
              enable the enquiry form to email your team automatically.
            </p>
          )}
        </div>
      </section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="card-soft">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl grad-lime">
              <MapPin className="size-5 text-[color:var(--navy)]" />
            </div>
            <div className="text-sm text-muted-foreground">Office</div>
            <div className="mt-1 font-bold leading-snug">{BUSINESS_ADDRESS.full}</div>
          </div>
          <a href={`mailto:${EMAIL_PAUL}`} className="card-soft block">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl grad-lime">
              <Mail className="size-5 text-[color:var(--navy)]" />
            </div>
            <div className="text-sm text-muted-foreground">General &amp; applications</div>
            <div className="mt-1 font-bold break-all">{EMAIL_PAUL}</div>
          </a>
          <div className="card-soft">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl grad-lime">
              <Mail className="size-5 text-[color:var(--navy)]" />
            </div>
            <div className="text-sm text-muted-foreground">Accounts &amp; HR</div>
            <div className="mt-3 space-y-1 text-sm font-semibold">
              <div>
                <a
                  className="break-all underline-offset-2 hover:underline"
                  href={`mailto:${EMAIL_ACCOUNTS}`}
                >
                  {EMAIL_ACCOUNTS}
                </a>
              </div>
              <div>
                <a
                  className="break-all underline-offset-2 hover:underline"
                  href={`mailto:${EMAIL_HR}`}
                >
                  {EMAIL_HR}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Phone:</span> {PHONE_DISPLAY}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {useFormspree ? (
            <form className="card-soft grid gap-4" action={action} method="POST">
              <input type="hidden" name="_subject" value="Website enquiry — Capital Recruitment" />
              <h2 className="text-2xl font-bold">Quick enquiry</h2>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Full name</label>
                <input
                  name="full_name"
                  required
                  type="text"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Email</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Company (optional)
                </label>
                <input
                  name="company"
                  type="text"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
              <button type="submit" className="btn-primary">
                Send message <ArrowRight className="size-4" />
              </button>
            </form>
          ) : (
            <form className="card-soft grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-2xl font-bold">Quick enquiry</h2>
              {[
                ["Full name", "text"],
                ["Email address", "email"],
                ["Phone number", "tel"],
                ["Company (optional)", "text"],
              ].map(([l, t]) => (
                <div key={l}>
                  <label className="text-xs font-semibold text-muted-foreground">{l}</label>
                  <input
                    type={t}
                    className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  How can we help?
                </label>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]"
                />
              </div>
              <button type="submit" className="btn-primary opacity-60" disabled>
                Send message (configure Formspree) <ArrowRight className="size-4" />
              </button>
            </form>
          )}
          <div className="overflow-hidden rounded-2xl border min-h-[320px] lg:min-h-[400px]">
            <iframe
              title="Capital Recruitment office location"
              className="h-full min-h-[320px] w-full lg:min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${MAP_EMBED_QUERY}&output=embed`}
            />
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer email? Reach us at{" "}
          <a
            className="font-semibold text-foreground underline-offset-2 hover:underline"
            href={`mailto:${EMAIL_PAUL}`}
          >
            {EMAIL_PAUL}
          </a>
          . Candidate applications:{" "}
          <Link
            to="/register"
            className="font-semibold text-foreground underline-offset-2 hover:underline"
          >
            apply online
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
