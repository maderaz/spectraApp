import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

// ─── Vault data store ───
interface AllocationData {
  name: string;
  protocol: string;
  allocationPct: string;
  vaultSupply: string;
  expiry: string;
  category: "pool" | "idle";
  iconBg1: string;
  iconBg2: string;
}

interface ApyBreakdownToken {
  name: string;
  value?: string;
  iconBg?: string;
  isBadge?: boolean;
}

interface ApyBreakdownCategory {
  label: string;
  value: string;
  tokens?: ApyBreakdownToken[];
}

interface ApyBreakdownHighlight {
  label: string;
  iconBg: string;
  color: string;
}

interface ApyBreakdownData {
  total: string;
  categories: ApyBreakdownCategory[];
  highlights?: ApyBreakdownHighlight[];
  footnote?: string;
  footnoteLink?: { text: string; url: string };
  note?: string;
}

interface VaultData {
  id: string;
  name: string;
  curator: string;
  curatorLink: string;
  maxApy: string;
  maxApyNum: number;
  tvl: string;
  tvlShort: string;
  chain: string;
  chainColor: string;
  iconType: "usdc" | "gami" | "flare";
  accentColor: string;
  depositToken: string;
  depositSymbol: string;
  underlyingAsset: string;
  settlementFreq: string;
  maturity: string;
  description: string;
  features: string[];
  apyBreakdown: ApyBreakdownData;
  allocations: AllocationData[];
  // Technical details
  deploymentDate: string;
  network: string;
  crossChain: string;
  timelockDuration: string;
  pendingActions: number;
  vaultAddress: string;
  // Deposit/Withdraw panel
  shareToken: string;
  completionTime: string;
  latestRate: string;
}

