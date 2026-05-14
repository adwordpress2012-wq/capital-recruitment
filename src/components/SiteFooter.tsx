import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { BUSINESS_ADDRESS, EMAIL_ACCOUNTS, EMAIL_HR, EMAIL_PAUL, PHONE_DISPLAY } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[color:var(--navy)] text-white/80">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="text-white">
            <Logo variant="light" />
          </div>
          <p className="mt-5 max-w-md text-sm text-white/65">
            Capital Recruitment Agency provides labour hire and recruitment support for industrial
            and commercial clients — safety-led, responsive and based in Liverpool NSW.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={`${label} (coming soon)`}
                className="rounded-full border border-white/15 p-2 transition hover:bg-white/10"
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="mb-4 text-sm font-semibold text-white">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/employers", "Employers"],
              ["/job-seekers", "Job seekers"],
              ["/jobs", "Jobs"],
              ["/industries", "Industries"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="mb-4 text-sm font-semibold text-white">Solutions</h4>
          <ul className="space-y-2 text-sm text-white/75">
            <li>Labour hire</li>
            <li>Permanent recruitment</li>
            <li>Temporary staffing</li>
            <li>Shutdown crews</li>
            <li>Project staffing</li>
            <li>Security labour hire</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[color:var(--lime)]" />
              <span className="text-white/80">{BUSINESS_ADDRESS.full}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-[color:var(--lime)]" />
              <span className="space-y-1">
                <a
                  className="block break-all font-medium text-white hover:underline"
                  href={`mailto:${EMAIL_PAUL}`}
                >
                  {EMAIL_PAUL}
                </a>
                <a
                  className="block break-all text-white/70 hover:text-white hover:underline"
                  href={`mailto:${EMAIL_HR}`}
                >
                  {EMAIL_HR}
                </a>
                <a
                  className="block break-all text-white/70 hover:text-white hover:underline"
                  href={`mailto:${EMAIL_ACCOUNTS}`}
                >
                  {EMAIL_ACCOUNTS}
                </a>
              </span>
            </li>
            <li className="text-sm text-white/70">{PHONE_DISPLAY}</li>
            <li className="flex flex-col gap-2 pt-2">
              <Link to="/register" className="font-medium text-white transition hover:underline">
                Candidate application →
              </Link>
              <Link
                to="/employer-enquiry"
                className="font-medium text-white transition hover:underline"
              >
                Employer enquiry →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-8">
          <div className="grid gap-6 text-xs text-white/55 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-white/45">
                Legal
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-white">
                  Terms &amp; Conditions
                </Link>
                <Link to="/candidate-privacy-notice" className="hover:text-white">
                  Candidate privacy collection notice
                </Link>
                <Link to="/equal-opportunity" className="hover:text-white">
                  Equal opportunity statement
                </Link>
                <Link to="/whs-commitment" className="hover:text-white">
                  WHS commitment
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="leading-relaxed">
                This website provides general information about Capital Recruitment Agency and is
                not legal advice. Our recruitment and labour hire services are delivered in line
                with applicable Australian laws and industry expectations — including work health
                and safety, privacy and anti-discrimination obligations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} Capital Recruitment Agency. All rights reserved.</div>
          <div className="text-center md:text-right">
            ABN details can be added here when confirmed.
          </div>
        </div>
      </div>
    </footer>
  );
}
