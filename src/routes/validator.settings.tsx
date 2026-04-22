import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/validator/settings")({
  component: () => (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Validator Settings</h2>
      <div className="rounded-2xl border border-border bg-card/50 p-6 text-sm text-muted-foreground">
        Validator: <span className="text-foreground font-medium">Gate-A Operator</span><br />
        Wallet: <span className="font-mono text-foreground">0xA27F...F891</span><br />
        Authorized events: 4
      </div>
    </div>
  ),
});
