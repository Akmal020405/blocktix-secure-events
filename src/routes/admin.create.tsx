import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/admin/create")({
  component: () => (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Event</h2>
        <p className="text-sm text-muted-foreground">Configure event details and on-chain settings.</p>
      </div>

      <form className="space-y-5 rounded-2xl border border-border bg-card/50 p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Event Name"><Input placeholder="Blockchain Music Fest 2026" className="bg-background/40" /></Field>
          <Field label="Organizer Name"><Input placeholder="ChainSound Productions" className="bg-background/40" /></Field>
        </div>
        <Field label="Description">
          <textarea rows={3} placeholder="Tell attendees about this event..." className="w-full rounded-md bg-background/40 border border-input px-3 py-2 text-sm" />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Date"><Input type="date" className="bg-background/40" /></Field>
          <Field label="Time"><Input type="time" className="bg-background/40" /></Field>
          <Field label="Location"><Input placeholder="City, Venue" className="bg-background/40" /></Field>
        </div>
        <Field label="Event Poster">
          <div className="rounded-xl border border-dashed border-border p-8 text-center bg-background/30">
            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
            <div className="text-sm mt-2">Drop image here or <span className="text-neon-cyan cursor-pointer">browse</span></div>
            <div className="text-xs text-muted-foreground mt-1">PNG/JPG up to 5MB · pinned to IPFS on submit</div>
          </div>
        </Field>

        <div>
          <div className="text-sm font-semibold mb-3">Ticket Categories</div>
          <div className="space-y-2">
            {["Early Bird", "Regular", "VIP"].map(t => (
              <div key={t} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center bg-background/30 p-3 rounded-lg">
                <div className="font-medium text-sm">{t}</div>
                <Input type="number" placeholder="Price" className="bg-background/40 w-28" />
                <Input type="number" placeholder="Quota" className="bg-background/40 w-28" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-background/30 border border-neon-blue/20 p-4 flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Blockchain Verification</div>
            <div className="text-xs text-muted-foreground">Mint as ERC-721 on Polygon · IPFS metadata</div>
          </div>
          <Switch defaultChecked />
        </div>

        <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon text-primary-foreground">
          Create Event & Deploy Contract
        </Button>
      </form>
    </div>
  ),
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
