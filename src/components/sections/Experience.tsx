import { experiences, type ExperienceType } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

const typeTone: Record<ExperienceType, "accent" | "violet" | "emerald" | "amber" | "default"> = {
  "Full-time": "accent",
  Freelance: "violet",
  "Self-employed": "emerald",
  Trainee: "amber",
  Apprenticeship: "amber",
  Training: "default",
  Organization: "default",
};

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      label="experience"
      title="Where I have shipped."
      subtitle="Full-time, freelance, and the training that got me here."
    >
      <ol className="relative ml-3 border-l border-line">
        {experiences.map((exp, i) => (
          <li key={`${exp.company}-${exp.period}`} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[7px] top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-cyan-400/60 bg-bg">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
            </span>
            <Reveal delay={Math.min(i, 3) * 0.05}>
              <article className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {exp.role}{" "}
                      <span className="text-muted">@ {exp.company}</span>
                    </h3>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {exp.period}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                  </div>
                  <Badge tone={typeTone[exp.type]}>{exp.type}</Badge>
                </div>

                {exp.summary ? (
                  <p className="mt-4 text-sm text-fg/80">{exp.summary}</p>
                ) : null}

                <ul className="mt-4 space-y-2 text-sm text-fg/85">
                  {exp.bullets.map((b) => (
                    <li key={b.slice(0, 32)} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {exp.tags?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <li key={t}>
                        <Badge>{t}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