const VAULTS: Record<string, VaultData> = {
  "vbusdc-katana": {
    id: "vbusdc-katana",
    name: "vbUSDC Katana",
    curator: "Clearstar",
    curatorLink: "#",
    maxApy: "36.63%",
    maxApyNum: 36.63,
    tvl: "$963,794",
    tvlShort: "$963.8K",
    chain: "Katana",
    chainColor: "#25272b",
    iconType: "usdc",
    accentColor: "#00f99b",
    depositToken: "USDC",
    depositSymbol: "USDC",
    underlyingAsset: "USDC",
    settlementFreq: "~1d 4h",
    maturity: "Mar 13, 2026",
    description:
      "The vbUSDC Katana MetaVault is designed to optimize USDC-backed yields exclusively within the Spectra ecosystem through advanced positions on USDC-pegged assets. Assets are supplied on the Katana Network, though the vault retains the agility to deploy liquidity cross-chain to capture top-performing Spectra pools. No leverage, no liquidation risk.",
    features: ["Automatic liquidity rollovers", "Auto-captures & compounds YT yield"],
    apyBreakdown: {
      total: "36.29-36.63%",
      categories: [
        {
          label: "NAV Performance",
          value: "3.28%",
        },
        {
          label: "Pool Rewards",
          value: "33.01-33.35%",
          tokens: [
            { name: "KAT", value: "0.93%", iconBg: "#0d9488" },
            { name: "Drops", isBadge: true },
            { name: "InfiniFi points", isBadge: true },
            { name: "SPECTRA", value: "0.22-0.55%", iconBg: "#b6509e" },
            { name: "KAT App Rewards", value: "2.96%" },
            { name: "KAT Base", value: "28.88%" },
          ],
        },
      ],
      footnote: "Rewards are claimable via Portfolio page → All Rewards button.",
      note: "Note: Distribution period may vary per reward.",
    },
    allocations: [
      { name: "aUSDC", protocol: "Aave", allocationPct: "62.30%", vaultSupply: "$600,400", expiry: "Jun 04 2026", category: "pool", iconBg1: "#2775ca", iconBg2: "#b6509e" },
      { name: "USDC", protocol: "", allocationPct: "37.70%", vaultSupply: "$363,394", expiry: "-", category: "idle", iconBg1: "#2775ca", iconBg2: "#2775ca" },
    ],
    deploymentDate: "Jan 15 2026",
    network: "Katana",
    crossChain: "NO",
    timelockDuration: "3 days",
    pendingActions: 0,
    vaultAddress: "0x1234abcd5678ef901234567890abcdef12345678",
    shareToken: "vbUSDC",
    completionTime: "~1 day 4 hours",
    latestRate: "1 vbUSDC = 1.00312 USDC",
  },
  "gami-spectra": {
    id: "gami-spectra",
    name: "Gami Spectra USDC",
    curator: "Gami Labs",
    curatorLink: "#",
    maxApy: "15.66%",
    maxApyNum: 15.66,
    tvl: "$428,829",
    tvlShort: "$428.8K",
    chain: "Base",
    chainColor: "#0052ff",
    iconType: "gami",
    accentColor: "#00f99b",
    depositToken: "USDC",
    depositSymbol: "USDC",
    underlyingAsset: "USDC",
    settlementFreq: "~6h",
    maturity: "Jun 15, 2026",
    description:
      "Multi-strategy USDC vault that optimizes across Spectra PT positions on Base for consistent yield generation. The vault automatically rebalances between lending protocols and PT swaps.",
    features: ["Automatic liquidity rollovers", "Auto-captures & compounds YT yield"],
    apyBreakdown: {
      total: "15.66%",
      categories: [
        {
          label: "Base APY",
          value: "8.20%",
          tokens: [
            { name: "aUSDC", value: "8.20%", iconBg: "#2775ca" },
          ],
        },
        {
          label: "Boosted PT Yield",
          value: "5.46%",
          tokens: [
            { name: "aUSDC", value: "5.46%", iconBg: "#2775ca" },
          ],
        },
        {
          label: "Protocol Incentives",
          value: "2.00%",
          tokens: [
            { name: "aUSDC", value: "2.00%", iconBg: "#f4c071" },
          ],
        },
      ],
    },
    allocations: [
      { name: "aUSDC", protocol: "Aave", allocationPct: "55.00%", vaultSupply: "$235,856", expiry: "Aug 20 2026", category: "pool", iconBg1: "#2775ca", iconBg2: "#b6509e" },
      { name: "USDC", protocol: "", allocationPct: "45.00%", vaultSupply: "$192,973", expiry: "-", category: "idle", iconBg1: "#2775ca", iconBg2: "#2775ca" },
    ],
    deploymentDate: "Dec 01 2025",
    network: "Base",
    crossChain: "NO",
    timelockDuration: "5 days",
    pendingActions: 0,
    vaultAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    shareToken: "gamisUSDC",
    completionTime: "~6 hours",
    latestRate: "1 gamisUSDC = 1.00087 USDC",
  },
  "flare-xrp": {
    id: "flare-xrp",
    name: "Flare XRP Yield Prime",
    curator: "Gami Labs",
    curatorLink: "#",
    maxApy: "5.77%",
    maxApyNum: 5.77,
    tvl: "$2,540,024",
    tvlShort: "$2.5M",
    chain: "Flare Mainnet",
    chainColor: "#e62058",
    iconType: "flare",
    accentColor: "#ff9900",
    depositToken: "FXRP",
    depositSymbol: "FXRP",
    underlyingAsset: "FXRP",
    settlementFreq: "~2d 1h",
    maturity: "Sep 30, 2026",
    description:
      "The Flare XRP Yield Prime MetaVault is designed to optimize XRP-backed yields exclusively within the Spectra ecosystem through advanced positions on XRP-pegged assets. Assets are supplied on the Flare Network, though the vault retains the agility to deploy liquidity cross-chain to capture top-performing Spectra pools. No leverage, no liquidation risk.",
    features: ["Automatic liquidity rollovers", "Auto-captures & compounds YT yield"],
    apyBreakdown: {
      total: "5.77%",
      categories: [
        {
          label: "NAV Performance",
          value: "0%",
        },
        {
          label: "Pool Rewards",
          value: "<0.01%",
          tokens: [
            { name: "rFLR", value: "<0.01%", iconBg: "#e62058" },
          ],
        },
        {
          label: "MetaVault Rewards",
          value: "5.77%",
          tokens: [
            { name: "rFLR", value: "5.77%", iconBg: "#e62058" },
          ],
        },
      ],
      highlights: [
        { label: "Firelight points", iconBg: "#ff6b35", color: "#f4c071" },
      ],
      footnote: "rFLR Rewards are previewable via this ",
      footnoteLink: { text: "Page", url: "#" },
      note: "Note: Distribution period may vary per reward.",
    },
    allocations: [
      { name: "stXRP", protocol: "Firelight", allocationPct: "<0.01%", vaultSupply: "$1.42", expiry: "Jun 04 2026", category: "pool", iconBg1: "#e62058", iconBg2: "#ff6b35" },
      { name: "FXRP", protocol: "", allocationPct: "99.99%", vaultSupply: "$2,540,024", expiry: "-", category: "idle", iconBg1: "#e62058", iconBg2: "#e62058" },
    ],
    deploymentDate: "Feb 27 2026",
    network: "Flare Mainnet",
    crossChain: "NO",
    timelockDuration: "7 days",
    pendingActions: 0,
    vaultAddress: "0x6428a613e936682ca3f1ad5688b3f4d47d473bf1",
    shareToken: "gamisXRP",
    completionTime: "~2 days 1 hour",
    latestRate: "1 gamisXRP = 1.00001 FXRP",
  },
};

