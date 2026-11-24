import Image from "next/image";
import { getPhotoBySrc, photos } from "@/content/photos";
import type { Lang } from "@/i18n";
import { getAllDestinations, getAllGuides } from "@/lib/content";

/** Liste des photos du site avec auteur, licence et source (page Crédits). */
export function PhotoCreditsList({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const list = Object.values(photos);
  // Photos ajoutées depuis le tableau de bord avec un crédit libre.
  const others = [...getAllDestinations(), ...getAllGuides("fr")].filter(
    (item) => item.cover.src && item.cover.credit && !getPhotoBySrc(item.cover.src),
  );
  const link = "text-sea underline underline-offset-2";

  return (
    <>
      <ul className="not-prose mt-8 grid gap-5 sm:grid-cols-2">
        {list.map((p) => (
          <li key={p.src} className="flex gap-4 rounded-2xl border border-sand-deep bg-white p-3">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-sand">
              <Image src={p.src} alt="" fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-semibold break-words text-ink">{p.title}</p>
              <p className="mt-1 text-ink-soft">
                {en ? "Author" : "Auteur"} : {p.author}
              </p>
              <p className="mt-1 text-ink-soft">
                <a href={p.licenseUrl} rel="license noopener noreferrer" target="_blank" className={link}>
                  {p.license}
                </a>
                {" · "}
                <a href={p.sourceUrl} rel="noopener noreferrer" target="_blank" className={link}>
                  Source
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
      {others.length > 0 && (
        <>
          <h2>{en ? "Other photos" : "Autres photos"}</h2>
          <ul>
            {others.map((item) => (
              <li key={item.slug}>
                {"title" in item ? item.title : item.name} — {item.cover.credit}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
