import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/analytics")({
  component: Analytics,
});

function Analytics() {
  const cards = [
    { l: "Total Revenue", v: "$284,910", d: "+12.4% vs last month" },
    { l: "Conversion Rate", v: "68.2%", d: "Visitors → Mints" },
    { l: "Avg Ticket Price", v: "$148", d: "Across all events" },
    { l: "Fraud Block Rate", v: "99.98%", d: "Verified at scan" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.l} className="rounded-2xl border border-border bg-card/50 p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.l}</div>
            <div className="text-2xl font-bold mt-1 neon-text">{c.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Chart title="Sales Volume" data={[120, 180, 240, 200, 320, 410, 380, 460, 520, 490, 580, 640]} />
        <Chart title="Check-ins per Event" data={[60, 90, 120, 100, 160, 210, 180, 240, 280, 260, 320, 380]} />
      </div>

      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h3 className="font-semibold mb-4">Fraud Prevention Metrics</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ["Duplicate QR attempts", "1,283"],
            ["Invalid signatures", "412"],
            ["Wallet mismatches", "108"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">
              <div className="text-xs text-muted-foreground">{l}</div>
              <div className="text-2xl font-bold text-destructive mt-1">{v}</div>
              <div className="text-xs text-success mt-1">All blocked at gate</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chart({ title, data }: { title: string; data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="flex items-end gap-1.5 h-44">
        {data.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-neon-blue/40 to-neon-purple"
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
