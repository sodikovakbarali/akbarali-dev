"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const VISITOR_KEY = "ak_analytics_vid";
const SESSION_KEY = "ak_analytics_sid";
const SESSION_TIMEOUT = 30 * 60 * 1000;

function getOrCreateId(key: string): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const stored = sessionStorage.getItem(SESSION_KEY);
  const ts = sessionStorage.getItem(`${SESSION_KEY}_ts`);
  const now = Date.now();
  if (stored && ts && now - Number(ts) < SESSION_TIMEOUT) {
    sessionStorage.setItem(`${SESSION_KEY}_ts`, String(now));
    return stored;
  }
  const id = crypto.randomUUID();
  sessionStorage.setItem(SESSION_KEY, id);
  sessionStorage.setItem(`${SESSION_KEY}_ts`, String(now));
  return id;
}

function getUtmParams(searchParams: URLSearchParams) {
  return {
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    utmTerm: searchParams.get("utm_term") ?? undefined,
    utmContent: searchParams.get("utm_content") ?? undefined,
  };
}

function getConnectionType(): string | undefined {
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string };
  };
  return nav.connection?.effectiveType;
}

async function sendTrack(payload: Record<string, unknown>) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Silent fail — analytics should never break the site
  }
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string | null>(null);
  const maxScroll = useRef(0);
  const loadStart = useRef<number>(Date.now());

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const visitorId = getOrCreateId(VISITOR_KEY);
    const sessionId = getSessionId();
    const utm = getUtmParams(searchParams);
    loadStart.current = Date.now();
    maxScroll.current = 0;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      maxScroll.current = Math.max(maxScroll.current, depth);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const trackPageView = () => {
      void sendTrack({
        type: "pageview",
        visitorId,
        sessionId,
        path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""),
        title: document.title,
        referrer: document.referrer || undefined,
        ...utm,
        loadTimeMs: Date.now() - loadStart.current,
        scrollDepth: maxScroll.current,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        connectionType: getConnectionType(),
      });
    };

    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      trackPageView();
    }

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const isOutbound = href.startsWith("http") && !href.includes(window.location.host);
      const isSocial = /telegram|github|linkedin|instagram|mailto:/i.test(href);
      if (isOutbound || isSocial) {
        void sendTrack({
          type: "event",
          visitorId,
          sessionId,
          path: pathname,
          eventType: isOutbound ? "outbound_click" : "social_click",
          eventName: href,
          metadata: { text: target.textContent?.slice(0, 100) },
        });
      }
    };

    document.addEventListener("click", onClick);

    const onUnload = () => {
      void sendTrack({
        type: "event",
        visitorId,
        sessionId,
        path: pathname,
        eventType: "engagement",
        eventName: "scroll_depth",
        metadata: { depth: maxScroll.current },
      });
    };

    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [pathname, searchParams]);

  return null;
}
