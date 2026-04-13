import { useState } from "react";
import { useNavigate } from "react-router";

// ─── Mini sparkline component (SVG polyline) ───
function Sparkline({ data, color, id }: { data: number[]; color: string; id: string }) {
  const w = 100;
  const h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#grad-${id})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Vault icon placeholders ───
function VaultIcon({ type }: { type: "usdc" | "gami" | "flare" }) {
  if (type === "usdc") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#2775ca] flex items-center justify-center shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
          <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter">$</text>
        </svg>
      </div>
    );
  }
  if (type === "gami") {
    return (
      <div className="w-10 h-10 rounded-full bg-[#00c3ff] flex items-center justify-center shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.15" />
          <circle cx="12" cy="12" r="6" fill="white" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-[#e62058] flex items-center justify-center shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15 9H21L16 14L18 21L12 17L6 21L8 14L3 9H9L12 2Z" fill="white" />
      </svg>
    </div>
  );
}

// ─── Chain icons ───
function ChainIcon({ chain }: { chain: string }) {
  if (chain === "Katana") {
    return (
      <div className="w-[18px] h-[18px] rounded-full overflow-hidden bg-[#25272b] flex items-center justify-center shrink-0">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M4 20L12 4L20 20H4Z" fill="#00f99b" />
        </svg>
      </div>
    );
  }
  if (chain === "Base") {
    return (
      <div className="w-[18px] h-[18px] rounded-full bg-[#0052ff] flex items-center justify-center shrink-0">
        <span className="text-[9px] text-white" style={{ fontWeight: 700 }}>B</span>
      </div>
    );
  }
  return (
    <div className="w-[18px] h-[18px] rounded-full bg-[#e62058] flex items-center justify-center shrink-0">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" fill="white" />
      </svg>
    </div>
  );
}

// ─── View toggle icons ───
function GridViewIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1" fill="white" fillOpacity={active ? 1 : 0.3} />
      <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity={active ? 1 : 0.3} />
      <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity={active ? 1 : 0.3} />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="white" fillOpacity={active ? 1 : 0.3} />
    </svg>
  );
}

function ListViewIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="2.5" rx="0.5" fill="white" fillOpacity={active ? 1 : 0.3} />
      <rect x="1" y="6.75" width="14" height="2.5" rx="0.5" fill="white" fillOpacity={active ? 1 : 0.3} />
      <rect x="1" y="11.5" width="14" height="2.5" rx="0.5" fill="white" fillOpacity={active ? 1 : 0.3} />
    </svg>
  );
}

// ─── Help icon ───
function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ─── Spectra logo icon (mobile header) ───
function SpectraLogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      <path d="M16 6C10.477 6 6 10.477 6 16s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6zm0 2a8 8 0 11-8 8 8 8 0 018-8z" fill="white" fillOpacity="0.15"/>
      <path d="M13 12.5c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v0c0 .828-.672 1.5-1.5 1.5H16v2h1.5c.828 0 1.5.672 1.5 1.5v0c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v0c0-.828.672-1.5 1.5-1.5H16v-2h-1.5c-.828 0-1.5-.672-1.5-1.5z" fill="white" fillOpacity="0.6"/>
    </svg>
  );
}

// ─── Mock data ───
const VAULTS = [
  {
    id: "vbusdc-katana",
    name: "vbUSDC Katana",
    curator: "Clearstar",
    maxApy: "36.63%",
    tvl: "$963,794",
    chain: "Katana",
    iconType: "usdc" as const,
    sparkColor: "#00f99b",
    sparkData: [10, 12, 11, 14, 16, 15, 18, 22, 25, 28, 32, 38, 42, 48, 55, 60, 58, 62, 65, 70],
  },
  {
    id: "gami-spectra",
    name: "Gami Spectra USDC",
    curator: "Gami Labs",
    maxApy: "15.66%",
    tvl: "$428,829",
    chain: "Base",
    iconType: "gami" as const,
    sparkColor: "#00f99b",
    sparkData: [20, 22, 21, 23, 22, 25, 24, 26, 28, 27, 30, 31, 33, 32, 35, 34, 36, 38, 37, 40],
  },
  {
    id: "flare-xrp",
    name: "Flare XRP Yield Prime",
    curator: "Gami Labs",
    maxApy: "7.40%",
    tvl: "$2,053,135",
    chain: "Flare Mainnet",
    iconType: "flare" as const,
    sparkColor: "#ff9900",
    sparkData: [15, 18, 17, 20, 22, 21, 24, 23, 26, 28, 30, 29, 32, 34, 33, 36, 35, 38, 40, 42],
  },
];

