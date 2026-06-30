import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  analyticsEvents,
  analyticsPageViews,
  analyticsSessions,
  analyticsVisitors,
} from "@/db/schema";
import { hashIp } from "@/lib/analytics/hash";
import { getClientIp, getGeoFromHeaders, parseUserAgent } from "@/lib/analytics/parse";
import type { TrackPayload } from "@/lib/analytics/types";

export async function trackVisit(
  payload: TrackPayload,
  headers: Headers
): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = getDb();
    const ua = headers.get("user-agent");
    const { browser, os, device, isBot } = parseUserAgent(ua);
    const ip = getClientIp(headers);
    const ipHash = ip ? hashIp(ip) : null;
    const geo = getGeoFromHeaders(headers);
    const now = new Date();

    await db
      .insert(analyticsVisitors)
      .values({
        visitorId: payload.visitorId,
        ipHash,
        userAgent: ua,
        browser,
        os,
        device,
        language: payload.language ?? headers.get("accept-language")?.split(",")[0],
        timezone: payload.timezone,
        country: geo.country,
        region: geo.region,
        city: geo.city,
        screenWidth: payload.screenWidth,
        screenHeight: payload.screenHeight,
        isBot,
        firstSeenAt: now,
        lastSeenAt: now,
      })
      .onConflictDoUpdate({
        target: analyticsVisitors.visitorId,
        set: {
          lastSeenAt: now,
          browser,
          os,
          device,
          language: payload.language ?? headers.get("accept-language")?.split(",")[0],
          timezone: payload.timezone ?? undefined,
          country: geo.country ?? undefined,
          region: geo.region ?? undefined,
          city: geo.city ?? undefined,
          screenWidth: payload.screenWidth ?? undefined,
          screenHeight: payload.screenHeight ?? undefined,
          isBot,
        },
      });

    if (payload.type === "pageview") {
      const existingSession = await db
        .select()
        .from(analyticsSessions)
        .where(eq(analyticsSessions.sessionId, payload.sessionId))
        .limit(1);

      if (existingSession.length === 0) {
        await db.insert(analyticsSessions).values({
          sessionId: payload.sessionId,
          visitorId: payload.visitorId,
          landingPage: payload.path,
          referrer: payload.referrer,
          utmSource: payload.utmSource,
          utmMedium: payload.utmMedium,
          utmCampaign: payload.utmCampaign,
          utmTerm: payload.utmTerm,
          utmContent: payload.utmContent,
          pageCount: 1,
          startedAt: now,
          lastActivityAt: now,
        });
      } else {
        await db
          .update(analyticsSessions)
          .set({
            pageCount: sql`${analyticsSessions.pageCount} + 1`,
            lastActivityAt: now,
          })
          .where(eq(analyticsSessions.sessionId, payload.sessionId));
      }

      await db.insert(analyticsPageViews).values({
        sessionId: payload.sessionId,
        visitorId: payload.visitorId,
        path: payload.path,
        title: payload.title,
        referrer: payload.referrer,
        utmSource: payload.utmSource,
        utmMedium: payload.utmMedium,
        utmCampaign: payload.utmCampaign,
        utmTerm: payload.utmTerm,
        utmContent: payload.utmContent,
        loadTimeMs: payload.loadTimeMs,
        scrollDepth: payload.scrollDepth,
        viewportWidth: payload.viewportWidth,
        viewportHeight: payload.viewportHeight,
        connectionType: payload.connectionType,
        createdAt: now,
      });
    }

    if (payload.type === "event" && payload.eventType && payload.eventName) {
      await db.insert(analyticsEvents).values({
        sessionId: payload.sessionId,
        visitorId: payload.visitorId,
        eventType: payload.eventType,
        eventName: payload.eventName,
        path: payload.path,
        metadata: payload.metadata ?? null,
        createdAt: now,
      });
    }

    return { ok: true };
  } catch (error) {
    console.error("Analytics track error:", error);
    return { ok: false, error: "Failed to track" };
  }
}
