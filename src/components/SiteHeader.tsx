import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { NavLinks } from "@/components/NavLinks";
import { mainNav } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-deep/70 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <nav aria-label="Navigation principale" className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <NavLinks items={mainNav} />
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
          <MobileNav items={mainNav} />
        </div>
      </nav>
    </header>
  );
}
