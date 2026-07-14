import { retrieve } from "./retrieve";
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

export function searchLibrary(query: string, limit = 40): SearchHit[] {
  return retrieve(query, { limit }).map((h) => ({
    appSlug: h.appSlug,
    appTitle: h.appTitle,
    packSlug: h.packSlug,
    packKind: h.packKind,
    chapterSlug: h.chapterSlug,
    title: h.title,
    summary: h.summary,
    snippet: h.snippet,
  }));
}
