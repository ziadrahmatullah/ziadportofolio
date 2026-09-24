import type { ReactNode } from "react";

type Tone = "default" | "accent" | "violet" | "emerald" | "amber" | "rose";

const tones: Record<Tone, string> = {
  default: "border-white/10 bg-white/5 text-fg/80",
  accent: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

export function Badge({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
