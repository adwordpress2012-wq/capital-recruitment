import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { BUSINESS_ADDRESS, EMAIL_PAUL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Capital Recruitment Agency Australia" },
      {
        name: "description",
        content:
          "Privacy Policy for Capital Recruitment Agency — how we collect, use, store and disclose personal information in line with Australian Privacy Principles expectations.",
      },
      {
        name: "keywords",
        content: "privacy policy, recruitment agency Australia, candidate privacy, labour hire",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Legal</div>
        <h1 className="text-4xl font-bold md:text-6xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </section>
      <Section className="!py-12">
        <article className="prose prose-neutral max-w-3xl space-y-6 text-[15px] leading-7 text-muted-foreground">
          <p className="not-prose rounded-xl border bg-muted/30 p-4 text-sm">
            This Privacy Policy is a general information document. It is{" "}
            <strong className="text-foreground">not legal advice</strong> and should be reviewed by
            a qualified legal professional before you rely on it for commercial or compliance
            decisions.
          </p>
          <p>
            Capital Recruitment Agency (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects
            your privacy and is committed to handling personal information in accordance with the{" "}
            <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs), where they
            apply to our activities.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            What personal information we collect
          </h2>
          <p>
            Depending on how you interact with us, we may collect names, contact details, employment
            history, education and training, licences and certifications, payroll/tax identifiers
            where required for placements, and other information you voluntarily provide.
          </p>

          <h2 className="text-xl font-bold text-foreground">Why we collect personal information</h2>
          <p>
            We collect personal information to provide recruitment and labour hire services,
            communicate with clients and candidates, verify identity and work rights where required,
            manage complaints and incidents, improve our services, and comply with legal
            obligations.
          </p>

          <h2 className="text-xl font-bold text-foreground">How we hold and protect information</h2>
          <p>
            We take reasonable steps to protect personal information from misuse, interference,
            loss, unauthorised access, modification or disclosure. This includes access controls,
            secure systems and staff training appropriate to the sensitivity of the information.
          </p>

          <h2 className="text-xl font-bold text-foreground">Disclosure</h2>
          <p>
            We may disclose personal information to prospective employers/host clients, referees
            (with consent where required), insurers, professional advisers, IT and communications
            providers, and regulators where required by law.
          </p>

          <h2 className="text-xl font-bold text-foreground">Direct marketing</h2>
          <p>
            Where permitted by law, we may send updates about opportunities and services. You may
            opt out of marketing communications at any time using the unsubscribe mechanism in the
            message or by contacting us.
          </p>

          <h2 className="text-xl font-bold text-foreground">Access and correction</h2>
          <p>
            You may request access to, or correction of, the personal information we hold about you.
            We will respond within a reasonable period, subject to any lawful exceptions.
          </p>

          <h2 className="text-xl font-bold text-foreground">Complaints</h2>
          <p>
            If you believe we have mishandled your personal information, please contact us first.
            You may also lodge a complaint with the OAIC.
          </p>

          <h2 className="text-xl font-bold text-foreground">Contact</h2>
          <p>
            Privacy enquiries:{" "}
            <a className="font-semibold text-foreground underline" href={`mailto:${EMAIL_PAUL}`}>
              {EMAIL_PAUL}
            </a>
            <br />
            Postal address: {BUSINESS_ADDRESS.full}
          </p>

          <p className="not-prose text-xs">
            Related:{" "}
            <Link className="underline" to="/candidate-privacy-notice">
              Candidate privacy collection notice
            </Link>
            .
          </p>
        </article>
      </Section>
    </>
  );
}
