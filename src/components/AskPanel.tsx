"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

type Citation = {
  title: string;
  href: string;
  chapterId: string;
  snippet: string;
};

type AskResponse = {
  answer: string;
  citations: Citation[];
  mode: string;
};

export function AskPanel({
  defaultAppSlug,
  autofocus,
}: {
  defaultAppSlug?: string;
  autofocus?: boolean;
}) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query, appSlug: defaultAppSlug }),
      });
      if (!res.ok) throw new Error(`Ask failed (${res.status})`);
      setResult((await res.json()) as AskResponse);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : "Ask failed");
    } finally {
      setLoading(false);
    }
  }, [q, defaultAppSlug]);

  return (
    <div className="mx-auto max-w-lg">
      <label className="block">
        <span className="sr-only">Ask the Library</span>
        <textarea
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask about AgentVerse docs…"
          autoFocus={autofocus}
          rows={3}
          className="w-full rounded-2xl border border-[var(--lib-line)] bg-[var(--lib-card)] px-4 py-3 text-[16px] leading-relaxed outline-none ring-[var(--lib-accent)] focus:ring-2"
        />
      </label>
      <button
        type="button"
        onClick={submit}
        disabled={loading || !q.trim()}
        className="mt-3 flex min-h-12 w-full items-center justify-center rounded-2xl bg-[var(--lib-ink)] text-[15px] font-semibold text-[var(--lib-paper)] disabled:opacity-50"
      >
        {loading ? "Thinking…" : "Ask"}
      </button>

      {error ? (
        <p className="mt-4 text-[14px] text-[var(--lib-warn)]" role="alert">
          {error}
        </p>
      ) : null}

      {result ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-[var(--lib-card)] px-4 py-4 ring-1 ring-[var(--lib-line)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--lib-muted)]">
              Answer · {result.mode}
            </p>
            <pre className="mt-2 whitespace-pre-wrap font-[var(--font-body)] text-[15px] leading-relaxed text-[var(--lib-ink)]">
              {result.answer}
            </pre>
          </div>
          {result.citations.length > 0 ? (
            <ul className="space-y-2" aria-label="Citations">
              {result.citations.map((c) => (
                <li key={c.chapterId}>
                  <Link
                    href={c.href}
                    className="block min-h-14 rounded-2xl bg-[var(--lib-accent-soft)] px-4 py-3"
                  >
                    <div className="text-[15px] font-semibold text-[var(--lib-accent)]">{c.title}</div>
                    <div className="mt-1 text-[13px] leading-relaxed text-[var(--lib-muted)] line-clamp-2">
                      {c.snippet}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
