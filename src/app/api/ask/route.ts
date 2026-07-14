import { NextResponse } from "next/server";
import { askExtractive } from "@/lib/ask";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const appSlug = searchParams.get("app") || undefined;
  const packSlug = searchParams.get("pack") || undefined;
  const k = Number(searchParams.get("k") || "5");
  const result = askExtractive(q, {
    appSlug,
    packSlug,
    k: Number.isFinite(k) ? k : 5,
  });
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    q?: string;
    appSlug?: string;
    packSlug?: string;
    k?: number;
  };
  const result = askExtractive(body.q || "", {
    appSlug: body.appSlug,
    packSlug: body.packSlug,
    k: body.k,
  });
  return NextResponse.json(result);
}
