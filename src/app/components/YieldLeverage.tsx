import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { NetworkDropdown, FiltersDropdown, ALL_NETWORKS, DEFAULT_FILTERS } from "./FilterDropdowns";
import type { FilterFlags } from "./FilterDropdowns";
import { TokenCircle, SmallTokenCircle, SortIcon, SearchIcon, HelpIcon } from "./shared/TableIcons";
import type { SortDir } from "./shared/TableIcons";
import { formatLiquidity } from "./shared/formatters";

// ─── Types ───
type SortKey = "pool" | "leverage" | "ibt" | "liquidity" | "baseApy" | "impliedApy" | "expiry";
type QuickFilter = "all" | "eth" | "btc" | "stables";

interface YieldPool {
  id: string;
  pool: string;
  protocol: string;
  category: "eth" | "btc" | "stables" | "other";
  network: string;
  iconColor: string;
  iconChar: string;
  chainIconColor: string;
  chainIconChar: string;
  leverage: number;
  ibt: string;
  ibtIconColor: string;
  ibtIconChar: string;
  liquidity: number;
  baseApy: number | null;
  baseApyHot: boolean;
  impliedApy: number;
  impliedApyHigh: boolean;
  expiry: string;
  expiryTs: number;
}

// ─── Mock data matching screenshot ───
const POOLS: YieldPool[] = [
  { id: "1",  pool: "avUSD",      protocol: "Avant",              category: "stables", network: "arbitrum",  iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", leverage: 53.67,  ibt: "avUSDx",   ibtIconColor: "#ef4444", ibtIconChar: "A", liquidity: 3180186, baseApy: 10.27, baseApyHot: true,  impliedApy: 11.13, impliedApyHigh: false, expiry: "May 15 2026", expiryTs: 1747267200 },
  { id: "2",  pool: "stXRP",      protocol: "Firelight",          category: "other",   network: "sonic",     iconColor: "#f97316", iconChar: "✦", chainIconColor: "#22c55e", chainIconChar: "◆", leverage: 84.56,  ibt: "stXRP",    ibtIconColor: "#f97316", ibtIconChar: "✦", liquidity: 1344880, baseApy: null,  baseApyHot: true,  impliedApy: 5.11,  impliedApyHigh: false, expiry: "Jun 04 2026", expiryTs: 1748995200 },
  { id: "3",  pool: "WFLR",       protocol: "Sceptre",            category: "other",   network: "flare",     iconColor: "#dc2626", iconChar: "◆", chainIconColor: "#dc2626", chainIconChar: "◆", leverage: 31.56,  ibt: "sFLR",     ibtIconColor: "#f97316", ibtIconChar: "●", liquidity: 1195616, baseApy: 15.58, baseApyHot: false, impliedApy: 19.27, impliedApyHigh: false, expiry: "May 17 2026", expiryTs: 1747440000 },
  { id: "4",  pool: "vbUSDC",     protocol: "Yearn",              category: "stables", network: "arbitrum",  iconColor: "#3b82f6", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", leverage: 37.92,  ibt: "yvvbUSDC", ibtIconColor: "#3b82f6", ibtIconChar: "Y", liquidity: 884384,  baseApy: 41.66, baseApyHot: true,  impliedApy: 6.85,  impliedApyHigh: false, expiry: "Aug 02 2026", expiryTs: 1754092800 },
  { id: "5",  pool: "avUSD",      protocol: "Avant",              category: "stables", network: "arbitrum",  iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", leverage: 52.32,  ibt: "avUSD",    ibtIconColor: "#8b5cf6", ibtIconChar: "◎", liquidity: 464304,  baseApy: null,  baseApyHot: true,  impliedApy: 11.45, impliedApyHigh: false, expiry: "May 15 2026", expiryTs: 1747267200 },
  { id: "6",  pool: "jEURx",      protocol: "Jarvis Network",     category: "stables", network: "base",      iconColor: "#06b6d4", iconChar: "J", chainIconColor: "#a855f7", chainIconChar: "◆", leverage: 63.96,  ibt: "sjEUR",    ibtIconColor: "#06b6d4", ibtIconChar: "●", liquidity: 427362,  baseApy: 2.73,  baseApyHot: false, impliedApy: 4.58,  impliedApyHigh: false, expiry: "Jul 16 2026", expiryTs: 1752624000 },
  { id: "7",  pool: "USDN",       protocol: "SMARDEX",            category: "stables", network: "ethereum",  iconColor: "#6366f1", iconChar: "N", chainIconColor: "#627EEA", chainIconChar: "Ξ", leverage: 13.52,  ibt: "WUSDN",    ibtIconColor: "#f97316", ibtIconChar: "●", liquidity: 338820,  baseApy: 14.29, baseApyHot: false, impliedApy: 9.27,  impliedApyHigh: false, expiry: "Jan 12 2027", expiryTs: 1768176000 },
  { id: "8",  pool: "avUSD",      protocol: "Avant",              category: "stables", network: "arbitrum",  iconColor: "#ef4444", iconChar: "A", chainIconColor: "#8b5cf6", chainIconChar: "◆", leverage: 61.94,  ibt: "savUSD",   ibtIconColor: "#22c55e", ibtIconChar: "◎", liquidity: 308989,  baseApy: 7.29,  baseApyHot: true,  impliedApy: 9.57,  impliedApyHigh: false, expiry: "May 15 2026", expiryTs: 1747267200 },
  { id: "9",  pool: "yn-RWA/USD", protocol: "YieldNest",          category: "stables", network: "arbitrum",  iconColor: "#10b981", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", leverage: 11.66,  ibt: "STAK",     ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 247570,  baseApy: 25.72, baseApyHot: false, impliedApy: 15.66, impliedApyHigh: false, expiry: "Oct 15 2026", expiryTs: 1760457600 },
  { id: "10", pool: "BOLD",       protocol: "Liquity V2 (by K3)", category: "stables", network: "sonic",     iconColor: "#3b82f6", iconChar: "B", chainIconColor: "#22c55e", chainIconChar: "◆", leverage: 79.28,  ibt: "sBOLD",    ibtIconColor: "#ef4444", ibtIconChar: "●", liquidity: 185350,  baseApy: 3.53,  baseApyHot: false, impliedApy: 5.38,  impliedApyHigh: false, expiry: "Jun 05 2026", expiryTs: 1749081600 },
  { id: "11", pool: "vbUSDT",     protocol: "Yearn",              category: "stables", network: "sonic",     iconColor: "#3b82f6", iconChar: "Y", chainIconColor: "#22c55e", chainIconChar: "◆", leverage: 36.87,  ibt: "yvvbUSDT", ibtIconColor: "#3b82f6", ibtIconChar: "Y", liquidity: 177520,  baseApy: 40.10, baseApyHot: true,  impliedApy: 7.03,  impliedApyHigh: false, expiry: "Aug 02 2026", expiryTs: 1754092800 },
  { id: "12", pool: "vbUSDC",     protocol: "Lucidly",            category: "stables", network: "base",      iconColor: "#6366f1", iconChar: "L", chainIconColor: "#a855f7", chainIconChar: "◆", leverage: 62.56,  ibt: "syUSD",    ibtIconColor: "#22c55e", ibtIconChar: "◎", liquidity: 160079,  baseApy: 11.27, baseApyHot: true,  impliedApy: 10.38, impliedApyHigh: false, expiry: "May 10 2026", expiryTs: 1746835200 },
  { id: "13", pool: "USDp",       protocol: "Parallel Protocol",  category: "stables", network: "ethereum",  iconColor: "#dc2626", iconChar: "P", chainIconColor: "#627EEA", chainIconChar: "Ξ", leverage: 108.04, ibt: "sUSDp",    ibtIconColor: "#a855f7", ibtIconChar: "●", liquidity: 151627,  baseApy: 7.24,  baseApyHot: false, impliedApy: 9.11,  impliedApyHigh: false, expiry: "Apr 20 2026", expiryTs: 1745107200 },
  { id: "14", pool: "stXRP",      protocol: "Firelight",          category: "other",   network: "sonic",     iconColor: "#f97316", iconChar: "✦", chainIconColor: "#22c55e", chainIconChar: "◆", leverage: 38.50,  ibt: "stXRP",    ibtIconColor: "#f97316", ibtIconChar: "✦", liquidity: 149384,  baseApy: null,  baseApyHot: false, impliedApy: 2.26,  impliedApyHigh: false, expiry: "Mar 31 2027", expiryTs: 1774915200 },
  { id: "15", pool: "ETH",        protocol: "Ether.fi",           category: "eth",     network: "ethereum",  iconColor: "#6366f1", iconChar: "Ξ", chainIconColor: "#3b82f6", chainIconChar: "◆", leverage: 105.17, ibt: "weETH",    ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 114401,  baseApy: 2.24,  baseApyHot: false, impliedApy: 2.76,  impliedApyHigh: false, expiry: "Jul 15 2026", expiryTs: 1752537600 },
  { id: "16", pool: "USDC",       protocol: "YieldNest",          category: "stables", network: "arbitrum",  iconColor: "#10b981", iconChar: "Y", chainIconColor: "#6366f1", chainIconChar: "◆", leverage: 16.66,  ibt: "ynRWAx",   ibtIconColor: "#10b981", ibtIconChar: "◎", liquidity: 101325,  baseApy: 11.14, baseApyHot: false, impliedApy: 10.70, impliedApyHigh: false, expiry: "Oct 15 2026", expiryTs: 1760457600 },
  { id: "17", pool: "sdCRV",      protocol: "Aladdin",            category: "other",   network: "avalanche", iconColor: "#22c55e", iconChar: "C", chainIconColor: "#ef4444", chainIconChar: "◆", leverage: 16.48,  ibt: "asdCRV",   ibtIconColor: "#22c55e", ibtIconChar: "C", liquidity: 51842,   baseApy: 28.26, baseApyHot: false, impliedApy: 23.73, impliedApyHigh: false, expiry: "Jun 25 2026", expiryTs: 1750809600 },
  { id: "18", pool: "AVAX",       protocol: "Treehouse",          category: "other",   network: "avalanche", iconColor: "#ef4444", iconChar: "▲", chainIconColor: "#ef4444", chainIconChar: "▲", leverage: 137.02, ibt: "tAVAX",    ibtIconColor: "#ef4444", ibtIconChar: "▲", liquidity: 37779,   baseApy: 2.61,  baseApyHot: true,  impliedApy: 5.58,  impliedApyHigh: false, expiry: "Apr 30 2026", expiryTs: 1745971200 },
];

const PAGE_SIZE = 18;

// 30 days from "today" (Mar 13 2026)
const NOW_TS = 1773532800;
const THIRTY_DAYS = 30 * 86400;

// ─── Main export ───
export function YieldLeverage() {
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
      list = list.filter((p) => p.impliedApy >= 0);
    }
    if (filterFlags.hideLowTvl) {
      list = list.filter((p) => p.liquidity >= 1000);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "pool": cmp = a.pool.localeCompare(b.pool); break;
        case "leverage": cmp = a.leverage - b.leverage; break;
        case "ibt": cmp = a.ibt.localeCompare(b.ibt); break;
        case "liquidity": cmp = a.liquidity - b.liquidity; break;
        case "baseApy": cmp = (a.baseApy ?? 0) - (b.baseApy ?? 0); break;
        case "impliedApy": cmp = a.impliedApy - b.impliedApy; break;
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
                Yield Leverage
              </span>
              <span className="text-[13px] text-white/40" style={{ fontWeight: 400 }}>
                Amplify yield exposure with Yield Tokens.
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
                className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 rounded-[8px] px-3 py-[7px] transition-all"
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
          <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[760px]">
            <div className="w-[22%] min-w-[160px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("pool")}>
                Pool
                <SortIcon active={sortKey === "pool"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[13%] min-w-[100px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("leverage")}>
                Yield Leverage
                <SortIcon active={sortKey === "leverage"} dir={sortDir} />
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
            <div className="w-[12%] min-w-[90px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("baseApy")}>
                Base APY
                <SortIcon active={sortKey === "baseApy"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[12%] min-w-[90px]">
              <span className={H} style={{ fontWeight: 500 }} onClick={() => toggleSort("impliedApy")}>
                Implied APY
                <SortIcon active={sortKey === "impliedApy"} dir={sortDir} />
              </span>
            </div>
            <div className="w-[12%] min-w-[100px]">
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
                onClick={() => navigate(`/?asset=YT&pool=${pool.id}`)}
                className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors cursor-pointer group min-w-[760px]"
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

                {/* Yield Leverage — YT accent color */}
                <div className="w-[13%] min-w-[100px]">
                  <span className="text-[13px] text-[#f4c071]" style={{ fontWeight: 500 }}>
                    {pool.leverage.toFixed(2)}x
                  </span>
                </div>

                {/* IBT */}
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

                {/* Base APY */}
                <div className="w-[12%] min-w-[90px]">
                  <div className="flex items-center">
                    <span className="text-[13px] text-white/70" style={{ fontWeight: 400 }}>
                      {pool.baseApy !== null ? `${pool.baseApy.toFixed(2)}%` : "-"}
                    </span>
                  </div>
                </div>

                {/* Implied APY */}
                <div className="w-[12%] min-w-[90px]">
                  <span
                    className="text-[13px] text-white/70"
                    style={{ fontWeight: 400 }}
                  >
                    {pool.impliedApy.toFixed(2)}%
                  </span>
                </div>

                {/* Expiry */}
                <div className="w-[12%] min-w-[100px]">
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
                    className="bg-[#f4c071]/15 hover:bg-[#f4c071]/25 border border-[#f4c071]/30 text-[#f4c071] text-[12px] px-4 py-[6px] rounded-[6px] transition-all"
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