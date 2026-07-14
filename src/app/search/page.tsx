"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchLibrary } from "@/lib/search";
import { packKindLabel } from "@/lib/content";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchLibrary(q), [q]);

  return (
    <div className="lib-enter mx-auto max-w-lg">
      <header className="pt-2">
        <h1 className="lib-display text-[2rem] font-semibold tracking-tight">Search</h1>
        <p className="mt-1 text-[15px] text-[var(--lib-muted)]">Titles and chapter prose</p>
      </header>

      <label className="mt-5 block">
        <span className="sr-only">Search query</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try desk, deep-link, promote…"
          autoFocus
          className="min-h-12 w-full rounded-2xl border border-[var(--lib-line)] bg-[var(--lib-card)] px-4 text-[16px] outline-none ring-[var(--lib-accent)] focus:ring-2"
          type="search"
          enterKeyHint="search"
        />
      </label>

      <ul className="mt-5 space-y-2" aria-live="polite">
        {!q.trim() ? (
          <li className="py-6 text-center text-[14px] text-[var(--lib-muted)]">
            Type to search across shelves
          </li>
        ) : hits.length === 0 ? (
          <li className="py-6 text-center text-[14px] text-[var(--lib-muted)]">No matches</li>
        ) : (
          hits.map((hit) => (
            <li key={`${hit.appSlug}-${hit.packSlug}-${hit.chapterSlug}`}>
              <Link
                href={`/${hit.appSlug}/${hit.packSlug}/${hit.chapterSlug}`}
                className="block rounded-2xl bg-[var(--lib-card)] px-4 py-3 ring-1 ring-[var(--lib-line)]"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--lib-muted)]">
                  {hit.appTitle} · {packKindLabel(hit.packKind)}
                </div>
                <div className="mt-1 text-[16px] font-semibold leading-snug">{hit.title}</div>
                {hit.snippet ? (
                  <div className="mt-1 text-[13px] leading-relaxed text-[var(--lib-muted)] line-clamp-2">
                    {hit.snippet}
                  </div>
                ) : null}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
