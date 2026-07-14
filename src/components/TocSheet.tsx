"use client";

import Link from "next/link";
import { useEffect } from "react";

export type TocItem = {
  slug: string;
  title: string;
  href: string;
};

export function TocSheet({
  open,
  onClose,
  items,
  currentSlug,
}: {
  open: boolean;
  onClose: () => void;
  items: TocItem[];
  currentSlug: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`lib-sheet-backdrop ${open ? "open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`lib-sheet ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Table of contents"
        aria-hidden={!open}
      >
        <div className="lib-sheet-handle" />
        <div className="mb-3 flex items-center justify-between">
          <h2 className="lib-display text-lg font-semibold">Chapters</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 rounded-full text-[var(--lib-muted)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <ol className="max-h-[52dvh] space-y-1 overflow-y-auto overscroll-contain pb-2">
          {items.map((item, i) => {
            const active = item.slug === currentSlug;
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-[15px] leading-snug transition-colors ${
                    active
                      ? "bg-[var(--lib-accent-soft)] font-semibold text-[var(--lib-accent)]"
                      : "text-[var(--lib-ink)] active:bg-[var(--lib-paper-deep)]"
                  }`}
                >
                  <span className="w-6 shrink-0 text-xs text-[var(--lib-muted)]">{i + 1}</span>
                  <span className="line-clamp-2">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
