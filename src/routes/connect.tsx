import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Wallet, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { shortAddr } from "@/lib/dummy-data";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect Wallet — BlockTix" },
      { name: "description", content: "Connect your web3 wallet to mint, own, and verify event tickets." },
    ],
  }),
  component: Connect,
});

const wallets = [
  { name: "MetaMask", color: "from-orange-500 to-yellow-500", icon: "🦊" },
  { name: "WalletConnect", color: "from-blue-500 to-cyan-500", icon: "🔗" },
  { name: "Coinbase Wallet", color: "from-blue-600 to-indigo-600", icon: "🔵" },
];

const ADDR = "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891";

function Connect() {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="glass rounded-3xl p-8 border border-neon-blue/30 shadow-neon">
          <div className="text-center mb-8">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-cyan grid place-items-center shadow-neon mb-4 animate-pulse-neon">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">{connected ? "Wallet Connected" : "Connect your wallet"}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {connected ? "Pick a role to enter the demo" : "Sign in with your preferred web3 wallet"}
            </p>
          </div>

          {!connected ? (
            <div className="space-y-3">
              {wallets.map(w => (
                <button
                  key={w.name}
                  onClick={() => setConnected(true)}
                  className="w-full flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 hover:border-neon-blue/40 hover:bg-card transition"
                >
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${w.color} grid place-items-center text-xl`}>
                    {w.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold">{w.name}</div>
                    <div className="text-xs text-muted-foreground">Tap to connect</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
              <div className="text-[11px] text-center text-muted-foreground pt-2 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3 w-3" /> We never store your private keys
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl bg-success/10 border border-success/30 p-4 text-sm">
                <div className="text-xs text-muted-foreground">Connected wallet</div>
                <div className="font-mono text-success mt-1 break-all">{ADDR}</div>
                <div className="text-xs text-muted-foreground mt-1">Short: {shortAddr(ADDR)}</div>
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground text-center">Continue as</div>
              <div className="grid gap-2">
                <Button onClick={() => navigate({ to: "/dashboard" })} className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground">User</Button>
                <Button onClick={() => navigate({ to: "/admin" })} variant="outline" className="border-neon-purple/40">Organizer / Admin</Button>
                <Button onClick={() => navigate({ to: "/validator" })} variant="outline" className="border-neon-cyan/40">Validator</Button>
              </div>
              <button onClick={() => setConnected(false)} className="w-full text-xs text-muted-foreground hover:text-foreground">Disconnect</button>
            </div>
          )}
        </div>
        <div className="text-center mt-6 text-xs text-muted-foreground">
          New to web3? <Link to="/" className="text-neon-cyan">Learn more</Link>
        </div>
      </div>
    </div>
  );
}
