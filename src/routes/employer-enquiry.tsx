import { createFileRoute } from "@tanstack/react-router";
import { EmployerLeadFormSection } from "@/components/EmployerLeadFormSection";

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

function EmployerEnquiryPage() {
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
        </div>
      </section>

      <EmployerLeadFormSection />
    </>
  );
}
