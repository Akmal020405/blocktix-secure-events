import { createFileRoute } from "@tanstack/react-router";
import { transactions, shortAddr } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Wallet as WalletIcon, Copy } from "lucide-react";

const ADDR = "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891";

export const Route = createFileRoute("/dashboard/wallet")({
  component: () => (
    <div className="space-y-6 max-w-5xl">
      <div className="glass rounded-2xl p-6 border border-neon-blue/30 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple grid place-items-center shadow-neon">
            <WalletIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Connected Wallet</div>
            <div className="font-mono text-lg break-all">{ADDR}</div>
          </div>
        </div>
        <button className="text-xs text-neon-cyan inline-flex items-center gap-1.5 hover:underline"><Copy className="h-3 w-3" />Copy</button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card/50 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Balance</div>
          <div className="text-2xl font-bold mt-1">2.481 <span className="text-sm text-muted-foreground">MATIC</span></div>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">NFT Tickets</div>
          <div className="text-2xl font-bold mt-1">3</div>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Network</div>
          <div className="text-base font-semibold mt-1 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" />Polygon</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Transaction History</h3>
        <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-background/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Ticket</th>
                <th className="text-left p-3">Hash</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-t border-border/50 hover:bg-background/30">
                  <td className="p-3">
                    <StatusBadge variant={tx.type === "Mint" ? "minted" : tx.type === "Verify" ? "verified" : "neon"}>{tx.type}</StatusBadge>
                  </td>
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
    </div>
  ),
});
