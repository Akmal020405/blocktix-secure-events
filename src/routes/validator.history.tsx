import { createFileRoute } from "@tanstack/react-router";
import { scanHistory } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/validator/history")({
  component: () => (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold">Scan History</h2>
        <p className="text-sm text-muted-foreground">Recent verification attempts at all gates.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Ticket ID</th>
              <th className="text-left p-3">Event</th>
              <th className="text-left p-3">Time</th>
              <th className="text-left p-3">Result</th>
              <th className="text-left p-3">Validator</th>
            </tr>
          </thead>
          <tbody>
            {scanHistory.map(s => (
              <tr key={s.id} className="border-t border-border/50">
                <td className="p-3 font-mono text-xs">{s.ticketId}</td>
                <td className="p-3">{s.event}</td>
                <td className="p-3 text-xs text-muted-foreground">{s.time}</td>
                <td className="p-3">
                  <StatusBadge variant={s.result === "Valid" ? "active" : s.result === "Used" ? "used" : "invalid"}>{s.result}</StatusBadge>
                </td>
                <td className="p-3 text-xs">{s.validator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});
