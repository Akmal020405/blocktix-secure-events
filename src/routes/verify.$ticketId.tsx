import { createFileRoute, Link } from "@tanstack/react-router";
import { tickets, shortAddr } from "@/lib/dummy-data";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, XCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/verify/$ticketId")({
  loader: ({ params }) => {
    const t = tickets.find(x => x.id === params.ticketId);
    if (!t) return { kind: "invalid" as const, ticket: null };
    return { kind: t.status === "Used" ? "used" as const : "valid" as const, ticket: t };
  },
  head: () => ({
    meta: [{ title: "Verification Result — BlockTix" }],
  }),
  component: VerifyResult,
});

function VerifyResult() {
  const { kind, ticket } = Route.useLoaderData();

  const cfgs = {
    valid: { color: "success", Icon: CheckCircle2, title: "Ticket Valid", msg: "Smart contract verified. This ticket is genuine and active." },
    used: { color: "warning", Icon: AlertTriangle, title: "Ticket Already Used", msg: "This ticket was checked in previously. Cannot be reused." },
    invalid: { color: "destructive", Icon: XCircle, title: "Invalid Ticket", msg: "No matching token found on the event contract. Possible counterfeit." },
  } as const;
  const cfg = cfgs[kind];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Link to="/validator" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to validator
        </Link>

        <div className={`glass rounded-3xl p-8 border-2 border-${cfg.color}/40`}>
          <div className="text-center">
            <div className={`h-20 w-20 mx-auto rounded-full bg-${cfg.color}/15 grid place-items-center border border-${cfg.color}/40 mb-4`}>
              <cfg.Icon className={`h-10 w-10 text-${cfg.color}`} />
            </div>
            <h1 className={`text-3xl font-bold text-${cfg.color}`}>{cfg.title}</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">{cfg.msg}</p>
          </div>

          {ticket && (
            <div className="mt-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ["Ticket ID", ticket.id, true],
                  ["Event", ticket.eventName, false],
                  ["Tier", ticket.tier, false],
                  ["Date", ticket.date, false],
                  ["Owner", ticket.ownerName, false],
                  ["Wallet", shortAddr(ticket.walletAddress), true],
                ].map(([l, v, mono]) => (
                  <div key={l as string} className="rounded-lg bg-background/40 border border-border p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                    <div className={`mt-0.5 ${mono ? "font-mono text-xs" : "font-medium text-sm"}`}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-background/40 border border-border p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" />Smart Contract</span>
                  <span className="font-mono text-neon-cyan">{shortAddr(ticket.contractAddress)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tx Hash</span>
                  <span className="font-mono text-neon-purple">{ticket.txHash.slice(0, 12)}...{ticket.txHash.slice(-6)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <StatusBadge variant={kind === "valid" ? "active" : kind === "used" ? "used" : "invalid"}>{kind === "valid" ? "Active" : kind === "used" ? "Used" : "Invalid"}</StatusBadge>
                <StatusBadge variant="verified">On-Chain Verified</StatusBadge>
              </div>
            </div>
          )}

          <Link to="/validator" className="block mt-8">
            <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground">Back to Validator</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
