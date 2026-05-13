import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "fade-up" | "fade-in" | "scale-in";

export function Reveal({
  children,
  delay = 0,
  variant = "fade-up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const base = "transition-all duration-700 ease-out will-change-transform";
  const hidden =
    variant === "fade-in"
      ? "opacity-0"
      : variant === "scale-in"
        ? "opacity-0 scale-[0.97]"
        : "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0 scale-100";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${base} ${shown ? visible : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
