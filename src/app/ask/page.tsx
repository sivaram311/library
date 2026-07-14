import { AskPanel } from "@/components/AskPanel";

export default function AskPage() {
  return (
    <div className="lib-enter mx-auto max-w-lg pt-2">
      <header className="mb-5">
        <h1 className="lib-display text-[2rem] font-semibold tracking-tight">Ask</h1>
        <p className="mt-1 text-[15px] text-[var(--lib-muted)]">
          Grounded answers from published Library chapters (extractive RAG).
        </p>
      </header>
      <AskPanel autofocus />
    </div>
  );
}
