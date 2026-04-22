import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { events, shortAddr } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Calendar, Clock, MapPin, User, ShieldCheck, Database, FileCode2, QrCode } from "lucide-react";

export const Route = createFileRoute("/events/$eventId")({
  loader: ({ params }) => {
    const event = events.find(e => e.id === params.eventId);
    if (!event) throw notFound();
    return event;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — BlockTix` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Event — BlockTix" }],
  }),
  component: EventDetail,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center"><h1 className="text-3xl font-bold">Event not found</h1>
        <Link to="/explore" className="text-neon-cyan mt-4 inline-block">← Back to events</Link>
      </div>
    </div>
  ),
});

function EventDetail() {
  const event = Route.useLoaderData();
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl overflow-hidden border border-border relative h-72 md:h-96 grid-bg" style={{ background: event.poster }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <StatusBadge variant="verified"><ShieldCheck className="h-3 w-3" />Blockchain Verified</StatusBadge>
              <StatusBadge variant="minted">NFT Ticket</StatusBadge>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-xs font-mono text-neon-cyan uppercase">{event.category}</div>
              <h1 className="text-3xl md:text-5xl font-bold mt-2">{event.name}</h1>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { i: Calendar, l: "Date", v: event.date },
              { i: Clock, l: "Time", v: event.time },
              { i: MapPin, l: "Location", v: event.location },
              { i: User, l: "Organizer", v: event.organizer },
            ].map(x => (
              <div key={x.l} className="rounded-xl border border-border bg-card/50 p-4">
                <x.i className="h-4 w-4 text-neon-cyan mb-2" />
                <div className="text-[10px] uppercase text-muted-foreground tracking-wider">{x.l}</div>
                <div className="text-sm font-medium mt-0.5">{x.v}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <h2 className="text-xl font-semibold mb-3">About this event</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-neon-blue/20">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-neon-cyan" />
              <h2 className="text-xl font-semibold">Why this ticket is secure</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                ["Unique on-chain ID", "Each ticket is an ERC-721 token with a globally unique ID."],
                ["Cryptographic QR", "QR encodes a wallet-bound signature — duplicates are rejected."],
                ["Tamper-proof metadata", "Event data pinned to IPFS, immutable forever."],
                ["Open verification", "Anyone can verify ownership against the public contract."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-neon-cyan" />
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-5 w-5 text-neon-purple" />
              <h2 className="text-xl font-semibold">IPFS Metadata Preview</h2>
            </div>
            <pre className="text-xs font-mono bg-background/60 rounded-lg p-4 overflow-x-auto text-muted-foreground">
{`{
  "name": "${event.name}",
  "description": "${event.description.slice(0, 60)}...",
  "image": "ipfs://${event.ipfsCid}/poster.png",
  "attributes": [
    { "trait_type": "Date", "value": "${event.date}" },
    { "trait_type": "Location", "value": "${event.location}" },
    { "trait_type": "Organizer", "value": "${event.organizer}" }
  ]
}`}
            </pre>
            <div className="mt-3 text-xs font-mono text-muted-foreground flex items-center gap-2">
              <FileCode2 className="h-3.5 w-3.5" /> CID: <span className="text-neon-cyan break-all">{event.ipfsCid}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Buy panel */}
        <aside className="space-y-4">
          <div className="glass rounded-2xl p-6 border border-neon-purple/20 sticky top-20">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Tickets</div>
            <div className="text-3xl font-bold neon-text mt-1">From ${event.priceFrom}</div>
            <div className="text-xs text-muted-foreground mt-1">{event.available.toLocaleString()} of {event.total.toLocaleString()} available</div>

            <div className="mt-5 space-y-3">
              {event.tiers.map((t: typeof event.tiers[number]) => {
                const sold = t.sold >= t.quota;
                return (
                  <button key={t.name} disabled={sold} className="w-full text-left p-4 rounded-xl border border-border hover:border-neon-blue/40 transition disabled:opacity-50 disabled:cursor-not-allowed bg-background/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{(t.quota - t.sold).toLocaleString()} left</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">${t.price}</div>
                        {sold && <div className="text-xs text-destructive">Sold out</div>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button className="w-full mt-5 bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon text-primary-foreground">
              <QrCode className="h-4 w-4 mr-2" /> Buy & Mint Ticket
            </Button>
            <div className="mt-3 text-[11px] text-center text-muted-foreground">
              Ticket will be minted to your wallet on Polygon
            </div>

            <div className="mt-5 pt-5 border-t border-border space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contract</span>
                <span className="font-mono text-neon-cyan">{shortAddr(event.contractAddress)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Network</span>
                <span>Polygon</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Standard</span>
                <span>ERC-721</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
