"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import type { SearchEntry } from "@/lib/content";
import { normalize } from "@/lib/format";

/**
 * Recherche instantanée côté navigateur dans un index statique.
 * La requête est reflétée dans l'URL (?q=) pour pouvoir partager le lien.
 */
export function SearchClient({ index }: { index: SearchEntry[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const inputId = useId();

  const prepared = useMemo(
    () => index.map((entry) => ({ entry, haystack: normalize(`${entry.title} ${entry.text}`) })),
    [index],
  );

  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
  const results = terms.length
    ? prepared
        .filter(({ haystack }) => terms.every((t) => haystack.includes(t)))
        .map(({ entry }) => entry)
    : [];

  function update(value: string) {
    setQuery(value);
    const next = value.trim() ? `${pathname}?q=${encodeURIComponent(value.trim())}` : pathname;
    router.replace(next, { scroll: false });
  }

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-2xl">
        <label htmlFor={inputId} className="block text-sm font-semibold text-ink">
          Rechercher une destination ou un guide
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-full border-2 border-ink/15 bg-white px-5 focus-within:border-sea">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => update(e.target.value)}
            placeholder="Ex. médina, désert, budget…"
            autoComplete="off"
            className="h-14 w-full bg-transparent text-lg text-ink placeholder:text-ink-soft/80 focus:outline-none"
          />
        </div>
      </form>

      <div aria-live="polite" className="mt-8">
        {terms.length === 0 ? (
          <p className="text-ink-soft">Saisissez au moins deux lettres pour lancer la recherche.</p>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sand-deep p-8">
            <p className="font-semibold text-ink">Aucun résultat pour « {query.trim()} ».</p>
            <p className="mt-2 text-ink-soft">
              Essayez un autre mot, ou parcourez{" "}
              <Link href="/destinations" className="text-sea underline underline-offset-4">
                toutes les destinations
              </Link>{" "}
              et{" "}
              <Link href="/guides" className="text-sea underline underline-offset-4">
                tous les guides
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-soft">
              {results.length} résultat{results.length > 1 ? "s" : ""}
            </p>
            <ul className="mt-4 divide-y divide-sand-deep">
              {results.map((r) => (
                <li key={r.href} className="py-5">
                  <p className="text-xs font-semibold tracking-wider text-terracotta uppercase">{r.meta}</p>
                  <h2 className="mt-1 font-display text-xl font-semibold">
                    <Link href={r.href} className="text-ink hover:text-sea">
                      {r.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-ink-soft">{r.excerpt}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
