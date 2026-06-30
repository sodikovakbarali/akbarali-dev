export function parseUserAgent(ua: string | null): {
  browser: string;
  os: string;
  device: string;
  isBot: boolean;
} {
  if (!ua) {
    return { browser: "Unknown", os: "Unknown", device: "desktop", isBot: false };
  }

  const lower = ua.toLowerCase();
  const isBot =
    /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegrambot|preview|lighthouse|headless/i.test(
      ua
    );

  let browser = "Unknown";
  if (lower.includes("edg/")) browser = "Edge";
  else if (lower.includes("chrome/") && !lower.includes("chromium")) browser = "Chrome";
  else if (lower.includes("firefox/")) browser = "Firefox";
  else if (lower.includes("safari/") && !lower.includes("chrome")) browser = "Safari";
  else if (lower.includes("opera") || lower.includes("opr/")) browser = "Opera";

  let os = "Unknown";
  if (lower.includes("windows")) os = "Windows";
  else if (lower.includes("mac os") || lower.includes("macintosh")) os = "macOS";
  else if (lower.includes("iphone") || lower.includes("ipad")) os = "iOS";
  else if (lower.includes("android")) os = "Android";
  else if (lower.includes("linux")) os = "Linux";

  let device = "desktop";
  if (/mobile|iphone|android.*mobile/i.test(ua)) device = "mobile";
  else if (/ipad|tablet/i.test(ua)) device = "tablet";

  return { browser, os, device, isBot };
}

export function getClientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return headers.get("x-real-ip");
}

export function getGeoFromHeaders(headers: Headers) {
  return {
    country: headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry"),
    region:
      headers.get("x-vercel-ip-country-region") ??
      headers.get("x-vercel-ip-region"),
    city: headers.get("x-vercel-ip-city"),
  };
}
