import { useState } from "react";

type ActivityType = "all" | "swap" | "add" | "remove" | "claim";

interface Activity {
  id: string;
  type: "Swap" | "Add Liquidity" | "Remove Liquidity" | "Claim";
  pool: string;
  protocol: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  value: string;
  time: string;
  status: "Confirmed" | "Pending";
  txHash: string;
}

const ACTIVITIES: Activity[] = [
  { id: "1",  type: "Swap",             pool: "sGHO",      protocol: "Aave",           tokenIn: "USDC",     tokenOut: "PT-sGHO",    amountIn: "5,200",    amountOut: "5,312.40",  value: "$5,200",  time: "2m ago",     status: "Confirmed", txHash: "0x3a8f...c4e1" },
  { id: "2",  type: "Swap",             pool: "sGHO",      protocol: "Aave",           tokenIn: "PT-sGHO",  tokenOut: "USDC",       amountIn: "1,800",    amountOut: "1,764.20",  value: "$1,764",  time: "14m ago",    status: "Confirmed", txHash: "0x7b2d...91f3" },
  { id: "3",  type: "Add Liquidity",    pool: "avUSD",     protocol: "Avant",          tokenIn: "avUSDx",   tokenOut: "LP-avUSD",   amountIn: "10,000",   amountOut: "9,842.11",  value: "$10,000", time: "1h ago",     status: "Confirmed", txHash: "0x1e5c...a8b2" },
  { id: "4",  type: "Claim",            pool: "WFLR",      protocol: "Sceptre",        tokenIn: "—",        tokenOut: "rFLR",       amountIn: "—",        amountOut: "245.80",    value: "$89",     time: "2h ago",     status: "Confirmed", txHash: "0x9d4a...37e6" },
  { id: "5",  type: "Swap",             pool: "vbUSDC",    protocol: "Yearn",          tokenIn: "USDC",     tokenOut: "YT-vbUSDC",  amountIn: "2,340",    amountOut: "88,764.20", value: "$2,340",  time: "3h ago",     status: "Confirmed", txHash: "0x5f81...d2c9" },
  { id: "6",  type: "Remove Liquidity", pool: "stXRP",     protocol: "Firelight",      tokenIn: "LP-stXRP", tokenOut: "stXRP",      amountIn: "4,200.00", amountOut: "4,158.30",  value: "$4,158",  time: "5h ago",     status: "Confirmed", txHash: "0xc3e7...6a14" },
  { id: "7",  type: "Claim",            pool: "sGHO",      protocol: "Aave",           tokenIn: "—",        tokenOut: "SPECTRA",    amountIn: "—",        amountOut: "142.50",    value: "$42.75",  time: "7h ago",     status: "Confirmed", txHash: "0x2f9b...e5d8" },
  { id: "8",  type: "Swap",             pool: "USDN",      protocol: "SMARDEX",        tokenIn: "USDC",     tokenOut: "PT-USDN",    amountIn: "8,500",    amountOut: "8,756.40",  value: "$8,500",  time: "8h ago",     status: "Confirmed", txHash: "0x8a6d...1bf4" },
  { id: "9",  type: "Add Liquidity",    pool: "sGHO",      protocol: "Aave",           tokenIn: "sGHO",     tokenOut: "LP-sGHO",    amountIn: "15,000",   amountOut: "14,820.55", value: "$15,000", time: "1d ago",     status: "Confirmed", txHash: "0xd147...83a0" },
  { id: "10", type: "Claim",            pool: "sGHO",      protocol: "Aave",           tokenIn: "—",        tokenOut: "sGHO",       amountIn: "—",        amountOut: "4.21",      value: "$4.21",   time: "1d ago",     status: "Confirmed", txHash: "0x6e3c...f792" },
  { id: "11", type: "Swap",             pool: "ETH",       protocol: "Ether.fi",       tokenIn: "weETH",    tokenOut: "PT-weETH",   amountIn: "2.50",     amountOut: "2.54",      value: "$6,425",  time: "2d ago",     status: "Confirmed", txHash: "0xb52a...04d7" },
  { id: "12", type: "Remove Liquidity", pool: "BOLD",      protocol: "Liquity V2",     tokenIn: "LP-BOLD",  tokenOut: "BOLD",       amountIn: "3,100.00", amountOut: "3,068.20",  value: "$3,068",  time: "3d ago",     status: "Confirmed", txHash: "0x41f8...bc63" },
  { id: "13", type: "Swap",             pool: "jEURx",     protocol: "Jarvis Network", tokenIn: "EUR",      tokenOut: "PT-jEURx",   amountIn: "4,000",    amountOut: "4,112.80",  value: "$4,320",  time: "4d ago",     status: "Confirmed", txHash: "0xe29d...5a18" },
  { id: "14", type: "Swap",             pool: "avUSD",     protocol: "Avant",          tokenIn: "avUSDx",   tokenOut: "YT-avUSD",   amountIn: "3,500",    amountOut: "183,210.5", value: "$3,500",  time: "4d ago",     status: "Confirmed", txHash: "0x73b6...d941" },
  { id: "15", type: "Add Liquidity",    pool: "USDN",      protocol: "SMARDEX",        tokenIn: "WUSDN",    tokenOut: "LP-USDN",    amountIn: "22,000",   amountOut: "21,648.30", value: "$22,000", time: "5d ago",     status: "Confirmed", txHash: "0xf184...2e57" },
  { id: "16", type: "Claim",            pool: "wstETH",    protocol: "Lido",           tokenIn: "—",        tokenOut: "SPECTRA",    amountIn: "—",        amountOut: "23.40",     value: "$7.02",   time: "5d ago",     status: "Confirmed", txHash: "0x0c5e...a3b9" },
  { id: "17", type: "Swap",             pool: "vbUSDT",    protocol: "Yearn",          tokenIn: "USDT",     tokenOut: "PT-vbUSDT",  amountIn: "6,800",    amountOut: "7,021.44",  value: "$6,800",  time: "5d ago",     status: "Confirmed", txHash: "0x94a2...7fc6" },
  { id: "18", type: "Claim",            pool: "sGHO",      protocol: "Aave",           tokenIn: "—",        tokenOut: "SPECTRA",    amountIn: "—",        amountOut: "3,850.00",  value: "$1,155",  time: "6d ago",     status: "Confirmed", txHash: "0xd83f...1b24" },
  { id: "19", type: "Swap",             pool: "WFLR",      protocol: "Sceptre",        tokenIn: "FLR",      tokenOut: "PT-sFLR",    amountIn: "125,000",  amountOut: "128,750",   value: "$3,437",  time: "1w ago",     status: "Confirmed", txHash: "0x5a71...e890" },
  { id: "20", type: "Remove Liquidity", pool: "avUSD",     protocol: "Avant",          tokenIn: "LP-avUSD", tokenOut: "avUSDx",     amountIn: "8,420.00", amountOut: "8,545.12",  value: "$8,545",  time: "1w ago",     status: "Confirmed", txHash: "0x2db4...c753" },
  { id: "21", type: "Swap",             pool: "yn-RWA/USD",protocol: "YieldNest",      tokenIn: "USDC",     tokenOut: "PT-STAK",    amountIn: "12,000",   amountOut: "12,384.00", value: "$12,000", time: "1w ago",     status: "Confirmed", txHash: "0x8f16...4da2" },
  { id: "22", type: "Add Liquidity",    pool: "ETH",       protocol: "Ether.fi",       tokenIn: "weETH",    tokenOut: "LP-weETH",   amountIn: "5.00",     amountOut: "4.94",      value: "$12,850", time: "2w ago",     status: "Confirmed", txHash: "0xa347...9e15" },
  { id: "23", type: "Claim",            pool: "WFLR",      protocol: "Sceptre",        tokenIn: "—",        tokenOut: "rFLR",       amountIn: "—",        amountOut: "1,820.00",  value: "$655",    time: "2w ago",     status: "Confirmed", txHash: "0x6c89...b2f7" },
  { id: "24", type: "Swap",             pool: "sdCRV",     protocol: "Aladdin",        tokenIn: "CRV",      tokenOut: "PT-asdCRV",  amountIn: "18,500",   amountOut: "19,055.00", value: "$7,957",  time: "2w ago",     status: "Confirmed", txHash: "0x1e4d...7c38" },
  { id: "25", type: "Claim",            pool: "wstETH",    protocol: "Lido",           tokenIn: "—",        tokenOut: "wstETH",     amountIn: "—",        amountOut: "0.0012",    value: "$4.12",   time: "2w ago",     status: "Confirmed", txHash: "0xb7a3...5d61" },
  { id: "26", type: "Swap",             pool: "AVAX",      protocol: "Treehouse",      tokenIn: "AVAX",     tokenOut: "YT-tAVAX",   amountIn: "450",      amountOut: "61,650.00", value: "$11,250", time: "3w ago",     status: "Confirmed", txHash: "0x4f92...ae84" },
  { id: "27", type: "Add Liquidity",    pool: "BOLD",      protocol: "Liquity V2",     tokenIn: "BOLD",     tokenOut: "LP-BOLD",    amountIn: "5,000",    amountOut: "4,925.50",  value: "$5,000",  time: "3w ago",     status: "Confirmed", txHash: "0xc815...3f29" },
];

