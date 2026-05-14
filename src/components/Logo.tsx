const LOGO_FULL_SRC = "/logo/capital-recruitment-full.png";
const LOGO_NAVBAR_SRC = "/logo/capital-recruitment-navbar.png";

/** Stacked mark — footer / default. */
const FULL_NATURAL_W = 1024;
const FULL_NATURAL_H = 608;

/** Wide navbar mark — tighter crop for less vertical whitespace. */
const NAVBAR_NATURAL_W = 1024;
const NAVBAR_NATURAL_H = 496;

export function Logo({
  variant = "dark",
  placement = "default",
  className,
}: {
  variant?: "dark" | "light";
  /** `navbar`: header / mobile drawer — wide asset, fixed heights, aspect preserved. */
  placement?: "navbar" | "default";
  className?: string;
}) {
  const isNavbar = placement === "navbar";

  const shell = isNavbar
    ? `inline-flex items-center leading-none ${className ?? ""}`.trim()
    : `${variant === "light" ? "inline-flex rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/[0.06]" : "inline-flex"} ${className ?? ""}`.trim();

  const src = isNavbar ? LOGO_NAVBAR_SRC : LOGO_FULL_SRC;
  const nw = isNavbar ? NAVBAR_NATURAL_W : FULL_NATURAL_W;
  const nh = isNavbar ? NAVBAR_NATURAL_H : FULL_NATURAL_H;

  const imgClass = isNavbar
    ? "block h-[42px] w-auto max-h-[42px] object-contain object-left lg:h-[52px] lg:max-h-[52px]"
    : "h-9 w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-10 sm:max-w-[260px] md:h-11 md:max-w-[280px]";

  return (
    <div className={shell}>
      <img
        src={src}
        alt="Capital Recruitment Agency"
        width={nw}
        height={nh}
        decoding="async"
        className={imgClass}
      />
    </div>
  );
}
