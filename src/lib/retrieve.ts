import { getLibrary } from "./content";
import { proseText } from "./text";
import type { PackKind } from "./types";

export type RetrieveHit = {
  chapterId: string;
  appSlug: string;
  appTitle: string;
  packSlug: string;
  packKind: PackKind;
  chapterSlug: string;
  title: string;
  summary: string;
  snippet: string;
  score: number;
  href: string;
};

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2);
}

function scoreText(query: string, title: string, summary: string, body: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const hay = `${title} ${summary} ${body}`.toLowerCase();
  let score = 0;
  if (hay.includes(q)) score += 40;
  if (title.toLowerCase().includes(q)) score += 30;
  const qTokens = tokenize(q);
  const titleTokens = new Set(tokenize(title));
  const bodyTokens = tokenize(body);
  const bodySet = new Set(bodyTokens);
  for (const t of qTokens) {
    if (titleTokens.has(t)) score += 8;
    if (bodySet.has(t)) score += 2;
  }
  return score;
}

function snippetFor(query: string, body: string, summary: string): string {
  const q = query.trim().toLowerCase();
  const idx = body.toLowerCase().indexOf(q);
  if (idx >= 0) {
    const start = Math.max(0, idx - 40);
    return `${start > 0 ? "…" : ""}${body.slice(start, start + 160)}${start + 160 < body.length ? "…" : ""}`;
  }
  const tokens = tokenize(q);
  for (const t of tokens) {
    const i = body.toLowerCase().indexOf(t);
    if (i >= 0) {
      const start = Math.max(0, i - 40);
      return `${start > 0 ? "…" : ""}${body.slice(start, start + 160)}${start + 160 < body.length ? "…" : ""}`;
    }
  }
  return summary || body.slice(0, 140);
}

export function retrieve(
  query: string,
  opts: { appSlug?: string; packSlug?: string; limit?: number } = {},
): RetrieveHit[] {
  const q = query.trim();
  if (!q) return [];
  const limit = opts.limit ?? 8;
  const hits: RetrieveHit[] = [];

  for (const app of getLibrary().apps) {
    if (opts.appSlug && app.slug !== opts.appSlug) continue;
    for (const pack of app.packs) {
      if (opts.packSlug && pack.slug !== opts.packSlug && pack.kind !== opts.packSlug) continue;
      for (const chapter of pack.chapters) {
        if (chapter.status !== "published") continue;
        const body = proseText(chapter.blocks);
        const score = scoreText(q, chapter.title, chapter.summary || "", body);
        if (score <= 0) continue;
        hits.push({
          chapterId: chapter.id,
          appSlug: app.slug,
          appTitle: app.title,
          packSlug: pack.slug,
          packKind: pack.kind,
          chapterSlug: chapter.slug,
          title: chapter.title,
          summary: chapter.summary || "",
          snippet: snippetFor(q, body, chapter.summary || ""),
          score,
          href: `/${app.slug}/${pack.slug}/${chapter.slug}`,
        });
      }
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
