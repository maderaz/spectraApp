import { useState, useMemo, useCallback } from "react";
import { SpectraIcon, EthereumIcon } from "./TokenIcons";
import { ALL_NETWORKS } from "./FilterDropdowns";
import { TokenCircle } from "./shared/TableIcons";

// ─── Types ───
type TabKey = "pt" | "yt" | "lp" | "mv" | "rewards";
type TokenType = "PT" | "YT" | "LP" | "MV";
type SortDir = "asc" | "desc" | null;

interface SortState {
  key: string;
  dir: SortDir;
}

interface Position {
  id: string;
  pool: string;
  position: string;
  protocol: string;
  type: TokenType;
  balance: string;
  balanceAmount?: string;
  balanceUsd?: string;
  value: string;
  entryApy: string;
  currentApy: string;
  pnl: string;
  pnlPercent: string;
  maturity: string;
  claimable?: string;
  maturityRedemption?: string;
  maturityValue?: string;
  accruedYield?: string;
  accruedYieldUsd?: string;
  claimableYield?: string;
  claimableYieldUsd?: string;
  apy?: string;
  apyBoost?: string;
  lifetimeRewards?: string;
  lifetimeRewardsUsd?: string;
}

interface Reward {
  id: string;
  pool: string;
  protocol: string;
  token: string;
  amount: string;
  value: string;
  epoch: string;
  network: string;
}

interface MVPosition {
  id: string;
  vault: string;
  curator: string;
  balanceAmount: string;
  balanceToken: string;
  balanceUsd: string;
  estimatedValue: string;
  maxApy: string;
  base: string;
}

// ─── Sort helpers ───
function parseNum(s: string | undefined): number {
  if (!s) return 0;
  const cleaned = s.replace(/[$,≈%xX+\s]/g, "").replace(/[a-zA-Z]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function parseDate(s: string): number {
  const d = new Date(s);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

function compare(a: unknown, b: unknown, dir: "asc" | "desc"): number {
  const mul = dir === "asc" ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") return (a - b) * mul;
  return String(a).localeCompare(String(b)) * mul;
}

function useSort(initial?: SortState) {
  const [sort, setSort] = useState<SortState>(initial || { key: "", dir: null });
  const toggle = useCallback((key: string) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "desc" };
      if (prev.dir === "desc") return { key, dir: "asc" };
      return { key: "", dir: null };
    });
  }, []);
  return { sort, toggle } as const;
}

