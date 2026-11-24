import { siteConfig } from "@/config/site";
import { getAllGuides, getCategory } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rfc822 = (isoDate: string) => new Date(`${isoDate}T08:00:00Z`).toUTCString();

/**
 * Flux RSS des guides publiés (généré au build). Les contenus d'exemple
 * (`demo: true`) n'y figurent pas, comme dans le sitemap.
 */
export function GET() {
  const guides = getAllGuides().filter((g) => !g.demo);
  const items = guides
    .map((g) => {
      const url = absoluteUrl(`/guides/${g.slug}`);
      return `    <item>
      <title>${escape(g.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(g.description)}</description>
      <category>${escape(getCategory(g.category)?.name ?? "")}</category>
      <pubDate>${rfc822(g.publishedAt)}</pubDate>
    </item>`;
    })
    .join("\n");
  const latest = guides[0]?.updatedAt ?? guides[0]?.publishedAt;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escape(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />${
      latest ? `\n    <lastBuildDate>${rfc822(latest)}</lastBuildDate>` : ""
    }
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
