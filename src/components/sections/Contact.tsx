import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      label="contact"
      title="Let's build something reliable."
      subtitle="Open to backend and fullstack work, integrations, and freelance projects."
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/60 via-violet-500/40 to-cyan-400/60 opacity-70" />
          <div className="glass relative rounded-3xl bg-bg/80 p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Have a system to design or an integration to ship?
                </h3>
                <p className="mt-3 text-muted">
                  I reply fastest by email. Tell me about the problem, the
                  stack, and the timeline, and I will get back to you with
                  next steps.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center justify-between rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-4 font-semibold text-bg shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.01]"
                >
                  <span className="inline-flex items-center gap-3">
                    <Mail className="h-5 w-5" aria-hidden />
                    {profile.email}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                {profile.socials
                  .filter((s) => s.icon !== "mail")
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass group inline-flex items-center justify-between rounded-2xl px-5 py-4 font-medium transition-colors hover:bg-white/10"
                    >
                      <span className="inline-flex items-center gap-3">
                        <SocialIcon icon={s.icon} className="h-5 w-5" />
                        {s.detail ?? s.label}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
