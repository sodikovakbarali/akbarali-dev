import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const analyticsVisitors = pgTable(
  "analytics_visitors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visitorId: varchar("visitor_id", { length: 64 }).notNull().unique(),
    ipHash: varchar("ip_hash", { length: 64 }),
    userAgent: text("user_agent"),
    browser: varchar("browser", { length: 64 }),
    os: varchar("os", { length: 64 }),
    device: varchar("device", { length: 32 }),
    language: varchar("language", { length: 16 }),
    timezone: varchar("timezone", { length: 64 }),
    country: varchar("country", { length: 8 }),
    region: varchar("region", { length: 64 }),
    city: varchar("city", { length: 64 }),
    screenWidth: integer("screen_width"),
    screenHeight: integer("screen_height"),
    isBot: boolean("is_bot").default(false),
    firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("analytics_visitors_visitor_id_idx").on(table.visitorId),
    index("analytics_visitors_last_seen_idx").on(table.lastSeenAt),
    index("analytics_visitors_country_idx").on(table.country),
  ]
);

export const analyticsSessions = pgTable(
  "analytics_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: varchar("session_id", { length: 64 }).notNull().unique(),
    visitorId: varchar("visitor_id", { length: 64 }).notNull(),
    landingPage: text("landing_page"),
    referrer: text("referrer"),
    utmSource: varchar("utm_source", { length: 128 }),
    utmMedium: varchar("utm_medium", { length: 128 }),
    utmCampaign: varchar("utm_campaign", { length: 128 }),
    utmTerm: varchar("utm_term", { length: 128 }),
    utmContent: varchar("utm_content", { length: 128 }),
    pageCount: integer("page_count").default(1),
    startedAt: timestamp("started_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    lastActivityAt: timestamp("last_activity_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("analytics_sessions_session_id_idx").on(table.sessionId),
    index("analytics_sessions_visitor_id_idx").on(table.visitorId),
    index("analytics_sessions_started_at_idx").on(table.startedAt),
  ]
);

export const analyticsPageViews = pgTable(
  "analytics_page_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: varchar("session_id", { length: 64 }).notNull(),
    visitorId: varchar("visitor_id", { length: 64 }).notNull(),
    path: text("path").notNull(),
    title: text("title"),
    referrer: text("referrer"),
    utmSource: varchar("utm_source", { length: 128 }),
    utmMedium: varchar("utm_medium", { length: 128 }),
    utmCampaign: varchar("utm_campaign", { length: 128 }),
    utmTerm: varchar("utm_term", { length: 128 }),
    utmContent: varchar("utm_content", { length: 128 }),
    loadTimeMs: integer("load_time_ms"),
    scrollDepth: integer("scroll_depth"),
    viewportWidth: integer("viewport_width"),
    viewportHeight: integer("viewport_height"),
    connectionType: varchar("connection_type", { length: 32 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("analytics_page_views_session_id_idx").on(table.sessionId),
    index("analytics_page_views_visitor_id_idx").on(table.visitorId),
    index("analytics_page_views_path_idx").on(table.path),
    index("analytics_page_views_created_at_idx").on(table.createdAt),
  ]
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: varchar("session_id", { length: 64 }).notNull(),
    visitorId: varchar("visitor_id", { length: 64 }).notNull(),
    eventType: varchar("event_type", { length: 64 }).notNull(),
    eventName: varchar("event_name", { length: 128 }).notNull(),
    path: text("path"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("analytics_events_session_id_idx").on(table.sessionId),
    index("analytics_events_visitor_id_idx").on(table.visitorId),
    index("analytics_events_type_idx").on(table.eventType),
    index("analytics_events_created_at_idx").on(table.createdAt),
  ]
);

export type AnalyticsVisitor = typeof analyticsVisitors.$inferSelect;
export type AnalyticsSession = typeof analyticsSessions.$inferSelect;
export type AnalyticsPageView = typeof analyticsPageViews.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
