import { useState, useEffect, useRef } from "react";
import svgPaths from "../../imports/svg-4m6t2wsogl";
import xrpIcon from "figma:asset/1cd9d700db5a81143c83523e32b3e32a60163f14.png";
import sceptreIcon from "figma:asset/c7071caedf9a6841c1387022531949f1f1809de8.png";

// ─── Flare SVG Icon ───

function FlareIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 19.99 19.99" fill="none">
      <g clipPath="url(#flareClip)">
        <path d={svgPaths.p1ac64840} fill="white" />
        <path d={svgPaths.p27e22100} fill="#E62058" />
        <path d={svgPaths.p2df35780} fill="#E62058" />
        <path d={svgPaths.p30ec6e00} fill="#E62058" />
      </g>
      <defs>
        <clipPath id="flareClip">
          <rect fill="white" height="19.99" width="19.99" />
        </clipPath>
      </defs>
    </svg>
  );
}

// ─── Epoch Data ───

interface Epoch {
  id: number;
  label: string;
  status: "Claimable" | "Pending" | "Claimed";
  amount: string;
  dateRange: string;
  pools: { name: string; amount: string }[];
}

const EPOCHS: Epoch[] = [
  {
    id: 20,
    label: "Epoch 20",
    status: "Pending",
    amount: "28,579.56 rFLR",
    dateRange: "Jan 27, 2026 – Feb 26, 2026",
    pools: [{ name: "stXRP(FXRP)-2026/03/05", amount: "28,579.56 rFLR" }],
  },
  {
    id: 19,
    label: "Epoch 19",
    status: "Claimable",
    amount: "11,813.23 rFLR",
    dateRange: "Dec 28, 2025 – Jan 27, 2026",
    pools: [{ name: "stXRP(FXRP)-2026/03/05", amount: "11,813.23 rFLR" }],
  },
  {
    id: 18,
    label: "Epoch 18",
    status: "Claimed",
    amount: "9,241.80 rFLR",
    dateRange: "Nov 28, 2025 – Dec 28, 2025",
    pools: [{ name: "stXRP(FXRP)-2026/03/05", amount: "9,241.80 rFLR" }],
  },
  {
    id: 17,
    label: "Epoch 17",
    status: "Claimed",
    amount: "7,102.44 rFLR",
    dateRange: "Oct 29, 2025 – Nov 28, 2025",
    pools: [{ name: "stXRP(FXRP)-2026/03/05", amount: "7,102.44 rFLR" }],
  },
];

// ─── Pool Opportunities Data ───

interface PoolOpportunity {
  id: number;
  network: string;
  token: string;
  protocol: string;
  icon: string;
  maxApy: string;
  ibt: string;
  liquidity: string;
  expiry: string;
}

const POOLS: PoolOpportunity[] = [
  {
    id: 1,
    network: "Flare Mainnet",
    token: "stXRP",
    protocol: "Firelight",
    icon: xrpIcon,
    maxApy: "24.36%",
    ibt: "stXRP",
    liquidity: "$1,519,407",
    expiry: "Mar 05 2026",
  },
  {
    id: 2,
    network: "Flare Mainnet",
    token: "WFLR",
    protocol: "Sceptre",
    icon: sceptreIcon,
    maxApy: "36.14%",
    ibt: "sFLR",
    liquidity: "$1,009,785",
    expiry: "May 17 2026",
  },
  {
    id: 3,
    network: "Flare Mainnet",
    token: "stXRP",
    protocol: "Firelight",
    icon: xrpIcon,
    maxApy: "24.35%",
    ibt: "stXRP",
    liquidity: "$943,539",
    expiry: "Jun 04 2026",
  },
];

// ─── Status Badge ───

