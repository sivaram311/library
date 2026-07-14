import { NextResponse } from "next/server";
import { retrieve } from "@/lib/retrieve";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const appSlug = searchParams.get("app") || undefined;
  const packSlug = searchParams.get("pack") || undefined;
  const limit = Number(searchParams.get("limit") || "8");
  const hits = retrieve(q, { appSlug, packSlug, limit: Number.isFinite(limit) ? limit : 8 });
  return NextResponse.json({ q, hits });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    q?: string;
    appSlug?: string;
    packSlug?: string;
    limit?: number;
  };
  const hits = retrieve(body.q || "", {
    appSlug: body.appSlug,
    packSlug: body.packSlug,
    limit: body.limit,
  });
  return NextResponse.json({ q: body.q || "", hits });
}
