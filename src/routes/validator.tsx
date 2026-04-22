import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { ScanLine, History, Calendar, Settings } from "lucide-react";

const nav = [
  { label: "Verify Ticket", to: "/validator", icon: ScanLine },
  { label: "Scan History", to: "/validator/history", icon: History },
  { label: "Event Access", to: "/validator/events", icon: Calendar },
  { label: "Settings", to: "/validator/settings", icon: Settings },
];

export const Route = createFileRoute("/validator")({
  component: () => {
    const { pathname } = useLocation();
    const titles: Record<string, string> = {
      "/validator": "Verify Ticket",
      "/validator/history": "Scan History",
      "/validator/events": "Event Access",
      "/validator/settings": "Settings",
    };
    return (
      <DashboardShell title={titles[pathname] ?? "Validator"} nav={nav} badge="Validator">
        <Outlet />
      </DashboardShell>
    );
  },
});
