import Link from "next/link";
import { StarMark } from "@/components/Logo";
import { NewsletterForm } from "@/components/NewsletterForm";
import { newsletterConfig } from "@/config/newsletter";
import { legalNav, siteConfig } from "@/config/site";
import type { Lang } from "@/i18n";
import { getAllCategories, getAllDestinations } from "@/lib/content";
import { newsletterTexts } from "@/lib/newsletter";

type FooterLink = { href: string; label: string; lang?: Lang };
type FooterColumn = { id: string; title: string; links: FooterLink[] };

function columns(lang: Lang): FooterColumn[] {
  if (lang === "en") {
    return [
      {
        id: "footer-guides",
        title: "Guides",
        links: getAllCategories().map((c) => ({ href: `/en/guides#${c.slug}`, label: c.nameEn ?? c.name })),
      },
      {
        id: "footer-site",
        title: "The site",
        links: [
          { href: "/en/about", label: "About us" },
          { href: "/en/contact", label: "Contact" },
          { href: "/en/legal-notice", label: "Legal notice" },
          { href: "/en/privacy", label: "Privacy and cookies" },
          { href: "/en/credits", label: "Photo credits" },
          { href: "/", label: "Version française", lang: "fr" },
        ],
      },
    ];
  }
  return [
    {
      id: "footer-destinations",
      title: "Destinations",
      links: getAllDestinations().map((d) => ({ href: `/destinations/${d.slug}`, label: d.name })),
    },
    {
      id: "footer-guides",
      title: "Guides",
      links: getAllCategories().map((c) => ({ href: `/guides/categorie/${c.slug}`, label: c.name })),
    },
    {
      id: "footer-site",
      title: "Le site",
      links: [
        { href: "/a-propos", label: "À propos" },
        { href: "/contact", label: "Contact" },
        ...legalNav,
        { href: "/en", label: "English version", lang: "en" },
      ],
    },
  ];
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const linkClass = "text-paper/85 underline-offset-4 hover:text-sun hover:underline";
  const newsletter = newsletterTexts[lang];
  const tagline = lang === "en" ? "Practical guides for travelling in Morocco" : siteConfig.tagline;

  return (
    <footer className="mt-24 bg-sea-dark text-paper">
      <div aria-hidden="true" className="h-2 bg-[repeating-linear-gradient(90deg,#B4441F_0_24px,#F2C14E_24px_48px,#1F5C66_48px_72px)]" />

      {newsletterConfig.enabled && (
        <section aria-labelledby="newsletter-titre" className="border-b border-paper/15">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-8">
            <div>
              <h2 id="newsletter-titre" className="font-display text-2xl font-semibold text-sun sm:text-3xl">
                {newsletter.title}
              </h2>
              <p className="mt-2 max-w-md text-paper/85">{newsletter.intro}</p>
            </div>
            <NewsletterForm lang={lang} />
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-semibold">
            <StarMark className="h-7 w-7" />
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/85">{tagline}.</p>
        </div>

        {columns(lang).map((col) => (
          <nav key={col.id} aria-labelledby={col.id}>
            <h2 id={col.id} className="text-sm font-semibold tracking-widest text-sun uppercase">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} lang={l.lang} hrefLang={l.lang} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-paper/75 sm:px-6 lg:px-8">
          {lang === "en"
            ? `© ${siteConfig.name}. Practical information changes: always check it with official sources before you travel.`
            : `© ${siteConfig.name}. Les informations pratiques évoluent : vérifiez-les toujours auprès des sources officielles avant votre départ.`}
        </p>
      </div>
    </footer>
  );
}
