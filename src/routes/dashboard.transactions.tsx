import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/dashboard/transactions")({
  component: () => {
    const txs = useStore(s => s.txs);
    return (
      <div className="space-y-5 max-w-5xl">
        <div>
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <p className="text-sm text-muted-foreground">All on-chain activity from your connected wallet.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-background/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left p-3">Type</th><th className="text-left p-3">Ticket</th><th className="text-left p-3">Hash</th><th className="text-left p-3">Date</th><th className="text-left p-3">Status</th></tr>
            </thead>
            <tbody>
              {txs.map(tx => (
                <tr key={tx.id} className="border-t border-border/50 hover:bg-background/30 transition">
                  <td className="p-3"><StatusBadge variant={tx.type === "Mint" ? "minted" : tx.type === "Verify" ? "verified" : "neon"}>{tx.type}</StatusBadge></td>
                  <td className="p-3 font-mono text-xs">{tx.ticketId}</td>
                  <td className="p-3 font-mono text-xs text-neon-cyan">{tx.hash}</td>
                  <td className="p-3 text-xs text-muted-foreground">{tx.date}</td>
                  <td className="p-3"><StatusBadge variant={tx.status === "Success" ? "active" : "pending"}>{tx.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
