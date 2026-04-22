import { Link } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import type { TicketItem } from "@/lib/dummy-data";
import { shortAddr } from "@/lib/dummy-data";
import { StatusBadge } from "./StatusBadge";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TicketCard({ ticket }: { ticket: TicketItem }) {
  const variant = ticket.status === "Active" ? "active" : ticket.status === "Used" ? "used" : "invalid";
  return (
    <div className="relative rounded-2xl border border-border bg-gradient-to-br from-card via-card to-neon-purple/5 overflow-hidden hover:border-neon-blue/40 transition-all">
      {/* perforation */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-border/60" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-background border border-border" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-6 w-6 rounded-full bg-background border border-border" />

      <div className="p-5 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-2">
            <StatusBadge variant={variant}>{ticket.status}</StatusBadge>
            <StatusBadge variant="verified"><ShieldCheck className="h-3 w-3" />NFT Verified</StatusBadge>
          </div>
          <h3 className="font-bold text-lg leading-tight truncate">{ticket.eventName}</h3>
          <div className="text-xs font-mono text-muted-foreground">{ticket.id}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pt-2">
            <div><div className="text-muted-foreground">Tier</div><div className="font-medium">{ticket.tier}</div></div>
            <div><div className="text-muted-foreground">Date</div><div className="font-medium">{ticket.date}</div></div>
            <div><div className="text-muted-foreground">Owner</div><div className="font-medium truncate">{ticket.ownerName}</div></div>
            <div><div className="text-muted-foreground">Wallet</div><div className="font-mono truncate">{shortAddr(ticket.walletAddress)}</div></div>
          </div>
        </div>
        <div className="bg-foreground p-2 rounded-md">
          <QRCodeSVG value={ticket.id} size={88} bgColor="#fff" fgColor="#000" />
        </div>
      </div>
      <div className="px-5 pb-5 pt-3 flex items-center justify-between">
        <div className="text-[10px] font-mono text-muted-foreground">
          ⛓ {shortAddr(ticket.contractAddress)}
        </div>
        <Link to="/dashboard/tickets/$ticketId" params={{ ticketId: ticket.id }}>
          <Button size="sm" variant="ghost" className="text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10">
            View Detail →
          </Button>
        </Link>
      </div>
    </div>
  );
}
