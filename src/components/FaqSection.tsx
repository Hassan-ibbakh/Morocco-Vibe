import { RichText } from "@/components/RichText";
import { getDictionary, type Lang } from "@/i18n";
import type { FaqItem } from "@/lib/types";

/**
 * Questions fréquentes en accordéons natifs (<details>) : accessibles au
 * clavier, lisibles sans JavaScript et indexables (le texte est dans la page).
 */
export function FaqSection({ items, lang }: { items: FaqItem[]; lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <section aria-labelledby="faq-titre" className="mt-12">
      <h2 id="faq-titre" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {t.faq}
      </h2>
      <div className="mt-6 divide-y divide-sand-deep overflow-hidden rounded-2xl border border-sand-deep bg-white">
        {items.map((item) => (
          <details key={item.question} className="faq-item group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink hover:bg-sand/50 [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand text-terracotta transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <div className="faq-answer px-5 pb-5 leading-relaxed text-ink-soft">
              <RichText text={item.answer} lang={lang} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
