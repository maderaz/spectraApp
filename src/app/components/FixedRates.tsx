import { useState, useMemo } from "react";
import { NetworkDropdown, FiltersDropdown, ALL_NETWORKS, DEFAULT_FILTERS } from "./FilterDropdowns";
import type { FilterFlags } from "./FilterDropdowns";

// ─── Types ───
type SortKey = "pool" | "apy" | "ibt" | "liquidity" | "maturity";
type SortDir = "asc" | "desc";
type QuickFilter = "all" | "eth" | "btc" | "stables";

interface FixedRatePool {
  id: string;
  pool: string;
  protocol: string;
  category: "eth" | "btc" | "stables" | "other";
  network: string;
  iconColor: string;
  iconChar: string;
  chainIconColor?: string;
  chainIconChar?: string;
  maxFixedApy: number;
  ibt: string;
  ibtIconColor: string;
  ibtIconChar: string;
  liquidity: number;
  maturity: string;
  maturityTs: number;
}

// ─── Mock data based on screenshot ───
const POOLS: FixedRatePool[] = [
  { id: "1", pool: "avUSD", protocol: "Avant", category: "stables", network: "arbitrum", iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", maxFixedApy: 10.66, ibt: "avUSDx", ibtIconColor: "#ef4444", ibtIconChar: "A", liquidity: 3180186, maturity: "May 15 2026", maturityTs: 1747267200 },
  { id: "2", pool: "stXRP", protocol: "Firelight", category: "other", network: "sonic", iconColor: "#f97316", iconChar: "✦", chainIconColor: "#22c55e", chainIconChar: "◆", maxFixedApy: 4.83, ibt: "stXRP", ibtIconColor: "#f97316", ibtIconChar: "✦", liquidity: 1344880, maturity: "Jun 04 2026", maturityTs: 1748995200 },
  { id: "3", pool: "WFLR", protocol: "Sceptre", category: "other", network: "flare", iconColor: "#dc2626", iconChar: "◆", chainIconColor: "#dc2626", chainIconChar: "◆", maxFixedApy: 18.58, ibt: "sFLR", ibtIconColor: "#f97316", ibtIconChar: "●", liquidity: 1195616, maturity: "May 17 2026", maturityTs: 1747440000 },
  { id: "4", pool: "vbUSDC", protocol: "Yearn", category: "stables", network: "arbitrum", iconColor: "#3b82f6", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", maxFixedApy: 6.57, ibt: "yvvbUSDC", ibtIconColor: "#3b82f6", ibtIconChar: "Y", liquidity: 884384, maturity: "Aug 02 2026", maturityTs: 1754092800 },
  { id: "5", pool: "avUSD", protocol: "Avant", category: "stables", network: "arbitrum", iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", maxFixedApy: 10.99, ibt: "avUSD", ibtIconColor: "#8b5cf6", ibtIconChar: "◎", liquidity: 464304, maturity: "May 15 2026", maturityTs: 1747267200 },
  { id: "6", pool: "jEURx", protocol: "Jarvis Network", category: "stables", network: "base", iconColor: "#06b6d4", iconChar: "J", chainIconColor: "#a855f7", chainIconChar: "◆", maxFixedApy: 4.44, ibt: "sjEUR", ibtIconColor: "#06b6d4", ibtIconChar: "●", liquidity: 427362, maturity: "Jul 16 2026", maturityTs: 1752624000 },
  { id: "7", pool: "USDN", protocol: "SMARDEX", category: "stables", network: "ethereum", iconColor: "#6366f1", iconChar: "N", chainIconColor: "#627EEA", chainIconChar: "Ξ", maxFixedApy: 8.90, ibt: "WUSDN", ibtIconColor: "#f97316", ibtIconChar: "●", liquidity: 338820, maturity: "Jan 12 2027", maturityTs: 1768176000 },
  { id: "8", pool: "avUSD", protocol: "Avant", category: "stables", network: "arbitrum", iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", maxFixedApy: 9.19, ibt: "savUSD", ibtIconColor: "#22c55e", ibtIconChar: "◎", liquidity: 308989, maturity: "May 15 2026", maturityTs: 1747267200 },
  { id: "9", pool: "yn-RWA/USD", protocol: "YieldNest", category: "stables", network: "arbitrum", iconColor: "#10b981", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", maxFixedApy: 14.95, ibt: "STAK", ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 247570, maturity: "Oct 15 2026", maturityTs: 1760457600 },
  { id: "10", pool: "BOLD", protocol: "Liquity V7 (by K3)", category: "stables", network: "sonic", iconColor: "#3b82f6", iconChar: "B", chainIconColor: "#22c55e", chainIconChar: "◆", maxFixedApy: 5.05, ibt: "sBOLD", ibtIconColor: "#ef4444", ibtIconChar: "●", liquidity: 185350, maturity: "Jun 05 2026", maturityTs: 1749081600 },
  { id: "11", pool: "vbUSDT", protocol: "Yearn", category: "stables", network: "sonic", iconColor: "#3b82f6", iconChar: "Y", chainIconColor: "#22c55e", chainIconChar: "◆", maxFixedApy: 6.72, ibt: "yvvbUSDT", ibtIconColor: "#3b82f6", ibtIconChar: "Y", liquidity: 177520, maturity: "Aug 02 2026", maturityTs: 1754092800 },
  { id: "12", pool: "vbUSDC", protocol: "Lucidly", category: "stables", network: "base", iconColor: "#6366f1", iconChar: "L", chainIconColor: "#a855f7", chainIconChar: "◆", maxFixedApy: 9.99, ibt: "syUSD", ibtIconColor: "#22c55e", ibtIconChar: "◎", liquidity: 160079, maturity: "May 10 2026", maturityTs: 1746835200 },
  { id: "13", pool: "USDp", protocol: "Parallel Protocol", category: "stables", network: "ethereum", iconColor: "#dc2626", iconChar: "P", chainIconColor: "#627EEA", chainIconChar: "Ξ", maxFixedApy: 8.77, ibt: "sUSDp", ibtIconColor: "#a855f7", ibtIconChar: "●", liquidity: 151627, maturity: "Apr 20 2026", maturityTs: 1745107200 },
  { id: "14", pool: "stXRP", protocol: "Firelight", category: "other", network: "sonic", iconColor: "#f97316", iconChar: "✦", chainIconColor: "#22c55e", chainIconChar: "◆", maxFixedApy: 1.98, ibt: "stXRP", ibtIconColor: "#f97316", ibtIconChar: "✦", liquidity: 149384, maturity: "Mar 31 2027", maturityTs: 1774915200 },
  { id: "15", pool: "ETH", protocol: "Ether.fi", category: "eth", network: "ethereum", iconColor: "#6366f1", iconChar: "Ξ", chainIconColor: "#3b82f6", chainIconChar: "◆", maxFixedApy: 2.67, ibt: "weETH", ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 114401, maturity: "Jul 15 2026", maturityTs: 1752537600 },
  { id: "16", pool: "USDC", protocol: "YieldNest", category: "stables", network: "arbitrum", iconColor: "#10b981", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", maxFixedApy: 10.35, ibt: "ynRWAx", ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 101325, maturity: "Oct 15 2026", maturityTs: 1760457600 },
  { id: "17", pool: "sdCRV", protocol: "Aladdin", category: "other", network: "avalanche", iconColor: "#22c55e", iconChar: "C", chainIconColor: "#ef4444", chainIconChar: "◆", maxFixedApy: 22.79, ibt: "asdCRV", ibtIconColor: "#22c55e", ibtIconChar: "C", liquidity: 51842, maturity: "Jun 25 2026", maturityTs: 1750809600 },
  { id: "18", pool: "AVAX", protocol: "Treehouse", category: "other", network: "avalanche", iconColor: "#ef4444", iconChar: "▲", chainIconColor: "#ef4444", chainIconChar: "▲", maxFixedApy: 5.38, ibt: "tAVAX", ibtIconColor: "#ef4444", ibtIconChar: "▲", liquidity: 37779, maturity: "Apr 30 2026", maturityTs: 1745971200 },
];

const PAGE_SIZE = 18;

// ─── Helpers ───
function formatLiquidity(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
  return `$${val.toLocaleString("en-US")}`;
}

// ─── Tiny colored circle icon (generic token placeholder) ───
function TokenCircle({ color, char, size = 28 }: { color: string; char: string; size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span className="font-['Inter'] text-white" style={{ fontSize: size * 0.38, fontWeight: 700, lineHeight: 1 }}>
        {char}
      </span>
    </div>
  );
}

function SmallTokenCircle({ color, char, size = 18 }: { color: string; char: string; size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span className="font-['Inter'] text-white" style={{ fontSize: size * 0.38, fontWeight: 600, lineHeight: 1 }}>
        {char}
      </span>
    </div>
  );
}

// ─── Sort icon ───
function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block ml-1">
      <path d="M4 4.5L6 2.5L8 4.5" stroke={active && dir === "asc" ? "white" : "rgba(255,255,255,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7.5L6 9.5L8 7.5" stroke={active && dir === "desc" ? "white" : "rgba(255,255,255,0.2)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Search icon ───
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      <path d="M9.5 9.5L12.5 12.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Help icon ───
function HelpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
      <path d="M6.5 6.2c0-1 .8-1.7 1.5-1.7s1.5.5 1.5 1.3c0 .9-.8 1.1-1.5 1.7V8.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="8" cy="10.5" r="0.6" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

// 30 days from "today" (Mar 13 2026)
const NOW_TS = 1773532800;
const THIRTY_DAYS = 30 * 86400;

// ─── Main export ───
export function FixedRates() {
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

    // Quick filter
    if (quickFilter !== "all") {
      list = list.filter((p) => p.category === quickFilter);
    }

    // Search
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
      list = list.filter((p) => p.maturityTs - NOW_TS > THIRTY_DAYS);
    }
    if (filterFlags.hideNegativeApy) {
      list = list.filter((p) => p.maxFixedApy >= 0);
    }
    if (filterFlags.hideLowTvl) {
      list = list.filter((p) => p.liquidity >= 1000);
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "pool": cmp = a.pool.localeCompare(b.pool); break;
        case "apy": cmp = a.maxFixedApy - b.maxFixedApy; break;
        case "ibt": cmp = a.ibt.localeCompare(b.ibt); break;
        case "liquidity": cmp = a.liquidity - b.liquidity; break;
        case "maturity": cmp = a.maturityTs - b.maturityTs; break;
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

  const H = "text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider cursor-pointer select-none whitespace-nowrap";

  return (
    <div className="flex-1 min-w-0 overflow-auto scrollbar-hide font-['Inter']">
      <div className="flex flex-col h-full min-h-screen xl:h-screen">

        {/* ── HERO HEADER ── */}
        <div className="shrink-0">
          <div className="flex items-start justify-between px-3 sm:px-5 pt-4 pb-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-white" style={{ fontWeight: 600 }}>
                Fixed Rate
              </span>
              <span className="text-[13px] text-white/40" style={{ fontWeight: 400 }}>
                Secure your future yield at a fixed rate.
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
                        : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
                    } ${i > 0 ? "border-l border-white/[0.08]" : ""}`}
                    style={{ fontWeight: active ? 500 : 400 }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Clear All — only visible when filters are active */}
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
            <div className="w-[28%] min-w-[180px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("pool")}>
                Pool
                <SortIcon active={sortKey === "pool"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[16%] min-w-[110px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("apy")}>
                Max Fixed APY
                <SortIcon active={sortKey === "apy"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[18%] min-w-[110px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("ibt")}>
                Default Token
                <SortIcon active={sortKey === "ibt"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[18%] min-w-[100px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("liquidity")}>
                Liquidity
                <SortIcon active={sortKey === "liquidity"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[20%] min-w-[110px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("maturity")}>
                Maturity
                <SortIcon active={sortKey === "maturity"} dir={sortDir} />
              </span>
            </div>
          </div>

          {/* Table rows */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {displayed.map((pool) => (
              <div
                key={pool.id}
                className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer group min-w-[620px]"
              >
                {/* Pool */}
                <div className="w-[28%] min-w-[180px]">
                  <div className="flex items-center gap-2.5">
                    {/* Network icon — separate, to the left */}
                    <div className="w-[16px] flex items-center justify-center shrink-0">
                      {pool.chainIconColor ? (
                        <div
                          className="rounded-full flex items-center justify-center"
                          style={{ width: 16, height: 16, backgroundColor: pool.chainIconColor }}
                        >
                          <span className="text-white text-[7px]" style={{ fontWeight: 700 }}>{pool.chainIconChar}</span>
                        </div>
                      ) : (
                        <div className="w-[16px]" />
                      )}
                    </div>
                    {/* Token icon */}
                    <TokenCircle color={pool.iconColor} char={pool.iconChar} size={32} />
                    <div className="flex flex-col gap-[1px]">
                      <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{pool.pool}</span>
                      <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{pool.protocol}</span>
                    </div>
                  </div>
                </div>

                {/* Max Fixed APY */}
                <div className="w-[16%] min-w-[110px]">
                  <span className="text-[13px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                    {pool.maxFixedApy.toFixed(2)}%
                  </span>
                </div>

                {/* IBT */}
                <div className="w-[18%] min-w-[110px]">
                  <div className="flex items-center gap-2">
                    <SmallTokenCircle color={pool.ibtIconColor} char={pool.ibtIconChar} size={20} />
                    <span className="text-[13px] text-white/70" style={{ fontWeight: 400 }}>{pool.ibt}</span>
                  </div>
                </div>

                {/* Liquidity */}
                <div className="w-[18%] min-w-[100px]">
                  <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>
                    {formatLiquidity(pool.liquidity)}
                  </span>
                </div>

                {/* Maturity */}
                <div className="w-[20%] min-w-[110px]">
                  <span className="text-[13px] text-white/50" style={{ fontWeight: 400 }}>{pool.maturity}</span>
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