import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/equal-opportunity")({
  head: () => ({
    meta: [
      { title: "Equal Opportunity Statement — Capital Recruitment" },
      {
        name: "description",
        content:
          "Capital Recruitment Agency equal opportunity statement — fair recruitment and workplace inclusion expectations.",
      },
      {
        name: "keywords",
        content: "equal opportunity, recruitment Australia, fair recruitment, anti-discrimination",
      },
    ],
  }),
  component: EqualOpportunityPage,
});

function EqualOpportunityPage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Legal</div>
        <h1 className="text-4xl font-bold md:text-5xl">Equal opportunity statement</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
      <Section className="!py-12">
        <article className="max-w-3xl space-y-6 text-[15px] leading-7 text-muted-foreground">
          <p className="rounded-xl border bg-muted/30 p-4 text-sm">
            This statement describes our general commitment to fair recruitment practices. It is{" "}
            <strong className="text-foreground">not legal advice</strong> and does not create
            contractual rights.
          </p>

          <h2 className="text-xl font-bold text-foreground">Our commitment</h2>
          <p>
            Capital Recruitment Agency is committed to recruitment processes that comply with
            applicable Australian anti-discrimination laws. We aim to assess candidates based on
            job-related criteria such as skills, experience, qualifications, reliability and safety
            behaviours — not attributes that are irrelevant to the role.
          </p>

          <h2 className="text-xl font-bold text-foreground">Clients and host workplaces</h2>
          <p>
            We work with employers who share a commitment to lawful, respectful workplaces. Where
            concerns arise, we encourage timely reporting and appropriate escalation pathways
            consistent with workplace policies and legal requirements.
          </p>

          <h2 className="text-xl font-bold text-foreground">
            Accessibility and reasonable adjustments
          </h2>
          <p>
            We welcome applications from people with disability and will consider reasonable
            adjustments for recruitment processes where it is lawful and practicable to do so, in
            consultation with you and the client (where relevant).
          </p>

          <h2 className="text-xl font-bold text-foreground">Feedback</h2>
          <p>
            If you believe you have been treated unfairly during our recruitment process, please
            contact us via the details on our{" "}
            <Link className="font-semibold text-foreground underline" to="/contact">
              contact page
            </Link>
            . We take concerns seriously and will respond in a timely manner where we can lawfully
            do so.
          </p>
        </article>
      </Section>
    </>
  );
}
