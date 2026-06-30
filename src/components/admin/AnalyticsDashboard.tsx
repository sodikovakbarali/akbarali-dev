"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  DailyChart,
  RankList,
  StatCard,
} from "@/components/admin/AnalyticsWidgets";
import { cn } from "@/lib/utils";
import type { AnalyticsRange, DashboardStats } from "@/lib/analytics/types";

const ranges: { id: AnalyticsRange; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "all", label: "All time" },
];

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<AnalyticsRange>("7d");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to load analytics");
      }
      const data = (await res.json()) as DashboardStats;
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    void load();
    const interval = setInterval(() => void load(), 60_000);
    return () => clearInterval(interval);
  }, [load]);

  const exportCsv = () => {
    window.location.href = `/api/admin/analytics?range=${range}&format=csv`;
  };

  return (
    <AdminShell
      title="Traffic intelligence"
      description="Visitor metadata, sessions, referrers, and engagement across akbaralidev.uz"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {ranges.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "border-2 border-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                range === r.id
                  ? "bg-stamp text-primary-foreground"
                  : "bg-paper text-foreground hover:bg-secondary"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="border-2 border-foreground bg-paper px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-secondary"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="border-2 border-foreground bg-navy px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent-foreground hover:opacity-90"
          >
            Export CSV
          </button>
        </div>
      </div>

      {loading && !stats && (
        <p className="font-mono text-sm text-muted-foreground">Loading analytics…</p>
      )}

      {error && (
        <div className="mb-6 border-2 border-stamp bg-paper p-4 text-sm text-stamp">
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard label="Visitors" value={stats.visitors} accent="stamp" />
            <StatCard label="Sessions" value={stats.sessions} accent="navy" />
            <StatCard label="Page views" value={stats.pageViews} accent="teal" />
            <StatCard
              label="Bounce rate"
              value={`${stats.bounceRate.toFixed(1)}%`}
              hint="Single-page sessions"
            />
            <StatCard
              label="Avg session"
              value={formatDuration(stats.avgSessionDuration)}
            />
            <StatCard
              label="Live now"
              value={stats.liveVisitors}
              hint="Last 5 minutes"
              accent="teal"
            />
          </div>

          <div className="mb-8">
            <DailyChart data={stats.dailyViews} />
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <RankList
              title="Top pages"
              items={stats.topPages.map((p) => ({ label: p.path, count: p.count }))}
            />
            <RankList
              title="Top referrers"
              items={stats.topReferrers.map((r) => ({
                label: r.referrer,
                count: r.count,
              }))}
            />
            <RankList
              title="UTM campaigns"
              items={stats.utmCampaigns.map((u) => ({
                label: u.campaign,
                count: u.count,
              }))}
            />
            <RankList
              title="Countries"
              items={stats.topCountries.map((c) => ({
                label: c.country,
                count: c.count,
              }))}
            />
            <RankList
              title="Cities"
              items={stats.topCities.map((c) => ({
                label: c.city,
                count: c.count,
              }))}
            />
            <RankList
              title="Browsers"
              items={stats.topBrowsers.map((b) => ({
                label: b.browser,
                count: b.count,
              }))}
            />
            <RankList
              title="Operating systems"
              items={stats.topOs.map((o) => ({ label: o.os, count: o.count }))}
            />
            <RankList
              title="Devices"
              items={stats.topDevices.map((d) => ({
                label: d.device,
                count: d.count,
              }))}
            />
          </div>

          <section className="border-2 border-foreground bg-paper">
            <div className="border-b-2 border-foreground px-5 py-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Recent sessions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <th className="px-5 py-3">When</th>
                    <th className="px-5 py-3">Location</th>
                    <th className="px-5 py-3">Device</th>
                    <th className="px-5 py-3">Landing</th>
                    <th className="px-5 py-3">Referrer</th>
                    <th className="px-5 py-3">Pages</th>
                    <th className="px-5 py-3">Journey</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentVisitors.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-muted-foreground">
                        No sessions recorded yet. Visit the public site to generate data.
                      </td>
                    </tr>
                  )}
                  {stats.recentVisitors.map((v) => (
                    <tr key={v.sessionId} className="border-b border-border align-top">
                      <td className="px-5 py-4 font-mono text-xs whitespace-nowrap">
                        {new Date(v.lastSeenAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        {[v.city, v.country].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className="block">{v.browser ?? "—"}</span>
                        <span className="text-xs text-muted-foreground">
                          {[v.os, v.device].filter(Boolean).join(" · ")}
                        </span>
                      </td>
                      <td className="max-w-[120px] truncate px-5 py-4" title={v.landingPage ?? ""}>
                        {v.landingPage ?? "—"}
                      </td>
                      <td className="max-w-[120px] truncate px-5 py-4" title={v.referrer ?? ""}>
                        {v.referrer || "Direct"}
                      </td>
                      <td className="px-5 py-4 font-mono tabular-nums">{v.pageCount}</td>
                      <td className="px-5 py-4">
                        <ul className="space-y-1 text-xs">
                          {v.pages.map((p, i) => (
                            <li key={`${p.path}-${i}`} className="truncate max-w-[200px]" title={p.path}>
                              {p.path}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </AdminShell>
  );
}
