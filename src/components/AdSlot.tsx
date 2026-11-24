import { adsConfig } from "@/config/monetization";

/**
 * Emplacement publicitaire réservé.
 * - Désactivé (rendu nul) tant que NEXT_PUBLIC_ADS_ENABLED et
 *   NEXT_PUBLIC_ADS_CLIENT_ID ne sont pas définis.
 * - Une fois activé, il réserve l'espace (évite les décalages de mise en page)
 *   et expose les attributs dont un script de régie aura besoin. Aucun script
 *   n'est chargé ici : l'intégration doit passer par une plateforme de
 *   consentement (CMP) conforme, voir README.
 */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  if (!adsConfig.enabled) return null;
  return (
    <aside
      aria-label="Publicité"
      className={`my-10 flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-sand-deep bg-sand/50 ${className}`}
    >
      <span className="mb-2 text-[0.7rem] tracking-widest text-ink-soft uppercase">Publicité</span>
      <div data-ad-client={adsConfig.clientId} data-ad-slot={slot} className="w-full" />
    </aside>
  );
}
