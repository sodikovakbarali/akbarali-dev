import { NextResponse } from "next/server";
import { isDbConfigured } from "@/db";
import { trackVisit } from "@/lib/analytics/track";
import type { TrackPayload } from "@/lib/analytics/types";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string, limit = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

function isValidPayload(body: unknown): body is TrackPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as Record<string, unknown>;
  return (
    (p.type === "pageview" || p.type === "event") &&
    typeof p.visitorId === "string" &&
    typeof p.sessionId === "string" &&
    typeof p.path === "string" &&
    p.visitorId.length <= 64 &&
    p.sessionId.length <= 64
  );
}

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const result = await trackVisit(body, request.headers);
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
