import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/ChapterReader";
import {
  getApp,
  getChapter,
  getPack,
  packKindLabel,
  publishedChapters,
} from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; pack: string; chapter: string }>;
}): Promise<Metadata> {
  const { app, pack, chapter } = await params;
  const ch = getChapter(app, pack, chapter);
  return { title: ch?.title || "Chapter" };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ app: string; pack: string; chapter: string }>;
}) {
  const { app: appSlug, pack: packSlug, chapter: chapterSlug } = await params;
  const app = getApp(appSlug);
  const pack = getPack(appSlug, packSlug);
  const chapter = getChapter(appSlug, packSlug, chapterSlug);
  if (!app || !pack || !chapter || chapter.status !== "published") notFound();

  const chapters = publishedChapters(pack);
  const idx = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = idx > 0 ? chapters[idx - 1] : undefined;
  const next = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : undefined;

  const toc = chapters.map((c) => ({
    slug: c.slug,
    title: c.title,
    href: `/${app.slug}/${pack.slug}/${c.slug}`,
  }));

  return (
    <ChapterReader
      appSlug={app.slug}
      appTitle={app.title}
      packSlug={pack.slug}
      packTitle={packKindLabel(pack.kind)}
      chapterSlug={chapter.slug}
      title={chapter.title}
      summary={chapter.summary}
      blocks={chapter.blocks}
      toc={toc}
      prevHref={prev ? `/${app.slug}/${pack.slug}/${prev.slug}` : undefined}
      nextHref={next ? `/${app.slug}/${pack.slug}/${next.slug}` : undefined}
    />
  );
}
