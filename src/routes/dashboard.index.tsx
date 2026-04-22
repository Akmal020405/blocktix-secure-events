import { createFileRoute, Link } from "@tanstack/react-router";
import { tickets, events } from "@/lib/dummy-data";
import { Ticket, Calendar, ShieldCheck, Activity } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const active = tickets.filter(t => t.status === "Active").length;
  const used = tickets.filter(t => t.status === "Used").length;
  const stats = [
    { l: "Total Tickets", v: tickets.length, i: Ticket, c: "from-neon-blue/20 to-neon-purple/20" },
    { l: "Active", v: active, i: ShieldCheck, c: "from-success/20 to-neon-cyan/20" },
    { l: "Used", v: used, i: Activity, c: "from-warning/20 to-neon-pink/20" },
    { l: "Upcoming Events", v: 2, i: Calendar, c: "from-neon-purple/20 to-neon-pink/20" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="glass rounded-2xl p-6 border border-neon-blue/20">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs font-mono text-neon-cyan uppercase tracking-widest">// Welcome back</div>
            <h2 className="text-2xl font-bold mt-1">Hello, Alex 👋</h2>
            <p className="text-sm text-muted-foreground mt-1">You have {active} active tickets minted on Polygon.</p>
          </div>
          <div className="rounded-xl border border-border bg-background/40 p-4 min-w-[240px]">
            <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Connected Wallet</div>
            <div className="font-mono text-sm mt-1">0xA27F...F891</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-success"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />Polygon Mainnet</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.l} className="rounded-2xl border border-border bg-card/50 p-5">
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${s.c} grid place-items-center mb-3 border border-border`}>
              <s.i className="h-4 w-4" />
            </div>
            <div className="text-3xl font-bold">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h3 className="font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.slice(0, 3).map(e => (
              <Link key={e.id} to="/events/$eventId" params={{ eventId: e.id }} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition">
                <div className="h-12 w-12 rounded-lg" style={{ background: e.poster }} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.date} · {e.location}</div>
                </div>
                <StatusBadge variant="verified">NFT</StatusBadge>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            {[
              { t: "Ticket minted", d: "Blockchain Music Fest 2026", time: "2h ago", v: "minted" as const },
              { t: "Verification successful", d: "NFT Creator Meetup", time: "3d ago", v: "verified" as const },
              { t: "Ticket minted", d: "Web3 Startup Summit", time: "1w ago", v: "minted" as const },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                <div>
                  <div className="font-medium">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.d}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge variant={a.v}>{a.v}</StatusBadge>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
