import { createFileRoute } from "@tanstack/react-router";
import { events } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/events")({
  component: () => (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Events</h2>
          <p className="text-sm text-muted-foreground">Manage events and ticket inventory.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card/50 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-background/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left p-3">Event</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Tickets</th>
              <th className="text-left p-3">Sold</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(e => {
              const sold = e.total - e.available;
              return (
                <tr key={e.id} className="border-t border-border/50 hover:bg-background/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-md" style={{ background: e.poster }} />
                      <div className="font-medium">{e.name}</div>
                    </div>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">{e.date}</td>
                  <td className="p-3">{e.total.toLocaleString()}</td>
                  <td className="p-3">{sold.toLocaleString()}</td>
                  <td className="p-3"><StatusBadge variant={e.available > 0 ? "active" : "used"}>{e.available > 0 ? "Live" : "Sold Out"}</StatusBadge></td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost">View</Button>
                    <Button size="sm" variant="ghost" className="text-neon-cyan">Edit</Button>
                    <Button size="sm" variant="ghost" className="text-neon-purple">Mint</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ),
});
