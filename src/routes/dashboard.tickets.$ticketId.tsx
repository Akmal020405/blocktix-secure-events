import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { tickets, shortAddr } from "@/lib/dummy-data";
import { QRCodeSVG } from "qrcode.react";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink, ShieldCheck, Database, FileCode2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/tickets/$ticketId")({
  loader: ({ params }) => {
    const t = tickets.find(x => x.id === params.ticketId);
    if (!t) throw notFound();
    return t;
  },
  component: TicketDetail,
  notFoundComponent: () => <div>Ticket not found. <Link to="/dashboard/tickets">Back</Link></div>,
});

function TicketDetail() {
  const t = Route.useLoaderData();
  const variant = t.status === "Active" ? "active" : t.status === "Used" ? "used" : "invalid";
  return (
    <div className="space-y-6 max-w-5xl">
      <Link to="/dashboard/tickets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to tickets
      </Link>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="glass rounded-2xl p-6 border border-neon-blue/20">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <StatusBadge variant={variant}>{t.status}</StatusBadge>
            <StatusBadge variant="verified"><ShieldCheck className="h-3 w-3" />Blockchain Verified</StatusBadge>
            <StatusBadge variant="minted">Stored On-Chain</StatusBadge>
          </div>
          <h2 className="text-3xl font-bold">{t.eventName}</h2>
          <div className="text-xs font-mono text-muted-foreground mt-1">{t.id}</div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {[
              ["Tier", t.tier],
              ["Date", t.date],
              ["Seat", t.seat ?? "General"],
              ["Owner", t.ownerName],
              ["Wallet", shortAddr(t.walletAddress)],
              ["Mint Date", new Date(t.mintDate).toLocaleString()],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-border bg-background/30 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                <div className="font-medium text-sm mt-0.5 break-all">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-background/40 border border-border p-4 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground flex items-center gap-1.5"><FileCode2 className="h-3.5 w-3.5" />Contract</span>
              <span className="text-neon-cyan break-all">{t.contractAddress}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" />Tx Hash</span>
              <span className="text-neon-purple break-all">{t.txHash}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground flex items-center gap-1.5"><Database className="h-3.5 w-3.5" />IPFS CID</span>
              <span className="text-neon-cyan break-all">{t.ipfsCid}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground"><Download className="h-4 w-4 mr-2" />Download Ticket</Button>
            <Button variant="outline" className="border-neon-cyan/40"><ExternalLink className="h-4 w-4 mr-2" />View Metadata</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-5 border border-neon-cyan/30 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Scan to verify</div>
            <div className="bg-foreground p-3 rounded-xl inline-block">
              <QRCodeSVG value={t.id} size={200} bgColor="#fff" fgColor="#000" />
            </div>
            <div className="text-xs font-mono text-muted-foreground mt-3 break-all">{t.id}</div>
          </div>
          <div className="rounded-xl border border-border bg-card/50 p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-success">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> On-chain ownership confirmed
            </div>
            <div className="text-muted-foreground">Network: Polygon · ERC-721</div>
          </div>
        </div>
      </div>
    </div>
  );
}
