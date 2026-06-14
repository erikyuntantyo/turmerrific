import { generatePageMetadata } from "@/server/seo/seo";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { statCards, recentActivity } from "@/features/dashboard/server/mock-data";
import { OverviewChart } from "@/features/dashboard/components/overview-chart";

const metricAccents = [
  "var(--metric-blue)",
  "var(--metric-green)",
  "var(--metric-orange)",
  "var(--metric-yellow)",
];

export const dynamic = "force-static";

export const metadata = generatePageMetadata({
  title: "Dashboard",
  description: "Dashboard overview with key metrics and recent activity.",
});

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Key metrics at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const accent = metricAccents[i % metricAccents.length];
          return (
            <Card
              key={stat.title}
              className="gap-0 py-3"
              style={{
                backgroundColor: `color-mix(in oklch, ${accent} 14%, var(--card))`,
                borderColor: `color-mix(in oklch, ${accent} 30%, var(--border))`,
              }}
            >
              <CardContent>
                <p className="text-muted-foreground text-xs font-medium">{stat.title}</p>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <p className="text-xl font-bold">{stat.value}</p>
                  <Badge variant={stat.trend === "up" ? "default" : "secondary"}>
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <OverviewChart />

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <Card>
          <CardContent className="divide-y">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-muted-foreground text-xs">{item.action}</p>
                </div>
                <span className="text-muted-foreground shrink-0 text-xs">{item.timestamp}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
