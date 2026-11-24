import type { Metadata } from "next";
import Image from "next/image";
import { TextPage } from "@/components/TextPage";
import { getPhotoBySrc, photos } from "@/content/photos";
import { getAllDestinations, getAllGuides } from "@/lib/content";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Crédits photos",
  description: `Auteurs, licences et sources des photos utilisées sur ${siteConfig.name}. Toutes sont publiées sous licence libre (Creative Commons ou domaine public).`,
  path: "/credits",
});

export default function CreditsPage() {
  const list = Object.values(photos);
  // Photos ajoutées depuis le tableau de bord avec un crédit libre.
  const others = [...getAllDestinations(), ...getAllGuides()].filter(
    (item) => item.cover.src && item.cover.credit && !getPhotoBySrc(item.cover.src),
  );
  return (
    <TextPage
      title="Crédits photos"
      path="/credits"
      intro="Merci aux photographes qui publient leurs images sous licence libre. Chaque photo est utilisée dans le respect de sa licence."
    >
      <p>
        Les photos sous licence CC BY-SA restent sous cette même licence : vous pouvez les réutiliser en
        citant leur auteur et en conservant la licence. Les photos sous CC0 sont dans le domaine public.
      </p>
      <ul className="not-prose mt-8 grid gap-5 sm:grid-cols-2">
        {list.map((p) => (
          <li key={p.src} className="flex gap-4 rounded-2xl border border-sand-deep bg-white p-3">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-sand">
              <Image src={p.src} alt="" fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-semibold break-words text-ink">{p.title}</p>
              <p className="mt-1 text-ink-soft">Auteur : {p.author}</p>
              <p className="mt-1 text-ink-soft">
                <a href={p.licenseUrl} rel="license noopener noreferrer" target="_blank" className="text-sea underline underline-offset-2">
                  {p.license}
                </a>
                {" · "}
                <a href={p.sourceUrl} rel="noopener noreferrer" target="_blank" className="text-sea underline underline-offset-2">
                  Source
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
      {others.length > 0 && (
        <>
          <h2>Autres photos</h2>
          <ul>
            {others.map((item) => (
              <li key={item.slug}>
                {"title" in item ? item.title : item.name} — {item.cover.credit}
              </li>
            ))}
          </ul>
        </>
      )}
    </TextPage>
  );
}
