import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Inscription confirmée",
  description: "Votre inscription à la newsletter de Morocco Vibe est confirmée. Vous recevrez nos nouveaux guides sur le Maroc par e-mail. Désinscription en un clic.",
  path: "/newsletter/merci",
  noindex: true,
});

/** Page d'arrivée après le clic sur le lien de confirmation de la newsletter. */
export default function NewsletterMerciPage() {
  return (
    <TextPage
      title="Inscription confirmée"
      path="/newsletter/merci"
      intro="Merci ! Vous recevrez nos nouveaux guides par e-mail. Chaque envoi contient un lien de désinscription."
    >
      <p>
        En attendant, découvrez <Link href="/guides">tous nos guides</Link>.
      </p>
    </TextPage>
  );
}
