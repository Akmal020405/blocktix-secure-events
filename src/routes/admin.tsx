import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { LayoutDashboard, CalendarPlus, Calendar, Sparkles, Ticket, BarChart3, Settings } from "lucide-react";

const nav = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Events", to: "/admin/events", icon: Calendar },
  { label: "Create Event", to: "/admin/create", icon: CalendarPlus },
  { label: "Mint Tickets", to: "/admin/mint", icon: Sparkles },
  { label: "Tickets", to: "/admin/tickets", icon: Ticket },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  component: () => {
    const { pathname } = useLocation();
    const titles: Record<string, string> = {
      "/admin": "Organizer Dashboard",
      "/admin/events": "Events",
      "/admin/create": "Create Event",
      "/admin/mint": "Mint Tickets",
      "/admin/tickets": "All Tickets",
      "/admin/analytics": "Analytics",
      "/admin/settings": "Settings",
    };
    return (
      <DashboardShell title={titles[pathname] ?? "Admin"} nav={nav} badge="Organizer">
        <Outlet />
      </DashboardShell>
    );
  },
});