// ─── Mock data ───
const ALL_POSITIONS: Position[] = [
  {
    id: "p1", pool: "sGHO / Aave", position: "PT-sGHO", protocol: "Aave", type: "PT",
    balance: "14,284.20 PT", balanceAmount: "14,284.20", balanceUsd: "14,245.22", value: "$14,245.22", entryApy: "5.42%", currentApy: "5.61%",
    pnl: "+$187.42", pnlPercent: "+1.33%", maturity: "Jan 31, 2026",
    maturityRedemption: "14,432.64 sGHO", maturityValue: "$14,432.64",
  },
  {
    id: "p5", pool: "wstETH / Lido", position: "PT-wstETH", protocol: "Lido", type: "PT",
    balance: "2.4500 PT", balanceAmount: "2.4500", balanceUsd: "8,421.50", value: "$8,421.50", entryApy: "3.80%", currentApy: "3.95%",
    pnl: "+$94.20", pnlPercent: "+1.13%", maturity: "Mar 15, 2026",
    maturityRedemption: "2.4820 wstETH", maturityValue: "$8,515.70",
  },
  {
    id: "p6", pool: "weETH / EtherFi", position: "PT-weETH", protocol: "EtherFi", type: "PT",
    balance: "1.8200 PT", balanceAmount: "1.8200", balanceUsd: "6,104.80", value: "$6,104.80", entryApy: "4.10%", currentApy: "4.25%",
    pnl: "+$52.30", pnlPercent: "+0.86%", maturity: "Apr 20, 2026",
    maturityRedemption: "1.8356 weETH", maturityValue: "$6,157.10",
  },
  {
    id: "p2", pool: "sGHO / Aave", position: "YT-sGHO", protocol: "Aave", type: "YT",
    balance: "361,369 YT", balanceAmount: "361,369", balanceUsd: "500.14", value: "$500.14", entryApy: "5.90%", currentApy: "5.61%",
    pnl: "-$12.86", pnlPercent: "-2.51%", maturity: "Jan 31, 2026", claimable: "$4.21",
    accruedYield: "12.840 sGHO", accruedYieldUsd: "$12.84",
    claimableYield: "4.210 sGHO", claimableYieldUsd: "$4.21",
  },
  {
    id: "p7", pool: "wstETH / Lido", position: "YT-wstETH", protocol: "Lido", type: "YT",
    balance: "85,200 YT", balanceAmount: "85,200", balanceUsd: "124.60", value: "$124.60", entryApy: "3.40%", currentApy: "3.95%",
    pnl: "+$8.40", pnlPercent: "+7.23%", maturity: "Mar 15, 2026", claimable: "$1.82",
    accruedYield: "0.00054 wstETH", accruedYieldUsd: "$1.82",
    claimableYield: "0.00054 wstETH", claimableYieldUsd: "$1.82",
  },
  {
    id: "p3", pool: "sGHO / Aave", position: "LP-sGHO", protocol: "Aave", type: "LP",
    balance: "16,240.55 LP", balanceAmount: "16,240.55", balanceUsd: "16,997.22", value: "$16,997.22", entryApy: "12.40%", currentApy: "13.86%",
    pnl: "+$842.10", pnlPercent: "+5.21%", maturity: "Jan 31, 2026", claimable: "$8.63",
    apy: "13.86%", apyBoost: "x2 boost", lifetimeRewards: "842.10 sGHO", lifetimeRewardsUsd: "$842.10",
  },
  {
    id: "p8", pool: "wstETH / Lido", position: "LP-wstETH", protocol: "Lido", type: "LP",
    balance: "4,120.00 LP", balanceAmount: "4,120.00", balanceUsd: "4,380.90", value: "$4,380.90", entryApy: "8.20%", currentApy: "9.10%",
    pnl: "+$180.90", pnlPercent: "+4.31%", maturity: "Mar 15, 2026", claimable: "$3.21",
    apy: "9.10%", apyBoost: "x1 boost", lifetimeRewards: "-",
  },
];

const PT_POSITIONS = ALL_POSITIONS.filter((p) => p.type === "PT");
const YT_POSITIONS = ALL_POSITIONS.filter((p) => p.type === "YT");
const LP_POSITIONS = ALL_POSITIONS.filter((p) => p.type === "LP");

const CLAIMABLE_REWARDS: Reward[] = [
  { id: "r1", pool: "sGHO / Aave", protocol: "Aave", token: "SPECTRA", amount: "142.50", value: "$42.75", epoch: "Epoch 19", network: "ethereum" },
  { id: "r2", pool: "wstETH / Lido", protocol: "Lido", token: "SPECTRA", amount: "23.40", value: "$7.02", epoch: "Epoch 19", network: "ethereum" },
  { id: "r3", pool: "sGHO / Aave", protocol: "Aave", token: "sGHO", amount: "4.21", value: "$4.21", epoch: "Current", network: "ethereum" },
  { id: "r4", pool: "wstETH / Lido", protocol: "Lido", token: "wstETH", amount: "0.0012", value: "$4.12", epoch: "Current", network: "base" },
  { id: "r5", pool: "avUSD / Avant", protocol: "Avant", token: "SPECTRA", amount: "67.80", value: "$20.34", epoch: "Epoch 19", network: "arbitrum" },
];

