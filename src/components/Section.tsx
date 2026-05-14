import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  align = "left",
  id,
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="container-x">
        {(eyebrow || title || intro) && (
          <div className={`max-w-3xl mb-10 md:mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            {title && (
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl md:leading-[1.05]">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
