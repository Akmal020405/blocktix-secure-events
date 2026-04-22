import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold">Organizer Settings</h2>
      <div className="rounded-2xl border border-border bg-card/50 p-6 text-sm text-muted-foreground">
        Connected wallet: <span className="font-mono text-foreground">0xA27F...F891</span>
        <br />Network: Polygon Mainnet
        <br />Default royalty: 5%
      </div>
    </div>
  ),
});
