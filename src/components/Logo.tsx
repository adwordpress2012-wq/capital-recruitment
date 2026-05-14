const LOGO_SRC = "/logo/capital-recruitment-full.png";

export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const shell =
    variant === "light"
      ? "inline-flex rounded-xl bg-white p-2 shadow-[0_2px_14px_rgba(0,0,0,0.22)] ring-1 ring-black/5"
      : "inline-flex";

  return (
    <div className={`${shell} ${className ?? ""}`.trim()}>
      <img
        src={LOGO_SRC}
        alt="Capital Recruitment Agency"
        width={581}
        height={538}
        decoding="async"
        className="h-9 w-auto max-w-[min(100%,220px)] object-contain object-left sm:h-10 sm:max-w-[260px] md:h-11 md:max-w-[280px]"
      />
    </div>
  );
}
