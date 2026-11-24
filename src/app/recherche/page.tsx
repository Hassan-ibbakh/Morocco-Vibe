import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, PageHeader } from "@/components/PageHeader";
import { SearchClient } from "@/components/SearchClient";
import { getSearchIndex } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Rechercher",
  description: "Recherchez une destination ou un guide pour préparer votre voyage au Maroc.",
  path: "/recherche",
  // Les pages de résultats internes ne doivent pas être indexées.
  noindex: true,
});

export default function SearchPage() {
  const index = getSearchIndex();
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Recherche", href: "/recherche" }]} />
      <div className="mt-8">
        <PageHeader title="Rechercher" intro="Trouvez rapidement une destination ou un guide." />
      </div>
      <div className="mt-10">
        {/* useSearchParams() est lu dans le navigateur : la page reste statique. */}
        <Suspense fallback={<div className="h-14 max-w-2xl rounded-full bg-white" aria-hidden="true" />}>
          <SearchClient index={index} />
        </Suspense>
      </div>
    </Container>
  );
}
