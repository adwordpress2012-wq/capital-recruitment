import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { EMAIL_PAUL } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Capital Recruitment Agency Australia" },
      {
        name: "description",
        content:
          "Website terms for Capital Recruitment Agency — acceptable use, liability limitations, recruitment listings disclaimer and governing law (NSW, Australia).",
      },
      {
        name: "keywords",
        content: "terms and conditions, recruitment agency Australia, labour hire terms",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Legal</div>
        <h1 className="text-4xl font-bold md:text-6xl">Terms &amp; Conditions</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </section>
      <Section className="!py-12">
        <article className="max-w-3xl space-y-6 text-[15px] leading-7 text-muted-foreground">
          <p className="rounded-xl border bg-muted/30 p-4 text-sm">
            These Terms &amp; Conditions are a general information document. They are{" "}
            <strong className="text-foreground">not legal advice</strong> and should be reviewed by
            a qualified legal professional before publication or reliance.
          </p>
          <p>
            By accessing this website, you agree to these Terms &amp; Conditions. If you do not
            agree, you should not use the website.
          </p>

          <h2 className="text-xl font-bold text-foreground">Informational content</h2>
          <p>
            Website content is provided for general information. We use reasonable efforts to keep
            information current, but we do not warrant that content is complete, accurate or up to
            date at all times.
          </p>

          <h2 className="text-xl font-bold text-foreground">Use of the website</h2>
          <p>
            You agree to use the website only for lawful purposes. You must not attempt to gain
            unauthorised access to our systems, interfere with the website&apos;s operation, or use
            the website to transmit malware or unlawful material.
          </p>

          <h2 className="text-xl font-bold text-foreground">Intellectual property</h2>
          <p>
            Unless otherwise indicated, we own or license the branding, layout, text and other
            materials on this website. You must not copy, reproduce or distribute website materials
            without our prior written consent, except as permitted by law.
          </p>

          <h2 className="text-xl font-bold text-foreground">Job listings and applications</h2>
          <p>
            Job listings are provided in good faith and may change or be withdrawn without notice.
            Submitting an application does not guarantee an interview, offer or placement.
            Recruitment decisions remain subject to client requirements, verification checks and
            availability.
          </p>

          <h2 className="text-xl font-bold text-foreground">Third-party links</h2>
          <p>
            The website may contain links to third-party websites. We are not responsible for
            third-party content, privacy practices or availability.
          </p>

          <h2 className="text-xl font-bold text-foreground">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we exclude liability for any loss or damage
            arising from your use of the website, including indirect or consequential loss. Where
            liability cannot be excluded, we limit our liability to resupplying the services or the
            amount paid by you (if any) for the relevant service in the 12 months preceding the
            claim.
          </p>

          <h2 className="text-xl font-bold text-foreground">Governing law</h2>
          <p>
            These terms are governed by the laws of New South Wales, Australia. You submit to the
            non-exclusive jurisdiction of courts located in New South Wales.
          </p>

          <h2 className="text-xl font-bold text-foreground">Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a className="font-semibold text-foreground underline" href={`mailto:${EMAIL_PAUL}`}>
              {EMAIL_PAUL}
            </a>
          </p>

          <p className="text-xs">
            Related:{" "}
            <Link className="underline" to="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </article>
      </Section>
    </>
  );
}
