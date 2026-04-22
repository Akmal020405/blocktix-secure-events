import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-neon-blue via-neon-purple to-neon-cyan flex items-center justify-center shadow-neon">
        <div className="h-5 w-5 rounded-sm bg-background/90 grid place-items-center">
          <div className="h-2 w-2 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple" />
        </div>
      </div>
      <span className="text-xl font-bold tracking-tight">
        Block<span className="neon-text">Tix</span>
      </span>
    </Link>
  );
}
