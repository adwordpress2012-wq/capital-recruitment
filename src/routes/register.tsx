import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CandidateApplicationFormSection } from "@/components/CandidateApplicationFormSection";

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
            are reviewed by our consultants. We will contact you using the details you provide.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Applying for a specific advertised role?{" "}
            <Link to="/jobs" className="font-semibold text-foreground underline-offset-2 hover:underline">
              Browse jobs
            </Link>{" "}
            and use Apply on the listing so your application is linked to that vacancy.
          </p>
        </div>
      </section>

      <CandidateApplicationFormSection defaultRole={defaultRole} />
    </>
  );
}
