import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[color:var(--navy)] text-white/80">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-white"><Logo variant="light" /></div>
          <p className="mt-5 text-sm text-white/65 max-w-xs">
            Connecting people. Powering success. Trusted labour hire and workforce solutions across Australia.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="rounded-full border border-white/15 p-2 hover:bg-white/10 transition" aria-label="Social link">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"], ["/about", "About Us"], ["/employers", "Employers"],
              ["/job-seekers", "Job Seekers"], ["/industries", "Industries"], ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-white transition">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2 text-sm">
            <li>Labour Hire</li><li>Permanent Recruitment</li><li>Workforce Management</li>
            <li>Temporary Staffing</li><li>Shutdown Crews</li><li>Project Staffing</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="size-4 mt-0.5 text-[color:var(--lime)]" /> 1300 00 30 47</li>
            <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-[color:var(--lime)]" /> info@capitalrecruitment.com.au</li>
            <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-[color:var(--lime)]" /> Level 1, 6 Help St, Chatswood NSW 2067</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/55">
          <div>© {new Date().getFullYear()} Capital Recruitment Agency. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
