import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isDbConfigured } from "@/db";
import { exportAnalyticsCsv, getDashboardStats } from "@/lib/analytics/dashboard";
import type { AnalyticsRange } from "@/lib/analytics/types";

function parseRange(value: string | null): AnalyticsRange {
  if (value === "today" || value === "7d" || value === "30d" || value === "all") {
    return value;
  }
  return "7d";
}

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "Database not configured. Set DATABASE_URL in Vercel env vars." },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const range = parseRange(searchParams.get("range"));
  const format = searchParams.get("format");

  try {
    if (format === "csv") {
      const csv = await exportAnalyticsCsv(range);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="analytics-${range}.csv"`,
        },
      });
    }

    const stats = await getDashboardStats(range);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Analytics dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to load analytics. Run db:push to initialize tables." },
      { status: 500 }
    );
  }
}
