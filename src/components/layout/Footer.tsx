import { profile } from "@/data/profile";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js,
          Three.js, and Tailwind CSS.
        </p>
        <ul className="flex items-center gap-3">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/10 hover:text-white"
              >
                <SocialIcon icon={s.icon} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
