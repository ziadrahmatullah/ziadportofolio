import Image from "next/image";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section
      id="about"
      index="01"
      label="about"
      title="Engineer behind the endpoints."
      subtitle="A short introduction to how I work and what I care about."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="space-y-5 text-[17px] leading-relaxed text-fg/85 lg:col-span-3">
          {profile.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="space-y-4 lg:col-span-2">
          {profile.avatar ? (
            <div className="glass relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(max-width: 1024px) 60vw, 320px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
          <dl className="glass grid gap-5 rounded-2xl p-6">
            {profile.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs uppercase tracking-widest text-accent">
                  {f.label}
                </dt>
                <dd className="mt-1 text-fg/90">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.stats.map((s, i) => (
          <Reveal key={s.label} delay={0.05 * i}>
            <div className="glass rounded-2xl p-5">
              <p className="text-gradient text-3xl font-semibold tracking-tight">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
