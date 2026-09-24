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
      {/*
        Two balanced columns: the bio carries the stats so it matches the
        height of the photo and facts beside it, leaving no dead space.
      */}
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="flex flex-col lg:col-span-3">
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-fg/85">
            {profile.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          {/* On lg the grid absorbs whatever height the photo column sets,
              so the cards grow instead of leaving a gap. */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:flex-1 lg:auto-rows-fr">
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i} className="h-full">
                <div className="glass flex h-full flex-col justify-center rounded-2xl p-5">
                  <p className="text-gradient text-3xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-4 sm:flex-row lg:flex-col">
            {profile.avatar ? (
              <div className="glass relative aspect-square w-full max-w-xs shrink-0 overflow-hidden rounded-2xl sm:w-64 sm:max-w-none lg:w-full">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 640px) 20rem, (max-width: 1024px) 16rem, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}
            {/* Grows to fill whatever height the bio column sets. */}
            <dl className="glass grid flex-1 content-start gap-5 rounded-2xl p-6">
              {profile.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-accent">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-fg/90">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
