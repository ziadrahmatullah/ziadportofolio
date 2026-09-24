"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/#education", label: "Education", id: "education" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // The active link is the last section whose top has passed a marker
      // placed a third of the way down the viewport.
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = l.id;
      }
      setActive(current);
    };
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-3 mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:mx-6 lg:mx-auto ${
          scrolled || open ? "glass shadow-lg shadow-black/30" : ""
        }`}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-semibold"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 font-mono text-bg">
            Z
          </span>
          <span className="tracking-tight text-fg/90 transition-colors group-hover:text-white">
            {profile.wordmark}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active === l.id
                    ? "bg-white/10 text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20 md:inline-flex"
        >
          Hire me
        </a>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg/80 hover:bg-white/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mt-2 rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-xl shadow-black/40 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm ${
                      active === l.id
                        ? "bg-white/10 text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 text-center text-sm font-medium text-cyan-100"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
