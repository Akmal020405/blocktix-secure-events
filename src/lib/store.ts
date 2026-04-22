import { create } from "zustand";
import { tickets as seedTickets, type TicketItem, type TicketStatus, events } from "./dummy-data";

let counter = 1000;
const nextId = () => `TKT-USR-${String(++counter).padStart(4, "0")}`;
const randHex = (len: number) =>
  "0x" + Array.from({ length: len }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");

export interface ScanRecord {
  id: string;
  ticketId: string;
  event: string;
  time: string;
  result: "Valid" | "Used" | "Invalid";
  validator: string;
}

export interface TxRecord {
  id: string;
  type: "Mint" | "Verify" | "Transfer" | "Buy";
  ticketId: string;
  date: string;
  hash: string;
  status: "Success" | "Pending";
}

interface State {
  tickets: TicketItem[];
  scans: ScanRecord[];
  txs: TxRecord[];
  buyTicket: (eventId: string, tier: string) => TicketItem | null;
  verifyTicket: (id: string) => { kind: "valid" | "used" | "invalid"; ticket?: TicketItem };
  checkIn: (id: string) => void;
}

const seedScans: ScanRecord[] = [
  { id: "s1", ticketId: "TKT-9F2A-0003", event: "NFT Creator Meetup", time: "2025-11-10 14:32", result: "Valid", validator: "Gate-A" },
  { id: "s2", ticketId: "TKT-FAKE-0001", event: "NFT Creator Meetup", time: "2025-11-10 14:41", result: "Invalid", validator: "Gate-B" },
];

const seedTxs: TxRecord[] = [
  { id: "tx1", type: "Mint", ticketId: "TKT-9F2A-0001", date: "2026-01-12", hash: "0x7a3b9f...8b7a", status: "Success" },
  { id: "tx2", type: "Mint", ticketId: "TKT-9F2A-0002", date: "2026-02-03", hash: "0x5e2d9c...9e8d", status: "Success" },
  { id: "tx3", type: "Verify", ticketId: "TKT-9F2A-0003", date: "2025-11-10", hash: "0x9d8c7b...4f3a", status: "Success" },
];

export const useStore = create<State>((set, get) => ({
  tickets: [...seedTickets],
  scans: [...seedScans],
  txs: [...seedTxs],

  buyTicket: (eventId, tier) => {
    const ev = events.find(e => e.id === eventId);
    if (!ev) return null;
    const id = nextId();
    const ticket: TicketItem = {
      id,
      eventId,
      eventName: ev.name,
      tier: tier as TicketItem["tier"],
      ownerName: "Alex Chen",
      walletAddress: "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891",
      date: ev.date,
      status: "Active" as TicketStatus,
      mintDate: new Date().toISOString(),
      txHash: randHex(64),
      contractAddress: ev.contractAddress,
      ipfsCid: ev.ipfsCid,
    };
    set(s => ({
      tickets: [ticket, ...s.tickets],
      txs: [{ id: `tx-${Date.now()}`, type: "Mint", ticketId: id, date: new Date().toISOString().slice(0, 10), hash: ticket.txHash.slice(0, 10) + "..." + ticket.txHash.slice(-4), status: "Success" }, ...s.txs],
    }));
    return ticket;
  },

  verifyTicket: (id) => {
    const t = get().tickets.find(x => x.id.toLowerCase() === id.trim().toLowerCase());
    if (!t) {
      set(s => ({
        scans: [{
          id: `s-${Date.now()}`, ticketId: id, event: "—",
          time: new Date().toLocaleString(), result: "Invalid", validator: "Gate-A",
        }, ...s.scans],
      }));
      return { kind: "invalid" };
    }
    if (t.status === "Used") {
      set(s => ({
        scans: [{
          id: `s-${Date.now()}`, ticketId: t.id, event: t.eventName,
          time: new Date().toLocaleString(), result: "Used", validator: "Gate-A",
        }, ...s.scans],
      }));
      return { kind: "used", ticket: t };
    }
    return { kind: "valid", ticket: t };
  },

  checkIn: (id) => {
    set(s => {
      const t = s.tickets.find(x => x.id === id);
      return {
        tickets: s.tickets.map(x => x.id === id ? { ...x, status: "Used" as TicketStatus } : x),
        scans: [{
          id: `s-${Date.now()}`, ticketId: id, event: t?.eventName ?? "—",
          time: new Date().toLocaleString(), result: "Valid", validator: "Gate-A",
        }, ...s.scans],
        txs: [{
          id: `tx-${Date.now()}`, type: "Verify", ticketId: id,
          date: new Date().toISOString().slice(0, 10),
          hash: randHex(8).slice(0, 10) + "..." + randHex(4).slice(-4),
          status: "Success",
        }, ...s.txs],
      };
    });
  },
}));
