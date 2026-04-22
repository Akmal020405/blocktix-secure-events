import { createFileRoute } from "@tanstack/react-router";
import { events } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/validator/events")({
  component: () => (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold">Event Access</h2>
        <p className="text-sm text-muted-foreground">Events you are authorized to verify.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {events.slice(0, 4).map(e => (
          <div key={e.id} className="rounded-2xl border border-border bg-card/50 p-5 flex gap-4">
            <div className="h-16 w-16 rounded-lg shrink-0" style={{ background: e.poster }} />
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{e.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{e.date} · {e.location}</div>
              <div className="mt-2"><StatusBadge variant="verified">Authorized</StatusBadge></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
