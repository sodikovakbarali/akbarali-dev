import {
  and,
  count,
  desc,
  eq,
  gte,
  isNotNull,
  ne,
  sql,
} from "drizzle-orm";
import { getDb } from "@/db";
import {
  analyticsPageViews,
  analyticsSessions,
  analyticsVisitors,
} from "@/db/schema";
import type { AnalyticsRange, DashboardStats } from "@/lib/analytics/types";

function rangeToDate(range: AnalyticsRange): Date | null {
  const now = new Date();
  switch (range) {
    case "today": {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return start;
    }
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "all":
      return null;
  }
}

export async function getDashboardStats(range: AnalyticsRange): Promise<DashboardStats> {
  const db = getDb();
  const since = rangeToDate(range);
  const pageViewWhere = since ? gte(analyticsPageViews.createdAt, since) : undefined;
  const sessionWhere = since ? gte(analyticsSessions.startedAt, since) : undefined;
  const visitorWhere = since ? gte(analyticsVisitors.lastSeenAt, since) : undefined;

  const [pageViewsResult] = await db
    .select({ count: count() })
    .from(analyticsPageViews)
    .where(pageViewWhere);

  const [sessionsResult] = await db
    .select({ count: count() })
    .from(analyticsSessions)
    .where(sessionWhere);

  const [visitorsResult] = await db
    .select({ count: count() })
    .from(analyticsVisitors)
    .where(and(visitorWhere, eq(analyticsVisitors.isBot, false)));

  const bounceSessions = await db
    .select({ count: count() })
    .from(analyticsSessions)
    .where(
      and(
        sessionWhere,
        eq(analyticsSessions.pageCount, 1)
      )
    );

  const sessionDurations = await db
    .select({
      duration: sql<number>`EXTRACT(EPOCH FROM (${analyticsSessions.lastActivityAt} - ${analyticsSessions.startedAt}))`,
    })
    .from(analyticsSessions)
    .where(sessionWhere);

  const liveCutoff = new Date(Date.now() - 5 * 60 * 1000);
  const [liveResult] = await db
    .select({ count: count() })
    .from(analyticsVisitors)
    .where(
      and(
        gte(analyticsVisitors.lastSeenAt, liveCutoff),
        eq(analyticsVisitors.isBot, false)
      )
    );

  const topPages = await db
    .select({ path: analyticsPageViews.path, count: count() })
    .from(analyticsPageViews)
    .where(pageViewWhere)
    .groupBy(analyticsPageViews.path)
    .orderBy(desc(count()))
    .limit(10);

  const topReferrers = await db
    .select({ referrer: analyticsSessions.referrer, count: count() })
    .from(analyticsSessions)
    .where(and(sessionWhere, isNotNull(analyticsSessions.referrer), ne(analyticsSessions.referrer, "")))
    .groupBy(analyticsSessions.referrer)
    .orderBy(desc(count()))
    .limit(10);

  const topCountries = await db
    .select({ country: analyticsVisitors.country, count: count() })
    .from(analyticsVisitors)
    .where(and(visitorWhere, isNotNull(analyticsVisitors.country)))
    .groupBy(analyticsVisitors.country)
    .orderBy(desc(count()))
    .limit(10);

  const topCities = await db
    .select({ city: analyticsVisitors.city, count: count() })
    .from(analyticsVisitors)
    .where(and(visitorWhere, isNotNull(analyticsVisitors.city)))
    .groupBy(analyticsVisitors.city)
    .orderBy(desc(count()))
    .limit(10);

  const topBrowsers = await db
    .select({ browser: analyticsVisitors.browser, count: count() })
    .from(analyticsVisitors)
    .where(and(visitorWhere, isNotNull(analyticsVisitors.browser)))
    .groupBy(analyticsVisitors.browser)
    .orderBy(desc(count()))
    .limit(8);

  const topOs = await db
    .select({ os: analyticsVisitors.os, count: count() })
    .from(analyticsVisitors)
    .where(and(visitorWhere, isNotNull(analyticsVisitors.os)))
    .groupBy(analyticsVisitors.os)
    .orderBy(desc(count()))
    .limit(8);

  const topDevices = await db
    .select({ device: analyticsVisitors.device, count: count() })
    .from(analyticsVisitors)
    .where(and(visitorWhere, isNotNull(analyticsVisitors.device)))
    .groupBy(analyticsVisitors.device)
    .orderBy(desc(count()))
    .limit(5);

  const utmCampaigns = await db
    .select({ campaign: analyticsSessions.utmCampaign, count: count() })
    .from(analyticsSessions)
    .where(and(sessionWhere, isNotNull(analyticsSessions.utmCampaign), ne(analyticsSessions.utmCampaign, "")))
    .groupBy(analyticsSessions.utmCampaign)
    .orderBy(desc(count()))
    .limit(10);

  const dailyViews = await db
    .select({
      date: sql<string>`to_char(${analyticsPageViews.createdAt}, 'YYYY-MM-DD')`,
      count: count(),
    })
    .from(analyticsPageViews)
    .where(pageViewWhere)
    .groupBy(sql`to_char(${analyticsPageViews.createdAt}, 'YYYY-MM-DD')`)
    .orderBy(sql`to_char(${analyticsPageViews.createdAt}, 'YYYY-MM-DD')`);

  const recentSessions = await db
    .select({
      sessionId: analyticsSessions.sessionId,
      visitorId: analyticsSessions.visitorId,
      landingPage: analyticsSessions.landingPage,
      referrer: analyticsSessions.referrer,
      pageCount: analyticsSessions.pageCount,
      lastActivityAt: analyticsSessions.lastActivityAt,
    })
    .from(analyticsSessions)
    .where(sessionWhere)
    .orderBy(desc(analyticsSessions.lastActivityAt))
    .limit(25);

  const recentVisitors = await Promise.all(
    recentSessions.map(async (session) => {
      const [visitor] = await db
        .select({
          country: analyticsVisitors.country,
          city: analyticsVisitors.city,
          browser: analyticsVisitors.browser,
          os: analyticsVisitors.os,
          device: analyticsVisitors.device,
        })
        .from(analyticsVisitors)
        .where(eq(analyticsVisitors.visitorId, session.visitorId))
        .limit(1);

      const pages = await db
        .select({
          path: analyticsPageViews.path,
          title: analyticsPageViews.title,
          createdAt: analyticsPageViews.createdAt,
        })
        .from(analyticsPageViews)
        .where(eq(analyticsPageViews.sessionId, session.sessionId))
        .orderBy(analyticsPageViews.createdAt)
        .limit(20);

      return {
        visitorId: session.visitorId,
        sessionId: session.sessionId,
        country: visitor?.country ?? null,
        city: visitor?.city ?? null,
        browser: visitor?.browser ?? null,
        os: visitor?.os ?? null,
        device: visitor?.device ?? null,
        landingPage: session.landingPage,
        referrer: session.referrer,
        pageCount: session.pageCount ?? 1,
        lastSeenAt: session.lastActivityAt.toISOString(),
        pages: pages.map((p) => ({
          path: p.path,
          title: p.title,
          createdAt: p.createdAt.toISOString(),
        })),
      };
    })
  );

  const totalSessions = sessionsResult?.count ?? 0;
  const bounceCount = bounceSessions[0]?.count ?? 0;
  const durations = sessionDurations.map((d) => Number(d.duration) || 0);
  const avgDuration =
    durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

  return {
    visitors: visitorsResult?.count ?? 0,
    sessions: totalSessions,
    pageViews: pageViewsResult?.count ?? 0,
    bounceRate: totalSessions > 0 ? (bounceCount / totalSessions) * 100 : 0,
    avgSessionDuration: avgDuration,
    liveVisitors: liveResult?.count ?? 0,
    topPages: topPages.map((p) => ({ path: p.path, count: p.count })),
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer ?? "Direct",
      count: r.count,
    })),
    topCountries: topCountries.map((c) => ({
      country: c.country ?? "Unknown",
      count: c.count,
    })),
    topCities: topCities.map((c) => ({
      city: c.city ?? "Unknown",
      count: c.count,
    })),
    topBrowsers: topBrowsers.map((b) => ({
      browser: b.browser ?? "Unknown",
      count: b.count,
    })),
    topOs: topOs.map((o) => ({
      os: o.os ?? "Unknown",
      count: o.count,
    })),
    topDevices: topDevices.map((d) => ({
      device: d.device ?? "Unknown",
      count: d.count,
    })),
    utmCampaigns: utmCampaigns.map((u) => ({
      campaign: u.campaign ?? "Unknown",
      count: u.count,
    })),
    dailyViews: dailyViews.map((d) => ({ date: d.date, count: d.count })),
    recentVisitors,
  };
}

