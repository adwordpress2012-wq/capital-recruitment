import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Capital Recruitment Agency" },
      { name: "description", content: "Get in touch with Capital Recruitment Agency. Speak with our team about workforce solutions, labour hire and job opportunities across Australia." },
      { property: "og:title", content: "Contact Capital Recruitment" },
      { property: "og:description", content: "Let's build something great together." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="container-x pt-12 pb-2">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">● Contact</div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
            Let's build something <span className="text-gradient-lime italic">great together</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Whether you're hiring or looking for work, our team is here to help.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            { icon: Phone, t: "Call us", d: "1300 00 30 47", h: "tel:1300003047" },
            { icon: Mail, t: "Email us", d: "info@capitalrecruitment.com.au", h: "mailto:info@capitalrecruitment.com.au" },
            { icon: MapPin, t: "Visit us", d: "Level 1, 6 Help St, Chatswood NSW 2067" },
          ].map(({ icon: Icon, t, d, h }) => (
            <a key={t} href={h ?? "#"} className="card-soft block">
              <div className="size-11 rounded-xl grad-lime inline-flex items-center justify-center mb-4">
                <Icon className="size-5 text-[color:var(--navy)]" />
              </div>
              <div className="text-sm text-muted-foreground">{t}</div>
              <div className="mt-1 font-bold">{d}</div>
            </a>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <form className="card-soft grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold">Quick enquiry</h2>
            {[["Full name", "text"], ["Email address", "email"], ["Phone number", "tel"], ["Company (optional)", "text"]].map(([l, t]) => (
              <div key={l}>
                <label className="text-xs font-semibold text-muted-foreground">{l}</label>
                <input type={t} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-muted-foreground">How can we help?</label>
              <textarea rows={4} className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--lime-soft)]" />
            </div>
            <button className="btn-primary">Send message <ArrowRight className="size-4" /></button>
          </form>
          <div className="overflow-hidden rounded-2xl border min-h-[400px]">
            <iframe
              title="Capital Recruitment Office Location"
              className="w-full h-full min-h-[400px]"
              loading="lazy"
              src="https://www.google.com/maps?q=Chatswood+NSW+2067&output=embed"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
