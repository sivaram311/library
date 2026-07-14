import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lib-enter mx-auto max-w-lg py-16 text-center">
      <h1 className="lib-display text-2xl font-semibold">Not found</h1>
      <p className="mt-2 text-[var(--lib-muted)]">That shelf or chapter is not in the Library.</p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[var(--lib-ink)] px-5 font-semibold text-[var(--lib-paper)]"
      >
        Back to Library
      </Link>
    </div>
  );
}
