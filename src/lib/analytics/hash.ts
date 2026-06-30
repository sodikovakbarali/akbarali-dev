import { createHash } from "crypto";

export function hashIp(ip: string): string {
  const salt = process.env.ANALYTICS_IP_SALT ?? "akbarali-dev-analytics";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
