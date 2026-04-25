"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { chartData } from "@/features/dashboard/server/mock-data";

export function OverviewChart() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Users & Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Users & Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7686 0.1647 70.0804)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.7686 0.1647 70.0804)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.6658 0.1574 58.3183)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.6658 0.1574 58.3183)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
              <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  color: "var(--foreground)",
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="oklch(0.7686 0.1647 70.0804)"
                fill="url(#usersGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="oklch(0.6658 0.1574 58.3183)"
                fill="url(#sessionsGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.5553 0.1455 48.9975)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.5553 0.1455 48.9975)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "currentColor" }} />
              <YAxis
                className="text-xs"
                tick={{ fill: "currentColor" }}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.375rem",
                  color: "var(--foreground)",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.5553 0.1455 48.9975)"
                fill="url(#revenueGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
