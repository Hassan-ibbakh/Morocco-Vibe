import Link from "next/link";
import { StarMark } from "@/components/Logo";
import { legalNav, siteConfig } from "@/config/site";
import { getAllCategories, getAllDestinations } from "@/lib/content";

export function SiteFooter() {
  const destinations = getAllDestinations();
  const categories = getAllCategories();
  const linkClass = "text-paper/85 underline-offset-4 hover:text-sun hover:underline";

  return (
    <footer className="mt-24 bg-sea-dark text-paper">
      <div aria-hidden="true" className="h-2 bg-[repeating-linear-gradient(90deg,#B4441F_0_24px,#F2C14E_24px_48px,#1F5C66_48px_72px)]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="flex items-center gap-2 font-display text-xl font-semibold">
            <StarMark className="h-7 w-7" />
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/85">{siteConfig.tagline}.</p>
        </div>

        <nav aria-labelledby="footer-destinations">
          <h2 id="footer-destinations" className="text-sm font-semibold tracking-widest text-sun uppercase">
            Destinations
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className={linkClass}>
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-guides">
          <h2 id="footer-guides" className="text-sm font-semibold tracking-widest text-sun uppercase">
            Guides
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/guides/categorie/${c.slug}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-site">
          <h2 id="footer-site" className="text-sm font-semibold tracking-widest text-sun uppercase">
            Le site
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/a-propos" className={linkClass}>
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-paper/75 sm:px-6 lg:px-8">
          © {siteConfig.name}. Les informations pratiques évoluent : vérifiez-les toujours auprès des
          sources officielles avant votre départ.
        </p>
      </div>
    </footer>
  );
}
