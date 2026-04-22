import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/settings")({
  component: () => (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Display name</label>
          <Input defaultValue="Alex Chen" className="mt-1.5 bg-background/40" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Email (optional)</label>
          <Input defaultValue="alex@chain.io" className="mt-1.5 bg-background/40" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Wallet</label>
          <Input readOnly value="0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891" className="mt-1.5 bg-background/40 font-mono text-xs" />
        </div>
        <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground">Save Changes</Button>
      </div>
    </div>
  ),
});
