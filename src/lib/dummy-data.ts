export type EventCategory = "Music" | "Tech" | "Conference" | "Festival" | "Workshop";
export type TicketTier = "Regular" | "VIP" | "Early Bird";
export type TicketStatus = "Active" | "Used" | "Invalid";

export interface EventItem {
  id: string;
  name: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  poster: string;
  priceFrom: number;
  available: number;
  total: number;
  contractAddress: string;
  ipfsCid: string;
  tiers: { name: TicketTier; price: number; quota: number; sold: number }[];
}

export interface TicketItem {
  id: string;
  eventId: string;
  eventName: string;
  tier: TicketTier;
  ownerName: string;
  walletAddress: string;
  date: string;
  status: TicketStatus;
  seat?: string;
  mintDate: string;
  txHash: string;
  contractAddress: string;
  ipfsCid: string;
}

const posters = [
  "linear-gradient(135deg, oklch(0.4 0.2 280), oklch(0.5 0.25 320))",
  "linear-gradient(135deg, oklch(0.45 0.22 200), oklch(0.4 0.2 260))",
  "linear-gradient(135deg, oklch(0.5 0.25 350), oklch(0.4 0.2 290))",
  "linear-gradient(135deg, oklch(0.45 0.2 165), oklch(0.4 0.22 220))",
  "linear-gradient(135deg, oklch(0.5 0.22 30), oklch(0.45 0.25 320))",
];

export const events: EventItem[] = [
  {
    id: "evt-001",
    name: "Blockchain Music Fest 2026",
    category: "Music",
    date: "2026-06-14",
    time: "18:00",
    location: "Jakarta International Stadium",
    organizer: "ChainSound Productions",
    description:
      "The largest web3-powered music festival in Southeast Asia. 30+ artists, 3 stages, 10,000 NFT tickets minted on-chain.",
    poster: posters[0],
    priceFrom: 75,
    available: 4280,
    total: 10000,
    contractAddress: "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891",
    ipfsCid: "bafybeigdyrztktx5kx7c4rk3tabq6n3p4kwzpwcnfvwq6e5uz4i7y2k4qa",
    tiers: [
      { name: "Early Bird", price: 75, quota: 2000, sold: 1980 },
      { name: "Regular", price: 120, quota: 6000, sold: 3200 },
      { name: "VIP", price: 320, quota: 2000, sold: 540 },
    ],
  },
  {
    id: "evt-002",
    name: "Web3 Startup Summit",
    category: "Conference",
    date: "2026-04-22",
    time: "09:00",
    location: "Singapore Expo Hall A",
    organizer: "Founders DAO",
    description:
      "200+ founders, VCs, and protocol leads. Pitch sessions, panels, and on-chain badge collectibles for every attendee.",
    poster: posters[1],
    priceFrom: 199,
    available: 320,
    total: 1500,
    contractAddress: "0xB38C2a5D9eF1c4b6A7E8d9F0a1B2c3D4e5F6A7B8",
    ipfsCid: "bafybeibwzifw7n3kvqx7cjzljfxyvr6h2sqkj5l4mq3wzkpvxzwq2k7zoa",
    tiers: [
      { name: "Regular", price: 199, quota: 1000, sold: 880 },
      { name: "VIP", price: 599, quota: 500, sold: 300 },
    ],
  },
  {
    id: "evt-003",
    name: "Crypto Future Conference",
    category: "Conference",
    date: "2026-09-03",
    time: "10:00",
    location: "Dubai World Trade Centre",
    organizer: "FutureChain Org",
    description: "The premier conference for institutional crypto adoption, regulation, and DeFi infrastructure.",
    poster: posters[2],
    priceFrom: 250,
    available: 1100,
    total: 3000,
    contractAddress: "0xC49D3b6E0aF2d5c7B8E9f0A1b2C3d4E5f6A7B8C9",
    ipfsCid: "bafybeih5q7v8wtxf3u4n2bxe5p6kqj3l8mzd9wxvc4rt2yhs6vq8k3lvua",
    tiers: [
      { name: "Early Bird", price: 250, quota: 800, sold: 800 },
      { name: "Regular", price: 380, quota: 1700, sold: 900 },
      { name: "VIP", price: 950, quota: 500, sold: 200 },
    ],
  },
  {
    id: "evt-004",
    name: "NFT Creator Meetup",
    category: "Workshop",
    date: "2026-03-15",
    time: "14:00",
    location: "Bali Creative Hub",
    organizer: "PixelDAO",
    description: "Hands-on workshops for digital artists entering the NFT space. Includes a free creator badge NFT.",
    poster: posters[3],
    priceFrom: 35,
    available: 78,
    total: 250,
    contractAddress: "0xD5AE4c7F1bA3e6d8C9F0a1B2c3D4e5F6a7B8C9D0",
    ipfsCid: "bafybeic7r3xz9kqp4v2nh6mw5tlbjf8sqxe3yvdzwk6h2pl4sn8q5tk7za",
    tiers: [
      { name: "Regular", price: 35, quota: 200, sold: 172 },
      { name: "VIP", price: 95, quota: 50, sold: 0 },
    ],
  },
  {
    id: "evt-005",
    name: "Tech Innovators Expo",
    category: "Tech",
    date: "2026-07-08",
    time: "11:00",
    location: "Tokyo Big Sight",
    organizer: "Innovate Asia",
    description: "Cutting-edge demos: AI, robotics, quantum, and web3 infrastructure. 100+ exhibitors.",
    poster: posters[4],
    priceFrom: 89,
    available: 2400,
    total: 5000,
    contractAddress: "0xE6BF5d8A2cB4f7e9D0A1b2C3d4E5f6A7b8C9D0E1",
    ipfsCid: "bafybeiglk7v8nwqp4r2hxe5m6tjbw9fzvxcd8sqyk3l5r2hvz7p6n4kt8a",
    tiers: [
      { name: "Early Bird", price: 89, quota: 1500, sold: 1500 },
      { name: "Regular", price: 145, quota: 3000, sold: 1100 },
      { name: "VIP", price: 380, quota: 500, sold: 0 },
    ],
  },
];

