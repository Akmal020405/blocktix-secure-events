import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/dummy-data";
import { EventCard } from "@/components/EventCard";
import { ShieldCheck, Cpu, QrCode, Database, FileCode2, Sparkles, Wallet, Ticket, BadgeCheck } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BlockTix — Secure Event Ticketing Powered by Blockchain" },
      { name: "description", content: "Anti-fraud, anti-duplicate event tickets minted as unique NFTs on-chain. Verifiable in seconds." },
      { property: "og:title", content: "BlockTix — Blockchain Event Ticketing" },
      { property: "og:description", content: "Mint, own, and verify event tickets on-chain. Zero counterfeits." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: ShieldCheck, title: "Anti-Fraud Verification", desc: "Every ticket is cryptographically signed and verified on-chain in milliseconds." },
  { icon: Sparkles, title: "NFT Ticket Ownership", desc: "Tickets are unique ERC-721 assets owned by the buyer's wallet — provably theirs." },
  { icon: QrCode, title: "QR Secure Check-in", desc: "Single-use QR codes bound to wallet identity. No duplication possible." },
  { icon: Database, title: "IPFS Metadata Storage", desc: "Event art and metadata pinned to IPFS — permanent, decentralized, tamper-proof." },
  { icon: FileCode2, title: "Smart Contract Transparency", desc: "Open contracts on Polygon. Audit every mint, transfer, and verification." },
  { icon: Cpu, title: "Real-time On-chain Stats", desc: "Live mint counts, sales, and verification metrics straight from the blockchain." },
];

const stats = [
  { label: "Events Hosted", value: "1,284" },
  { label: "Tickets Minted", value: "428,910" },
  { label: "Successful Check-ins", value: "381,427" },
  { label: "Frauds Prevented", value: "12,803" },
];

function Landing() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container relative mx-auto px-4 py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <StatusBadge variant="verified"><Sparkles className="h-3 w-3" />Powered by Polygon · IPFS · ERC-721</StatusBadge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Secure Event Ticketing<br />
              <span className="neon-text">Powered by Blockchain</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Every ticket is a unique digital asset minted on-chain — impossible to forge, impossible to duplicate, instantly verifiable at the gate.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/explore">
                <Button size="lg" className="bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground shadow-neon">
                  <Ticket className="h-4 w-4 mr-2" /> Explore Events
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="border-neon-purple/40">Create Event</Button>
              </Link>
              <Link to="/connect">
                <Button size="lg" variant="ghost"><Wallet className="h-4 w-4 mr-2" /> Connect Wallet</Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />Mainnet Live</span>
              <span>Block #54,892,103</span>
              <span>Gas 32 gwei</span>
            </div>
          </div>

          {/* Mockup ticket */}
          <div className="relative animate-float">
            <div className="absolute -inset-8 bg-gradient-to-r from-neon-blue/30 to-neon-purple/30 blur-3xl rounded-full" />
            <div className="relative glass rounded-3xl p-6 border border-neon-blue/30 shadow-neon">
              <div className="flex items-center justify-between mb-4">
                <StatusBadge variant="active">Active</StatusBadge>
                <StatusBadge variant="verified"><BadgeCheck className="h-3 w-3" />NFT</StatusBadge>
              </div>
              <div
                className="rounded-2xl h-40 mb-4 grid-bg"
                style={{ background: "linear-gradient(135deg, oklch(0.4 0.2 280), oklch(0.5 0.25 320))" }}
              />
              <div className="space-y-1">
                <div className="text-xl font-bold">Blockchain Music Fest 2026</div>
                <div className="text-xs font-mono text-muted-foreground">TKT-9F2A-0001 · VIP-A12</div>
              </div>
              <div className="border-t border-dashed border-border my-4" />
              <div className="grid grid-cols-2 text-xs gap-2">
                <div><div className="text-muted-foreground">Owner</div><div className="font-mono">0xA27F...F891</div></div>
                <div><div className="text-muted-foreground">Contract</div><div className="font-mono text-neon-cyan">⛓ Verified</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold neon-text">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-mono text-neon-cyan uppercase tracking-widest mb-3">// Features</div>
          <h2 className="text-4xl font-bold">Built for trust at every layer</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 hover:border-neon-blue/40 hover:shadow-neon transition">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 grid place-items-center mb-4 border border-neon-blue/30">
                <f.icon className="h-5 w-5 text-neon-cyan" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-mono text-neon-cyan uppercase tracking-widest mb-3">// How it works</div>
          <h2 className="text-4xl font-bold">Three steps, fully on-chain</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "01", t: "Create Ticket", d: "Organizers mint a batch of ERC-721 tickets. Metadata + art pinned to IPFS." },
            { n: "02", t: "Own Ticket", d: "Buyers receive tickets directly into their wallet. Provable ownership, transferable." },
            { n: "03", t: "Verify Ticket", d: "Validators scan QR. Smart contract confirms ownership and marks as used." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card/50 p-7">
              <div className="text-5xl font-bold neon-text opacity-50">{s.n}</div>
              <h3 className="font-semibold text-xl mt-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-6">
        {[
          { title: "For Organizers", points: ["Eliminate counterfeit losses", "Real-time mint & sales analytics", "Programmable royalties on resale", "Direct wallet-to-wallet distribution"] },
          { title: "For Attendees", points: ["Provable ticket ownership", "Resell safely on secondary markets", "Permanent on-chain proof of attendance", "Collectible NFT memorabilia"] },
        ].map((b) => (
          <div key={b.title} className="glass rounded-2xl p-8 border border-neon-purple/20">
            <h3 className="text-2xl font-bold mb-5">{b.title}</h3>
            <ul className="space-y-3">
              {b.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-neon-cyan shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* EVENTS PREVIEW */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-sm font-mono text-neon-cyan uppercase tracking-widest mb-2">// Featured</div>
            <h2 className="text-4xl font-bold">Trending events</h2>
          </div>
          <Link to="/explore"><Button variant="ghost">View all →</Button></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.slice(0, 3).map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">Trusted by web3 organizers</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "Sarah Lim", r: "Festival Director", t: "Counterfeit losses dropped to zero. The on-chain audit trail is a game-changer." },
            { n: "Marcus Wei", r: "Web3 Founder", t: "Setup took an afternoon. Our community loved owning their conference badges as NFTs." },
            { n: "Priya N.", r: "Event Producer", t: "Validators check tickets in under a second. The UX rivals traditional ticketing." },
          ].map((t) => (
            <div key={t.n} className="rounded-2xl border border-border bg-card/50 p-6">
              <p className="text-sm leading-relaxed mb-5">"{t.t}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple" />
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-4 py-20 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-10">Frequently asked</h2>
        <div className="space-y-3">
          {[
            { q: "Do I need crypto experience to buy a ticket?", a: "No. We provide a guided wallet onboarding for first-time users." },
            { q: "What blockchain do you use?", a: "Polygon — low fees, fast confirmations, and EVM-compatible." },
            { q: "Can I resell my ticket?", a: "Yes. Tickets are NFTs and transferable on supported marketplaces with organizer-defined royalties." },
            { q: "How is fraud prevented?", a: "Each QR encodes an on-chain signature tied to the ticket's wallet owner. Duplicates are rejected at scan." },
          ].map((f) => (
            <details key={f.q} className="group glass rounded-xl p-5 cursor-pointer">
              <summary className="flex justify-between items-center font-medium list-none">
                {f.q}
                <span className="text-neon-cyan text-xl group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
