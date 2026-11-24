"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";

export type NavChild = { href: string; label: string; hint?: string; image?: string };
export type NavItem = {
  href: string;
  label: string;
  /** Sous-pages affichées dans le menu déroulant. */
  children?: NavChild[];
  /** Libellé du lien « voir tout » en bas du menu déroulant. */
  allLabel?: string;
};

export const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Navigation principale (ordinateur) : liens et menus déroulants accessibles. */
export function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="hidden items-center gap-1 md:flex">
      {items.map((item) => (
        <li key={item.href} className="relative">
          {item.children?.length ? (
            <DropdownItem item={item} active={isActive(pathname, item.href)} />
          ) : (
            <TopLink item={item} active={isActive(pathname, item.href)} />
          )}
        </li>
      ))}
    </ul>
  );
}

function TopLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`nav-underline relative rounded-full px-3 py-2 text-[0.95rem] transition-colors hover:text-terracotta lg:px-4 ${
        active ? "font-semibold text-terracotta" : "text-ink"
      }`}
      data-active={active || undefined}
    >
      {item.label}
    </Link>
  );
}

/**
 * Lien + bouton d'ouverture du sous-menu. Le menu s'ouvre au survol, au clic
 * sur la flèche ou au clavier ; Échap le ferme et rend le focus au bouton.
 */
function DropdownItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };
  const close = () => setOpen(false);
  const withImages = item.children?.some((c) => c.image);

  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
      className="flex items-center"
    >
      <TopLink item={item} active={active} onClick={close} />
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-ml-2 inline-flex h-8 w-7 items-center justify-center rounded-full text-ink-soft hover:text-terracotta"
      >
        <span className="sr-only">
          {open ? "Fermer" : "Ouvrir"} le sous-menu {item.label}
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div
        id={panelId}
        data-open={open || undefined}
        className={`dropdown-panel absolute top-full left-1/2 z-50 pt-3 ${withImages ? "w-[34rem]" : "w-[26rem]"}`}
      >
        <div className="overflow-hidden rounded-2xl border border-sand-deep bg-paper shadow-[0_30px_60px_-30px_rgba(27,42,47,0.55)]">
          <ul className={`grid gap-1 p-3 ${withImages ? "grid-cols-2" : ""}`}>
            {item.children!.map((child, i) => (
              <li key={child.href} className="dropdown-item" style={{ "--i": i } as CSSProperties}>
                <Link
                  href={child.href}
                  onClick={close}
                  className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-sand"
                >
                  {child.image && (
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                      <Image
                        src={child.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink group-hover:text-terracotta">{child.label}</span>
                    {child.hint && <span className="block text-sm leading-snug text-ink-soft">{child.hint}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={item.href}
            onClick={close}
            className="group flex items-center justify-between border-t border-sand-deep bg-sand/60 px-5 py-3 text-sm font-semibold text-sea hover:text-terracotta"
          >
            {item.allLabel ?? `Tout voir : ${item.label}`}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
