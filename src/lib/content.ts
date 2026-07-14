import libraryJson from "../../content/library.json";
import type { AppShelf, Chapter, LibraryContent, Pack } from "./types";

const library = libraryJson as LibraryContent;

export function getLibrary(): LibraryContent {
  return library;
}

export function listApps(): AppShelf[] {
  return library.apps;
}

export function getApp(appSlug: string): AppShelf | undefined {
  return library.apps.find((a) => a.slug === appSlug);
}

export function getPack(appSlug: string, packSlug: string): Pack | undefined {
  return getApp(appSlug)?.packs.find((p) => p.slug === packSlug || p.kind === packSlug);
}

export function getChapter(
  appSlug: string,
  packSlug: string,
  chapterSlug: string,
): Chapter | undefined {
  return getPack(appSlug, packSlug)?.chapters.find((c) => c.slug === chapterSlug);
}

export function publishedChapters(pack: Pack): Chapter[] {
  return [...pack.chapters]
    .filter((c) => c.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function packKindLabel(kind: string): string {
  switch (kind) {
    case "technical":
      return "Technical";
    case "functional":
      return "Functional";
    case "usage":
      return "Usage";
    default:
      return kind;
  }
}
