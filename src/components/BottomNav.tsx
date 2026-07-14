"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Library", match: (p: string) => p === "/" || !p.startsWith("/search") },
  { href: "/search", label: "Search", match: (p: string) => p.startsWith("/search") },
] as const;

export function BottomNav() {
  const pathname = usePathname() || "/";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--lib-line)] bg-[color-mix(in_srgb,var(--lib-card)_92%,transparent)] backdrop-blur-md"
      style={{ paddingBottom: "var(--lib-safe-bottom)" }}
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {items.map((item) => {
          const active = item.match(pathname);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-11 items-center justify-center text-[15px] font-semibold tracking-wide transition-colors ${
                  active ? "text-[var(--lib-accent)]" : "text-[var(--lib-muted)]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
