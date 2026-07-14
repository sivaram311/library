import { getLibrary } from "./content";
import type { PackKind } from "./types";

export type SearchHit = {
  appSlug: string;
  appTitle: string;
  packSlug: string;
  packKind: PackKind;
  chapterSlug: string;
  title: string;
  summary: string;
  snippet: string;
};

function proseText(blocks: { type: string; markdown?: string; code?: string }[]): string {
  return blocks
    .map((b) => b.markdown || b.code || "")
    .join("\n")
    .replace(/[#*_`>\-\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchLibrary(query: string, limit = 40): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: SearchHit[] = [];
  for (const app of getLibrary().apps) {
    for (const pack of app.packs) {
      for (const chapter of pack.chapters) {
        if (chapter.status !== "published") continue;
        const body = proseText(chapter.blocks);
        const hay = `${chapter.title} ${chapter.summary || ""} ${body}`.toLowerCase();
        if (!hay.includes(q)) continue;
        const idx = body.toLowerCase().indexOf(q);
        const start = Math.max(0, idx - 40);
        const snippet =
          idx >= 0
            ? `${start > 0 ? "…" : ""}${body.slice(start, start + 120)}${start + 120 < body.length ? "…" : ""}`
            : chapter.summary || "";
        hits.push({
          appSlug: app.slug,
          appTitle: app.title,
          packSlug: pack.slug,
          packKind: pack.kind,
          chapterSlug: chapter.slug,
          title: chapter.title,
          summary: chapter.summary || "",
          snippet,
        });
        if (hits.length >= limit) return hits;
      }
    }
  }
  return hits;
}
