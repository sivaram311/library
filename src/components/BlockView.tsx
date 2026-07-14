import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Block } from "@/lib/types";

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <div className="lib-reader">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.markdown || ""}</ReactMarkdown>
        </div>
      );
    case "callout":
      return (
        <aside
          className="my-4 rounded-xl px-4 py-3 text-[15px] leading-relaxed"
          style={{
            background: block.tone === "warn" ? "var(--lib-warn-bg)" : "var(--lib-accent-soft)",
            color: block.tone === "warn" ? "var(--lib-warn)" : "var(--lib-ink)",
          }}
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-80">
            {block.tone || "note"}
          </div>
          <div className="lib-reader !text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.markdown || ""}</ReactMarkdown>
          </div>
        </aside>
      );
    case "checklist":
      return (
        <ul className="my-4 space-y-2">
          {(block.items || []).map((item) => (
            <li
              key={item}
              className="flex min-h-11 items-start gap-3 rounded-xl bg-[var(--lib-card)] px-3 py-2.5 text-[15px] leading-snug ring-1 ring-[var(--lib-line)]"
            >
              <span
                className="mt-0.5 inline-block h-5 w-5 shrink-0 rounded-md border-2 border-[var(--lib-accent)]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="my-4 overflow-x-auto rounded-[10px] bg-[#1c2b24] px-4 py-3.5 text-[0.86rem] leading-relaxed text-[#e8f0ec]">
          <code>{block.code || ""}</code>
        </pre>
      );
    case "image":
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.src}
          alt={block.alt || ""}
          className="my-4 w-full rounded-xl ring-1 ring-[var(--lib-line)]"
        />
      );
    case "deepLink":
      return (
        <a
          href={block.href}
          className="my-4 flex min-h-11 items-center justify-between gap-3 rounded-xl bg-[var(--lib-accent-soft)] px-4 py-3 text-[15px] font-semibold text-[var(--lib-accent)]"
          target="_blank"
          rel="noreferrer"
        >
          <span>{block.label || block.href}</span>
          <span aria-hidden>↗</span>
        </a>
      );
    case "divider":
      return <hr className="my-8 border-[var(--lib-line)]" />;
    default:
      return null;
  }
}
