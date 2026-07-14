"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BlockView } from "./BlockView";
import { ListenControls } from "./ListenControls";
import { TocSheet, type TocItem } from "./TocSheet";
import { chapterSpeakText } from "@/lib/text";
import type { Block } from "@/lib/types";

const LAST_READ_KEY = "library:last-read";

export function ChapterReader({
  appSlug,
  appTitle,
  packSlug,
  packTitle,
  chapterSlug,
  title,
  summary,
  blocks,
  toc,
  prevHref,
  nextHref,
}: {
  appSlug: string;
  appTitle: string;
  packSlug: string;
  packTitle: string;
  chapterSlug: string;
  title: string;
  summary?: string;
  blocks: Block[];
  toc: TocItem[];
  prevHref?: string;
  nextHref?: string;
}) {
  const [tocOpen, setTocOpen] = useState(false);
  const closeToc = useCallback(() => setTocOpen(false), []);
  const speakText = chapterSpeakText(title, blocks);

  useEffect(() => {
    try {
      localStorage.setItem(
        LAST_READ_KEY,
        JSON.stringify({
          href: `/${appSlug}/${packSlug}/${chapterSlug}`,
          title,
          at: Date.now(),
        }),
      );
    } catch {
      /* ignore */
    }
  }, [appSlug, packSlug, chapterSlug, title]);

  return (
    <article className="lib-enter mx-auto max-w-lg">
      <header className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lib-muted)]">
          {appTitle} · {packTitle}
        </p>
        <h1 className="lib-display text-[1.75rem] font-semibold leading-tight tracking-tight">
          {title}
        </h1>
        {summary ? (
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--lib-muted)]">{summary}</p>
        ) : null}
      </header>

      <div className="space-y-1">
        {blocks.map((block) => (
          <BlockView key={block.id} block={block} />
        ))}
      </div>

      <footer className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--lib-line)] pt-5">
        {prevHref ? (
          <Link
            href={prevHref}
            className="min-h-11 rounded-xl px-3 py-2 text-[15px] font-semibold text-[var(--lib-accent)]"
          >
            ← Prev
          </Link>
        ) : (
          <span />
        )}
        {nextHref ? (
          <Link
            href={nextHref}
            className="min-h-11 rounded-xl px-3 py-2 text-[15px] font-semibold text-[var(--lib-accent)]"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </footer>

      <ListenControls text={speakText} />

      <button
        type="button"
        onClick={() => setTocOpen(true)}
        className="fixed z-20 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--lib-ink)] text-sm font-semibold text-[var(--lib-paper)] shadow-lg transition-transform active:scale-95"
        style={{
          right: "max(24px, var(--lib-safe-right))",
          bottom: "calc(80px + var(--lib-safe-bottom))",
        }}
        aria-label="Open table of contents"
      >
        TOC
      </button>

      <TocSheet open={tocOpen} onClose={closeToc} items={toc} currentSlug={chapterSlug} />
    </article>
  );
}