// ─── Main component ───
export function MetaVaults() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  return (
    <div className="flex-1 min-w-0 overflow-auto font-['Inter']">
      <div className="flex flex-col p-4 sm:p-6 xl:p-8 gap-6">
        {/* ── Mobile Header (Spectra icon + pipe + title) ── */}
        <div className="flex sm:hidden items-center gap-3">
          <SpectraLogoIcon />
          <div className="w-px h-5 bg-white/[0.15]" />
          <h1 className="text-white text-[16px]" style={{ fontWeight: 600 }}>MetaVaults</h1>
        </div>

        {/* ── Desktop Header ── */}
        <div className="hidden sm:flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-[16px]" style={{ fontWeight: 600 }}>MetaVaults</h1>
            <p className="text-white/40 text-[13px]" style={{ fontWeight: 400 }}>
              Curated vaults for optimized performance and automated rollovers.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-[7px] rounded-[8px] border border-white/[0.08] hover:bg-white/[0.04] transition-colors">
              <HelpIcon />
              <span className="text-white text-[13px]" style={{ fontWeight: 500 }}>Help</span>
            </button>
            <button className="flex items-center gap-2 bg-[#00f99b] hover:bg-[#00e08a] transition-colors text-black px-4 py-[7px] rounded-[8px]">
              <span className="text-[16px]" style={{ fontWeight: 500 }}>+</span>
              <span className="text-[13px]" style={{ fontWeight: 600 }}>Create MetaVault</span>
            </button>
          </div>
        </div>

        {/* ── View toggle (desktop only) ── */}
        <div className="hidden sm:flex justify-end">
          <div className="flex items-center bg-[#25272b] rounded-[6px] overflow-hidden border border-white/[0.06]">
            <button
              onClick={() => setView("grid")}
              className={`p-2 transition-colors ${view === "grid" ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}
            >
              <GridViewIcon active={view === "grid"} />
            </button>
            <div className="w-px h-4 bg-white/[0.06]" />
            <button
              onClick={() => setView("list")}
              className={`p-2 transition-colors ${view === "list" ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"}`}
            >
              <ListViewIcon active={view === "list"} />
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        {view === "grid" ? (
          /* ════ GRID VIEW ════ */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {VAULTS.map((vault) => (
              <button
                key={vault.id}
                className="bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] hover:border-white/[0.12] transition-all text-left group p-5 flex flex-col gap-4"
                onClick={() => navigate(`/metavaults/${vault.id}`)}
                style={{ borderTopWidth: 2, borderTopColor: vault.sparkColor }}
              >
                {/* Top: icon + name + curator */}
                <div className="flex items-center gap-3">
                  <VaultIcon type={vault.iconType} />
                  <div className="flex flex-col min-w-0">
                    <span className="text-white text-[14px] truncate" style={{ fontWeight: 600 }}>
                      {vault.name}
                    </span>
                    <span className="text-white/40 text-[12px]" style={{ fontWeight: 400 }}>
                      {vault.curator}
                    </span>
                  </div>
                </div>

                {/* Middle: APY + sparkline */}
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-white/40 text-[10px] tracking-wider" style={{ fontWeight: 500 }}>
                      MAX APY
                    </span>
                    <span
                      className="text-[22px]"
                      style={{ fontWeight: 600, color: vault.sparkColor }}
                    >
                      {vault.maxApy}
                    </span>
                  </div>
                  <Sparkline data={vault.sparkData} color={vault.sparkColor} id={vault.id} />
                </div>

                {/* Bottom: TVL + Chain */}
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <div className="flex flex-col gap-[1px]">
                    <span className="text-white/40 text-[10px] tracking-wider" style={{ fontWeight: 500 }}>
                      TVL
                    </span>
                    <span className="text-white text-[14px]" style={{ fontWeight: 500 }}>
                      {vault.tvl}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-[1px]">
                    <span className="text-white/40 text-[10px] tracking-wider" style={{ fontWeight: 500 }}>
                      CHAIN
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-[13px]" style={{ fontWeight: 500 }}>
                        {vault.chain}
                      </span>
                      <ChainIcon chain={vault.chain} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* ════ LIST VIEW ════ */
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-col min-w-[640px]">
            {/* List header */}
            <div className="flex items-center px-5 py-2.5 border-b border-white/[0.06]">
              <span className="flex-[2] text-white/30 text-[11px] tracking-wider" style={{ fontWeight: 500 }}>VAULT</span>
              <span className="flex-1 text-white/30 text-[11px] tracking-wider" style={{ fontWeight: 500 }}>CURATOR</span>
              <span className="flex-1 text-white/30 text-[11px] tracking-wider text-right" style={{ fontWeight: 500 }}>MAX APY</span>
              <span className="flex-1 text-white/30 text-[11px] tracking-wider text-right" style={{ fontWeight: 500 }}>TVL</span>
              <span className="w-[130px] text-white/30 text-[11px] tracking-wider text-right" style={{ fontWeight: 500 }}>CHAIN</span>
            </div>

            {/* List rows */}
            {VAULTS.map((vault) => (
              <button
                key={vault.id}
                className="flex items-center px-5 py-3.5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors text-left"
              >
                {/* Vault */}
                <div className="flex-[2] flex items-center gap-3 min-w-0">
                  <VaultIcon type={vault.iconType} />
                  <span className="text-white text-[13px] truncate" style={{ fontWeight: 500 }}>
                    {vault.name}
                  </span>
                </div>

                {/* Curator */}
                <div className="flex-1 min-w-0">
                  <span className="text-white/50 text-[13px] truncate block" style={{ fontWeight: 400 }}>
                    {vault.curator}
                  </span>
                </div>

                {/* Max APY */}
                <div className="flex-1 text-right">
                  <span className="text-[13px]" style={{ fontWeight: 600, color: vault.sparkColor }}>
                    {vault.maxApy}
                  </span>
                </div>

                {/* TVL */}
                <div className="flex-1 text-right">
                  <span className="text-white text-[13px]" style={{ fontWeight: 500 }}>
                    {vault.tvl}
                  </span>
                </div>

                {/* Chain */}
                <div className="w-[130px] flex items-center gap-1.5 justify-end">
                  <span className="text-white text-[13px]" style={{ fontWeight: 500 }}>
                    {vault.chain}
                  </span>
                  <ChainIcon chain={vault.chain} />
                </div>
              </button>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}