// ─── Performance chart data ───
function generatePerformanceData(vaultId: string) {
  const baseApy: Record<string, number[]> = {
    "vbusdc-katana": [28.5, 30.2, 32.1, 31.8, 33.4, 35.0, 34.2, 34.8, 35.5, 34.1, 35.2, 36.0, 35.8, 36.3, 36.63],
    "gami-spectra": [10.2, 11.5, 12.0, 12.8, 13.2, 13.8, 14.1, 14.5, 14.0, 14.8, 15.1, 15.3, 15.0, 15.5, 15.66],
    "flare-xrp": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.02, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  };
  const basePrice: Record<string, number[]> = {
    "vbusdc-katana": [1.0, 1.01, 1.02, 1.01, 1.03, 1.04, 1.03, 1.05, 1.06, 1.04, 1.06, 1.07, 1.06, 1.07, 1.08],
    "gami-spectra": [1.0, 1.0, 1.01, 1.01, 1.02, 1.02, 1.03, 1.03, 1.02, 1.03, 1.04, 1.04, 1.03, 1.04, 1.04],
    "flare-xrp": [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.02, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  };
  const apys = baseApy[vaultId] || baseApy["flare-xrp"];
  const prices = basePrice[vaultId] || basePrice["flare-xrp"];
  const labels = ["March", "Tue 03", "Thu 05", "Sat 07", "Mon 09", "Wed 11", "Fri 13"];

  const step = Math.max(1, Math.floor(apys.length / 7));
  return labels.map((label, i) => {
    const idx = Math.min(i * step, apys.length - 1);
    return {
      date: label,
      apy: apys[idx],
      sharePrice: prices[idx],
    };
  });
}

// ─── Icons ───
function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M9 6.5V9.5C9 10.0523 8.55228 10.5 8 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V4C1.5 3.44772 1.94772 3 2.5 3H5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 1.5H10.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 7L10.5 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ opacity = 0.3 }: { opacity?: number }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeOpacity={opacity} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00f99b" fillOpacity="0.15" stroke="#00f99b" strokeWidth="1.5" />
      <path d="M8 12.5L10.5 15L16 9.5" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}

// ─── Vault Icon ───
function VaultIcon({ type, size = 40 }: { type: "usdc" | "gami" | "flare"; size?: number }) {
  if (type === "usdc") {
    return (
      <div style={{ width: size, height: size }} className="rounded-full bg-[#2775ca] flex items-center justify-center shrink-0">
        <span className="text-white font-['Inter']" style={{ fontSize: size * 0.45, fontWeight: 700 }}>$</span>
      </div>
    );
  }
  if (type === "gami") {
    return (
      <div style={{ width: size, height: size }} className="rounded-full bg-[#00c3ff] flex items-center justify-center shrink-0">
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="6" fill="white" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size }} className="rounded-full bg-[#e62058] flex items-center justify-center shrink-0">
      <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15 9H21L16 14L18 21L12 17L6 21L8 14L3 9H9L12 2Z" fill="white" />
      </svg>
    </div>
  );
}

// ─── Chain icon ───
function ChainIcon({ chain, color }: { chain: string; color: string }) {
  return (
    <div className="w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0" style={{ background: color }}>
      {chain === "Katana" ? (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M4 20L12 4L20 20H4Z" fill="#00f99b" /></svg>
      ) : chain === "Base" ? (
        <span className="text-[7px] text-white" style={{ fontWeight: 700 }}>B</span>
      ) : (
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="white" /></svg>
      )}
    </div>
  );
}

// ─── Token icon (24px standard) ───
function TokenIcon({ symbol, size = 24, bg }: { symbol: string; size?: number; bg?: string }) {
  const bgColor = bg || (symbol === "USDC" ? "#2775ca" : symbol === "FXRP" || symbol === "XRP" ? "#e62058" : "#2775ca");
  const label = symbol === "USDC" ? "$" : symbol === "FXRP" || symbol === "XRP" ? "X" : symbol[0];
  return (
    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: size, height: size, background: bgColor }}>
      <span className="text-white font-['Inter']" style={{ fontSize: size * 0.42, fontWeight: 700 }}>{label}</span>
    </div>
  );
}

