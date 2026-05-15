import { createFileRoute } from "@tanstack/react-router";
import { EmployerLeadFormSection } from "@/components/EmployerLeadFormSection";

export const Route = createFileRoute("/submit-vacancy")({
  head: () => ({
    meta: [
      {
        title: "Submit a Vacancy — Employer Recruitment | Capital Recruitment Liverpool NSW",
      },
      {
        name: "description",
        content:
          "Post a staffing or recruitment brief with Capital Recruitment Agency — labour hire, casual cover, shutdown crews and permanent hires across Greater Sydney.",
      },
      {
        name: "keywords",
        content:
          "submit vacancy, labour hire Sydney, employer recruitment, industrial staffing Liverpool NSW",
      },
      { property: "og:title", content: "Submit a vacancy — Capital Recruitment" },
      {
        property: "og:description",
        content: "Share your role brief and mobilisation timing — our team will respond with next steps.",
      },
    ],
  }),
  component: SubmitVacancyPage,
});

function SubmitVacancyPage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Submit a vacancy</div>
          <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
            Brief us on your <span className="text-gradient-lime italic">next hire</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Tell us about the role, headcount, site conditions and timing. A consultant will review
            your brief and respond with sourcing options and realistic mobilisation steps.
          </p>
        </div>
      </section>

      <EmployerLeadFormSection
        submitButtonLabel="Submit vacancy"
        detailsLabel="Role brief — duties, tickets, roster and any site constraints"
      />
    </>
  );
}
