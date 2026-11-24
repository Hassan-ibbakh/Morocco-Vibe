import { getPhotoBySrc } from "@/content/photos";
import { getDictionary, type Lang } from "@/i18n";
import type { ImageRef } from "@/lib/types";

/**
 * Crédit d'une photo : auteur, licence (liée) et source. Exigé par les
 * licences Creative Commons BY / BY-SA. Rien n'est affiché sans crédit connu.
 */
export function PhotoCredit({
  image,
  className = "",
  lang = "fr",
}: {
  image: ImageRef;
  className?: string;
  lang?: Lang;
}) {
  const t = getDictionary(lang);
  const photo = getPhotoBySrc(image.src);
  if (!photo && !image.credit) return null;
  const link = "underline underline-offset-2 hover:text-ink";
  return (
    <p className={`text-xs text-ink-soft ${className}`}>
      {photo ? (
        <>
          {t.photo} {photo.author} —{" "}
          <a href={photo.licenseUrl} rel="license noopener noreferrer" target="_blank" className={link}>
            {photo.license}
          </a>
          , {t.via}{" "}
          <a href={photo.sourceUrl} rel="noopener noreferrer" target="_blank" className={link}>
            Wikimedia Commons
          </a>
        </>
      ) : (
        image.credit
      )}
    </p>
  );
}
