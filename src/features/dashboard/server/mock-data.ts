export type StatCard = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export type ActivityItem = {
  id: string;
  user: string;
  email: string;
  action: string;
  timestamp: string;
};

export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Inactive";
  joinedAt: string;
};

export type SettingsField = {
  id: string;
  label: string;
  type: "text" | "email";
  value: string;
  placeholder?: string;
};

export type SettingsSection = {
  id: string;
  label: string;
  description: string;
  fields: SettingsField[];
};

export type ChartDataPoint = {
  month: string;
  users: number;
  sessions: number;
  revenue: number;
};

export const chartData: ChartDataPoint[] = [
  { month: "Jan", users: 1200, sessions: 3400, revenue: 18200 },
  { month: "Feb", users: 1350, sessions: 3800, revenue: 21400 },
  { month: "Mar", users: 1580, sessions: 4200, revenue: 24800 },
  { month: "Apr", users: 1420, sessions: 3900, revenue: 22100 },
  { month: "May", users: 1890, sessions: 5100, revenue: 31500 },
  { month: "Jun", users: 2100, sessions: 5800, revenue: 36200 },
  { month: "Jul", users: 2340, sessions: 6200, revenue: 39800 },
  { month: "Aug", users: 2180, sessions: 5900, revenue: 37400 },
  { month: "Sep", users: 2520, sessions: 6800, revenue: 42100 },
  { month: "Oct", users: 2690, sessions: 7200, revenue: 45600 },
  { month: "Nov", users: 2780, sessions: 7500, revenue: 47200 },
  { month: "Dec", users: 2847, sessions: 7800, revenue: 48290 },
];

export const statCards: StatCard[] = [
  { title: "Total Users", value: "2,847", change: "+12.5%", trend: "up" },
  { title: "Active Sessions", value: "1,024", change: "+8.2%", trend: "up" },
  { title: "Revenue", value: "$48,290", change: "+23.1%", trend: "up" },
  { title: "Bounce Rate", value: "24.3%", change: "-3.1%", trend: "down" },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    user: "Sarah Chen",
    email: "sarah@example.com",
    action: "Updated billing settings",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    user: "Marcus Johnson",
    email: "marcus@example.com",
    action: "Created new project",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    user: "Aiko Tanaka",
    email: "aiko@example.com",
    action: "Invited 3 team members",
    timestamp: "1 hr ago",
  },
  {
    id: "4",
    user: "David Kim",
    email: "david@example.com",
    action: "Deployed to production",
    timestamp: "2 hr ago",
  },
  {
    id: "5",
    user: "Elena Volkov",
    email: "elena@example.com",
    action: "Resolved support ticket #482",
    timestamp: "3 hr ago",
  },
  {
    id: "6",
    user: "James Wright",
    email: "james@example.com",
    action: "Updated API credentials",
    timestamp: "5 hr ago",
  },
];

export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    joinedAt: "Jan 15, 2025",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    role: "Editor",
    status: "Active",
    joinedAt: "Feb 3, 2025",
  },
  {
    id: "3",
    name: "Aiko Tanaka",
    email: "aiko@example.com",
    role: "Viewer",
    status: "Active",
    joinedAt: "Mar 12, 2025",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david@example.com",
    role: "Editor",
    status: "Inactive",
    joinedAt: "Apr 8, 2025",
  },
  {
    id: "5",
    name: "Elena Volkov",
    email: "elena@example.com",
    role: "Admin",
    status: "Active",
    joinedAt: "May 22, 2025",
  },
  {
    id: "6",
    name: "James Wright",
    email: "james@example.com",
    role: "Viewer",
    status: "Active",
    joinedAt: "Jun 1, 2025",
  },
  {
    id: "7",
    name: "Priya Patel",
    email: "priya@example.com",
    role: "Editor",
    status: "Inactive",
    joinedAt: "Jul 14, 2025",
  },
  {
    id: "8",
    name: "Carlos Mendez",
    email: "carlos@example.com",
    role: "Viewer",
    status: "Active",
    joinedAt: "Aug 30, 2025",
  },
];

export const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Manage your account information",
    fields: [
      {
        id: "name",
        label: "Display Name",
        type: "text",
        value: "Your Name",
        placeholder: "Enter your name",
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        value: "you@example.com",
        placeholder: "Enter your email",
      },
      {
        id: "company",
        label: "Company",
        type: "text",
        value: "",
        placeholder: "Enter your company",
      },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Configure how you receive updates",
    fields: [
      {
        id: "webhook",
        label: "Webhook URL",
        type: "text",
        value: "",
        placeholder: "https://your-webhook.com/notify",
      },
      { id: "slack", label: "Slack Channel", type: "text", value: "", placeholder: "#general" },
    ],
  },
];
