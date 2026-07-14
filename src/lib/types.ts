export type PackKind = "technical" | "functional" | "usage";
export type ChapterStatus = "draft" | "published";
export type BlockType =
  | "prose"
  | "callout"
  | "checklist"
  | "code"
  | "image"
  | "deepLink"
  | "divider";

export type Block = {
  id: string;
  type: BlockType;
  markdown?: string;
  tone?: "note" | "warn" | "tip";
  items?: string[];
  language?: string;
  code?: string;
  src?: string;
  alt?: string;
  href?: string;
  label?: string;
};

export type Chapter = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  status: ChapterStatus;
  version: number;
  updatedAt?: string;
  order: number;
  blocks: Block[];
};

export type Pack = {
  id: string;
  slug: string;
  kind: PackKind;
  title: string;
  summary?: string;
  chapters: Chapter[];
};

export type AppShelf = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  packs: Pack[];
};

export type LibraryContent = {
  version: number;
  apps: AppShelf[];
};
