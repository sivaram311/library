import Link from "next/link";
import { notFound } from "next/navigation";
import { getApp, getPack, packKindLabel, publishedChapters } from "@/lib/content";

export default async function PackPage({
  params,
}: {
  params: Promise<{ app: string; pack: string }>;
}) {
  const { app: appSlug, pack: packSlug } = await params;
  const app = getApp(appSlug);
  const pack = getPack(appSlug, packSlug);
  if (!app || !pack) notFound();

  const chapters = publishedChapters(pack);

  return (
    <div className="lib-enter mx-auto max-w-lg">
      <Link
        href={`/${app.slug}`}
        className="inline-flex min-h-11 items-center text-[14px] font-semibold text-[var(--lib-muted)]"
      >
        ← {app.title}
      </Link>
      <header className="mt-1">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lib-muted)]">
          {app.title}
        </p>
        <h1 className="lib-display mt-1 text-[2rem] font-semibold tracking-tight">
          {packKindLabel(pack.kind)}
        </h1>
        {pack.summary ? (
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--lib-muted)]">{pack.summary}</p>
        ) : null}
      </header>

      <ol className="mt-7 space-y-2" aria-label="Chapters">
        {chapters.map((chapter, i) => (
          <li key={chapter.id}>
            <Link
              href={`/${app.slug}/${pack.slug}/${chapter.slug}`}
              className="flex min-h-14 items-start gap-3 rounded-2xl bg-[var(--lib-card)] px-4 py-3 ring-1 ring-[var(--lib-line)] transition-transform active:scale-[0.99]"
            >
              <span className="mt-0.5 w-6 shrink-0 text-xs font-semibold text-[var(--lib-muted)]">
                {i + 1}
              </span>
              <span>
                <span className="block text-[16px] font-semibold leading-snug">{chapter.title}</span>
                {chapter.summary ? (
                  <span className="mt-1 block text-[13px] leading-relaxed text-[var(--lib-muted)] line-clamp-2">
                    {chapter.summary}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
