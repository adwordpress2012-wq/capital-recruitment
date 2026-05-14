import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/whs-commitment")({
  head: () => ({
    meta: [
      { title: "Work Health & Safety Commitment — Capital Recruitment" },
      {
        name: "description",
        content:
          "Capital Recruitment Agency WHS commitment — safety expectations for recruitment, placement and site readiness.",
      },
      {
        name: "keywords",
        content: "work health and safety, WHS commitment, labour hire safety, recruitment safety",
      },
    ],
  }),
  component: WhsCommitmentPage,
});

function WhsCommitmentPage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Safety</div>
        <h1 className="text-4xl font-bold md:text-5xl">Work health and safety commitment</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
      <Section className="!py-12">
        <article className="max-w-3xl space-y-6 text-[15px] leading-7 text-muted-foreground">
          <p className="rounded-xl border bg-muted/30 p-4 text-sm">
            This page summarises our general approach to work health and safety (WHS) in recruitment
            and placement. It is <strong className="text-foreground">not legal advice</strong> and
            does not replace a client&apos;s primary duty of care for their workplace.
          </p>

          <h2 className="text-xl font-bold text-foreground">Safety in recruitment</h2>
          <p>
            We aim to recruit with a clear understanding of site hazards, role risks and required
            competencies. Where licences, medical fitness, inductions or specialised training are
            genuinely required for a role, we work with clients to align expectations and screening
            steps.
          </p>

          <h2 className="text-xl font-bold text-foreground">Placement readiness</h2>
          <p>
            We support candidates to understand client safety rules, reporting lines and PPE
            expectations before starting work. We encourage honest disclosure of limitations and
            incidents where that is relevant to safe placement.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            Reporting and continuous improvement
          </h2>
          <p>
            We treat safety-related feedback seriously. Where incidents or near misses are reported
            to us in connection with placements, we aim to support lawful reporting, communication
            with the client and practical follow-up consistent with our role as a recruitment
            provider.
          </p>

          <h2 className="text-xl font-bold text-foreground">Contact</h2>
          <p>
            For safety-related enquiries connected to our services, please contact us via our{" "}
            <Link className="font-semibold text-foreground underline" to="/contact">
              contact page
            </Link>
            .
          </p>
        </article>
      </Section>
    </>
  );
}
