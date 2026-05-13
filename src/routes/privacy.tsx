import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Capital Recruitment" },
      { name: "description", content: "How Capital Recruitment Agency collects, uses and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Legal</div>
        <h1 className="text-4xl md:text-6xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </section>
      <Section className="!py-12">
        <article className="prose prose-neutral max-w-3xl text-[15px] leading-7 text-muted-foreground space-y-6">
          <p>Capital Recruitment Agency (“we”, “us”, “our”) respects your privacy and is committed to protecting your personal information in accordance with the Australian Privacy Principles under the Privacy Act 1988 (Cth).</p>
          <h2 className="text-xl font-bold text-foreground">Information we collect</h2>
          <p>We may collect personal information including your name, contact details, employment history, references, qualifications and any other information relevant to your engagement with our recruitment services.</p>
          <h2 className="text-xl font-bold text-foreground">How we use your information</h2>
          <p>We use your information to provide recruitment, labour hire and workforce management services, communicate with you about opportunities, and meet our legal and compliance obligations.</p>
          <h2 className="text-xl font-bold text-foreground">Disclosure</h2>
          <p>We may disclose your information to prospective employers, our service providers and regulatory bodies where required. We will not sell your personal information.</p>
          <h2 className="text-xl font-bold text-foreground">Storage & security</h2>
          <p>We take reasonable steps to protect personal information from misuse, loss and unauthorised access, including secure storage and access controls.</p>
          <h2 className="text-xl font-bold text-foreground">Access & correction</h2>
          <p>You may request access to or correction of your personal information at any time by contacting us at info@capitalrecruitment.com.au.</p>
          <h2 className="text-xl font-bold text-foreground">Contact</h2>
          <p>For privacy enquiries, please contact us at info@capitalrecruitment.com.au or 1300 00 30 47.</p>
          <p className="text-xs">This is placeholder legal copy and should be reviewed by a qualified legal professional before publication.</p>
        </article>
      </Section>
    </>
  );
}
