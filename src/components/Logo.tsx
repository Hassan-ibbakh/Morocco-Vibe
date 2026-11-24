import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getDictionary, type Lang } from "@/i18n";

/** Étoile à huit branches inspirée des motifs de zellige. */
export function StarMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect x="6" y="6" width="20" height="20" rx="2" fill="#B4441F" />
      <rect x="6" y="6" width="20" height="20" rx="2" fill="#1F5C66" transform="rotate(45 16 16)" opacity="0.9" />
      <circle cx="16" cy="16" r="4.5" fill="#F2C14E" />
    </svg>
  );
}

export function Logo({ lang = "fr" }: { lang?: Lang }) {
  const t = getDictionary(lang);
  return (
    <Link
      href={t.homePath}
      className="group inline-flex items-center gap-2.5"
      aria-label={`${siteConfig.name} — ${t.nav.logo}`}
    >
      <StarMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45 motion-reduce:transition-none" />
      <span className="font-display text-xl font-semibold tracking-tight text-ink">{siteConfig.name}</span>
    </Link>
  );
}