function StatusBadge({ status }: { status: Epoch["status"] }) {
  const styles: Record<Epoch["status"], { bg: string; text: string }> = {
    Claimable: { bg: "rgba(34,197,94,0.15)", text: "#4ade80" },
    Pending: { bg: "rgba(234,179,8,0.15)", text: "#facc15" },
    Claimed: { bg: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.4)" },
  };
  const s = styles[status];
  return (
    <span
      className="font-['Inter'] text-[9.6px] px-2 py-[2px] rounded-full"
      style={{ fontWeight: 500, backgroundColor: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

// ─── Animated Counter Hook ───

function useSlowTick(start: number, intervalMs = 1500) {
  const [value, setValue] = useState(start);
  const ref = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    ref.current = setInterval(() => {
      setValue((v) => v + 1);
    }, intervalMs);
    return () => clearInterval(ref.current);
  }, [intervalMs]);

  return value;
}

// ─── Main Component ───

export function FlareRewards() {
  const claimableRaw = useSlowTick(11800, 1500);
  const claimableFormatted = claimableRaw.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const claimableUsd = Math.round(claimableRaw * (110 / 11813.23));

  return (
    <div className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pl-4 overflow-auto">
      <div className="xl:pt-0 max-w-[960px] mx-auto flex flex-col gap-6 pt-2">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <span className="font-['Lexend'] text-[24px] text-white" style={{ fontWeight: 300, lineHeight: "32px" }}>
            Flare rFLR Rewards
          </span>
          <p className="font-['Inter'] text-[14px] text-white/50" style={{ fontWeight: 300, lineHeight: "20px" }}>
            View your rFLR rewards earned on your Spectra activity - updated every 6 hours.
          </p>
        </div>

        {/* Summary + Opportunities row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left: merged Claimable + Pending + Claim info */}
          <div className="flex flex-col lg:w-[280px] shrink-0 bg-[#212125] rounded-[16px] relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 border border-[rgba(228,228,231,0.05)] rounded-[16px] pointer-events-none" />
            <div className="flex flex-col gap-5 px-5 py-[17px] flex-1">
              {/* Claimable */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 300, lineHeight: "12px" }}>
                  Claimable
                </span>
                <div className="flex items-center gap-2">
                  <FlareIcon size={20} />
                  <span className="font-['Inter'] text-[18px] text-[#00f99b]" style={{ fontWeight: 500, lineHeight: "18px" }}>
                    {claimableFormatted} rFLR
                  </span>
                </div>
                <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 300, lineHeight: "16px" }}>
                  ≈${claimableUsd}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.05]" />

              {/* Pending */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 300, lineHeight: "12px" }}>
                  Pending
                </span>
                <div className="flex items-center gap-2">
                  <FlareIcon size={20} />
                  <span className="font-['Inter'] text-[18px] text-white" style={{ fontWeight: 500, lineHeight: "18px" }}>
                    28,579.56 rFLR
                  </span>
                </div>
                <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 300, lineHeight: "16px" }}>
                  ≈$267
                </span>
              </div>

              {/* Spacer to push claim text to bottom */}
              <div className="flex-1" />

              {/* Claim instruction */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 300, lineHeight: "12px" }}>
                  Where to Claim
                </span>
                <p className="font-['Inter'] text-[11.5px] text-white/30" style={{ fontWeight: 300, lineHeight: "17px" }}>
                  Pending rewards become claimable at the end of each month. Claim your rFLR on the{" "}
                  <a
                    href="https://portal.flare.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f99b] underline hover:text-[#00f99b]/80 transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    Flare Portal
                  </a>
                  {" "}→ Emissions Tab → select Spectra from the dropdown.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Opportunities with rFLR Rewards */}
          <div className="flex-1 min-w-0 bg-[#212125] rounded-[16px] relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 border border-[rgba(228,228,231,0.05)] rounded-[16px] pointer-events-none" />
            <div className="flex flex-col p-5 gap-4">
              <div className="flex items-center gap-2">
                <FlareIcon size={18} />
                <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 600, lineHeight: "20px" }}>
                  Opportunities with rFLR Rewards
                </span>
              </div>

              {/* Pool list */}
              <div className="flex flex-col gap-2.5">
                {POOLS.map((pool) => (
                  <div
                    key={pool.id}
                    className="bg-white/[0.03] rounded-[12px] p-3.5 flex items-center gap-3 hover:bg-white/[0.06] transition-colors cursor-pointer group"
                  >
                    {/* Token icon */}
                    <img
                      src={pool.icon}
                      alt={pool.token}
                      className="w-[34px] h-[34px] rounded-full shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      {/* Top row: token + APY */}
                      <div className="flex items-center gap-1.5">
                        <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 500 }}>
                          {pool.token}
                        </span>
                        <span className="font-['Inter'] text-[13px] text-[#00f99b]" style={{ fontWeight: 600 }}>
                          {pool.maxApy}
                        </span>
                      </div>
                      {/* Bottom row: Platform · Liquidity · Expiry */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 300 }}>
                          {pool.protocol}
                        </span>
                        <span className="text-white/15 text-[10px]">·</span>
                        <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 300 }}>
                          {pool.liquidity}
                        </span>
                        <span className="text-white/15 text-[10px]">·</span>
                        <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 300 }}>
                          {pool.expiry}
                        </span>
                      </div>
                    </div>

                    {/* Open button */}
                    <button className="shrink-0 bg-[#00f99b] hover:bg-[#00e08a] text-[#111] font-['Inter'] text-[11px] px-3.5 py-[5px] rounded-[8px] cursor-pointer transition-colors" style={{ fontWeight: 600 }}>
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Epoch Details */}
        <div className="flex flex-col gap-3">
          <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 700, lineHeight: "20px" }}>
            Epoch Details
          </span>

          {EPOCHS.map((epoch) => (
            <div
              key={epoch.id}
              className="bg-[#212125] rounded-[16px] relative overflow-hidden"
            >
              <div aria-hidden className="absolute inset-0 border border-[rgba(228,228,231,0.05)] rounded-[16px] pointer-events-none" />
              <div className="flex flex-col gap-3 p-[17px]">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 500, lineHeight: "20px" }}>
                      {epoch.label}
                    </span>
                    <StatusBadge status={epoch.status} />
                  </div>
                  <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 500, lineHeight: "20px" }}>
                    {epoch.amount}
                  </span>
                </div>

                {/* Date range */}
                <span className="font-['Inter'] text-[12px] text-[#a9b2bc]" style={{ fontWeight: 300, lineHeight: "16px" }}>
                  {epoch.dateRange}
                </span>

                {/* Pool rows */}
                {epoch.pools.map((pool, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-white/[0.02] rounded-[12px] flex items-center justify-between px-3 py-2"
                  >
                    <span className="font-['Inter'] text-[12px] text-[#a9b2bc]" style={{ fontWeight: 300, lineHeight: "16px" }}>
                      {pool.name}
                    </span>
                    <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 300, lineHeight: "16px" }}>
                      {pool.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}