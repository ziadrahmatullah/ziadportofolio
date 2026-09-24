import type { Project } from "@/data/projects";

export const accentGradient: Record<Project["accent"], string> = {
  cyan: "from-cyan-500/50 via-sky-600/30 to-bg",
  violet: "from-violet-500/50 via-fuchsia-600/30 to-bg",
  emerald: "from-emerald-500/50 via-teal-600/30 to-bg",
  amber: "from-amber-500/50 via-orange-600/30 to-bg",
  rose: "from-rose-500/50 via-pink-600/30 to-bg",
};

export const accentTone: Record<
  Project["accent"],
  "accent" | "violet" | "emerald" | "amber" | "rose"
> = {
  cyan: "accent",
  violet: "violet",
  emerald: "emerald",
  amber: "amber",
  rose: "rose",
};
