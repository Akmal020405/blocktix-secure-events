import { createFileRoute, Link } from "@tanstack/react-router";
import { TicketCard } from "@/components/TicketCard";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

export const Route = createFileRoute("/dashboard/tickets")({
  component: () => {
    const tickets = useStore(s => s.tickets);
    return (
      <div className="space-y-5 max-w-6xl">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold">My Tickets</h2>
            <p className="text-sm text-muted-foreground">All tickets minted to your wallet on Polygon.</p>
          </div>
          <Link to="/explore"><Button variant="outline" className="border-neon-blue/40">Explore more →</Button></Link>
        </div>
        {tickets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Ticket className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <div className="font-semibold">No tickets yet</div>
            <div className="text-sm text-muted-foreground mt-1">Browse events and mint your first NFT ticket.</div>
            <Link to="/explore"><Button className="mt-4 bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground">Explore Events</Button></Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {tickets.map(t => <TicketCard key={t.id} ticket={t} />)}
          </div>
        )}
      </div>
    );
  },
});
