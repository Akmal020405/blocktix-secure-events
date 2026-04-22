import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/dummy-data";
import { Sparkles, CheckCircle2, Database, FileCode2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/admin/mint")({
  component: Mint,
});

function Mint() {
  const [minted, setMinted] = useState(false);
  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-6xl">
      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-4">
        <h2 className="text-xl font-bold">Mint Tickets</h2>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Event</label>
          <select className="w-full mt-1.5 rounded-md bg-background/40 border border-input px-3 py-2 text-sm">
            {events.map(e => <option key={e.id}>{e.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Tier</label>
          <select className="w-full mt-1.5 rounded-md bg-background/40 border border-input px-3 py-2 text-sm">
            <option>Early Bird</option><option>Regular</option><option>VIP</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Quantity</label>
            <Input type="number" defaultValue={100} className="mt-1.5 bg-background/40" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Assign to (optional)</label>
            <Input placeholder="0x... wallet" className="mt-1.5 bg-background/40 font-mono text-xs" />
          </div>
        </div>
        <Button onClick={() => setMinted(true)} className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground shadow-neon">
          <Sparkles className="h-4 w-4 mr-2" /> Mint Tickets
        </Button>
      </div>

      <div className="glass rounded-2xl p-6 border border-neon-purple/30">
        <h3 className="font-semibold mb-4">Mint Result</h3>
        {!minted ? (
          <div className="text-center py-12 text-sm text-muted-foreground">
            <div className="h-14 w-14 mx-auto rounded-full border-2 border-dashed border-border grid place-items-center mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            Configure mint and submit to see results
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/30">
              <CheckCircle2 className="h-6 w-6 text-success" />
              <div>
                <div className="font-semibold">Mint Successful</div>
                <div className="text-xs text-muted-foreground">100 tokens minted on Polygon</div>
              </div>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <Row icon={FileCode2} label="Contract" value="0xA27F8e...91bc" color="text-neon-cyan" />
              <Row icon={Sparkles} label="Tx Hash" value="0x7a3b9f2e...1c0b" color="text-neon-purple" />
              <Row icon={Database} label="IPFS CID" value="bafybeigdyrz...y2k4qa" color="text-neon-cyan" />
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge variant="active">Confirmed</StatusBadge>
              <StatusBadge variant="minted">100 NFTs</StatusBadge>
              <StatusBadge variant="verified">IPFS Pinned</StatusBadge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-background/40 border border-border">
      <span className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</span>
      <span className={color + " break-all"}>{value}</span>
    </div>
  );
}
