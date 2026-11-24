/**
 * Bandeau signalant un contenu de démonstration. Il disparaît dès que
 * `demo: true` est retiré du contenu concerné.
 */
export function DemoNotice({ kind = "contenu" }: { kind?: string }) {
  return (
    <p
      role="note"
      className="rounded-lg border border-dashed border-terracotta/60 bg-sand px-4 py-3 text-sm text-ink"
    >
      <strong className="font-semibold text-terracotta-dark">Exemple de {kind}.</strong>{" "}
      Ce texte sert de modèle : il doit être réécrit et vérifié avant publication.
      Il n&apos;est pas proposé à l&apos;indexation des moteurs de recherche.
    </p>
  );
}

/** Bandeau des brouillons (`draft: true`), visibles seulement hors production. */
export function DraftNotice() {
  return (
    <p role="note" className="rounded-lg border border-dashed border-sea/60 bg-sea/10 px-4 py-3 text-sm text-ink">
      <strong className="font-semibold text-sea-dark">Brouillon.</strong> Cet article n&apos;apparaît pas
      sur le site en production. Retirez <code>draft: true</code> de son fichier pour le publier.
    </p>
  );
}
