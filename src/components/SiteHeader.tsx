import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { type NavItem, NavLinks } from "@/components/NavLinks";
import { mainNav } from "@/config/site";
import { getDictionary, type Lang } from "@/i18n";
import { getAllCategories, getAllDestinations } from "@/lib/content";

/** Rubriques et sous-pages (menus déroulants) de la version française. */
function buildNavFr(): NavItem[] {
  const destinations = getAllDestinations().map((d) => ({
    href: `/destinations/${d.slug}`,
    label: d.name,
    hint: d.region,
    image: d.cover.src,
  }));
  const categories = getAllCategories().map((c) => ({
    href: `/guides/categorie/${c.slug}`,
    label: c.name,
    hint: c.description,
  }));
  return mainNav.map((item) => {
    if (item.href === "/destinations") {
      return { ...item, children: destinations, allLabel: "Toutes les destinations" };
    }
    if (item.href === "/guides") return { ...item, children: categories, allLabel: "Tous les guides" };
    return item;
  });
}

/** Rubriques de la version anglaise : les catégories renvoient aux sections de la liste des guides. */
function buildNavEn(): NavItem[] {
  const categories = getAllCategories().map((c) => ({
    href: `/en/guides#${c.slug}`,
    label: c.nameEn ?? c.name,
    hint: c.descriptionEn ?? c.description,
  }));
  return [
    { href: "/en/guides", label: "Guides", children: categories, allLabel: "All guides" },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
  ];
}

export function SiteHeader({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const nav = lang === "en" ? buildNavEn() : buildNavFr();
  const other = t.otherLanguage;

  return (
    <header className="header-scroll sticky top-0 z-40 border-b border-sand-deep/70 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <nav
        aria-label={t.nav.label}
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo lang={lang} />
        <div className="flex items-center gap-2">
          <NavLinks items={nav} labels={{ open: t.nav.openSubmenu, close: t.nav.closeSubmenu }} />
          {lang === "fr" && (
            <Link
              href="/recherche"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sand md:inline-flex"
            >
              <span className="sr-only">{t.nav.search}</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
          )}
          {/* Sélecteur de langue : renvoie vers l'accueil de l'autre version. */}
          <Link
            href={other.lang === "en" ? "/en" : "/"}
            hrefLang={other.lang}
            lang={other.lang}
            aria-label={t.switchTo}
            className="inline-flex h-10 items-center rounded-full border border-sand-deep px-3 text-sm font-semibold text-ink transition hover:border-sea hover:text-sea"
          >
            {other.short}
          </Link>
          <MobileNav
            items={nav}
            labels={{ open: t.nav.openMenu, close: t.nav.closeMenu, search: lang === "fr" ? t.nav.search : undefined }}
          />
        </div>
      </nav>
    </header>
  );
}
