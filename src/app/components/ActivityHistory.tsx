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
}

const ACTIVITIES: Activity[] = [
  { id: "1", type: "Swap", pool: "sGHO", protocol: "Aave", tokenIn: "USDC", tokenOut: "PT-sGHO", amountIn: "5,200", amountOut: "5,312.40", value: "$5,200", time: "2m ago", status: "Confirmed" },
  { id: "2", type: "Swap", pool: "sGHO", protocol: "Aave", tokenIn: "PT-sGHO", tokenOut: "USDC", amountIn: "1,800", amountOut: "1,764.20", value: "$1,764", time: "14m ago", status: "Confirmed" },
  { id: "3", type: "Add Liquidity", pool: "avUSD", protocol: "Avant", tokenIn: "avUSDx", tokenOut: "LP-avUSD", amountIn: "10,000", amountOut: "9,842.11", value: "$10,000", time: "1h ago", status: "Confirmed" },
  { id: "4", type: "Claim", pool: "WFLR", protocol: "Sceptre", tokenIn: "—", tokenOut: "rFLR", amountIn: "—", amountOut: "245.80", value: "$89", time: "2h ago", status: "Confirmed" },
  { id: "5", type: "Swap", pool: "vbUSDC", protocol: "Yearn", tokenIn: "USDC", tokenOut: "YT-vbUSDC", amountIn: "2,340", amountOut: "88,764.20", value: "$2,340", time: "3h ago", status: "Confirmed" },
  { id: "6", type: "Remove Liquidity", pool: "stXRP", protocol: "Firelight", tokenIn: "LP-stXRP", tokenOut: "stXRP", amountIn: "4,200.00", amountOut: "4,158.30", value: "$4,158", time: "5h ago", status: "Confirmed" },
  { id: "7", type: "Swap", pool: "USDN", protocol: "SMARDEX", tokenIn: "USDC", tokenOut: "PT-USDN", amountIn: "8,500", amountOut: "8,756.40", value: "$8,500", time: "8h ago", status: "Confirmed" },
  { id: "8", type: "Add Liquidity", pool: "sGHO", protocol: "Aave", tokenIn: "sGHO", tokenOut: "LP-sGHO", amountIn: "15,000", amountOut: "14,820.55", value: "$15,000", time: "1d ago", status: "Confirmed" },
  { id: "9", type: "Claim", pool: "avUSD", protocol: "Avant", tokenIn: "—", tokenOut: "APT", amountIn: "—", amountOut: "1,240.00", value: "$372", time: "1d ago", status: "Confirmed" },
  { id: "10", type: "Swap", pool: "ETH", protocol: "Ether.fi", tokenIn: "weETH", tokenOut: "PT-weETH", amountIn: "2.50", amountOut: "2.54", value: "$6,425", time: "2d ago", status: "Confirmed" },
  { id: "11", type: "Remove Liquidity", pool: "BOLD", protocol: "Liquity V2", tokenIn: "LP-BOLD", tokenOut: "BOLD", amountIn: "3,100.00", amountOut: "3,068.20", value: "$3,068", time: "3d ago", status: "Confirmed" },
  { id: "12", type: "Swap", pool: "jEURx", protocol: "Jarvis Network", tokenIn: "EUR", tokenOut: "PT-jEURx", amountIn: "4,000", amountOut: "4,112.80", value: "$4,320", time: "4d ago", status: "Confirmed" },
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
          <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[700px]">
            <div className="w-[14%] min-w-[100px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Type</span>
            </div>
            <div className="w-[18%] min-w-[130px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Pool</span>
            </div>
            <div className="w-[18%] min-w-[120px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>From</span>
            </div>
            <div className="w-[18%] min-w-[120px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>To</span>
            </div>
            <div className="w-[14%] min-w-[90px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Value</span>
            </div>
            <div className="flex-1 min-w-[80px]">
              <span className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Time</span>
            </div>
          </div>

          {/* Table rows */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {filtered.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors min-w-[700px]"
              >
                {/* Type */}
                <div className="w-[14%] min-w-[100px]">
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
                <div className="w-[18%] min-w-[130px]">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{activity.pool}</span>
                    <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{activity.protocol}</span>
                  </div>
                </div>

                {/* From */}
                <div className="w-[18%] min-w-[120px]">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>{activity.amountIn}</span>
                    <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{activity.tokenIn}</span>
                  </div>
                </div>

                {/* To */}
                <div className="w-[18%] min-w-[120px]">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>{activity.amountOut}</span>
                    <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{activity.tokenOut}</span>
                  </div>
                </div>

                {/* Value */}
                <div className="w-[14%] min-w-[90px]">
                  <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{activity.value}</span>
                </div>

                {/* Time */}
                <div className="flex-1 min-w-[80px]">
                  <span className="text-[13px] text-white/50" style={{ fontWeight: 400 }}>{activity.time}</span>
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
