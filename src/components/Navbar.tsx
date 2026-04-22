import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How It Works</a>
          <Link to="/explore" className="hover:text-foreground transition">Events</Link>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/connect">
            <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground hover:opacity-90 shadow-neon">
              <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
