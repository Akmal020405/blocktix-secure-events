import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tickets } from "@/lib/dummy-data";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle2, XCircle, AlertTriangle, ScanLine, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/validator/")({
  component: Verify,
});

type Result = null | { kind: "valid" | "used" | "invalid"; ticket?: typeof tickets[number]; checkedIn?: boolean };

function Verify() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Result>(null);

  const verify = () => {
    const found = tickets.find(t => t.id.toLowerCase() === code.trim().toLowerCase());
    if (!found) setResult({ kind: "invalid" });
    else if (found.status === "Used") setResult({ kind: "used", ticket: found });
    else setResult({ kind: "valid", ticket: found });
  };

  const checkIn = () => {
    if (result?.kind === "valid") setResult({ ...result, checkedIn: true });
  };

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-6 max-w-6xl">
      {/* Scanner */}
      <div className="space-y-4">
        <div className="glass rounded-2xl p-6 border border-neon-cyan/30">
          <div className="aspect-square rounded-xl bg-background/60 border-2 border-dashed border-neon-cyan/40 grid place-items-center relative overflow-hidden">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse" style={{ top: "30%" }} />
            <div className="text-center">
              <ScanLine className="h-12 w-12 mx-auto text-neon-cyan animate-pulse" />
              <div className="text-sm mt-3 text-muted-foreground">Scanner ready</div>
              <div className="text-[10px] font-mono mt-1 text-neon-cyan">CAMERA · POINT QR HERE</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Or enter Ticket ID</label>
            <div className="flex gap-2">
              <Input value={code} onChange={e => setCode(e.target.value)} placeholder="TKT-9F2A-0001" className="bg-background/40 font-mono text-xs" />
              <Button onClick={verify} className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground">Verify</Button>
            </div>
            <div className="text-[11px] text-muted-foreground">Try: TKT-9F2A-0001 (valid), TKT-9F2A-0003 (used), or anything else (invalid)</div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div>
        {!result && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            <ShieldCheck className="h-10 w-10 mx-auto mb-3" />
            Awaiting scan result...
          </div>
        )}

        {result?.kind === "valid" && (
          <div className="glass rounded-2xl p-6 border-2 border-success/40">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 rounded-full bg-success/20 grid place-items-center border border-success/40">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">{result.checkedIn ? "Check-in Successful" : "Ticket Valid"}</div>
                <div className="text-xs text-muted-foreground font-mono">{result.ticket!.id}</div>
              </div>
            </div>
            <TicketInfo t={result.ticket!} />
            <div className="flex flex-wrap gap-2 mt-4">
              <StatusBadge variant="active">Active</StatusBadge>
              <StatusBadge variant="verified">Blockchain Verified</StatusBadge>
              {result.checkedIn && <StatusBadge variant="used">Checked In</StatusBadge>}
            </div>
            {!result.checkedIn ? (
              <Button onClick={checkIn} className="w-full mt-5 bg-success text-primary-foreground hover:bg-success/90">
                <CheckCircle2 className="h-4 w-4 mr-2" />Confirm Check-In
              </Button>
            ) : (
              <Button onClick={() => { setResult(null); setCode(""); }} variant="outline" className="w-full mt-5">Scan Next</Button>
            )}
            <Link to="/verify/$ticketId" params={{ ticketId: result.ticket!.id }} className="block text-center text-xs text-neon-cyan mt-3 hover:underline">
              Open full verification page →
            </Link>
          </div>
        )}

        {result?.kind === "used" && (
          <div className="rounded-2xl p-6 border-2 border-warning/40 bg-warning/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 rounded-full bg-warning/20 grid place-items-center border border-warning/40">
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">Ticket Already Used</div>
                <div className="text-xs text-muted-foreground font-mono">{result.ticket!.id}</div>
              </div>
            </div>
            <TicketInfo t={result.ticket!} />
            <Button onClick={() => { setResult(null); setCode(""); }} variant="outline" className="w-full mt-5">Scan Next</Button>
          </div>
        )}

        {result?.kind === "invalid" && (
          <div className="rounded-2xl p-6 border-2 border-destructive/50 bg-destructive/5">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 rounded-full bg-destructive/20 grid place-items-center border border-destructive/40">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">Invalid or Fraudulent Ticket</div>
                <div className="text-xs text-muted-foreground">No matching token on-chain</div>
              </div>
            </div>
            <div className="rounded-xl bg-background/40 p-4 text-xs text-muted-foreground">
              The signature could not be verified against the event contract. This ticket may be counterfeit.
            </div>
            <Button onClick={() => { setResult(null); setCode(""); }} variant="outline" className="w-full mt-5">Try Again</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function TicketInfo({ t }: { t: typeof tickets[number] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 text-sm">
      <Info l="Event" v={t.eventName} />
      <Info l="Tier" v={t.tier} />
      <Info l="Owner" v={t.ownerName} />
      <Info l="Wallet" v={t.walletAddress.slice(0, 14) + "..."} mono />
      <Info l="Date" v={t.date} />
      <Info l="Seat" v={t.seat ?? "General"} />
    </div>
  );
}
function Info({ l, v, mono }: { l: string; v: string; mono?: boolean }) {
  return (
    <div className="rounded-lg bg-background/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
      <div className={`mt-0.5 ${mono ? "font-mono text-xs" : "font-medium"}`}>{v}</div>
    </div>
  );
}
