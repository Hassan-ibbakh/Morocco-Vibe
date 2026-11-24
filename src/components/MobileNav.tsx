"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { isActive, type NavItem } from "@/components/NavLinks";

/**
 * Menu mobile accessible : bouton avec aria-expanded, fermeture par Échap,
 * sous-pages (destinations, catégories) listées sous chaque rubrique.
 */
export type MobileNavLabels = { open: string; close: string; search?: string };

export function MobileNav({ items, labels }: { items: readonly NavItem[]; labels: MobileNavLabels }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand-deep text-ink"
      >
        <span className="sr-only">{open ? labels.close : labels.open}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="mobile-panel absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-sand-deep bg-paper shadow-lg"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="border-b border-sand-deep/60 last:border-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                  className={`block rounded-lg px-3 py-3 text-lg ${active ? "font-semibold text-terracotta" : "text-ink"}`}
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="grid grid-cols-2 gap-x-2 pb-3 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          onClick={close}
                          className={`block rounded-lg px-3 py-2 text-[0.95rem] ${
                            pathname === child.href ? "font-semibold text-terracotta" : "text-ink-soft"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          {labels.search && (
            <li>
              <Link href="/recherche" onClick={close} className="block rounded-lg px-3 py-3 text-lg text-ink">
                {labels.search}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
