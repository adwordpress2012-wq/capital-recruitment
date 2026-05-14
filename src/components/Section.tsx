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
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-x">
        {(eyebrow || title || intro) && (
          <div className={`max-w-3xl mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            {title && <h2 className="text-3xl md:text-5xl font-bold leading-[1.05]">{title}</h2>}
            {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
