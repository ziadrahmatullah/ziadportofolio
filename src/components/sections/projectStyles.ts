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

/** Human label for the kind of visual a cover holds. */
export const visualLabel: Record<
  NonNullable<Project["visual"]>,
  string
> = {
  screenshot: "Screenshot",
  diagram: "Architecture diagram",
  photo: "Photo of the deployed hardware",
};

/**
 * Diagrams must not be cropped, so they sit uncropped on a flat background.
 * Screenshots and photos fill the frame instead.
 */
export function coverFraming(project: Pick<Project, "visual" | "accent">) {
  const isDiagram = project.visual === "diagram";
  return {
    isDiagram,
    /** Project page: a diagram needs a flat backdrop so letterboxing is invisible. */
    detailContainer: isDiagram
      ? "bg-[#05070d]"
      : `bg-gradient-to-br ${accentGradient[project.accent]}`,
    /** Cards always keep the accent gradient, whether or not an image sits on top. */
    cardContainer: `bg-gradient-to-br ${accentGradient[project.accent]}`,
    image: isDiagram ? "object-contain" : "object-cover",
    /**
     * A dense diagram is unreadable at card size, so cards fall back to the
     * gradient cover and the full diagram lives on the project page.
     */
    showImageOnCard: !isDiagram,
  };
}
