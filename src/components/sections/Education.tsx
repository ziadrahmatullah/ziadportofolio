import { GraduationCap, Users } from "lucide-react";
import { education, organizations } from "@/data/experience";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <Section
      id="education"
      index="05"
      label="education"
      title="Education & community."
      subtitle="Formal study and the organizations that shaped how I collaborate."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <article className="glass h-full rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            <ul className="mt-6 space-y-6">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-semibold">{e.degree}</p>
                  <p className="text-fg/80">{e.school}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {e.period} · {e.location}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-fg/80">
                    {e.details.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="glass h-full rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                <Users className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold">Organizations</h3>
            </div>
            <ul className="mt-6 space-y-6">
              {organizations.map((o) => (
                <li key={o.name}>
                  <p className="font-semibold">
                    {o.name}{" "}
                    <span className="font-normal text-muted">· {o.role}</span>
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">{o.period}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-fg/80">
                    {o.bullets.map((b) => (
                      <li key={b.slice(0, 32)} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
