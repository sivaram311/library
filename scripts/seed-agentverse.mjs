/**
 * Compile AgentVerse markdown → content/library.json (structured Library graph).
 * Run: npm run seed
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const avRoot = path.resolve(root, "..", "..", "agentverse-project");
const outPath = path.join(root, "content", "library.json");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64) || "untitled";
}

function id(...parts) {
  return crypto.createHash("sha1").update(parts.join(":")).digest("hex").slice(0, 12);
}

function splitChapters(markdown, fileBase) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const chapters = [];
  let current = { title: fileBase, body: [] };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      if (current.body.length || chapters.length === 0) {
        chapters.push(current);
      }
      current = { title: h2[1].trim(), body: [] };
      continue;
    }
    if (chapters.length === 0 && line.match(/^#\s+(.+)$/)) {
      current.title = line.replace(/^#\s+/, "").trim();
      continue;
    }
    current.body.push(line);
  }
  chapters.push(current);

  return chapters
    .map((c) => ({
      title: c.title,
      body: c.body.join("\n").trim(),
    }))
    .filter((c) => c.body.length > 40 || c.title);
}

function chapterFromMd(appId, packKind, title, body, order) {
  const slug = slugify(title);
  const summary = body
    .split("\n")
    .map((l) => l.replace(/^[#>*\-\d.\s]+/, "").trim())
    .find((l) => l.length > 20)
    ?.slice(0, 140) || title;

  return {
    id: id(appId, packKind, slug, String(order)),
    slug,
    title,
    summary,
    status: "published",
    version: 1,
    updatedAt: new Date().toISOString(),
    order,
    blocks: [
      {
        id: id(appId, packKind, slug, "prose"),
        type: "prose",
        markdown: body,
      },
    ],
  };
}

function packFromFiles(appId, kind, title, summary, files) {
  const chapters = [];
  let order = 0;
  for (const file of files) {
    const abs = path.join(avRoot, file);
    if (!fs.existsSync(abs)) {
      console.warn("skip missing", file);
      continue;
    }
    const md = fs.readFileSync(abs, "utf8");
    const fileBase = path.basename(file, path.extname(file));
    const parts = splitChapters(md, fileBase);
    for (const part of parts) {
      const ch = chapterFromMd(appId, kind, part.title, part.body, order++);
      // prefer unique slugs
      const clashes = chapters.filter((c) => c.slug === ch.slug).length;
      if (clashes) ch.slug = `${ch.slug}-${clashes + 1}`;
      chapters.push(ch);
    }
  }
  return {
    id: id(appId, kind),
    slug: kind,
    kind,
    title,
    summary,
    chapters,
  };
}

const appId = "agentverse";
const library = {
  version: 1,
  apps: [
    {
      id: appId,
      slug: "agentverse",
      title: "AgentVerse",
      summary: "3D multi-agent office — Session Desk, deep-links, quests, Realme PWA.",
      packs: [
        packFromFiles(appId, "usage", "Usage", "How to run, operate, and deep-link AgentVerse day to day.", [
          "README.md",
          "docs/OPS.md",
          "docs/DEEP-LINK-CONTRACT.md",
          "docs/HANDOFF.md",
        ]),
        packFromFiles(appId, "functional", "Functional", "What the product does — journeys, vision, upgradation behavior.", [
          "agents/pre-work/01-vision-walkthrough.md",
          "agents/pre-work/waves/upgradation/01-vision.md",
          "docs/IMPLEMENTATION-GUIDE.md",
        ]),
        packFromFiles(appId, "technical", "Technical", "Architecture, promote, ports, and implementation map.", [
          "docs/IMPLEMENTATION-GUIDE.md",
          "docs/PROMOTE-UPGRADATION.md",
          "docs/PROJECT-WORKSPACE.md",
          "agents/pre-work/02-architecture.md",
        ]),
      ],
    },
  ],
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(library, null, 2) + "\n", "utf8");

const chapterCount = library.apps[0].packs.reduce((n, p) => n + p.chapters.length, 0);
console.log(`Wrote ${outPath} — ${library.apps.length} app, ${library.apps[0].packs.length} packs, ${chapterCount} chapters`);
