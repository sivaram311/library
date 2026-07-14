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
  await check("/ask");
  await check("/agentverse");
  await check("/agentverse/usage");
  const res = await fetch(`${base}/agentverse/usage`);
  const html = await res.text();
  const m = html.match(/href="(\/agentverse\/usage\/[^"]+)"/);
  if (!m) throw new Error("no usage chapter links on pack page");
  await check(m[1]);

  const ask = await fetch(`${base}/api/ask?q=${encodeURIComponent("desk")}`);
  if (!ask.ok) throw new Error(`/api/ask → ${ask.status}`);
  const askJson = await ask.json();
  if (!askJson.mode || !Array.isArray(askJson.citations)) {
    throw new Error("/api/ask bad shape");
  }
  if (askJson.citations.length && !askJson.citations[0].href?.startsWith("/")) {
    throw new Error("/api/ask citation href invalid");
  }
  console.log(`OK ask citations=${askJson.citations.length}`);

  const retrieve = await fetch(`${base}/api/retrieve?q=${encodeURIComponent("session")}`);
  if (!retrieve.ok) throw new Error(`/api/retrieve → ${retrieve.status}`);
  const retJson = await retrieve.json();
  if (!Array.isArray(retJson.hits)) throw new Error("/api/retrieve bad shape");
  console.log(`OK retrieve hits=${retJson.hits.length}`);

  console.log("SMOKE_PASS");
}

main().catch((e) => {
  console.error("SMOKE_FAIL", e.message || e);
  process.exit(1);
});
