export type TrackPayload = {
  type: "pageview" | "event";
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  loadTimeMs?: number;
  scrollDepth?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  screenWidth?: number;
  screenHeight?: number;
  timezone?: string;
  language?: string;
  connectionType?: string;
  eventType?: string;
  eventName?: string;
  metadata?: Record<string, unknown>;
};

export type AnalyticsRange = "today" | "7d" | "30d" | "all";

export type DashboardStats = {
  visitors: number;
  sessions: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  liveVisitors: number;
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  topCountries: { country: string; count: number }[];
  topCities: { city: string; count: number }[];
  topBrowsers: { browser: string; count: number }[];
  topOs: { os: string; count: number }[];
  topDevices: { device: string; count: number }[];
  utmCampaigns: { campaign: string; count: number }[];
  dailyViews: { date: string; count: number }[];
  recentVisitors: RecentVisitor[];
};

export type RecentVisitor = {
  visitorId: string;
  sessionId: string;
  country: string | null;
  city: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  landingPage: string | null;
  referrer: string | null;
  pageCount: number;
  lastSeenAt: string;
  pages: { path: string; title: string | null; createdAt: string }[];
};
