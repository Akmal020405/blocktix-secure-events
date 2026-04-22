import { createFileRoute, Outlet, Link, useLocation, redirect } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { LayoutDashboard, Ticket, Compass, Wallet, History, Settings } from "lucide-react";

const nav = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Tickets", to: "/dashboard/tickets", icon: Ticket },
  { label: "Explore Events", to: "/explore", icon: Compass },
  { label: "Wallet", to: "/dashboard/wallet", icon: Wallet },
  { label: "Transactions", to: "/dashboard/transactions", icon: History },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export const Route = createFileRoute("/dashboard")({
  component: () => {
    const { pathname } = useLocation();
    const titles: Record<string, string> = {
      "/dashboard": "Overview",
      "/dashboard/tickets": "My Tickets",
      "/dashboard/wallet": "Wallet",
      "/dashboard/transactions": "Transaction History",
      "/dashboard/settings": "Settings",
    };
    let title = titles[pathname] ?? "Dashboard";
    if (pathname.startsWith("/dashboard/tickets/")) title = "Ticket Detail";
    return (
      <DashboardShell title={title} nav={nav} badge="User">
        <Outlet />
      </DashboardShell>
    );
  },
});
