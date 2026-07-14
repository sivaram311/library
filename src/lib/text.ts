import type { Block } from "./types";

/** Plain text for search / RAG / TTS. Closed block set only. */
export function blockPlainText(block: Block): string {
  switch (block.type) {
    case "prose":
    case "callout":
      return (block.markdown || "").replace(/[#*_`>\-\[\]()]/g, " ");
    case "checklist":
      return (block.items || []).join(". ");
    case "code":
      return block.code || "";
    case "image":
      return block.alt || "";
    case "deepLink":
      return block.label || block.href || "";
    case "divider":
      return "";
    default:
      return "";
  }
}

export function proseText(blocks: Block[]): string {
  return blocks
    .map(blockPlainText)
    .join("\n")
    .replace(/\s+/g, " ")
    .trim();
}

export function chapterSpeakText(title: string, blocks: Block[]): string {
  const body = blocks
    .filter((b) => b.type === "prose" || b.type === "callout" || b.type === "checklist")
    .map(blockPlainText)
    .join(". ");
  return `${title}. ${body}`.replace(/\s+/g, " ").trim();
}
