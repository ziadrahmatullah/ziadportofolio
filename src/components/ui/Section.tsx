import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  index,
  label,
  title,
  subtitle,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-28 ${className}`}
    >
      <Reveal>
        <div className="mb-12">
          <p className="font-mono text-sm text-accent">
            {"// "}
            {index}. {label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>
          ) : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
