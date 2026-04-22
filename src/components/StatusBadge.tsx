import { cn } from "@/lib/utils";

type Variant = "active" | "used" | "invalid" | "verified" | "pending" | "minted" | "neon";

const styles: Record<Variant, string> = {
  active: "bg-success/15 text-success border-success/30",
  used: "bg-warning/15 text-warning border-warning/30",
  invalid: "bg-destructive/15 text-destructive border-destructive/30",
  verified: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
  pending: "bg-muted text-muted-foreground border-border",
  minted: "bg-neon-purple/15 text-neon-purple border-neon-purple/30",
  neon: "bg-neon-blue/15 text-neon-blue border-neon-blue/30",
};

export function StatusBadge({
  variant = "neon",
  children,
  className,
}: {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        styles[variant],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": variant === "active",
        "bg-warning": variant === "used",
        "bg-destructive": variant === "invalid",
        "bg-neon-cyan": variant === "verified",
        "bg-muted-foreground": variant === "pending",
        "bg-neon-purple": variant === "minted",
        "bg-neon-blue": variant === "neon",
      })} />
      {children}
    </span>
  );
}
