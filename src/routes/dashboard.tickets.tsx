import { createFileRoute } from "@tanstack/react-router";
import { tickets } from "@/lib/dummy-data";
import { TicketCard } from "@/components/TicketCard";

export const Route = createFileRoute("/dashboard/tickets")({
  component: () => (
    <div className="space-y-5 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold">My Tickets</h2>
        <p className="text-sm text-muted-foreground">All tickets minted to your wallet on Polygon.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {tickets.map(t => <TicketCard key={t.id} ticket={t} />)}
      </div>
    </div>
  ),
});
