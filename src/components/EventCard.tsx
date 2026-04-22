import { Link } from "@tanstack/react-router";
import type { EventItem } from "@/lib/dummy-data";
import { StatusBadge } from "./StatusBadge";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventCard({ event }: { event: EventItem }) {
  const soldOut = event.available === 0;
  return (
    <div className="group rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden hover:border-neon-blue/40 hover:shadow-neon transition-all">
      <div
        className="h-44 relative grid-bg"
        style={{ background: event.poster }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge variant="verified">⛓ Blockchain Verified</StatusBadge>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge variant="minted">NFT Ticket</StatusBadge>
        </div>
        <div className="absolute bottom-3 left-3 text-xs font-mono text-foreground/80 bg-background/40 backdrop-blur rounded px-2 py-0.5">
          {event.category}
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:neon-text transition">
          {event.name}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{event.date}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
          <span className="inline-flex items-center gap-1.5"><Ticket className="h-3.5 w-3.5" />{event.available.toLocaleString()} left</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">From</div>
            <div className="text-lg font-bold neon-text">${event.priceFrom}</div>
          </div>
          <Link to="/events/$eventId" params={{ eventId: event.id }}>
            <Button size="sm" variant="outline" disabled={soldOut} className="border-neon-blue/40 hover:bg-neon-blue/10">
              {soldOut ? "Sold Out" : "View Details"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
