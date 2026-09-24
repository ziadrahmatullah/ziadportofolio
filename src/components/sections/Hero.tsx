"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { SocialIcon } from "@/components/ui/SocialIcon";

function useTypewriter(
  words: readonly string[],
  enabled: boolean,
  typeMs = 65,
  deleteMs = 35,
  pauseMs = 1700,
) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(enabled ? 0 : words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && length === word.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && length === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 150);
    } else {
      timer = setTimeout(
        () => setLength((l) => l + (deleting ? -1 : 1)),
        deleting ? deleteMs : typeMs,
      );
    }
    return () => clearTimeout(timer);
  }, [enabled, words, index, length, deleting, typeMs, deleteMs, pauseMs]);

  return words[index].slice(0, length);
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const reduced = useReducedMotion();
  const typed = useTypewriter(profile.roles, !reduced);
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <section id="home" className="relative flex min-h-screen items-center">
      <div className="pointer-events-none absolute inset-0 bg-bg/45 lg:bg-transparent lg:bg-gradient-to-r lg:from-bg/85 lg:via-bg/35 lg:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <MapPin className="h-3 w-3" aria-hidden />
            {profile.location}
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.shortName}</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-mono text-xl text-fg/90 sm:text-2xl"
            aria-live="polite"
          >
            <span className="text-accent">&gt; </span>
            {typed}
            <span className="ml-0.5 inline-block w-[0.6ch] animate-blink text-accent">
              _
            </span>
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-bg shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02]"
            >
              View projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-white/10"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex items-center gap-2">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:text-white"
                >
                  <SocialIcon icon={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        style={{ opacity: hintOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-white"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
