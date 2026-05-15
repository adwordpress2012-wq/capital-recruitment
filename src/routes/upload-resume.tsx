import { createFileRoute, Link } from "@tanstack/react-router";
import { CandidateApplicationFormSection } from "@/components/CandidateApplicationFormSection";

export const Route = createFileRoute("/upload-resume")({
  head: () => ({
    meta: [
      {
        title: "Upload Resume — Candidate Registration | Capital Recruitment Liverpool NSW",
      },
      {
        name: "description",
        content:
          "Upload your resume and work preferences for labour hire and industrial roles across Greater Sydney — Capital Recruitment Agency.",
      },
      {
        name: "keywords",
        content:
          "upload resume, labour hire Liverpool NSW, candidate registration, industrial recruitment",
      },
      { property: "og:title", content: "Upload your resume — Capital Recruitment" },
      {
        property: "og:description",
        content: "Submit your resume and details — our consultants will be in touch.",
      },
    ],
  }),
  component: UploadResumePage,
});

function UploadResumePage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Upload resume</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Share your <span className="text-gradient-lime italic">resume &amp; profile</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Add your experience, work rights and availability. Resumes are reviewed by our consultants,
            who will contact you using the details you provide.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Applying for a listed role?{" "}
            <Link to="/jobs" className="font-semibold text-foreground underline-offset-2 hover:underline">
              Browse jobs
            </Link>{" "}
            and apply from the vacancy so your file is linked to that role.
          </p>
        </div>
      </section>

      <CandidateApplicationFormSection defaultRole="" submitButtonLabel="Submit resume" />
    </>
  );
}
