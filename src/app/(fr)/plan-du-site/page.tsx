import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { legalNav, siteConfig } from "@/config/site";
import { getAllCategories, getAllDestinations, getGuidesByCategory } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Plan du site",
  description: `Toutes les pages de ${siteConfig.name} en un coup d'œil : destinations, guides classés par catégorie, informations pratiques et pages légales.`,
  path: "/plan-du-site",
});

export default function SitemapPage() {
  const destinations = getAllDestinations();
  const categories = getAllCategories();

  return (
    <TextPage
      title="Plan du site"
      path="/plan-du-site"
      intro="Retrouvez ici toutes les pages du site, classées par rubrique."
    >
      <h2>Pages principales</h2>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/destinations">Toutes les destinations</Link>
        </li>
        <li>
          <Link href="/guides">Tous les guides</Link>
        </li>
        <li>
          <Link href="/recherche">Rechercher</Link>
        </li>
      </ul>

      <h2>Destinations</h2>
      <ul>
        {destinations.map((d) => (
          <li key={d.slug}>
            <Link href={`/destinations/${d.slug}`}>{d.name}</Link> — {d.region}
          </li>
        ))}
      </ul>

      <h2>Guides par catégorie</h2>
      {categories.map((c) => {
        const guides = getGuidesByCategory(c.slug);
        return (
          <section key={c.slug} aria-labelledby={`plan-${c.slug}`}>
            <h3 id={`plan-${c.slug}`}>
              <Link href={`/guides/categorie/${c.slug}`}>{c.name}</Link>
            </h3>
            {guides.length > 0 ? (
              <ul>
                {guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Guides à venir.</p>
            )}
          </section>
        );
      })}

      <h2>Le site</h2>
      <ul>
        <li>
          <Link href="/a-propos">À propos</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <a href="/rss.xml">Flux RSS</a>
        </li>
        <li>
          <Link href="/en" hrefLang="en" lang="en">
            English version
          </Link>
        </li>
        {legalNav
          .filter((l) => l.href !== "/plan-du-site")
          .map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
      </ul>
    </TextPage>
  );
}
