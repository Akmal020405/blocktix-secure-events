import { Logo } from "./Logo";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/40 mt-24">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            Blockchain-secured event ticketing. Anti-fraud, anti-duplicate, fully verifiable on-chain.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/explore" className="hover:text-foreground">Explore Events</Link></li>
            <li><Link to="/admin" className="hover:text-foreground">For Organizers</Link></li>
            <li><Link to="/validator" className="hover:text-foreground">For Validators</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Resources</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Documentation</li>
            <li>Smart Contracts</li>
            <li>IPFS Gateway</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Network</div>
          <ul className="space-y-2 text-sm text-muted-foreground font-mono text-xs">
            <li><span className="text-neon-cyan">●</span> Polygon Mainnet</li>
            <li>Block: 54,892,103</li>
            <li>Gas: 32 gwei</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-5 text-center text-xs text-muted-foreground">
        © 2026 BlockTix Protocol. All rights reserved.
      </div>
    </footer>
  );
}
