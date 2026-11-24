import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  title: "Subscription confirmed",
  description: "Your subscription to the Morocco Vibe newsletter is confirmed. You will receive our new guides about Morocco by email. Unsubscribe in one click.",
  path: "/en/newsletter/thanks",
  noindex: true,
  ogImagePath: "/en/share-image.png",
});

/** Page d'arrivée après le clic sur le lien de confirmation de la newsletter. */
export default function NewsletterThanksPage() {
  return (
    <TextPage
      lang="en"
      title="Subscription confirmed"
      path="/en/newsletter/thanks"
      intro="Thank you! You will receive our new guides by email. Every email contains an unsubscribe link."
    >
      <p>
        In the meantime, browse <Link href="/en/guides">all our guides</Link>.
      </p>
    </TextPage>
  );
}
