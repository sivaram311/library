"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Last = { href: string; title: string; at: number };

export function LastRead() {
  const [last, setLast] = useState<Last | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("library:last-read");
      if (!raw) return;
      setLast(JSON.parse(raw) as Last);
    } catch {
      /* ignore */
    }
  }, []);

  if (!last) return null;

  return (
    <Link
      href={last.href}
      className="lib-enter mt-5 flex min-h-11 items-center justify-between gap-3 rounded-2xl bg-[var(--lib-card)] px-4 py-3 ring-1 ring-[var(--lib-line)]"
    >
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--lib-muted)]">
          Continue
        </div>
        <div className="mt-0.5 text-[15px] font-semibold leading-snug">{last.title}</div>
      </div>
      <span className="text-[var(--lib-accent)]" aria-hidden>
        →
      </span>
    </Link>
  );
}