const TYPE_COLORS: Record<string, string> = {
  Swap: "#00f99b",
  "Add Liquidity": "#d65ce9",
  "Remove Liquidity": "#f4c071",
  Claim: "#6988ff",
};

const FILTERS: { key: ActivityType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "swap", label: "Swaps" },
  { key: "add", label: "Add Liquidity" },
  { key: "remove", label: "Remove Liquidity" },
  { key: "claim", label: "Claims" },
];

const TYPE_MAP: Record<ActivityType, string | null> = {
  all: null,
  swap: "Swap",
  add: "Add Liquidity",
  remove: "Remove Liquidity",
  claim: "Claim",
};

export function ActivityHistory() {
  const [filter, setFilter] = useState<ActivityType>("all");

  const filtered = filter === "all"
    ? ACTIVITIES
    : ACTIVITIES.filter((a) => a.type === TYPE_MAP[filter]);

  return (
    <div className="flex-1 min-w-0 font-['Inter']">
      <div className="flex flex-col min-h-full">

        {/* ── HERO HEADER ── */}
        <div className="shrink-0">
          <div className="flex items-start justify-between px-3 sm:px-5 pt-4 pb-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-white" style={{ fontWeight: 600 }}>
                Activity History
              </span>
              <span className="text-[13px] text-white/40" style={{ fontWeight: 400 }}>
                Your complete transaction history across all Spectra pools.
              </span>
            </div>
          </div>

          {/* ── FILTER BAR ── */}
          <div className="flex items-center gap-2 px-3 sm:px-5 pb-3">
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden shrink-0">
              {FILTERS.map((f, i) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-2 sm:px-3 py-[7px] text-[12px] transition-all relative ${
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/40 hover:text-white/60 hover:bg-white/[0.08]"
                    } ${i > 0 ? "border-l border-white/[0.08]" : ""}`}
                    style={{ fontWeight: active ? 500 : 400 }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-white/25 ml-2" style={{ fontWeight: 400 }}>
              {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="border-b border-white/[0.06]" />
        </div>

        {/* ── TABLE ── */}
        <div className="flex-1 min-h-0 flex flex-col overflow-x-auto">
          {/* Table header */}
          <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[800px]">
            <div className="w-[12%] min-w-[100px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Type</span>
            </div>
            <div className="w-[16%] min-w-[120px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Pool</span>
            </div>
            <div className="w-[16%] min-w-[110px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>From</span>
            </div>
            <div className="w-[16%] min-w-[110px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>To</span>
            </div>
            <div className="w-[12%] min-w-[80px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Value</span>
            </div>
            <div className="w-[12%] min-w-[70px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Time</span>
            </div>
            <div className="flex-1 min-w-[90px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Tx Hash</span>
            </div>
          </div>

          {/* Table rows */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filtered.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors min-w-[800px]"
              >
                {/* Type */}
                <div className="w-[12%] min-w-[100px]">
                  <span
                    className="text-[11px] px-2 py-[2px] rounded-full"
                    style={{
                      fontWeight: 500,
                      backgroundColor: `${TYPE_COLORS[activity.type]}15`,
                      color: TYPE_COLORS[activity.type],
                    }}
                  >
                    {activity.type}
                  </span>
                </div>

                {/* Pool */}
                <div className="w-[16%] min-w-[120px]">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{activity.pool}</span>
                    <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{activity.protocol}</span>
                  </div>
                </div>

                {/* From */}
                <div className="w-[16%] min-w-[110px]">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>{activity.amountIn}</span>
                    <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{activity.tokenIn}</span>
                  </div>
                </div>

                {/* To */}
                <div className="w-[16%] min-w-[110px]">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>{activity.amountOut}</span>
                    <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{activity.tokenOut}</span>
                  </div>
                </div>

                {/* Value */}
                <div className="w-[12%] min-w-[80px]">
                  <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{activity.value}</span>
                </div>

                {/* Time */}
                <div className="w-[12%] min-w-[70px]">
                  <span className="text-[13px] text-white/50" style={{ fontWeight: 400 }}>{activity.time}</span>
                </div>

                {/* Tx Hash */}
                <div className="flex-1 min-w-[90px]">
                  <a
                    href={`https://etherscan.io/tx/${activity.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-[#6988ff] hover:text-[#8da4ff] transition-colors font-mono"
                    style={{ fontWeight: 400 }}
                  >
                    {activity.txHash}
                    <svg className="inline-block ml-1 -mt-[1px]" width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M4.5 2H2.5C2.22386 2 2 2.22386 2 2.5V9.5C2 9.77614 2.22386 10 2.5 10H9.5C9.77614 10 10 9.77614 10 9.5V7.5M7 2H10M10 2V5M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-16 text-[13px] text-white/20" style={{ fontWeight: 400 }}>
                No activity found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
