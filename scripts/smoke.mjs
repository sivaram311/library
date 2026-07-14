const base = process.env.LIBRARY_URL || "http://127.0.0.1:3330";

async function check(path, expect = 200) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  if (res.status !== expect) {
    throw new Error(`${path} → ${res.status} (expected ${expect})`);
  }
  console.log(`OK ${res.status} ${path}`);
}

async function main() {
  await check("/");
  await check("/search");
  await check("/agentverse");
  await check("/agentverse/usage");
  // first chapter may vary — hit a known-stable slug from seed titles
  const res = await fetch(`${base}/agentverse/usage`);
  const html = await res.text();
  const m = html.match(/href="(\/agentverse\/usage\/[^"]+)"/);
  if (!m) throw new Error("no usage chapter links on pack page");
  await check(m[1]);
  console.log("SMOKE_PASS");
}

main().catch((e) => {
  console.error("SMOKE_FAIL", e.message || e);
  process.exit(1);
});
