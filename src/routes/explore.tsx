import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { events } from "@/lib/dummy-data";
import { EventCard } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Events — BlockTix" },
      { name: "description", content: "Discover blockchain-verified events. Concerts, conferences, festivals, and workshops." },
      { property: "og:title", content: "Explore Events — BlockTix" },
      { property: "og:description", content: "Browse on-chain verified events with NFT tickets." },
    ],
  }),
  component: Explore,
});

const categories = ["All", "Music", "Tech", "Conference", "Festival", "Workshop"];

function Explore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const filtered = events.filter(e =>
    (cat === "All" || e.category === cat) &&
    (q === "" || e.name.toLowerCase().includes(q.toLowerCase()) || e.location.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl">
          <div className="text-sm font-mono text-neon-cyan uppercase tracking-widest mb-3">// Explore</div>
          <h1 className="text-4xl md:text-5xl font-bold">Discover <span className="neon-text">on-chain events</span></h1>
          <p className="text-muted-foreground mt-3">Every ticket below is minted as a unique NFT — impossible to forge.</p>
        </div>

        <div className="mt-8 glass rounded-2xl p-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search by event name or location..."
              className="pl-10 bg-background/40 border-border"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  cat === c
                    ? "bg-gradient-to-r from-neon-blue to-neon-purple text-primary-foreground border-transparent shadow-neon"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <select className="bg-background/40 border border-border rounded-lg px-3 py-1.5">
              <option>Any date</option><option>This week</option><option>This month</option>
            </select>
            <select className="bg-background/40 border border-border rounded-lg px-3 py-1.5">
              <option>Any location</option><option>Jakarta</option><option>Singapore</option><option>Tokyo</option><option>Dubai</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(e => <EventCard key={e.id} event={e} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No events match your filters.</div>
        )}
      </section>
      <Footer />
    </div>
  );
}