const MV_POSITIONS: MVPosition[] = [
  {
    id: "gami-spectra", vault: "Gami Spectra USDC", curator: "Gami Labs",
    balanceAmount: "5,000.00", balanceToken: "gamisUSDC", balanceUsd: "5,031.20",
    estimatedValue: "5,031.20 USDC", maxApy: "15.66%", base: "USDC",
  },
  {
    id: "vbusdc-katana", vault: "vbUSDC Katana", curator: "Clearstar",
    balanceAmount: "5,000.00", balanceToken: "vbUSDC", balanceUsd: "5,018.75",
    estimatedValue: "5,018.75 USDC", maxApy: "36.63%", base: "USDC",
  },
  {
    id: "flare-xrp", vault: "Flare XRP Yield Prime", curator: "Gami Labs",
    balanceAmount: "21,500.00", balanceToken: "flrXRP", balanceUsd: "12,438.60",
    estimatedValue: "12,438.60 XRP", maxApy: "7.40%", base: "XRP",
  },
];

// ─── Tab config ───
const TYPE_COLORS: Record<TokenType, string> = { PT: "#00f99b", YT: "#f4c071", LP: "#d65ce9", MV: "#ff9900" };

interface TabDef {
  key: TabKey;
  label: string;
  count: number;
  accent?: string;
}

const TABS: TabDef[] = [
  { key: "pt", label: "PT Positions", count: PT_POSITIONS.length, accent: "#00f99b" },
  { key: "yt", label: "YT Positions", count: YT_POSITIONS.length, accent: "#f4c071" },
  { key: "lp", label: "LP Positions", count: LP_POSITIONS.length, accent: "#d65ce9" },
  { key: "mv", label: "MV Positions", count: MV_POSITIONS.length, accent: "#ff9900" },
  { key: "rewards", label: "Claimable Rewards", count: CLAIMABLE_REWARDS.length, accent: "#00f99b" },
];

// ─── Shared ───
const H = "text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider";
const C = "text-[12px] sm:text-[13px] text-white";
const ROW = "flex items-center px-4 py-[10px]";

// ─── Sort chevron ───
function SortChevron({ dir }: { dir: SortDir }) {
  if (!dir) return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="ml-1 opacity-0 group-hover/sh:opacity-100 transition-opacity shrink-0">
      <path d="M4 1L6.5 4H1.5L4 1Z" fill="white" fillOpacity="0.2" />
      <path d="M4 9L1.5 6H6.5L4 9Z" fill="white" fillOpacity="0.2" />
    </svg>
  );
  return (
    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="ml-1 shrink-0">
      <path d="M4 1L6.5 4H1.5L4 1Z" fill="white" fillOpacity={dir === "asc" ? 0.7 : 0.15} />
      <path d="M4 9L1.5 6H6.5L4 9Z" fill="white" fillOpacity={dir === "desc" ? 0.7 : 0.15} />
    </svg>
  );
}

function SortableHeader({
  label,
  sortKey,
  currentSort,
  onToggle,
}: {
  label: string;
  sortKey: string;
  currentSort: SortState;
  onToggle: (key: string) => void;
}) {
  const isActive = currentSort.key === sortKey;
  return (
    <button
      className="group/sh flex items-center gap-0 cursor-pointer select-none"
      onClick={() => onToggle(sortKey)}
    >
      <span className={H} style={{ fontWeight: 500 }}>{label}</span>
      <SortChevron dir={isActive ? currentSort.dir : null} />
    </button>
  );
}

function TypeBadge({ type }: { type: TokenType }) {
  const colors: Record<TokenType, { bg: string; text: string }> = {
    PT: { bg: "rgba(0,249,155,0.12)", text: "#00f99b" },
    YT: { bg: "rgba(244,192,113,0.12)", text: "#f4c071" },
    LP: { bg: "rgba(214,92,233,0.12)", text: "#d65ce9" },
    MV: { bg: "rgba(255,153,0,0.12)", text: "#ff9900" },
  };
  const c = colors[type];
  return (
    <span
      className="text-[10px] sm:text-[11px] px-[7px] py-[2px] rounded-[4px]"
      style={{ fontWeight: 600, backgroundColor: c.bg, color: c.text }}
    >
      {type}
    </span>
  );
}

function PnlCell({ value, percent }: { value: string; percent: string }) {
  const positive = value.startsWith("+");
  return (
    <div className="flex flex-col gap-[1px]">
      <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: positive ? "#00f99b" : "#ef6b6b" }}>
        {value}
      </span>
      <span className="text-[9px] text-white/30" style={{ fontWeight: 400 }}>{percent}</span>
    </div>
  );
}

