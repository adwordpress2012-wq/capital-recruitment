import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Newspaper } from "lucide-react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Recruitment & Labour Hire | Capital Recruitment" },
      {
        name: "description",
        content:
          "Articles and updates on recruitment, labour hire and workforce planning from Capital Recruitment Agency.",
      },
      { property: "og:title", content: "Insights — Capital Recruitment" },
      {
        property: "og:description",
        content: "Practical perspectives for employers and candidates.",
      },
    ],
  }),
  component: InsightsPage,
});

const PLACEHOLDERS = [
  {
    title: "Site-ready hiring: what clients look for first",
    excerpt:
      "Safety habits, licence verification and clear availability — a short checklist for standing out on industrial placements.",
    },
  {
    title: "Planning shutdown crews without last-minute gaps",
    excerpt:
      "How lead time, scope clarity and induction readiness reduce risk when you are staffing maintenance windows.",
    },
  {
    title: "From brief to bench: how we qualify candidates",
    excerpt:
      "A transparent view of screening, reference checks and fit-for-role conversations before anyone steps on site.",
  },
];

function InsightsPage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Insights</div>
          <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
            Ideas for <span className="text-gradient-lime italic">smarter hiring</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Practical notes for employers and candidates — workplace trends, compliance reminders and
            recruitment tips from our team. Full articles will appear here as we publish them.
          </p>
        </div>
      </section>

      <Section className="!py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDERS.map((post) => (
            <Reveal key={post.title}>
              <article className="card-soft flex h-full flex-col">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl grad-lime">
                  <Newspaper className="size-5 text-[color:var(--navy)]" />
                </div>
                <h2 className="text-lg font-bold leading-snug">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">Coming soon</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="container-x pb-16">
        <div className="card-soft flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-bold">Need help with a role or a team brief?</h3>
            <p className="text-sm text-muted-foreground">
              Speak with our consultants about vacancies, mobilisation and workforce planning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/submit-vacancy" className="btn-primary">
              Submit a vacancy <ArrowRight className="size-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
