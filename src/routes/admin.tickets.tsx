import { createFileRoute } from "@tanstack/react-router";
import { tickets, shortAddr } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/admin/tickets")({
  component: () => (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold">All Tickets</h2>
        <p className="text-sm text-muted-foreground">Every ticket minted across your events.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card/50 overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-background/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Ticket ID</th>
              <th className="text-left p-3">Event</th>
              <th className="text-left p-3">Tier</th>
              <th className="text-left p-3">Owner</th>
              <th className="text-left p-3">Wallet</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">QR</th>
              <th className="text-left p-3">Verified</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id} className="border-t border-border/50">
                <td className="p-3 font-mono text-xs">{t.id}</td>
                <td className="p-3">{t.eventName}</td>
                <td className="p-3">{t.tier}</td>
                <td className="p-3">{t.ownerName}</td>
                <td className="p-3 font-mono text-xs">{shortAddr(t.walletAddress)}</td>
                <td className="p-3">
                  <StatusBadge variant={t.status === "Active" ? "active" : t.status === "Used" ? "used" : "invalid"}>{t.status}</StatusBadge>
                </td>
                <td className="p-3 text-xs">✓ Available</td>
                <td className="p-3"><StatusBadge variant="verified">On-Chain</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});
