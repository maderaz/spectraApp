import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { NetworkDropdown, FiltersDropdown, ALL_NETWORKS, DEFAULT_FILTERS } from "./FilterDropdowns";
import type { FilterFlags } from "./FilterDropdowns";
import { TokenCircle, SmallTokenCircle, SortIcon, SearchIcon, HelpIcon } from "./shared/TableIcons";
import type { SortDir } from "./shared/TableIcons";
import { formatLiquidity } from "./shared/formatters";

// ─── Types ───
type SortKey = "pool" | "apy" | "ibt" | "liquidity" | "expiry";
type QuickFilter = "all" | "eth" | "btc" | "stables";

interface ApyRewardToken {
  name: string;
  iconColor: string;
  iconChar: string;
  apy: number;
}

interface ApyBreakdown {
  ptFixedRate: number;
  lpFees: number;
  lpRewards: number;
  rewardTokens: ApyRewardToken[];
  ibtLabel: string;
  ibtApy: number;
  total: number;
  footnote?: string;
}

interface Pool {
  id: string;
  pool: string;
  protocol: string;
  category: "eth" | "btc" | "stables" | "other";
  network: string;
  iconColor: string;
  iconChar: string;
  chainIconColor: string;
  chainIconChar: string;
  maxApy: number;
  ibt: string;
  ibtIconColor: string;
  ibtIconChar: string;
  liquidity: number;
  expiry: string;
  expiryTs: number;
  apyBreakdown: ApyBreakdown;
}

