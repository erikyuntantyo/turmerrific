"use client";

import { ToastProvider } from "@/shared/ui/toast";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider position="top-right">
      <DashboardShell>{children}</DashboardShell>
    </ToastProvider>
  );
}