// ─── MV Badge overlay (small "MV" circle) ───
function MvBadge() {
  return (
    <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full bg-[#7c5cdb] flex items-center justify-center border-2 border-[#1c1c1e]">
      <span className="text-white text-[6px]" style={{ fontWeight: 700 }}>MV</span>
    </div>
  );
}

// ─── MaxApyTooltip ───
function MaxApyTooltip({ apy, breakdown, color }: {
  apy: string;
  breakdown: ApyBreakdownData;
  color: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <span
        className="cursor-help text-[14px]"
        style={{
          color,
          fontWeight: 500,
          borderBottom: `1px dotted ${color}`,
          paddingBottom: 1,
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {apy}
      </span>
      {show && (
        <div
          className="absolute z-50 top-full left-0 mt-2 w-[260px] bg-[#232326] border border-white/[0.08] rounded-[10px] p-0 shadow-xl"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {/* Total row */}
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-white/[0.06]">
            <span className="text-white text-[12px]" style={{ fontWeight: 600 }}>Total</span>
            <span className="text-white text-[12px]" style={{ fontWeight: 600 }}>{breakdown.total}</span>
          </div>

          {/* Categories */}
          <div className="px-4 py-2.5 flex flex-col gap-0">
            {breakdown.categories.map((cat) => (
              <div key={cat.label}>
                {/* Category header row */}
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-white/60 text-[11px]" style={{ fontWeight: 400 }}>{cat.label}</span>
                  <span className="text-white/60 text-[11px]" style={{ fontWeight: 500 }}>{cat.value}</span>
                </div>
                {/* Token sub-rows */}
                {cat.tokens && cat.tokens.map((tok, idx) => {
                  // Badge item — grey rounded pill
                  if (tok.isBadge) {
                    return (
                      <div key={`badge-${idx}`} className="py-1 pl-3">
                        <span
                          className="inline-block text-[11px] text-white/50 px-2.5 py-[3px] rounded-[6px] bg-white/[0.06] border border-white/[0.08]"
                          style={{ fontWeight: 500 }}
                        >
                          {tok.name}
                        </span>
                      </div>
                    );
                  }
                  // Token with icon
                  if (tok.iconBg) {
                    return (
                      <div key={tok.name} className="flex items-center justify-between py-1 pl-3">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0"
                            style={{ background: tok.iconBg }}
                          >
                            <span className="text-white text-[7px]" style={{ fontWeight: 700 }}>{tok.name[0]}</span>
                          </div>
                          <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>{tok.name}</span>
                        </div>
                        <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>{tok.value}</span>
                      </div>
                    );
                  }
                  // Plain text item (no icon)
                  return (
                    <div key={tok.name} className="flex items-center justify-between py-1 pl-3">
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>{tok.name}</span>
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>{tok.value}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Highlight badges */}
          {breakdown.highlights && breakdown.highlights.length > 0 && (
            <div className="px-4 pb-2">
              {breakdown.highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-2 px-3 py-[6px] rounded-[8px]"
                  style={{ background: `${h.color}12` }}
                >
                  <div
                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                    style={{ background: h.iconBg }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="8" fill="white" />
                    </svg>
                  </div>
                  <span className="text-[11px]" style={{ fontWeight: 500, color: h.color }}>{h.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footnote + Note */}
          {(breakdown.footnote || breakdown.note) && (
            <div className="px-4 pb-3.5 pt-1 border-t border-white/[0.06]">
              {breakdown.footnote && (
                <p className="text-[10px] text-white/30 leading-[1.5] mt-1.5" style={{ fontWeight: 400 }}>
                  {breakdown.footnote}
                  {breakdown.footnoteLink && (
                    <a
                      href={breakdown.footnoteLink.url}
                      className="underline text-white/40 hover:text-white/60"
                    >
                      {breakdown.footnoteLink.text}
                    </a>
                  )}
                  {breakdown.footnoteLink && ", updated every 6 hours."}
                </p>
              )}
              {breakdown.note && (
                <p className="text-[10px] text-white/25 leading-[1.5] mt-1.5" style={{ fontWeight: 400 }}>
                  {breakdown.note}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Custom chart tooltip ───
function CustomChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1c1c1e] border border-white/[0.1] rounded-[8px] p-3 shadow-lg">
      <div className="text-[10px] text-white/40 mb-1.5" style={{ fontWeight: 500 }}>{label}</div>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-[11px] text-white/60" style={{ fontWeight: 400 }}>
            {entry.dataKey === "apy" ? "Max APY" : "Share Price"}
          </span>
          <span className="text-[11px] text-white" style={{ fontWeight: 500 }}>
            {entry.dataKey === "apy"
              ? `${entry.value.toFixed(2)}%`
              : entry.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Header Card ───
function VaultHeader({ vault, onBack }: { vault: VaultData; onBack: () => void }) {
  return (
    <div className="bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-5 sm:p-6">
      {/* Top row: icon + name + view on explorer */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="flex items-center gap-3">
          <VaultIcon type={vault.iconType} size={36} />
          <h1 className="text-white text-[16px]" style={{ fontWeight: 600 }}>{vault.name}</h1>
        </div>
        <a href="#" className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors shrink-0">
          <span className="text-[11px]" style={{ fontWeight: 400 }}>View on Explorer</span>
          <ExternalLinkIcon size={11} />
        </a>
      </div>

      {/* Curator */}
      <div className="mb-3 ml-[48px]">
        <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>Curated by </span>
        <a href={vault.curatorLink} className="text-[11px] text-[#ff9900] hover:underline" style={{ fontWeight: 500 }}>{vault.curator}</a>
      </div>

      {/* Description */}
      <p className="text-[11px] text-white/50 leading-[1.65] mb-3" style={{ fontWeight: 400 }}>
        {vault.description}{" "}
        <InfoIcon size={12} />
      </p>

      {/* Feature badges */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        {vault.features.map((f) => (
          <div key={f} className="flex items-center gap-1.5">
            <CheckCircle />
            <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="border-t border-white/[0.06] pt-4">
        <div className="flex items-start justify-between flex-wrap gap-y-4">
          <div className="flex flex-col gap-[3px]">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Max APY</span>
              <InfoIcon size={11} />
            </div>
            <MaxApyTooltip apy={vault.maxApy} breakdown={vault.apyBreakdown} color={vault.accentColor} />
          </div>
          <div className="flex flex-col gap-[3px]">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>TVL</span>
              <InfoIcon size={11} />
            </div>
            <span className="text-white text-[14px]" style={{ fontWeight: 500 }}>{vault.tvlShort}</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Underlying Asset</span>
              <InfoIcon size={11} />
            </div>
            <div className="flex items-center gap-1.5">
              <TokenIcon symbol={vault.underlyingAsset} size={16} />
              <span className="text-white text-[14px]" style={{ fontWeight: 500 }}>{vault.underlyingAsset}</span>
            </div>
          </div>
          <div className="flex flex-col gap-[3px]">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Settlement Frequency</span>
              <InfoIcon size={11} />
            </div>
            <span className="text-white text-[14px]" style={{ fontWeight: 500 }}>{vault.settlementFreq}</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Chain</span>
            <div className="flex items-center gap-1.5">
              <ChainIcon chain={vault.chain} color={vault.chainColor} />
              <span className="text-white text-[14px]" style={{ fontWeight: 500 }}>{vault.chain}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Deposit Panel ───
function DepositPanel({ vault }: { vault: VaultData }) {
  const [depositAmount, setDepositAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const inputNum = parseFloat(depositAmount) || 0;

  const isDeposit = activeTab === "deposit";

  return (
    <div className="bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-4 sm:p-5">
      {/* Pill tab switch: Deposit / Withdraw */}
      <div className="flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px] mb-4">
        <button
          onClick={() => { setActiveTab("deposit"); setDepositAmount(""); setDetailsOpen(false); }}
          className={`flex-1 py-[6px] rounded-[4px] text-[12px] transition-colors ${
            isDeposit
              ? "text-[#191919]"
              : "text-white/35 hover:text-white/55"
          }`}
          style={{
            fontWeight: isDeposit ? 500 : 400,
            background: isDeposit ? vault.accentColor : "transparent",
          }}
        >
          Deposit
        </button>
        <button
          onClick={() => { setActiveTab("withdraw"); setDepositAmount(""); setDetailsOpen(false); }}
          className={`flex-1 py-[6px] rounded-[4px] text-[12px] transition-colors ${
            !isDeposit
              ? "text-[#191919]"
              : "text-white/35 hover:text-white/55"
          }`}
          style={{
            fontWeight: !isDeposit ? 500 : 400,
            background: !isDeposit ? vault.accentColor : "transparent",
          }}
        >
          Withdraw
        </button>
      </div>

      {/* Input label */}
      <div className="text-[11px] text-white/40 mb-2" style={{ fontWeight: 400 }}>Input</div>

      {/* Input field — split border layout */}
      <div className="flex items-center h-[50px] border border-white/15 rounded-[8px] mb-1">
        <div className="flex-1 h-full px-3 flex flex-col justify-center">
          <input
            type="text"
            placeholder="0"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full bg-transparent text-white text-[16px] outline-none placeholder-[#a1a1aa] font-['Inter']"
            style={{ fontWeight: 400 }}
          />
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>
            ≈${inputNum > 0 ? inputNum.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : "0"}
          </span>
        </div>
        <div className="w-px h-6 bg-white/15" />
        {isDeposit ? (
          /* Deposit: base token with dropdown chevron */
          <div className="flex items-center gap-2 px-3 h-full cursor-pointer hover:bg-white/[0.02] rounded-r-[8px] transition-colors">
            <TokenIcon symbol={vault.depositSymbol} size={24} />
            <span className="text-white text-[13px]" style={{ fontWeight: 500 }}>{vault.depositSymbol}</span>
            <ChevronDown opacity={0.3} />
          </div>
        ) : (
          /* Withdraw: vault share token with MV badge, no dropdown */
          <div className="flex items-center gap-2 px-3 h-full">
            <div className="relative">
              <TokenIcon symbol={vault.depositSymbol} size={24} />
              <MvBadge />
            </div>
            <span className="text-white text-[13px]" style={{ fontWeight: 500 }}>{vault.shareToken}</span>
          </div>
        )}
      </div>

      {/* Spacer before content */}
      <div className="h-3" />

      {isDeposit ? (
        /* ─── DEPOSIT VIEW ─── */
        <>
          {/* Stats: Max APY, Est. Monthly Earnings, Est. Yearly Earnings */}
          <div className="flex flex-col gap-2.5 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Max APY</span>
              <span className="text-[12px]" style={{ fontWeight: 500, color: vault.accentColor }}>{vault.maxApy}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Est. Monthly Earnings</span>
                <InfoIcon size={12} />
              </div>
              <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>
                ${inputNum > 0 ? ((inputNum * vault.maxApyNum) / 100 / 12).toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Est. Yearly Earnings</span>
                <InfoIcon size={12} />
              </div>
              <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>
                ${inputNum > 0 ? ((inputNum * vault.maxApyNum) / 100).toFixed(2) : "0.00"}
              </span>
            </div>
          </div>

          {/* Details expandable */}
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="w-full flex items-center justify-between py-2.5 border-t border-white/[0.06]"
          >
            <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Details</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`}
            >
              <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {detailsOpen && (
            <div className="flex flex-col gap-2.5 mb-3 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Completion Time</span>
                  <InfoIcon size={12} />
                </div>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>{vault.completionTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Latest Rate</span>
                  <InfoIcon size={12} />
                </div>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>{vault.latestRate}</span>
              </div>
            </div>
          )}
        </>
      ) : (
        /* ─── WITHDRAW VIEW ─── */
        <div className="flex flex-col gap-2.5 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Completion Time</span>
              <InfoIcon size={12} />
            </div>
            <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>{vault.completionTime}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Latest Rate</span>
              <InfoIcon size={12} />
            </div>
            <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>{vault.latestRate}</span>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        className="w-full py-3 rounded-[8px] text-[13px] transition-colors flex items-center justify-center gap-2 mt-2"
        style={{
          fontWeight: 600,
          background: vault.accentColor,
          color: "#191919",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
        Connect Wallet
      </button>
    </div>
  );
}

// ─── Vault Performance Section ───
function VaultPerformanceSection({ vault }: { vault: VaultData }) {
  const [metric, setMetric] = useState<"APY" | "TVL">("APY");
  const [timeRange, setTimeRange] = useState("All");
  const data = generatePerformanceData(vault.id);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h2 className="text-white text-[14px] mb-0.5" style={{ fontWeight: 600 }}>Vault Performance</h2>
          <p className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>Historical APY and TVL trends.</p>
        </div>
        {/* Metric dropdown */}
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>{metric}</span>
          <ChevronDown opacity={0.4} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00f99b]" />
          <span className="text-[10px] text-white/40" style={{ fontWeight: 400 }}>Max APY</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff9900]" />
          <span className="text-[10px] text-white/40" style={{ fontWeight: 400 }}>Share Price</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[240px] sm:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: isMobile ? 5 : 10, left: isMobile ? 0 : -10, bottom: 0 }}>
            <defs>
              <linearGradient id={`apyGrad-${vault.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f99b" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#00f99b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
            />
            <YAxis
              yAxisId="apy"
              orientation="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              tickFormatter={(v: number) => v.toFixed(2)}
              hide={isMobile}
              width={isMobile ? 0 : undefined}
            />
            <YAxis
              yAxisId="pct"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              tickFormatter={(v: number) => `${(v * 100).toFixed(1)}%`}
              domain={[0, 'auto']}
              hide={isMobile}
              width={isMobile ? 0 : undefined}
            />
            <RechartsTooltip
              content={<CustomChartTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.08)" }}
            />
            <Area
              yAxisId="apy"
              type="monotone"
              dataKey="apy"
              fill={`url(#apyGrad-${vault.id})`}
              stroke="#00f99b"
              strokeWidth={1.5}
            />
            <Line
              yAxisId="apy"
              type="monotone"
              dataKey="sharePrice"
              stroke="#ff9900"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={{ r: 4, fill: "#00f99b", stroke: "#191919", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#ff9900" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Time range toggle */}
      <div className="flex items-center justify-end gap-2 mt-3">
        {["Custom", "All"].map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            className={`px-2.5 py-[3px] rounded-[6px] text-[10px] transition-colors ${
              timeRange === r
                ? "bg-white/[0.08] text-white"
                : "text-white/40 hover:text-white/60"
            }`}
            style={{ fontWeight: timeRange === r ? 500 : 400 }}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Allocations Section ───
function AllocationsSection({ vault }: { vault: VaultData }) {
  const pools = vault.allocations.filter((a) => a.category === "pool");
  const idle = vault.allocations.filter((a) => a.category === "idle");

  return (
    <div className="bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-4 sm:p-5">
      <h2 className="text-white text-[14px] mb-0.5" style={{ fontWeight: 600 }}>Allocations</h2>
      <p className="text-[11px] text-white/35 mb-4" style={{ fontWeight: 400 }}>
        Current MetaVault allocations across pools, interest-bearing tokens, and idle liquidity.
      </p>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[500px]">
          {/* Header */}
          <div className="flex items-center py-2.5 border-b border-white/[0.06]">
            <span className="flex-[2] text-white/30 text-[10px] tracking-wider" style={{ fontWeight: 500 }}>Asset</span>
            <span className="flex-1 text-white/30 text-[10px] tracking-wider text-right" style={{ fontWeight: 500 }}>Allocation %</span>
            <span className="flex-1 text-white/30 text-[10px] tracking-wider text-right" style={{ fontWeight: 500 }}>Vault Supply</span>
            <span className="flex-1 text-white/30 text-[10px] tracking-wider text-right" style={{ fontWeight: 500 }}>Expiry</span>
          </div>

          {/* Pools */}
          {pools.length > 0 && (
            <>
              <div className="py-2.5">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pools ({pools.length})</span>
              </div>
              {pools.map((a) => (
                <div key={a.name} className="flex items-center py-2.5 border-b border-white/[0.04]">
                  <div className="flex-[2] flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0" style={{ background: a.iconBg1 }}>
                        <span className="text-white text-[9px]" style={{ fontWeight: 700 }}>{a.name[0]}</span>
                      </div>
                      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 border-2 border-[#1c1c1e]" style={{ background: a.iconBg2 }}>
                        <span className="text-white text-[9px]" style={{ fontWeight: 700 }}>{a.name[0]}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-white text-[12px]" style={{ fontWeight: 500 }}>{a.name}</span>
                        <ExternalLinkIcon size={10} />
                      </div>
                      {a.protocol && (
                        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{a.protocol}</span>
                      )}
                    </div>
                  </div>
                  <span className="flex-1 text-white/60 text-[12px] text-right" style={{ fontWeight: 500 }}>{a.allocationPct}</span>
                  <span className="flex-1 text-white/60 text-[12px] text-right" style={{ fontWeight: 500 }}>{a.vaultSupply}</span>
                  <span className="flex-1 text-white/60 text-[12px] text-right" style={{ fontWeight: 500 }}>{a.expiry}</span>
                </div>
              ))}
            </>
          )}

          {/* Idle Liquidity */}
          {idle.length > 0 && (
            <>
              <div className="py-2.5">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Idle Liquidity ({idle.length})</span>
              </div>
              {idle.map((a) => (
                <div key={a.name} className="flex items-center py-2.5 border-b border-white/[0.04]">
                  <div className="flex-[2] flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0" style={{ background: a.iconBg1 }}>
                        <span className="text-white text-[9px]" style={{ fontWeight: 700 }}>{a.name[0]}</span>
                      </div>
                      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0 border-2 border-[#1c1c1e]" style={{ background: a.iconBg2 }}>
                        <span className="text-white text-[9px]" style={{ fontWeight: 700 }}>{a.name[0]}</span>
                      </div>
                    </div>
                    <span className="text-white text-[12px]" style={{ fontWeight: 500 }}>{a.name}</span>
                  </div>
                  <span className="flex-1 text-white/60 text-[12px] text-right" style={{ fontWeight: 500 }}>{a.allocationPct}</span>
                  <span className="flex-1 text-white/60 text-[12px] text-right" style={{ fontWeight: 500 }}>{a.vaultSupply}</span>
                  <span className="flex-1 text-white/40 text-[12px] text-right" style={{ fontWeight: 400 }}>{a.expiry}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Technical Details Section ───
function TechnicalDetailsSection({ vault }: { vault: VaultData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(vault.vaultAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-4 sm:p-5">
      <h2 className="text-white text-[14px] mb-0.5" style={{ fontWeight: 600 }}>Technical Details</h2>
      <p className="text-[11px] text-white/35 mb-4" style={{ fontWeight: 400 }}>
        On-chain information and vault configuration.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Curator</span>
          <a href="#" className="text-[12px] text-[#ff9900] hover:underline flex items-center gap-1" style={{ fontWeight: 500 }}>
            {vault.curator} <ExternalLinkIcon size={10} />
          </a>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Deployment Date</span>
          <span className="text-white text-[12px]" style={{ fontWeight: 500 }}>{vault.deploymentDate}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Network</span>
          <span className="text-white text-[12px]" style={{ fontWeight: 500 }}>{vault.network}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Cross-chain</span>
          <span className="text-white text-[12px]" style={{ fontWeight: 500 }}>{vault.crossChain}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Timelock Duration</span>
          <span className="text-white text-[12px]" style={{ fontWeight: 500 }}>{vault.timelockDuration}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Pending Actions</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-[6px] border border-white/[0.08] bg-white/[0.04]">
              <ClockIcon />
              <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>{vault.pendingActions}</span>
              <ChevronDown opacity={0.3} />
            </div>
          </div>
        </div>
      </div>

      {/* Vault address */}
      <div className="border-t border-white/[0.06] pt-4">
        <span className="text-[10px] text-white/30 block mb-1" style={{ fontWeight: 400 }}>Vault Address</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/50 font-mono" style={{ fontWeight: 400 }}>
            {vault.vaultAddress}
          </span>
          <button onClick={handleCopy} className="text-white/30 hover:text-white/50 transition-colors">
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            ) : (
              <CopyIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main MetaVaultDetail component ───
export function MetaVaultDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vault = VAULTS[id || ""];

  if (!vault) {
    return (
      <div className="flex-1 min-w-0 overflow-auto font-['Inter'] flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-white/40 text-[14px] mb-3" style={{ fontWeight: 400 }}>Vault not found</div>
          <button
            onClick={() => navigate("/metavaults")}
            className="text-[13px] text-white/50 hover:text-white transition-colors underline"
            style={{ fontWeight: 400 }}
          >
            Back to MetaVaults
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 overflow-auto font-['Inter']">
      <div className="flex flex-col p-4 sm:p-6 xl:p-8 gap-5 max-w-[1200px] mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate("/metavaults")}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/60 transition-colors w-fit"
        >
          <BackArrow />
          <span className="text-[12px]" style={{ fontWeight: 400 }}>MetaVaults</span>
        </button>

        {/* ── Header Card ── */}
        <VaultHeader vault={vault} onBack={() => navigate("/metavaults")} />

        {/* ── Content: 2-column layout (deposit LEFT, chart RIGHT) ── */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left column: deposit panel */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-6">
              <DepositPanel vault={vault} />
            </div>
          </div>

          {/* Right column: performance chart + allocations + technical */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <VaultPerformanceSection vault={vault} />
            <AllocationsSection vault={vault} />
            <TechnicalDetailsSection vault={vault} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetaVaultDetail;