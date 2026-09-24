"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { accentGradient, accentTone } from "./projectStyles";

type Filter = "All" | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", projects.length]]);
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <Section
      id="projects"
      index="04"
      label="projects"
      title="Problems I have solved."
      subtitle="Each card opens a full case study: the problem, the solution, what I did, and the outcome."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {(["All", ...projectCategories] as Filter[]).map((c) => {
          const isActive = filter === c;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(c)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                isActive
                  ? "border-cyan-400/50 bg-cyan-400/15 text-white"
                  : "border-white/10 bg-white/5 text-muted hover:text-white"
              }`}
            >
              {c}
              <span className="font-mono text-[11px] text-muted">{counts.get(c) ?? 0}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="glass group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-colors hover:border-cyan-400/30"
              >
                <div
                  className={`relative h-36 w-full overflow-hidden bg-gradient-to-br ${accentGradient[p.accent]}`}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="grid-bg absolute inset-0" />
                      <span className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-widest text-white/70">
                        {p.org}
                      </span>
                    </>
                  )}
                  <div className="absolute right-3 top-3 flex gap-2">
                    {p.featured ? <Badge tone="amber">Featured</Badge> : null}
                    <Badge tone={accentTone[p.accent]}>{p.category}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[11px] text-muted">{p.period}</p>
                  <h3 className="mt-1.5 flex items-start justify-between gap-3 text-lg font-semibold leading-snug">
                    <span>{p.title}</span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </h3>
                  <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s}>
                        <Badge>{s}</Badge>
                      </li>
                    ))}
                    {p.stack.length > 4 ? (
                      <li>
                        <Badge>+{p.stack.length - 4}</Badge>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
