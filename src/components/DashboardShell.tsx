import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";
import { shortAddr } from "@/lib/dummy-data";

export interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DUMMY_WALLET = "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891";

export function DashboardShell({
  title,
  nav,
  children,
  badge,
}: {
  title: string;
  nav: NavItem[];
  children: React.ReactNode;
  badge?: string;
}) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border/50 bg-card/40 backdrop-blur-xl">
        <div className="p-5 border-b border-border/50">
          <Logo />
          {badge && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-neon-purple uppercase">
              {badge}
            </div>
          )}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-gradient-to-r from-neon-blue/20 to-neon-purple/10 text-foreground border border-neon-blue/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border/50">
          <div className="glass rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 text-neon-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
              Polygon · Connected
            </div>
            <div className="font-mono mt-1 text-muted-foreground">{shortAddr(DUMMY_WALLET)}</div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/70 backdrop-blur-xl px-6">
          <h1 className="text-lg font-semibold">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs">
              <Wallet className="h-3.5 w-3.5 text-neon-blue" />
              <span className="font-mono">{shortAddr(DUMMY_WALLET)}</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple grid place-items-center text-xs font-bold text-primary-foreground">
              AC
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
