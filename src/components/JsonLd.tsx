/**
 * Injecte des données structurées Schema.org. Le caractère « < » est échappé
 * pour éviter toute injection HTML (recommandation de la documentation Next.js).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
