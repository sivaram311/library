import Link from "next/link";
import { LastRead } from "@/components/LastRead";
import { listApps, packKindLabel } from "@/lib/content";

export default function HomePage() {
  const apps = listApps();

  return (
    <div className="lib-enter mx-auto max-w-lg">
      <header className="pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lib-muted)]">
          Shelves
        </p>
        <h1 className="lib-display mt-1 text-[2.1rem] font-semibold tracking-tight">Library</h1>
        <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-[var(--lib-muted)]">
          Technical, functional, and usage docs — readable on your phone.
        </p>
      </header>

      <LastRead />

      <section className="mt-7 space-y-4" aria-label="App shelves">
        {apps.map((app) => (
          <article
            key={app.id}
            className="rounded-2xl bg-[var(--lib-card)] p-4 ring-1 ring-[var(--lib-line)]"
          >
            <Link href={`/${app.slug}`} className="block">
              <h2 className="lib-display text-xl font-semibold">{app.title}</h2>
              {app.summary ? (
                <p className="mt-1 text-[14px] leading-relaxed text-[var(--lib-muted)]">
                  {app.summary}
                </p>
              ) : null}
            </Link>
            <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {app.packs.map((pack) => (
                <li key={pack.id} className="shrink-0">
                  <Link
                    href={`/${app.slug}/${pack.slug}`}
                    className="flex min-h-11 items-center rounded-full bg-[var(--lib-accent-soft)] px-4 text-[14px] font-semibold text-[var(--lib-accent)]"
                  >
                    {packKindLabel(pack.kind)}
                    <span className="ml-2 text-[var(--lib-muted)]">
                      {pack.chapters.filter((c) => c.status === "published").length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
