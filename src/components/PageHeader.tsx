import type { ReactNode } from "react";

/** En-tête de page standard : surtitre, titre H1 unique et introduction. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className="hero-fade mb-3 text-sm font-semibold tracking-[0.18em] text-terracotta uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="title-3d font-display text-4xl leading-[1.1] font-semibold text-balance text-ink sm:text-5xl">
        {title}
      </h1>
      {intro && <div className="hero-fade mt-5 text-lg leading-relaxed text-ink-soft [animation-delay:200ms]">{intro}</div>}
      {children}
    </header>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