export const tickets: TicketItem[] = [
  {
    id: "TKT-9F2A-0001",
    eventId: "evt-001",
    eventName: "Blockchain Music Fest 2026",
    tier: "VIP",
    ownerName: "Alex Chen",
    walletAddress: "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891",
    date: "2026-06-14",
    status: "Active",
    seat: "VIP-A12",
    mintDate: "2026-01-12T10:24:11Z",
    txHash: "0x7a3b9f2e1c8d4b6a0f5e2d9c1b8a7f4e3d2c1b9a8f7e6d5c4b3a2f1e0d9c8b7a",
    contractAddress: "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891",
    ipfsCid: "bafybeigdyrztktx5kx7c4rk3tabq6n3p4kwzpwcnfvwq6e5uz4i7y2k4qa",
  },
  {
    id: "TKT-9F2A-0002",
    eventId: "evt-002",
    eventName: "Web3 Startup Summit",
    tier: "Regular",
    ownerName: "Alex Chen",
    walletAddress: "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891",
    date: "2026-04-22",
    status: "Active",
    mintDate: "2026-02-03T14:02:55Z",
    txHash: "0x5e2d9c1b8a7f4e3d2c1b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    contractAddress: "0xB38C2a5D9eF1c4b6A7E8d9F0a1B2c3D4e5F6A7B8",
    ipfsCid: "bafybeibwzifw7n3kvqx7cjzljfxyvr6h2sqkj5l4mq3wzkpvxzwq2k7zoa",
  },
  {
    id: "TKT-9F2A-0003",
    eventId: "evt-004",
    eventName: "NFT Creator Meetup",
    tier: "Regular",
    ownerName: "Alex Chen",
    walletAddress: "0xA27F8e3B9dC4f1a0E5b7C8d9F2a3B4c5D6e7F891",
    date: "2025-11-10",
    status: "Used",
    mintDate: "2025-10-01T08:11:00Z",
    txHash: "0x2c1b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b",
    contractAddress: "0xD5AE4c7F1bA3e6d8C9F0a1B2c3D4e5F6a7B8C9D0",
    ipfsCid: "bafybeic7r3xz9kqp4v2nh6mw5tlbjf8sqxe3yvdzwk6h2pl4sn8q5tk7za",
  },
];

export const transactions = [
  { id: "tx1", type: "Mint", ticketId: "TKT-9F2A-0001", date: "2026-01-12", hash: "0x7a3b9f...8b7a", status: "Success" },
  { id: "tx2", type: "Mint", ticketId: "TKT-9F2A-0002", date: "2026-02-03", hash: "0x5e2d9c...9e8d", status: "Success" },
  { id: "tx3", type: "Verify", ticketId: "TKT-9F2A-0003", date: "2025-11-10", hash: "0x9d8c7b...4f3a", status: "Success" },
  { id: "tx4", type: "Transfer", ticketId: "TKT-9F2A-0004", date: "2025-10-22", hash: "0x3a2f1e...0c0b", status: "Pending" },
];

export const scanHistory = [
  { id: "s1", ticketId: "TKT-9F2A-0003", event: "NFT Creator Meetup", time: "2025-11-10 14:32", result: "Valid" as const, validator: "Gate-A" },
  { id: "s2", ticketId: "TKT-9F2A-0099", event: "NFT Creator Meetup", time: "2025-11-10 14:35", result: "Used" as const, validator: "Gate-A" },
  { id: "s3", ticketId: "TKT-FAKE-0001", event: "NFT Creator Meetup", time: "2025-11-10 14:41", result: "Invalid" as const, validator: "Gate-B" },
  { id: "s4", ticketId: "TKT-9F2A-0102", event: "NFT Creator Meetup", time: "2025-11-10 14:48", result: "Valid" as const, validator: "Gate-B" },
];

export const shortAddr = (a: string, l = 6, r = 4) => `${a.slice(0, l)}...${a.slice(-r)}`;
