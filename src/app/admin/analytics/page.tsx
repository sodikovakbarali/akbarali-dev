import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export const metadata = {
  title: "Analytics | Admin",
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return <AnalyticsDashboard />;
}
