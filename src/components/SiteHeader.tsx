import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { type NavItem, NavLinks } from "@/components/NavLinks";
import { mainNav } from "@/config/site";
import { getAllCategories, getAllDestinations } from "@/lib/content";

/** Ajoute aux rubriques leurs sous-pages (menus déroulants). */
function buildNav(): NavItem[] {
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

export function SiteHeader() {
  const nav = buildNav();
  return (
    <header className="header-scroll sticky top-0 z-40 border-b border-sand-deep/70 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <nav aria-label="Navigation principale" className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <NavLinks items={nav} />
          <Link
            href="/recherche"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sand md:inline-flex"
          >
            <span className="sr-only">Rechercher</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
          <MobileNav items={nav} />
        </div>
      </nav>
    </header>
  );
}
