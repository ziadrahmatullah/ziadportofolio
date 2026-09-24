import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageBackdrop } from "@/components/layout/PageBackdrop";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import {
  accentTone,
  coverFraming,
  visualLabel,
} from "@/components/sections/projectStyles";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} · ${profile.name}`;
  return {
    title,
    description: project.tagline,
    openGraph: {
      title,
      description: project.tagline,
      type: "article",
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

function Block({
  label,
  tone = "text-accent",
  children,
}: {
  label: string;
  tone?: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section>
        <h2 className={`font-mono text-xs uppercase tracking-widest ${tone}`}>
          {label}
        </h2>
        <div className="mt-3">{children}</div>
      </section>
    </Reveal>
  );
}

function BulletList({ items, dot = "bg-accent" }: { items: string[]; dot?: string }) {
  return (
    <ul className="space-y-2.5 text-fg/85">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const cover = coverFraming(project);
  const caption = visualLabel[project.visual ?? "screenshot"];

  const facts = [
    { label: "Organization", value: project.org },
    { label: "Role", value: project.role },
    { label: "Period", value: project.period },
    { label: "Team", value: project.team },
  ];

  return (
    <>
      <PageBackdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <article className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
            <Reveal>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                All projects
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Badge tone={accentTone[project.accent]}>{project.category}</Badge>
                {project.featured ? <Badge tone="amber">Featured</Badge> : null}
                <span className="font-mono text-xs text-muted">{project.period}</span>
              </div>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>

              <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="glass rounded-2xl p-4">
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {f.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-fg/90">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <figure>
                <div
                  className={`relative w-full overflow-hidden rounded-3xl border border-white/10 ${cover.detailContainer} ${
                    cover.isDiagram ? "aspect-video" : "aspect-[21/9]"
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} ${caption.toLowerCase()}`}
                      fill
                      priority
                      sizes="(max-width: 1152px) 100vw, 1152px"
                      className={cover.image}
                    />
                  ) : (
                    <>
                      <div className="grid-bg absolute inset-0" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
                        <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                          {project.org}
                        </span>
                        <span className="font-mono text-xs text-white/50">
                          {caption} coming soon
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {project.image ? (
                  <figcaption className="mt-3 font-mono text-xs text-muted">
                    {caption}
                  </figcaption>
                ) : null}
              </figure>
            </Reveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-3">
              <div className="space-y-12 lg:col-span-2">
                <Block label="Problem" tone="text-rose-300">
                  <p className="text-[17px] leading-relaxed text-fg/85">{project.problem}</p>
                </Block>
                <Block label="Solution" tone="text-emerald-300">
                  <p className="text-[17px] leading-relaxed text-fg/85">{project.solution}</p>
                </Block>
                <Block label="What I did">
                  <BulletList items={project.responsibilities} />
                </Block>
                {project.outcomes?.length ? (
                  <Block label="Outcomes" tone="text-violet-300">
                    <BulletList items={project.outcomes} dot="bg-accent-2" />
                  </Block>
                ) : null}
                {project.gallery?.length ? (
                  <Block label="Gallery">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {project.gallery.map((src, i) => (
                        <div
                          key={src}
                          className="relative aspect-video overflow-hidden rounded-2xl border border-white/10"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} screenshot ${i + 1}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </Block>
                ) : null}
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                <Reveal delay={0.05}>
                  <div className="glass rounded-2xl p-6">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                      Highlights
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-fg/85">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="glass rounded-2xl p-6">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                      Tech stack
                    </h2>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <li key={s}>
                          <Badge>{s}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                {project.links?.length ? (
                  <Reveal delay={0.15}>
                    <div className="glass rounded-2xl p-6">
                      <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
                        Links
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {project.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-cyan-200 hover:text-white"
                            >
                              {l.label}
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ) : null}
              </aside>
            </div>

            <Reveal className="mt-20">
              <nav aria-label="Other projects" className="grid gap-4 sm:grid-cols-2">
                <Link
                  href={`/projects/${prev.slug}`}
                  className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-cyan-400/30"
                >
                  <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-x-0.5" />
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      Previous
                    </p>
                    <p className="truncate font-medium">{prev.title}</p>
                  </div>
                </Link>
                <Link
                  href={`/projects/${next.slug}`}
                  className="glass group flex items-center justify-end gap-4 rounded-2xl p-5 text-right transition-colors hover:border-cyan-400/30"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      Next
                    </p>
                    <p className="truncate font-medium">{next.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              </nav>
            </Reveal>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
