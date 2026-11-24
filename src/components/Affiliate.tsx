import Link from "next/link";
import { affiliatePartners } from "@/config/monetization";
import type { Block } from "@/lib/types";

type AffiliateBlock = Extract<Block, { type: "affiliate" }>;

/**
 * Lien affilié : rel="sponsored" (exigé par Google pour les liens rémunérés)
 * et mention « lien partenaire » visible. Sans partenaire configuré, rien
 * n'est affiché en production ; un repère discret apparaît en développement.
 */
export function AffiliateCard({ block }: { block: AffiliateBlock }) {
  const partner = affiliatePartners[block.partner];

  if (!partner) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <p className="rounded-lg border border-dashed border-sand-deep p-4 text-sm text-ink-soft">
        Emplacement de lien partenaire « {block.partner} » — non configuré, masqué en production
        (voir src/config/monetization.ts).
      </p>
    );
  }

  return (
    <aside className="not-prose rounded-xl border border-sand-deep bg-white p-5" aria-label="Lien partenaire">
      <p className="text-xs font-semibold tracking-wider text-terracotta-dark uppercase">
        Lien partenaire
      </p>
      <a
        href={partner.buildUrl(block.url)}
        rel="sponsored nofollow noopener noreferrer"
        target="_blank"
        className="mt-1 inline-block font-display text-lg font-semibold text-sea underline underline-offset-4 hover:text-terracotta"
      >
        {block.label}
        <span className="sr-only"> (site partenaire, nouvel onglet)</span>
      </a>
      {block.description && <p className="mt-1 text-sm text-ink-soft">{block.description}</p>}
    </aside>
  );
}

/** Mention de transparence affichée en tête des articles contenant des liens affiliés. */
export function AffiliateDisclosure() {
  return (
    <p role="note" className="rounded-lg bg-sand px-4 py-3 text-sm text-ink">
      <strong className="font-semibold">Transparence :</strong> cet article contient des liens
      partenaires. Si vous réservez ou achetez via ces liens, nous pouvons percevoir une commission,
      sans surcoût pour vous. Cela n&apos;influence pas nos recommandations.{" "}
      <Link href="/transparence" className="text-sea underline underline-offset-4">
        En savoir plus
      </Link>
    </p>
  );
}
