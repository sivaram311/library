import { retrieve, type RetrieveHit } from "./retrieve";

export type AskCitation = {
  title: string;
  href: string;
  chapterId: string;
  snippet: string;
};

export type AskResult = {
  answer: string;
  citations: AskCitation[];
  mode: "extractive";
  hits: RetrieveHit[];
};

export function askExtractive(
  query: string,
  opts: { appSlug?: string; packSlug?: string; k?: number } = {},
): AskResult {
  const hits = retrieve(query, { ...opts, limit: opts.k ?? 5 });
  if (hits.length === 0) {
    return {
      answer: "I could not find matching published chapters in the Library. Try different words or open Search.",
      citations: [],
      mode: "extractive",
      hits: [],
    };
  }

  const top = hits.slice(0, 3);
  const lines = top.map((h, i) => `(${i + 1}) ${h.title}: ${h.snippet}`);
  const answer = [
    `Based on ${top.length} published chapter${top.length === 1 ? "" : "s"} in the Library:`,
    ...lines,
    "Open a citation below to read the full chapter.",
  ].join("\n\n");

  return {
    answer,
    citations: top.map((h) => ({
      title: h.title,
      href: h.href,
      chapterId: h.chapterId,
      snippet: h.snippet,
    })),
    mode: "extractive",
    hits,
  };
}
