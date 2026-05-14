import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { EMAIL_PAUL } from "@/lib/site";

export const Route = createFileRoute("/candidate-privacy-notice")({
  head: () => ({
    meta: [
      { title: "Candidate Privacy Collection Notice — Capital Recruitment" },
      {
        name: "description",
        content:
          "How Capital Recruitment Agency collects, uses and discloses personal information provided by candidates under Australian privacy law expectations.",
      },
      {
        name: "keywords",
        content: "candidate privacy, collection notice, recruitment privacy Australia, APPs",
      },
    ],
  }),
  component: CandidatePrivacyNoticePage,
});

function CandidatePrivacyNoticePage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Legal</div>
        <h1 className="text-4xl font-bold md:text-5xl">Candidate privacy collection notice</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
      <Section className="!py-12">
        <article className="max-w-3xl space-y-6 text-[15px] leading-7 text-muted-foreground">
          <p>
            This notice explains how{" "}
            <strong className="text-foreground">Capital Recruitment Agency</strong> (&quot;we&quot;,
            &quot;us&quot;) collects and handles personal information when you apply for work,
            register your interest, or otherwise engage with us as a candidate.
          </p>
          <p className="rounded-xl border bg-muted/30 p-4 text-sm">
            This is general information only and is{" "}
            <strong className="text-foreground">not legal advice</strong>. You should obtain
            independent legal advice if you need certainty about your rights and obligations.
          </p>

          <h2 className="text-xl font-bold text-foreground">Why we collect your information</h2>
          <p>
            We collect personal information to assess suitability for roles, verify qualifications
            and work rights, communicate with you, manage placements (including labour hire
            arrangements), and meet legal and regulatory obligations.
          </p>

          <h2 className="text-xl font-bold text-foreground">Kinds of information we may collect</h2>
          <p>
            Depending on the role, we may collect identifiers and contact details, employment
            history, education and training, licences and certifications, referee information,
            screening outcomes where permitted by law, and other information you choose to provide
            (including in your resume).
          </p>

          <h2 className="text-xl font-bold text-foreground">How we collect information</h2>
          <p>
            We may collect information directly from you (for example, through application forms,
            email, phone conversations and interviews), from referees with your consent, and from
            publicly available sources where appropriate.
          </p>

          <h2 className="text-xl font-bold text-foreground">Use and disclosure</h2>
          <p>
            We use your information for recruitment and workforce-related purposes, including
            presenting your profile to prospective host employers/clients where you have agreed or
            would reasonably expect this as part of the recruitment process.
          </p>
          <p>
            We may disclose information to clients, insurers, professional advisers, IT service
            providers and regulators where required or reasonably necessary to operate our business
            lawfully and safely.
          </p>

          <h2 className="text-xl font-bold text-foreground">Overseas disclosure</h2>
          <p>
            Some technology services used to store or process information may involve overseas
            recipients. Where this occurs, we take steps that are reasonable in the circumstances to
            protect personal information in line with Australian privacy expectations.
          </p>

          <h2 className="text-xl font-bold text-foreground">Access, correction and complaints</h2>
          <p>
            You may request access to or correction of your personal information, subject to
            exceptions under applicable privacy law. If you have a privacy concern, contact us at{" "}
            <a className="font-semibold text-foreground underline" href={`mailto:${EMAIL_PAUL}`}>
              {EMAIL_PAUL}
            </a>
            . If you are not satisfied with our response, you may contact the Office of the
            Australian Information Commissioner (OAIC).
          </p>

          <h2 className="text-xl font-bold text-foreground">Related documents</h2>
          <p>
            Please also read our{" "}
            <Link className="font-semibold text-foreground underline" to="/privacy">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link className="font-semibold text-foreground underline" to="/terms">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </article>
      </Section>
    </>
  );
}
