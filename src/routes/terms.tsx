import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Capital Recruitment" },
      { name: "description", content: "Terms and conditions for using the Capital Recruitment Agency website and services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="container-x pt-12">
        <div className="eyebrow mb-4">● Legal</div>
        <h1 className="text-4xl md:text-6xl font-bold">Terms & Conditions</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </section>
      <Section className="!py-12">
        <article className="max-w-3xl text-[15px] leading-7 text-muted-foreground space-y-6">
          <p>By accessing this website you agree to be bound by these Terms & Conditions, which govern your use of the site and services provided by Capital Recruitment Agency.</p>
          <h2 className="text-xl font-bold text-foreground">Use of the website</h2>
          <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.</p>
          <h2 className="text-xl font-bold text-foreground">Intellectual property</h2>
          <p>All content, branding, design and code on this website is the intellectual property of Capital Recruitment Agency unless otherwise noted, and may not be reproduced without prior written consent.</p>
          <h2 className="text-xl font-bold text-foreground">Job listings & applications</h2>
          <p>Job listings are provided in good faith and may change or be removed without notice. Submitting an application does not guarantee an interview or placement.</p>
          <h2 className="text-xl font-bold text-foreground">Limitation of liability</h2>
          <p>To the extent permitted by law, Capital Recruitment Agency excludes all liability for any loss or damage arising from your use of this website.</p>
          <h2 className="text-xl font-bold text-foreground">Governing law</h2>
          <p>These terms are governed by the laws of New South Wales, Australia.</p>
          <h2 className="text-xl font-bold text-foreground">Contact</h2>
          <p>For questions about these terms, contact info@capitalrecruitment.com.au.</p>
          <p className="text-xs">This is placeholder legal copy and should be reviewed by a qualified legal professional before publication.</p>
        </article>
      </Section>
    </>
  );
}