// ─── Mock data ───
const POOLS: Pool[] = [
  { id: "1",  pool: "avUSD",      protocol: "Avant",              category: "stables", network: "arbitrum", iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", maxApy: 10.34, ibt: "avUSDx",   ibtIconColor: "#ef4444", ibtIconChar: "A", liquidity: 3180186, expiry: "May 15 2026", expiryTs: 1747267200, apyBreakdown: { ptFixedRate: 4.12, lpFees: 0.18, lpRewards: 2.82, rewardTokens: [{ name: "APT", iconColor: "#ef4444", iconChar: "A", apy: 2.82 }], ibtLabel: "avUSDx", ibtApy: 3.22, total: 10.34 } },
  { id: "2",  pool: "stXRP",      protocol: "Firelight",          category: "other",   network: "sonic",    iconColor: "#f97316", iconChar: "✦", chainIconColor: "#22c55e", chainIconChar: "◆", maxApy: 5.96,  ibt: "stXRP",    ibtIconColor: "#f97316", ibtIconChar: "✦", liquidity: 1344880, expiry: "Jun 04 2026", expiryTs: 1748995200, apyBreakdown: { ptFixedRate: 2.14, lpFees: 0.32, lpRewards: 1.50, rewardTokens: [{ name: "FLT", iconColor: "#f97316", iconChar: "✦", apy: 1.50 }], ibtLabel: "stXRP", ibtApy: 2.00, total: 5.96 } },
  { id: "3",  pool: "WFLR",       protocol: "Sceptre",            category: "other",   network: "flare",    iconColor: "#dc2626", iconChar: "◆", chainIconColor: "#dc2626", chainIconChar: "◆", maxApy: 22.52, ibt: "sFLR",     ibtIconColor: "#f97316", ibtIconChar: "●", liquidity: 1195616, expiry: "May 17 2026", expiryTs: 1747440000, apyBreakdown: { ptFixedRate: 7.48, lpFees: 0.21, lpRewards: 5.52, rewardTokens: [{ name: "rFLR", iconColor: "#dc2626", iconChar: "◆", apy: 5.52 }], ibtLabel: "sFLR", ibtApy: 9.30, total: 22.52, footnote: "rFLR rewards are distributed at the end of each month via the Flare Portal → Emissions Tab → [Spectra] from the dropdown menu." } },
  { id: "4",  pool: "vbUSDC",     protocol: "Yearn",              category: "stables", network: "arbitrum",  iconColor: "#3b82f6", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", maxApy: 45,    ibt: "yvvbUSDC", ibtIconColor: "#3b82f6", ibtIconChar: "Y", liquidity: 884384,  expiry: "Aug 02 2026", expiryTs: 1754092800, apyBreakdown: { ptFixedRate: 18.20, lpFees: 0.80, lpRewards: 12.00, rewardTokens: [{ name: "YFI", iconColor: "#3b82f6", iconChar: "Y", apy: 12.00 }], ibtLabel: "yvvbUSDC", ibtApy: 14.00, total: 45.00 } },
  { id: "5",  pool: "avUSD",      protocol: "Avant",              category: "stables", network: "arbitrum",  iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", maxApy: 21.02, ibt: "avUSD",    ibtIconColor: "#8b5cf6", ibtIconChar: "◎", liquidity: 464304,  expiry: "May 15 2026", expiryTs: 1747267200, apyBreakdown: { ptFixedRate: 8.50, lpFees: 0.42, lpRewards: 5.10, rewardTokens: [{ name: "APT", iconColor: "#ef4444", iconChar: "A", apy: 5.10 }], ibtLabel: "avUSD", ibtApy: 7.00, total: 21.02 } },
  { id: "6",  pool: "jEURx",      protocol: "Jarvis Network",     category: "stables", network: "base",     iconColor: "#06b6d4", iconChar: "J", chainIconColor: "#a855f7", chainIconChar: "◆", maxApy: 20.51, ibt: "sjEUR",    ibtIconColor: "#06b6d4", ibtIconChar: "●", liquidity: 427362,  expiry: "Jul 16 2026", expiryTs: 1752624000, apyBreakdown: { ptFixedRate: 8.11, lpFees: 0.35, lpRewards: 4.85, rewardTokens: [{ name: "JRT", iconColor: "#06b6d4", iconChar: "J", apy: 4.85 }], ibtLabel: "sjEUR", ibtApy: 7.20, total: 20.51 } },
  { id: "7",  pool: "USDN",       protocol: "SMARDEX",            category: "stables", network: "ethereum",  iconColor: "#6366f1", iconChar: "N", chainIconColor: "#627EEA", chainIconChar: "Ξ", maxApy: 42.99, ibt: "WUSDN",    ibtIconColor: "#f97316", ibtIconChar: "●", liquidity: 338820,  expiry: "Jan 12 2027", expiryTs: 1768176000, apyBreakdown: { ptFixedRate: 16.50, lpFees: 0.99, lpRewards: 11.50, rewardTokens: [{ name: "SDEX", iconColor: "#6366f1", iconChar: "N", apy: 11.50 }], ibtLabel: "WUSDN", ibtApy: 14.00, total: 42.99 } },
  { id: "8",  pool: "avUSD",      protocol: "Avant",              category: "stables", network: "arbitrum",  iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", maxApy: 7.72,  ibt: "savUSD",   ibtIconColor: "#22c55e", ibtIconChar: "◎", liquidity: 308989,  expiry: "May 15 2026", expiryTs: 1747267200, apyBreakdown: { ptFixedRate: 3.20, lpFees: 0.12, lpRewards: 1.40, rewardTokens: [{ name: "APT", iconColor: "#ef4444", iconChar: "A", apy: 1.40 }], ibtLabel: "savUSD", ibtApy: 3.00, total: 7.72 } },
  { id: "9",  pool: "yn-RWA/USD", protocol: "YieldNest",          category: "stables", network: "arbitrum",  iconColor: "#10b981", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", maxApy: 33.41, ibt: "STAK",     ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 247570,  expiry: "Oct 15 2026", expiryTs: 1760457600, apyBreakdown: { ptFixedRate: 12.80, lpFees: 0.61, lpRewards: 8.00, rewardTokens: [{ name: "YND", iconColor: "#10b981", iconChar: "Y", apy: 8.00 }], ibtLabel: "STAK", ibtApy: 12.00, total: 33.41 } },
  { id: "10", pool: "BOLD",       protocol: "Liquity V2 (by K3)", category: "stables", network: "sonic",    iconColor: "#3b82f6", iconChar: "B", chainIconColor: "#22c55e", chainIconChar: "◆", maxApy: 4.08,  ibt: "sBOLD",    ibtIconColor: "#ef4444", ibtIconChar: "●", liquidity: 185350,  expiry: "Jun 05 2026", expiryTs: 1749081600, apyBreakdown: { ptFixedRate: 1.80, lpFees: 0.08, lpRewards: 0.70, rewardTokens: [{ name: "LQTY", iconColor: "#3b82f6", iconChar: "B", apy: 0.70 }], ibtLabel: "sBOLD", ibtApy: 1.50, total: 4.08 } },
  { id: "11", pool: "vbUSDT",     protocol: "Yearn",              category: "stables", network: "sonic",    iconColor: "#3b82f6", iconChar: "Y", chainIconColor: "#22c55e", chainIconChar: "◆", maxApy: 39.65, ibt: "yvvbUSDT", ibtIconColor: "#3b82f6", ibtIconChar: "Y", liquidity: 177520,  expiry: "Aug 02 2026", expiryTs: 1754092800, apyBreakdown: { ptFixedRate: 15.00, lpFees: 0.65, lpRewards: 10.00, rewardTokens: [{ name: "YFI", iconColor: "#3b82f6", iconChar: "Y", apy: 10.00 }], ibtLabel: "yvvbUSDT", ibtApy: 14.00, total: 39.65 } },
  { id: "12", pool: "vbUSDC",     protocol: "Lucidly",            category: "stables", network: "base",     iconColor: "#6366f1", iconChar: "L", chainIconColor: "#a855f7", chainIconChar: "◆", maxApy: 18.57, ibt: "syUSD",    ibtIconColor: "#22c55e", ibtIconChar: "◎", liquidity: 160079,  expiry: "May 10 2026", expiryTs: 1746835200, apyBreakdown: { ptFixedRate: 7.20, lpFees: 0.37, lpRewards: 4.00, rewardTokens: [{ name: "LCY", iconColor: "#6366f1", iconChar: "L", apy: 4.00 }], ibtLabel: "syUSD", ibtApy: 7.00, total: 18.57 } },
  { id: "13", pool: "USDp",       protocol: "Parallel Protocol",  category: "stables", network: "ethereum",  iconColor: "#dc2626", iconChar: "P", chainIconColor: "#627EEA", chainIconChar: "Ξ", maxApy: 22.95, ibt: "sUSDp",    ibtIconColor: "#a855f7", ibtIconChar: "●", liquidity: 151627,  expiry: "Apr 20 2026", expiryTs: 1745107200, apyBreakdown: { ptFixedRate: 9.00, lpFees: 0.45, lpRewards: 5.50, rewardTokens: [{ name: "PAR", iconColor: "#dc2626", iconChar: "P", apy: 5.50 }], ibtLabel: "sUSDp", ibtApy: 8.00, total: 22.95 } },
  { id: "14", pool: "stXRP",      protocol: "Firelight",          category: "other",   network: "sonic",    iconColor: "#f97316", iconChar: "✦", chainIconColor: "#22c55e", chainIconChar: "◆", maxApy: 1.13,  ibt: "stXRP",    ibtIconColor: "#f97316", ibtIconChar: "✦", liquidity: 149384,  expiry: "Mar 31 2027", expiryTs: 1774915200, apyBreakdown: { ptFixedRate: 0.40, lpFees: 0.03, lpRewards: 0.20, rewardTokens: [{ name: "FLT", iconColor: "#f97316", iconChar: "✦", apy: 0.20 }], ibtLabel: "stXRP", ibtApy: 0.50, total: 1.13 } },
  { id: "15", pool: "ETH",        protocol: "Ether.fi",           category: "eth",     network: "ethereum",  iconColor: "#6366f1", iconChar: "Ξ", chainIconColor: "#3b82f6", chainIconChar: "◆", maxApy: 2.53,  ibt: "weETH",    ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 114401,  expiry: "Jul 15 2026", expiryTs: 1752537600, apyBreakdown: { ptFixedRate: 1.00, lpFees: 0.03, lpRewards: 0.50, rewardTokens: [{ name: "ETHFI", iconColor: "#6366f1", iconChar: "Ξ", apy: 0.50 }], ibtLabel: "weETH", ibtApy: 1.00, total: 2.53 } },
  { id: "16", pool: "USDC",       protocol: "YieldNest",          category: "stables", network: "arbitrum",  iconColor: "#10b981", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", maxApy: 10.85, ibt: "ynRWAx",   ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 101325,  expiry: "Oct 15 2026", expiryTs: 1760457600, apyBreakdown: { ptFixedRate: 4.00, lpFees: 0.25, lpRewards: 2.60, rewardTokens: [{ name: "YND", iconColor: "#10b981", iconChar: "Y", apy: 2.60 }], ibtLabel: "ynRWAx", ibtApy: 4.00, total: 10.85 } },
  { id: "17", pool: "sdCRV",      protocol: "Aladdin",            category: "other",   network: "avalanche", iconColor: "#22c55e", iconChar: "C", chainIconColor: "#ef4444", chainIconChar: "◆", maxApy: 66.38, ibt: "asdCRV",   ibtIconColor: "#22c55e", ibtIconChar: "C", liquidity: 51842,   expiry: "Jun 25 2026", expiryTs: 1750809600, apyBreakdown: { ptFixedRate: 25.00, lpFees: 1.38, lpRewards: 18.00, rewardTokens: [{ name: "CRV", iconColor: "#22c55e", iconChar: "C", apy: 18.00 }], ibtLabel: "asdCRV", ibtApy: 22.00, total: 66.38 } },
  { id: "18", pool: "AVAX",       protocol: "Treehouse",          category: "other",   network: "avalanche", iconColor: "#ef4444", iconChar: "▲", chainIconColor: "#ef4444", chainIconChar: "▲", maxApy: 3.64,  ibt: "tAVAX",    ibtIconColor: "#ef4444", ibtIconChar: "▲", liquidity: 37779,   expiry: "Apr 30 2026", expiryTs: 1745971200, apyBreakdown: { ptFixedRate: 1.50, lpFees: 0.04, lpRewards: 0.60, rewardTokens: [{ name: "QI", iconColor: "#ef4444", iconChar: "▲", apy: 0.60 }], ibtLabel: "tAVAX", ibtApy: 1.50, total: 3.64 } },
];

const PAGE_SIZE = 18;

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ─── APY Breakdown Tooltip ───
function ApyBreakdownTooltip({ breakdown }: { breakdown: ApyBreakdown }) {
  return (
    <div
      className="w-[280px] rounded-[10px] border border-white/[0.08] overflow-hidden"
      style={{ backgroundColor: "#252525" }}
    >
      {/* PT Fixed Rate */}
      <div className="flex items-center justify-between px-4 py-[10px] border-b border-white/[0.06]">
        <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>PT Fixed Rate</span>
        <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{breakdown.ptFixedRate.toFixed(2)}%</span>
      </div>

      {/* LP Fees */}
      <div className="flex flex-col gap-[2px] px-4 pt-[10px] pb-[6px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>LP Fees</span>
          <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{breakdown.lpFees.toFixed(2)}%</span>
        </div>
      </div>

      {/* LP Rewards */}
      <div className="flex flex-col gap-[4px] px-4 pb-[10px] border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>LP Rewards</span>
          <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{breakdown.lpRewards.toFixed(2)}%</span>
        </div>
        {/* Individual reward tokens */}
        {breakdown.rewardTokens.map((rt, i) => (
          <div key={i} className="flex items-center justify-between pl-3">
            <div className="flex items-center gap-[6px]">
              <SmallTokenCircle color={rt.iconColor} char={rt.iconChar} size={16} />
              <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>{rt.name}</span>
            </div>
            <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>{rt.apy.toFixed(2)}%</span>
          </div>
        ))}
      </div>

      {/* IBT yield */}
      <div className="flex items-center justify-between px-4 py-[10px] border-b border-white/[0.06]">
        <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{breakdown.ibtLabel}</span>
        <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{breakdown.ibtApy.toFixed(2)}%</span>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between px-4 py-[10px] border-b border-white/[0.06]">
        <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>Total</span>
        <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>{breakdown.total.toFixed(2)}%</span>
      </div>

      {/* Footnote */}
      {breakdown.footnote && (
        <div className="px-4 py-[10px]">
          <p className="text-[11px] text-white/35 leading-[15px]" style={{ fontWeight: 400 }}>
            {breakdown.footnote}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main export ───
// 30 days from "today" (Mar 13 2026)
const NOW_TS = 1773532800; // Mar 13 2026 approx
const THIRTY_DAYS = 30 * 86400;

export function Pools() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("liquidity");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showAll, setShowAll] = useState(false);
  const [selectedNetworks, setSelectedNetworks] = useState<Set<string>>(() => new Set(ALL_NETWORKS.map((n) => n.id)));
  const [filterFlags, setFilterFlags] = useState<FilterFlags>({ ...DEFAULT_FILTERS });

  const hasActiveFilters =
    search.trim() !== "" ||
    quickFilter !== "all" ||
    selectedNetworks.size !== ALL_NETWORKS.length ||
    filterFlags.hideExpiring ||
    filterFlags.hideNegativeApy ||
    filterFlags.hideLowTvl;

  function clearAllFilters() {
    setSearch("");
    setQuickFilter("all");
    setSortKey("liquidity");
    setSortDir("desc");
    setShowAll(false);
    setSelectedNetworks(new Set(ALL_NETWORKS.map((n) => n.id)));
    setFilterFlags({ ...DEFAULT_FILTERS });
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    let list = [...POOLS];

    // Network filter
    if (selectedNetworks.size !== ALL_NETWORKS.length) {
      list = list.filter((p) => selectedNetworks.has(p.network));
    }

    if (quickFilter !== "all") {
      list = list.filter((p) => p.category === quickFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.pool.toLowerCase().includes(q) ||
          p.protocol.toLowerCase().includes(q) ||
          p.ibt.toLowerCase().includes(q)
      );
    }

    // Filter flags
    if (filterFlags.hideExpiring) {
      list = list.filter((p) => p.expiryTs - NOW_TS > THIRTY_DAYS);
    }
    if (filterFlags.hideNegativeApy) {
      list = list.filter((p) => p.maxApy >= 0);
    }
    if (filterFlags.hideLowTvl) {
      list = list.filter((p) => p.liquidity >= 1000);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "pool": cmp = a.pool.localeCompare(b.pool); break;
        case "apy": cmp = a.maxApy - b.maxApy; break;
        case "ibt": cmp = a.ibt.localeCompare(b.ibt); break;
        case "liquidity": cmp = a.liquidity - b.liquidity; break;
        case "expiry": cmp = a.expiryTs - b.expiryTs; break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

    return list;
  }, [search, quickFilter, sortKey, sortDir, selectedNetworks, filterFlags]);

  const displayed = showAll ? filtered : filtered.slice(0, PAGE_SIZE);

  const QUICK_FILTERS: { key: QuickFilter; label: string }[] = [
    { key: "eth", label: "ETH" },
    { key: "btc", label: "BTC" },
    { key: "stables", label: "Stables" },
  ];

  const H = "text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap hover:text-white/60 transition-colors";

  return (
    <div className="flex-1 min-w-0 overflow-auto scrollbar-hide font-['Inter']">
      <div className="flex flex-col h-full min-h-screen xl:h-screen">

        {/* ── HERO HEADER ── */}
        <div className="shrink-0">
          <div className="flex items-start justify-between px-3 sm:px-5 pt-4 pb-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-white" style={{ fontWeight: 600 }}>
                Pools
              </span>
              <span className="text-[13px] text-white/40" style={{ fontWeight: 400 }}>
                Earn yield on your assets with permissionless Spectra pools. New pools appear here automatically once deployed.
              </span>
            </div>
            <button className="hidden sm:flex items-center gap-1.5 mt-1 text-white/40 hover:text-white/60 transition-colors">
              <HelpIcon />
              <span className="text-[12px]" style={{ fontWeight: 400 }}>Help</span>
            </button>
          </div>

          {/* ── FILTER BAR ── */}
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 pb-3 sm:flex-wrap">
            {/* Network dropdown */}
            <NetworkDropdown selected={selectedNetworks} onChange={setSelectedNetworks} />

            {/* Search — icon-only on mobile, full input on sm+ */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex sm:hidden items-center justify-center bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-[8px] w-[36px] h-[34px] shrink-0 transition-all"
            >
              <SearchIcon />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[8px] px-3 py-[7px] sm:flex-1 sm:max-w-[240px]">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-[12px] text-white/70 placeholder:text-white/25 outline-none w-full"
                style={{ fontWeight: 400 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters dropdown */}
            <FiltersDropdown filters={filterFlags} onChange={setFilterFlags} />

            {/* Separator */}
            <div className="hidden sm:block w-px h-[20px] bg-white/[0.08]" />

            {/* Segmented toggle */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden shrink-0">
              {QUICK_FILTERS.map((f, i) => {
                const active = quickFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setQuickFilter(active ? "all" : f.key)}
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

            {/* Clear All */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 rounded-[8px] px-3 py-[7px] transition-all group/clear"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                  <path d="M3 3L9 9M9 3L3 9" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline text-[12px] text-red-400" style={{ fontWeight: 500 }}>Clear All</span>
              </button>
            )}

            {/* Spacer to push Create Pool to the right */}
            <div className="flex-1" />

            {/* + Create Pool button */}
            <button className="flex items-center gap-1.5 bg-[#00f99b] hover:bg-[#00e08a] text-black rounded-[8px] px-4 py-[7px] transition-all">
              <PlusIcon />
              <span className="text-[12px]" style={{ fontWeight: 600 }}>Create Pool</span>
            </button>
          </div>

          {/* Mobile search expanded row */}
          {searchOpen && (
            <div className="flex sm:hidden items-center gap-2 px-3 pb-3">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[8px] px-3 py-[7px] flex-1">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search tokens, platforms"
                  className="bg-transparent text-[12px] text-white/70 placeholder:text-white/25 outline-none w-full"
                  style={{ fontWeight: 400 }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                {search && (
                  <button onClick={() => setSearch("")} className="shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 2L8 8M8 2L2 8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[12px] text-white/40 hover:text-white/60 shrink-0 py-[7px]"
                style={{ fontWeight: 400 }}
              >
                Cancel
              </button>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="border-b border-white/[0.06]" />
        </div>

        {/* ── TABLE ── */}
        <div className="flex-1 min-h-0 flex flex-col overflow-x-auto">
          {/* Table header */}
          <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[620px]">
            <div className="w-[22%] min-w-[160px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("pool")}>
                Pool
                <SortIcon active={sortKey === "pool"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[13%] min-w-[100px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("apy")}>
                Max APY
                <SortIcon active={sortKey === "apy"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[15%] min-w-[110px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("ibt")}>
                Default Token
                <SortIcon active={sortKey === "ibt"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[14%] min-w-[90px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("liquidity")}>
                Liquidity
                <SortIcon active={sortKey === "liquidity"} dir={sortDir} />
              </span>
            </div>
            <div className="flex-1 min-w-[100px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("expiry")}>
                Expiry
                <SortIcon active={sortKey === "expiry"} dir={sortDir} />
              </span>
            </div>
          </div>

          {/* Table rows */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {displayed.map((pool) => (
              <div
                key={pool.id}
                onClick={() => navigate(`/pools/${pool.id}`)}
                className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors cursor-pointer group min-w-[620px]"
              >
                {/* Pool */}
                <div className="w-[22%] min-w-[160px]">
                  <div className="flex items-center gap-2.5">
                    {/* Network icon */}
                    <div className="w-[16px] flex items-center justify-center shrink-0">
                      <div
                        className="rounded-full flex items-center justify-center"
                        style={{ width: 16, height: 16, backgroundColor: pool.chainIconColor }}
                      >
                        <span className="text-white text-[7px]" style={{ fontWeight: 700 }}>{pool.chainIconChar}</span>
                      </div>
                    </div>
                    {/* Token icon */}
                    <TokenCircle color={pool.iconColor} char={pool.iconChar} size={32} />
                    <div className="flex flex-col gap-[1px]">
                      <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{pool.pool}</span>
                      <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{pool.protocol}</span>
                    </div>
                  </div>
                </div>

                {/* Max APY — green accent with hover breakdown */}
                <div className="w-[13%] min-w-[100px] relative group/apy">
                  <span
                    className="text-[13px] text-[#00f99b] cursor-default"
                    style={{ fontWeight: 500, borderBottom: "1px dotted rgba(0,249,155,0.35)", paddingBottom: 1 }}
                  >
                    {pool.maxApy % 1 === 0 ? `${pool.maxApy}%` : `${pool.maxApy.toFixed(2)}%`}
                  </span>
                  {/* Safe hover bridge + tooltip */}
                  <div className="hidden group-hover/apy:block absolute left-0 top-full z-50" style={{ marginTop: -2 }}>
                    <div className="h-[8px] w-full" />
                    <ApyBreakdownTooltip breakdown={pool.apyBreakdown} />
                  </div>
                </div>

                {/* Default Token */}
                <div className="w-[15%] min-w-[110px]">
                  <div className="flex items-center gap-2">
                    <SmallTokenCircle color={pool.ibtIconColor} char={pool.ibtIconChar} size={20} />
                    <span className="text-[13px] text-white/70" style={{ fontWeight: 400 }}>{pool.ibt}</span>
                  </div>
                </div>

                {/* Liquidity */}
                <div className="w-[14%] min-w-[90px]">
                  <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>
                    {formatLiquidity(pool.liquidity)}
                  </span>
                </div>

                {/* Expiry */}
                <div className="flex-1 min-w-[100px]">
                  <span className="text-[13px] text-white/50" style={{ fontWeight: 400 }}>{pool.expiry}</span>
                </div>
              </div>
            ))}

            {/* Show more / counter */}
            {filtered.length > PAGE_SIZE && (
              <div className="flex flex-col items-center gap-2 py-5">
                {!showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-[#00f99b]/15 hover:bg-[#00f99b]/25 border border-[#00f99b]/30 text-[#00f99b] text-[12px] px-4 py-[6px] rounded-[6px] transition-all"
                    style={{ fontWeight: 500 }}
                  >
                    Show more
                  </button>
                )}
                <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>
                  Showing {displayed.length} of {filtered.length}
                </span>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-16 text-[13px] text-white/20" style={{ fontWeight: 400 }}>
                No pools match your search
              </div>
            )}

            {filtered.length > 0 && filtered.length <= PAGE_SIZE && (
              <div className="flex items-center justify-center py-4">
                <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>
                  Showing {filtered.length} of {filtered.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}