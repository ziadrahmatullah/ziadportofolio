import { skillGroups } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      label="skills"
      title="Tools I reach for."
      subtitle="From language and framework to the server it all runs on."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={0.06 * i}>
            <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-colors hover:border-cyan-400/30">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl transition-opacity group-hover:opacity-100 sm:opacity-0" />
              <h3 className="text-lg font-semibold">{g.title}</h3>
              <p className="mt-1 text-sm text-muted">{g.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
