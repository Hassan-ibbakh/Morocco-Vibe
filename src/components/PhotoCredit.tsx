import { getPhotoBySrc } from "@/content/photos";
import type { ImageRef } from "@/lib/types";

/**
 * Crédit d'une photo : auteur, licence (liée) et source. Exigé par les
 * licences Creative Commons BY / BY-SA. Rien n'est affiché sans crédit connu.
 */
export function PhotoCredit({ image, className = "" }: { image: ImageRef; className?: string }) {
  const photo = getPhotoBySrc(image.src);
  if (!photo && !image.credit) return null;
  const link = "underline underline-offset-2 hover:text-ink";
  return (
    <p className={`text-xs text-ink-soft ${className}`}>
      {photo ? (
        <>
          Photo : {photo.author} —{" "}
          <a href={photo.licenseUrl} rel="license noopener noreferrer" target="_blank" className={link}>
            {photo.license}
          </a>
          , via{" "}
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
