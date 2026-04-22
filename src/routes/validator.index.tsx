import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { StatusBadge } from "@/components/StatusBadge";
import { CheckCircle2, XCircle, AlertTriangle, ScanLine, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { TicketItem } from "@/lib/dummy-data";

export const Route = createFileRoute("/validator/")({
  component: Verify,
});

type Result = null | { kind: "valid" | "used" | "invalid"; ticket?: TicketItem; checkedIn?: boolean };

function Verify() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const verifyTicket = useStore(s => s.verifyTicket);
  const checkInAction = useStore(s => s.checkIn);

  const verify = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise(r => setTimeout(r, 600));
    const r = verifyTicket(code);
    setResult(r);
    setLoading(false);
    if (r.kind === "invalid") toast.error("Invalid ticket — fraud blocked");
    else if (r.kind === "used") toast.warning("Ticket already used");
    else toast.success("Ticket valid — ready to check in");
  };

  const checkIn = () => {
    if (result?.kind === "valid" && result.ticket) {
      checkInAction(result.ticket.id);
      setResult({ kind: "valid", ticket: { ...result.ticket, status: "Used" }, checkedIn: true });
      toast.success("Check-in successful");
    }
  };

  return (
    <div className="grid lg:grid-cols-[400px_1fr] gap-6 max-w-6xl">
      <div className="space-y-4">
        <div className="glass rounded-2xl p-6 border border-neon-cyan/30">
          <div className="aspect-square rounded-xl bg-background/60 border-2 border-dashed border-neon-cyan/40 grid place-items-center relative overflow-hidden">
            <div className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan-line" />
            <div className="text-center">
              <ScanLine className="h-12 w-12 mx-auto text-neon-cyan animate-pulse" />
              <div className="text-sm mt-3 text-muted-foreground">Scanner ready</div>
              <div className="text-[10px] font-mono mt-1 text-neon-cyan">CAMERA · POINT QR HERE</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Or enter Ticket ID</label>
            <div className="flex gap-2">
              <Input
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={e => e.key === "Enter" && verify()}
                placeholder="TKT-9F2A-0001"
                className="bg-background/40 font-mono text-xs"
              />
              <Button
                onClick={verify}
                disabled={loading}
                className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
              </Button>
            </div>
            <div className="text-[11px] text-muted-foreground">
              Try: <button onClick={() => setCode("TKT-9F2A-0001")} className="text-neon-cyan hover:underline">TKT-9F2A-0001</button> (valid),{" "}
              <button onClick={() => setCode("TKT-9F2A-0003")} className="text-warning hover:underline">TKT-9F2A-0003</button> (used),{" "}
              <button onClick={() => setCode("TKT-FAKE-0001")} className="text-destructive hover:underline">TKT-FAKE-0001</button> (invalid)
            </div>
          </div>
        </div>
      </div>

      <div>
        {!result && !loading && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground h-full grid place-items-center">
            <div>
              <ShieldCheck className="h-10 w-10 mx-auto mb-3" />
              Awaiting scan result...
            </div>
          </div>
        )}

        {loading && (
          <div className="rounded-2xl border border-border bg-card/50 p-12 text-center h-full grid place-items-center animate-fade-in">
            <div>
              <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin text-neon-cyan" />
              <div className="text-sm">Verifying signature on Polygon...</div>
              <div className="text-xs text-muted-foreground mt-1 font-mono">eth_call → contract.ownerOf(tokenId)</div>
            </div>
          </div>
        )}

        {result?.kind === "valid" && (
          <div className="glass rounded-2xl p-6 border-2 border-success/40 animate-scale-in">
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
              <StatusBadge variant={result.checkedIn ? "used" : "active"}>{result.checkedIn ? "Used" : "Active"}</StatusBadge>
              <StatusBadge variant="verified">Blockchain Verified</StatusBadge>
              {result.checkedIn && <StatusBadge variant="minted">Checked In</StatusBadge>}
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
          <div className="rounded-2xl p-6 border-2 border-warning/40 bg-warning/5 animate-scale-in">
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
          <div className="rounded-2xl p-6 border-2 border-destructive/50 bg-destructive/5 animate-scale-in">
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
              The signature could not be verified against the event contract. This ticket may be counterfeit and was blocked at the gate.
            </div>
            <Button onClick={() => { setResult(null); setCode(""); }} variant="outline" className="w-full mt-5">Try Again</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function TicketInfo({ t }: { t: TicketItem }) {
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
