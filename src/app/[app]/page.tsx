import Link from "next/link";
import { notFound } from "next/navigation";
import { getApp, listApps, packKindLabel, publishedChapters } from "@/lib/content";

export function generateStaticParams() {
  return listApps().map((a) => ({ app: a.slug }));
}

export default async function AppShelfPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  return (
    <div className="lib-enter mx-auto max-w-lg">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-[14px] font-semibold text-[var(--lib-muted)]"
      >
        ← Library
      </Link>
      <header className="mt-1">
        <h1 className="lib-display text-[2rem] font-semibold tracking-tight">{app.title}</h1>
        {app.summary ? (
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--lib-muted)]">{app.summary}</p>
        ) : null}
      </header>

      <section className="mt-7 space-y-3" aria-label="Packs">
        {app.packs.map((pack) => {
          const count = publishedChapters(pack).length;
          return (
            <Link
              key={pack.id}
              href={`/${app.slug}/${pack.slug}`}
              className="block rounded-2xl bg-[var(--lib-card)] px-4 py-4 ring-1 ring-[var(--lib-line)] transition-transform active:scale-[0.99]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="lib-display text-xl font-semibold">
                  {packKindLabel(pack.kind)}
                </h2>
                <span className="text-xs font-semibold text-[var(--lib-muted)]">
                  {count} chapters
                </span>
              </div>
              {pack.summary ? (
                <p className="mt-1 text-[14px] leading-relaxed text-[var(--lib-muted)]">
                  {pack.summary}
                </p>
              ) : null}
            </Link>
          );
        })}
      </section>
    </div>
  );
}
