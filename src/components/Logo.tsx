export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const text = variant === "light" ? "text-white" : "text-[color:var(--teal-deep)]";
  const sub = variant === "light" ? "text-white/70" : "text-muted-foreground";
  return (
    <div className="flex items-center gap-2.5">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.2" className="text-[color:var(--teal-deep)]" />
        <circle cx="14.5" cy="16" r="2.6" className="fill-[color:var(--teal-deep)]" />
        <circle cx="25.5" cy="16" r="2.6" className="fill-[color:var(--lime-soft)]" />
        <path d="M9 30c2-4 6-6 11-6s9 2 11 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-[color:var(--lime-soft)]" fill="none" />
      </svg>
      <div className="leading-tight">
        <div className={`font-display font-extrabold tracking-tight text-lg ${text}`} style={{ fontFamily: "var(--font-display)" }}>
          CAPITAL
        </div>
        <div className={`text-[9px] font-semibold tracking-[0.22em] ${sub}`}>RECRUITMENT AGENCY</div>
      </div>
    </div>
  );
}
