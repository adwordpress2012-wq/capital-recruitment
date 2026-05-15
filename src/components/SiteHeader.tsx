import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/employers", label: "Employers" },
  { to: "/candidates", label: "Candidates" },
  { to: "/jobs", label: "Jobs" },
  { to: "/submit-vacancy", label: "Submit Vacancy" },
  { to: "/upload-resume", label: "Upload Resume" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-[border-color,box-shadow] duration-200 ease-out ${
        scrolled ? "border-b border-border/70 shadow-[0_1px_0_rgba(15,23,42,0.04)]" : ""
      }`}
    >
      <div className="container-x flex items-center justify-between gap-3 py-1.5 sm:gap-4 sm:py-2 lg:gap-6 lg:py-2">
        <Link
          to="/"
          className="group inline-flex shrink-0 items-center rounded-md outline-none transition duration-200 ease-out hover:opacity-[0.92] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[color:var(--lime-soft)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo placement="navbar" />
        </Link>
        <nav className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:min-w-0">
          <div className="flex max-w-[56rem] flex-wrap items-center justify-center gap-x-0.5 gap-y-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="whitespace-nowrap rounded-full px-2 py-2 text-[12px] font-medium text-foreground/80 transition-colors duration-150 ease-out hover:text-foreground xl:px-2.5 xl:text-[13px]"
                activeProps={{
                  className:
                    "whitespace-nowrap rounded-full px-2 py-2 text-[12px] font-semibold text-foreground bg-muted transition-colors duration-150 ease-out xl:px-2.5 xl:text-[13px]",
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="hidden shrink-0 items-center lg:flex">
          <Link to="/contact" className="btn-primary text-sm">
            Get in touch <ArrowRight className="size-4" />
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-full border p-2 transition-colors duration-150 ease-out hover:bg-muted lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-white lg:hidden">
          <div className="container-x flex max-h-[min(70vh,calc(100dvh-4rem))] flex-col gap-0.5 overflow-y-auto py-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="group inline-flex w-fit items-center rounded-md px-2 py-1.5 outline-none transition duration-200 ease-out hover:opacity-[0.92] active:scale-[0.98]"
              aria-label="Capital Recruitment home"
            >
              <Logo placement="navbar" />
            </Link>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-out hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 self-start"
            >
              Get in touch <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
