import { generatePageMetadata } from "@/server/seo/seo";
import { Timeline } from "@/shared/ui/timeline";
import type { TimelineRelease } from "@/shared/ui/timeline";

export const dynamic = "force-static";

export const metadata = generatePageMetadata({
  title: "Change Log",
  description: "Release history and version updates.",
});

const releases: TimelineRelease[] = [
  {
    version: "v1.2.0",
    date: "Mar 2026",
    label: "Dashboard Overhaul",
    status: "latest",
    items: [
      {
        component: "Dashboard",
        type: "feat",
        text: "Redesigned analytics dashboard with real-time charts",
      },
      { component: "Sidebar", type: "improve", text: "Collapsible sidebar with icon-only mode" },
      { component: "Auth", type: "fix", text: "Fixed session expiry redirect loop" },
    ],
  },
  {
    version: "v1.1.0",
    date: "Feb 2026",
    label: "User Management",
    status: "stable",
    items: [
      { component: "Users", type: "feat", text: "User table with search, sort, and bulk actions" },
      {
        component: "Roles",
        type: "feat",
        text: "Role-based access control with permission matrix",
      },
      { component: "Theme", type: "improve", text: "Dark mode support across all pages" },
    ],
  },
  {
    version: "v1.0.0",
    date: "Jan 2026",
    label: "Initial Release",
    status: "stable",
    items: [
      { component: "Layout", type: "feat", text: "Header, footer, and responsive sidebar" },
      { component: "Blog", type: "feat", text: "Markdown blog with featured posts and tags" },
    ],
  },
];

export default function ChangeLogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Change Log</h1>
        <p className="text-muted-foreground mt-1 text-sm">Release history and version updates</p>
      </div>

      <Timeline releases={releases} />
    </div>
  );
}
