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
