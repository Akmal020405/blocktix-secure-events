import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Ticket, ShieldCheck, ShieldAlert, DollarSign, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const stats = [
    { l: "Events Created", v: "24", i: Calendar, c: "from-neon-blue/20 to-neon-purple/20" },
    { l: "Tickets Minted", v: "12,840", i: Ticket, c: "from-neon-purple/20 to-neon-pink/20" },
    { l: "Tickets Sold", v: "9,712", i: Activity, c: "from-success/20 to-neon-cyan/20" },
    { l: "Checked-in", v: "7,283", i: ShieldCheck, c: "from-neon-cyan/20 to-success/20" },
    { l: "Frauds Prevented", v: "143", i: ShieldAlert, c: "from-destructive/20 to-warning/20" },
    { l: "Revenue (USDC)", v: "$284,910", i: DollarSign, c: "from-warning/20 to-neon-pink/20" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.l} className="rounded-2xl border border-border bg-card/50 p-5">
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${s.c} grid place-items-center mb-3 border border-border`}>
              <s.i className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <ChartCard title="Tickets Sold (Last 7 days)" data={[42, 58, 73, 68, 91, 124, 142]} color="neon-blue" />
        <ChartCard title="Check-ins (Last 7 days)" data={[12, 28, 35, 48, 62, 89, 104]} color="neon-cyan" />
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h3 className="font-semibold mb-4">Fraud Prevention Log</h3>
        <div className="space-y-2 text-sm">
          {[
            { ev: "Crypto Future Conf", reason: "Duplicate QR scan attempt", time: "2h ago" },
            { ev: "Web3 Startup Summit", reason: "Invalid signature", time: "1d ago" },
            { ev: "Tech Innovators Expo", reason: "Wallet mismatch", time: "3d ago" },
          ].map((x, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div>
                <div className="font-medium">{x.ev}</div>
                <div className="text-xs text-destructive">{x.reason}</div>
              </div>
              <span className="text-xs text-muted-foreground">{x.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, data, color }: { title: string; data: number[]; color: string }) {
  const max = Math.max(...data);
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="flex items-end justify-between gap-2 h-40">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={`w-full rounded-t-md bg-gradient-to-t from-${color}/30 to-${color} transition-all hover:opacity-80`}
              style={{ height: `${(v / max) * 100}%` }}
              title={String(v)}
            />
            <span className="text-[10px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