export async function exportAnalyticsCsv(range: AnalyticsRange): Promise<string> {
  const db = getDb();
  const since = rangeToDate(range);
  const where = since ? gte(analyticsPageViews.createdAt, since) : undefined;

  const rows = await db
    .select({
      createdAt: analyticsPageViews.createdAt,
      path: analyticsPageViews.path,
      title: analyticsPageViews.title,
      visitorId: analyticsPageViews.visitorId,
      sessionId: analyticsPageViews.sessionId,
      referrer: analyticsPageViews.referrer,
      utmSource: analyticsPageViews.utmSource,
      utmCampaign: analyticsPageViews.utmCampaign,
    })
    .from(analyticsPageViews)
    .where(where)
    .orderBy(desc(analyticsPageViews.createdAt))
    .limit(5000);

  const header = "timestamp,path,title,visitor_id,session_id,referrer,utm_source,utm_campaign\n";
  const body = rows
    .map((r) =>
      [
        r.createdAt.toISOString(),
        `"${r.path.replace(/"/g, '""')}"`,
        `"${(r.title ?? "").replace(/"/g, '""')}"`,
        r.visitorId,
        r.sessionId,
        `"${(r.referrer ?? "").replace(/"/g, '""')}"`,
        r.utmSource ?? "",
        r.utmCampaign ?? "",
      ].join(",")
    )
    .join("\n");

  return header + body;
}
