const LOGO_SRC = "/logo/capital-recruitment-full.png";

/** Natural dimensions of `capital-recruitment-full.png` (for aspect ratio / CLS). */
const LOGO_NATURAL_W = 1024;
const LOGO_NATURAL_H = 608;

export function Logo({
  variant = "dark",
  placement = "default",
  className,
}: {
  variant?: "dark" | "light";
  /** `navbar`: header / mobile drawer — fixed height band, no max-width crop. */
  placement?: "navbar" | "default";
  className?: string;
}) {
  const isNavbar = placement === "navbar";

  const shell = isNavbar
    ? `inline-flex items-center ${className ?? ""}`.trim()
    : `${variant === "light" ? "inline-flex rounded-xl bg-white p-2 shadow-[0_2px_14px_rgba(0,0,0,0.22)] ring-1 ring-black/5" : "inline-flex"} ${className ?? ""}`.trim();

  const imgClass = isNavbar
    ? "block h-9 w-auto object-contain object-left md:h-11 lg:h-12 xl:h-[52px]"
    : "h-9 w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-10 sm:max-w-[260px] md:h-11 md:max-w-[280px]";

  return (
    <div className={shell}>
      <img
        src={LOGO_SRC}
        alt="Capital Recruitment Agency"
        width={LOGO_NATURAL_W}
        height={LOGO_NATURAL_H}
        decoding="async"
        className={imgClass}
      />
    </div>
  );
}