function FixedYieldUsd({ value }: { value: number }) {
  const formatted = `$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈{formatted}</span>;
}

function PoolCell({ pool }: { pool: string }) {
  return (
    <div className="flex items-center gap-2">
      <EthereumIcon size={16} />
      <SpectraIcon size={24} />
      <span className={C} style={{ fontWeight: 500 }}>{pool}</span>
    </div>
  );
}

function PositionCell({ position, accent }: { position: string; accent: string }) {
  return (
    <div className="flex items-center gap-2">
      <EthereumIcon size={16} />
      <SpectraIcon size={24} />
      <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: accent }}>{position}</span>
    </div>
  );
}

// ─── PT Positions table ───
function PTPositionsTab({ positions }: { positions: Position[] }) {
  const accent = TYPE_COLORS["PT"];
  const { sort, toggle } = useSort();

  const sorted = useMemo(() => {
    if (!sort.dir) return positions;
    return [...positions].sort((a, b) => {
      let va: unknown, vb: unknown;
      switch (sort.key) {
        case "position": va = a.position; vb = b.position; break;
        case "balance": va = parseNum(a.balanceUsd); vb = parseNum(b.balanceUsd); break;
        case "redemption": va = parseNum(a.maturityRedemption); vb = parseNum(b.maturityRedemption); break;
        case "value": va = parseNum(a.maturityValue); vb = parseNum(b.maturityValue); break;
        case "fixedYield": {
          const aRed = (a.maturityRedemption || "").match(/^([\d,.]+)/);
          const bRed = (b.maturityRedemption || "").match(/^([\d,.]+)/);
          va = (aRed ? parseNum(aRed[1]) : 0) - parseNum(a.balanceAmount);
          vb = (bRed ? parseNum(bRed[1]) : 0) - parseNum(b.balanceAmount);
          break;
        }
        case "expiry": va = parseDate(a.maturity); vb = parseDate(b.maturity); break;
        default: return 0;
      }
      return compare(va, vb, sort.dir!);
    });
  }, [positions, sort]);

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className={`${ROW} border-b border-white/[0.06]`}>
        <div className="w-[20%] min-w-[140px]"><SortableHeader label="Position" sortKey="position" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[16%] min-w-[100px]"><SortableHeader label="Balance" sortKey="balance" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[20%] min-w-[130px]"><SortableHeader label="Maturity Redemption" sortKey="redemption" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[14%] min-w-[90px]"><SortableHeader label="Maturity Value" sortKey="value" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[14%] min-w-[90px]"><SortableHeader label="Fixed Yield" sortKey="fixedYield" currentSort={sort} onToggle={toggle} /></div>
        <div className="flex-1 min-w-[80px]"><SortableHeader label="Expiry" sortKey="expiry" currentSort={sort} onToggle={toggle} /></div>
      </div>

      {sorted.length === 0 && (
        <div className="flex items-center justify-center py-12 text-[12px] text-white/20" style={{ fontWeight: 400 }}>
          No PT positions
        </div>
      )}

      {sorted.map((pos, i) => {
        const matVal = parseNum(pos.maturityValue);
        const balVal = parseNum(pos.balanceUsd);
        const fixedYieldUsd = matVal - balVal;
        // Extract token name and amount from maturityRedemption (e.g., "14,432.64 sGHO")
        const redemptionParts = (pos.maturityRedemption || "").match(/^([\d,.]+)\s+(.+)$/);
        const redemptionAmount = redemptionParts ? parseNum(redemptionParts[1]) : 0;
        const tokenName = redemptionParts ? redemptionParts[2] : "";
        const balAmount = parseNum(pos.balanceAmount);
        const fixedYieldTokens = redemptionAmount - balAmount;
        return (
        <div key={pos.id} className={`${ROW} ${i % 2 === 1 ? "bg-white/[0.02]" : ""} hover:bg-white/[0.06] transition-colors`}>
          <div className="w-[20%] min-w-[140px]"><PositionCell position={pos.position} accent={accent} /></div>
          <div className="w-[16%] min-w-[100px]">
            <div className="flex flex-col gap-[1px]">
              <span className={C} style={{ fontWeight: 500 }}>{pos.balanceAmount || pos.balance}</span>
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈${pos.balanceUsd}</span>
            </div>
          </div>
          <div className="w-[20%] min-w-[130px]">
            <div className="flex flex-col gap-[1px]">
              <span className={C} style={{ fontWeight: 500 }}>{pos.maturityRedemption}</span>
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈{pos.maturityValue}</span>
            </div>
          </div>
          <div className="w-[14%] min-w-[90px]">
            <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: accent }}>
              {pos.maturityValue}
            </span>
          </div>
          <div className="w-[14%] min-w-[90px]">
            <div className="flex flex-col gap-[1px]">
              <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: fixedYieldTokens >= 0 ? "#00f99b" : "#ef6b6b" }}>
                {fixedYieldTokens >= 0 ? "+" : ""}{Math.abs(fixedYieldTokens).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tokenName}
              </span>
              <FixedYieldUsd value={fixedYieldUsd} />
            </div>
          </div>
          <div className="flex-1 min-w-[80px]"><span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>{pos.maturity}</span></div>
        </div>
        );
      })}
    </div>
  );
}

// ─── YT Positions table ───
function YTPositionsTab({ positions }: { positions: Position[] }) {
  const accent = TYPE_COLORS["YT"];
  const { sort, toggle } = useSort();

  const sorted = useMemo(() => {
    if (!sort.dir) return positions;
    return [...positions].sort((a, b) => {
      let va: unknown, vb: unknown;
      switch (sort.key) {
        case "position": va = a.position; vb = b.position; break;
        case "balance": va = parseNum(a.balanceUsd); vb = parseNum(b.balanceUsd); break;
        case "accrued": va = parseNum(a.accruedYieldUsd); vb = parseNum(b.accruedYieldUsd); break;
        case "claimable": va = parseNum(a.claimableYieldUsd); vb = parseNum(b.claimableYieldUsd); break;
        case "expiry": va = parseDate(a.maturity); vb = parseDate(b.maturity); break;
        default: return 0;
      }
      return compare(va, vb, sort.dir!);
    });
  }, [positions, sort]);

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className={`${ROW} border-b border-white/[0.06]`}>
        <div className="w-[22%] min-w-[140px]"><SortableHeader label="Position" sortKey="position" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[18%] min-w-[110px]"><SortableHeader label="Balance" sortKey="balance" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[22%] min-w-[130px]"><SortableHeader label="Accrued Yield" sortKey="accrued" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[18%] min-w-[100px]"><SortableHeader label="Claimable Yield" sortKey="claimable" currentSort={sort} onToggle={toggle} /></div>
        <div className="flex-1 min-w-[90px]"><SortableHeader label="Expiry" sortKey="expiry" currentSort={sort} onToggle={toggle} /></div>
      </div>

      {sorted.length === 0 && (
        <div className="flex items-center justify-center py-12 text-[12px] text-white/20" style={{ fontWeight: 400 }}>
          No YT positions
        </div>
      )}

      {sorted.map((pos, i) => (
        <div key={pos.id} className={`${ROW} ${i % 2 === 1 ? "bg-white/[0.02]" : ""} hover:bg-white/[0.06] transition-colors`}>
          <div className="w-[22%] min-w-[140px]"><PositionCell position={pos.position} accent={accent} /></div>
          <div className="w-[18%] min-w-[110px]">
            <div className="flex flex-col gap-[1px]">
              <span className={C} style={{ fontWeight: 500 }}>{pos.balanceAmount || pos.balance}</span>
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈${pos.balanceUsd}</span>
            </div>
          </div>
          <div className="w-[22%] min-w-[130px]">
            <div className="flex flex-col gap-[1px]">
              <span className={C} style={{ fontWeight: 500 }}>{pos.accruedYield || "—"}</span>
              {pos.accruedYieldUsd && (
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈{pos.accruedYieldUsd}</span>
              )}
            </div>
          </div>
          <div className="w-[18%] min-w-[100px]">
            <div className="flex flex-col gap-[1px]">
              <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: accent }}>{pos.claimableYield || "—"}</span>
              {pos.claimableYieldUsd && (
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈{pos.claimableYieldUsd}</span>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-[90px]"><span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>{pos.maturity}</span></div>
        </div>
      ))}
    </div>
  );
}

// ─── LP Positions table ───
function LPPositionsTab({ positions }: { positions: Position[] }) {
  const accent = TYPE_COLORS["LP"];
  const { sort, toggle } = useSort();

  const sorted = useMemo(() => {
    if (!sort.dir) return positions;
    return [...positions].sort((a, b) => {
      let va: unknown, vb: unknown;
      switch (sort.key) {
        case "position": va = a.position; vb = b.position; break;
        case "balance": va = parseNum(a.balanceUsd); vb = parseNum(b.balanceUsd); break;
        case "apy": va = parseNum(a.apy || a.currentApy); vb = parseNum(b.apy || b.currentApy); break;
        case "rewards": va = parseNum(a.lifetimeRewardsUsd || a.lifetimeRewards); vb = parseNum(b.lifetimeRewardsUsd || b.lifetimeRewards); break;
        case "expiry": va = parseDate(a.maturity); vb = parseDate(b.maturity); break;
        default: return 0;
      }
      return compare(va, vb, sort.dir!);
    });
  }, [positions, sort]);

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className={`${ROW} border-b border-white/[0.06]`}>
        <div className="w-[22%] min-w-[140px]"><SortableHeader label="Position" sortKey="position" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[18%] min-w-[110px]"><SortableHeader label="Balance" sortKey="balance" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[22%] min-w-[90px]"><SortableHeader label="APY" sortKey="apy" currentSort={sort} onToggle={toggle} /></div>
        <div className="flex-1 min-w-[90px]"><SortableHeader label="Expiry" sortKey="expiry" currentSort={sort} onToggle={toggle} /></div>
      </div>

      {sorted.length === 0 && (
        <div className="flex items-center justify-center py-12 text-[12px] text-white/20" style={{ fontWeight: 400 }}>
          No LP positions
        </div>
      )}

      {sorted.map((pos, i) => (
        <div key={pos.id} className={`${ROW} ${i % 2 === 1 ? "bg-white/[0.02]" : ""} hover:bg-white/[0.06] transition-colors`}>
          <div className="w-[22%] min-w-[140px]"><PositionCell position={pos.position} accent={accent} /></div>
          <div className="w-[18%] min-w-[110px]">
            <div className="flex flex-col gap-[1px]">
              <span className={C} style={{ fontWeight: 500 }}>{pos.balanceAmount || pos.balance}</span>
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈${pos.balanceUsd}</span>
            </div>
          </div>
          <div className="w-[22%] min-w-[90px]">
            <div className="flex flex-col gap-[1px]">
              <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: accent }}>{pos.apy || pos.currentApy}</span>
              {pos.apyBoost && (
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{pos.apyBoost}</span>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-[90px]"><span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>{pos.maturity}</span></div>
        </div>
      ))}
    </div>
  );
}

// ─── MV Positions table ───
function MVPositionsTab({ positions }: { positions: MVPosition[] }) {
  const accent = TYPE_COLORS["MV"];
  const { sort, toggle } = useSort();

  const sorted = useMemo(() => {
    if (!sort.dir) return positions;
    return [...positions].sort((a, b) => {
      let va: unknown, vb: unknown;
      switch (sort.key) {
        case "vault": va = a.vault; vb = b.vault; break;
        case "curator": va = a.curator; vb = b.curator; break;
        case "balance": va = parseNum(a.balanceUsd); vb = parseNum(b.balanceUsd); break;
        case "estimated": va = parseNum(a.estimatedValue); vb = parseNum(b.estimatedValue); break;
        case "apy": va = parseNum(a.maxApy); vb = parseNum(b.maxApy); break;
        case "base": va = a.base; vb = b.base; break;
        default: return 0;
      }
      return compare(va, vb, sort.dir!);
    });
  }, [positions, sort]);

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className={`${ROW} border-b border-white/[0.06]`}>
        <div className="w-[22%] min-w-[160px]"><SortableHeader label="Vault" sortKey="vault" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[14%] min-w-[90px]"><SortableHeader label="Curator" sortKey="curator" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[18%] min-w-[120px]"><SortableHeader label="Balance" sortKey="balance" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[18%] min-w-[120px]"><SortableHeader label="Estimated Value" sortKey="estimated" currentSort={sort} onToggle={toggle} /></div>
        <div className="w-[14%] min-w-[80px]"><SortableHeader label="Max APY" sortKey="apy" currentSort={sort} onToggle={toggle} /></div>
        <div className="flex-1 min-w-[90px]"><SortableHeader label="Entry/Exit Asset" sortKey="base" currentSort={sort} onToggle={toggle} /></div>
      </div>

      {sorted.length === 0 && (
        <div className="flex items-center justify-center py-12 text-[12px] text-white/20" style={{ fontWeight: 400 }}>
          No MV positions
        </div>
      )}

      {sorted.map((pos, i) => (
        <div key={pos.id} className={`${ROW} ${i % 2 === 1 ? "bg-white/[0.02]" : ""} hover:bg-white/[0.06] transition-colors`}>
          <div className="w-[22%] min-w-[160px]">
            <div className="flex items-center gap-2">
              <EthereumIcon size={16} />
              <SpectraIcon size={24} />
              <TypeBadge type="MV" />
              <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: accent }}>{pos.vault}</span>
            </div>
          </div>
          <div className="w-[14%] min-w-[90px]">
            <span className="text-[12px] sm:text-[13px] text-white/50" style={{ fontWeight: 400 }}>{pos.curator}</span>
          </div>
          <div className="w-[18%] min-w-[120px]">
            <div className="flex flex-col gap-[1px]">
              <span className={C} style={{ fontWeight: 500 }}>{pos.balanceAmount}</span>
              <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈${pos.balanceUsd}</span>
            </div>
          </div>
          <div className="w-[18%] min-w-[120px]">
            <span className={C} style={{ fontWeight: 500 }}>{pos.estimatedValue}</span>
          </div>
          <div className="w-[14%] min-w-[80px]">
            <span className="text-[12px] sm:text-[13px]" style={{ fontWeight: 500, color: accent }}>{pos.maxApy}</span>
          </div>
          <div className="flex-1 min-w-[90px]">
            <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>{pos.base}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Claimable Rewards table ───
function NetworkBadge({ networkId, size = 16 }: { networkId: string; size?: number }) {
  const net = ALL_NETWORKS.find((n) => n.id === networkId);
  if (!net) return null;
  return (
    <div className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: net.iconColor }}>
      <span className="text-white" style={{ fontSize: size * 0.38, fontWeight: 700, lineHeight: 1 }}>
        {net.iconChar.length > 1 ? net.iconChar.slice(0, 1) : net.iconChar}
      </span>
    </div>
  );
}

function RewardsTab() {
  // Group rewards by network
  const grouped = useMemo(() => {
    const map = new Map<string, Reward[]>();
    for (const r of CLAIMABLE_REWARDS) {
      const list = map.get(r.network) || [];
      list.push(r);
      map.set(r.network, list);
    }
    return Array.from(map.entries()).map(([networkId, rewards]) => {
      const net = ALL_NETWORKS.find((n) => n.id === networkId);
      const total = rewards.reduce((sum, r) => sum + parseFloat(r.value.replace(/[$,]/g, "")), 0);
      return { networkId, networkName: net?.name || networkId, rewards, total };
    });
  }, []);

  return (
    <div>
      {/* Column headers */}
      <div className={`${ROW} border-b border-white/[0.06]`}>
        <div className="w-[30%] min-w-[120px]"><span className={H} style={{ fontWeight: 500 }}>Token</span></div>
        <div className="w-[25%] min-w-[90px]"><span className={H} style={{ fontWeight: 500 }}>Amount</span></div>
        <div className="w-[25%] min-w-[70px]"><span className={H} style={{ fontWeight: 500 }}>Value</span></div>
        <div className="flex-1 min-w-[70px] text-right"><span className={H} style={{ fontWeight: 500 }}>Action</span></div>
      </div>

      {grouped.map((group) => (
        <div key={group.networkId}>
          {/* Per-network Claim All header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-[#00f99b]/[0.03]">
            <div className="flex items-center gap-2">
              <NetworkBadge networkId={group.networkId} size={18} />
              <span className="text-[11px] text-white/70" style={{ fontWeight: 500 }}>{group.networkName}</span>
              <span className="text-[11px] text-white/30" style={{ fontWeight: 400 }}>·</span>
              <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>
                Total: <span className="text-[#00f99b]" style={{ fontWeight: 600 }}>${group.total.toFixed(2)}</span>
              </span>
            </div>
            <button className="bg-[#00f99b]/15 hover:bg-[#00f99b]/25 border border-[#00f99b]/30 rounded-md px-3 py-[4px] transition-all">
              <span className="text-[11px] text-[#00f99b]" style={{ fontWeight: 600 }}>Claim All</span>
            </button>
          </div>

          {/* Reward rows for this network */}
          {group.rewards.map((rew, i) => (
            <div key={rew.id} className={`${ROW} ${i % 2 === 1 ? "bg-white/[0.02]" : ""} border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors`}>
              <div className="w-[30%] min-w-[120px]">
                <div className="flex items-center gap-2">
                  <TokenCircle color={rew.token === "SPECTRA" ? "#00f99b" : rew.token === "sGHO" ? "#a855f7" : rew.token === "wstETH" ? "#6366f1" : "#f97316"} char={rew.token[0]} size={22} />
                  <span className="text-[12px] sm:text-[13px] text-[#b8a4ff]" style={{ fontWeight: 500 }}>{rew.token}</span>
                </div>
              </div>
              <div className="w-[25%] min-w-[90px]">
                <span className={`${C} text-white/70`} style={{ fontWeight: 400 }}>{rew.amount}</span>
              </div>
              <div className="w-[25%] min-w-[70px]">
                <span className={C} style={{ fontWeight: 500 }}>{rew.value}</span>
              </div>
              <div className="flex-1 min-w-[70px] text-right">
                <button className="hover:text-[#00f99b]/80 transition-colors px-2.5 py-[3px]">
                  <span className="text-[10px] text-[#00f99b]" style={{ fontWeight: 500, borderBottom: "1px dotted rgba(0,249,155,0.3)" }}>Claim</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Main ───
export function PositionsTable() {
  const [tab, setTab] = useState<TabKey>("pt");

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Tabs */}
      <div className="flex items-center gap-0 px-3 sm:px-4 border-b border-white/[0.06] shrink-0 overflow-x-auto scrollbar-hide">
        {TABS.map((t) => {
          const active = tab === t.key;
          const accent = t.accent || "#ffffff";
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 py-[10px] transition-colors whitespace-nowrap shrink-0 ${
                active ? "text-white" : "text-white/35 hover:text-white/60 hover:bg-white/[0.08]"
              }`}
            >
              <span className="text-[12px]" style={{ fontWeight: active ? 500 : 400 }}>
                {t.label}
              </span>
              <span
                className="ml-1.5 text-[10px] px-[5px] py-[1px] rounded-full"
                style={{
                  fontWeight: 500,
                  backgroundColor: active ? `${accent}18` : "rgba(255,255,255,0.04)",
                  color: active ? accent : "rgba(255,255,255,0.25)",
                }}
              >
                {t.count}
              </span>
              {active && (
                <div
                  className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                  style={{ backgroundColor: accent }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-auto scrollbar-hide">
        {tab === "pt" && <PTPositionsTab positions={PT_POSITIONS} />}
        {tab === "yt" && <YTPositionsTab positions={YT_POSITIONS} />}
        {tab === "lp" && <LPPositionsTab positions={LP_POSITIONS} />}
        {tab === "mv" && <MVPositionsTab positions={MV_POSITIONS} />}
        {tab === "rewards" && <RewardsTab />}
      </div>
    </div>
  );
}
