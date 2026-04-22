import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Features", href: "/#features", to: undefined },
  { label: "How It Works", href: "/#how", to: undefined },
  { label: "Events", to: "/explore" as const },
  { label: "FAQ", href: "/#faq", to: undefined },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(l => l.to ? (
            <Link key={l.label} to={l.to} className="hover:text-foreground transition">{l.label}</Link>
          ) : (
            <a key={l.label} href={l.href} className="hover:text-foreground transition">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/connect" className="hidden sm:block">
            <Button className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground hover:opacity-90 shadow-neon">
              <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
            </Button>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-muted"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-card border-l border-border p-6 animate-slide-in-left flex flex-col gap-1">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            {links.map(l => l.to ? (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg hover:bg-muted">{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg hover:bg-muted">{l.label}</a>
            ))}
            <Link to="/connect" onClick={() => setOpen(false)} className="mt-4">
              <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground shadow-neon">
                <Wallet className="h-4 w-4 mr-2" /> Connect Wallet
              </Button>
            </Link>
            <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 mt-3 text-xs text-muted-foreground">User dashboard →</Link>
            <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2 text-xs text-muted-foreground">Organizer dashboard →</Link>
            <Link to="/validator" onClick={() => setOpen(false)} className="px-3 py-2 text-xs text-muted-foreground">Validator dashboard →</Link>
          </div>
        </div>
      )}
    </header>
  );
}
