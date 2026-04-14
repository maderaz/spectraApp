import { useState } from "react";
import { useNavigate } from "react-router";
import { NetworkDropdown, ALL_NETWORKS } from "./FilterDropdowns";

// ─── Types ───
type FilterKey = "all" | "swaps" | "liquidity" | "metavaults" | "rewards";

type ActivityType = "Swap" | "Add" | "Remove" | "Deposit Req." | "Claim Dep." | "Cancel Dep." | "Withdrawal Req." | "Claim Withd." | "Cancel Withd.";

interface Activity {
  id: string;
  type: ActivityType;
  product: string;
  productType: "pool" | "metavault";
  maturity?: string;
  fullName?: string;
  network: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  value: string;
  time: string;
  txHash: string;
}

interface RewardClaim {
  id: string;
  product: string;
  productType: "pool" | "metavault";
  network: string;
  token: string;
  amount: string;
  value: string;
  time: string;
  txHash: string;
}

// ─── Type colors ───
const TYPE_COLORS: Record<string, string> = {
  "Swap": "#00f99b",
  "Add": "#d65ce9",
  "Remove": "#f4c071",
  "Deposit Req.": "#ff9900",
  "Claim Dep.": "#ff9900",
  "Cancel Dep.": "#ef4444",
  "Withdrawal Req.": "#6988ff",
  "Claim Withd.": "#6988ff",
  "Cancel Withd.": "#ef4444",
};

// ─── Filter config ───
const POOL_FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "swaps", label: "Swaps" },
  { key: "liquidity", label: "Liquidity" },
];

const FILTER_TYPES: Record<FilterKey, ActivityType[] | null> = {
  all: ["Swap", "Add", "Remove"],
  swaps: ["Swap"],
  liquidity: ["Add", "Remove"],
  metavaults: ["Deposit Req.", "Claim Dep.", "Cancel Dep.", "Withdrawal Req.", "Claim Withd.", "Cancel Withd."],
  rewards: null,
};

// ─── Network icon helper ───
function NetworkIcon({ networkId, size = 16 }: { networkId: string; size?: number }) {
  const net = ALL_NETWORKS.find((n) => n.id === networkId);
  if (!net) return null;
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: net.iconColor }}
    >
      <span className="text-white" style={{ fontSize: size * 0.38, fontWeight: 700, lineHeight: 1 }}>
        {net.iconChar.length > 1 ? net.iconChar.slice(0, 1) : net.iconChar}
      </span>
    </div>
  );
}

// ─── Mock data: main activities ───
const ACTIVITIES: Activity[] = [
  { id: "1",  type: "Swap",             product: "sGHO",          productType: "pool", maturity: "31/01/26", fullName: "PT-sGHO-31/01/26",      network: "ethereum",  tokenIn: "USDC",       tokenOut: "PT-sGHO",    amountIn: "5,200",    amountOut: "5,312.40",  value: "$5,200",  time: "2m ago",  txHash: "0x3a8f...c4e1" },
  { id: "2",  type: "Swap",             product: "sGHO",          productType: "pool", maturity: "31/01/26", fullName: "PT-sGHO-31/01/26",      network: "ethereum",  tokenIn: "PT-sGHO",    tokenOut: "USDC",       amountIn: "1,800",    amountOut: "1,764.20",  value: "$1,764",  time: "14m ago", txHash: "0x7b2d...91f3" },
  { id: "3",  type: "Add",              product: "avUSD",         productType: "pool", maturity: "15/05/26", fullName: "LP-avUSD-15/05/26",     network: "arbitrum",  tokenIn: "avUSDx",     tokenOut: "LP-avUSD",   amountIn: "10,000",   amountOut: "9,842.11",  value: "$10,000", time: "1h ago",  txHash: "0x1e5c...a8b2" },
  { id: "4",  type: "Deposit Req.",     product: "Gami Spectra USDC", productType: "metavault",                                                 network: "base",      tokenIn: "USDC",       tokenOut: "—",          amountIn: "5,000",    amountOut: "—",         value: "$5,000",  time: "2h ago",  txHash: "0x9d4a...37e6" },
  { id: "5",  type: "Swap",             product: "vbUSDC",        productType: "pool", maturity: "02/08/26", fullName: "YT-vbUSDC-02/08/26",   network: "arbitrum",  tokenIn: "USDC",       tokenOut: "YT-vbUSDC",  amountIn: "2,340",    amountOut: "88,764.20", value: "$2,340",  time: "3h ago",  txHash: "0x5f81...d2c9" },
  { id: "6",  type: "Remove",           product: "stXRP",         productType: "pool", maturity: "04/06/26", fullName: "LP-stXRP-04/06/26",    network: "sonic",     tokenIn: "LP-stXRP",   tokenOut: "stXRP",      amountIn: "4,200.00", amountOut: "4,158.30",  value: "$4,158",  time: "5h ago",  txHash: "0xc3e7...6a14" },
  { id: "7",  type: "Claim Dep.",       product: "Gami Spectra USDC", productType: "metavault",                                                 network: "base",      tokenIn: "USDC",       tokenOut: "gamisUSDC",  amountIn: "5,000",    amountOut: "5,000",     value: "$5,000",  time: "6h ago",  txHash: "0x2f9b...e5d8" },
  { id: "8",  type: "Swap",             product: "USDN",          productType: "pool", maturity: "12/01/27", fullName: "PT-USDN-12/01/27",     network: "ethereum",  tokenIn: "USDC",       tokenOut: "PT-USDN",    amountIn: "8,500",    amountOut: "8,756.40",  value: "$8,500",  time: "8h ago",  txHash: "0x8a6d...1bf4" },
  { id: "9",  type: "Add",              product: "sGHO",          productType: "pool", maturity: "31/01/26", fullName: "LP-sGHO-31/01/26",     network: "ethereum",  tokenIn: "sGHO",       tokenOut: "LP-sGHO",    amountIn: "15,000",   amountOut: "14,820.55", value: "$15,000", time: "1d ago",  txHash: "0xd147...83a0" },
  { id: "10", type: "Deposit Req.",     product: "vbUSDC Katana",  productType: "metavault",                                                    network: "katana",    tokenIn: "USDC",       tokenOut: "—",          amountIn: "5,000",    amountOut: "—",         value: "$5,000",  time: "1d ago",  txHash: "0x6e3c...f792" },
  { id: "11", type: "Swap",             product: "ETH",           productType: "pool", maturity: "15/07/26", fullName: "PT-weETH-15/07/26",    network: "ethereum",  tokenIn: "weETH",      tokenOut: "PT-weETH",   amountIn: "2.50",     amountOut: "2.54",      value: "$6,425",  time: "2d ago",  txHash: "0xb52a...04d7" },
  { id: "12", type: "Remove",           product: "BOLD",          productType: "pool", maturity: "05/06/26", fullName: "LP-BOLD-05/06/26",     network: "sonic",     tokenIn: "LP-BOLD",    tokenOut: "BOLD",       amountIn: "3,100.00", amountOut: "3,068.20",  value: "$3,068",  time: "3d ago",  txHash: "0x41f8...bc63" },
  { id: "13", type: "Claim Dep.",       product: "vbUSDC Katana",  productType: "metavault",                                                    network: "katana",    tokenIn: "USDC",       tokenOut: "vbUSDC",     amountIn: "5,000",    amountOut: "5,000",     value: "$5,000",  time: "3d ago",  txHash: "0xe29d...5a18" },
  { id: "14", type: "Swap",             product: "avUSD",         productType: "pool", maturity: "15/05/26", fullName: "YT-avUSD-15/05/26",    network: "arbitrum",  tokenIn: "avUSDx",     tokenOut: "YT-avUSD",   amountIn: "3,500",    amountOut: "183,210.5", value: "$3,500",  time: "4d ago",  txHash: "0x73b6...d941" },
  { id: "15", type: "Add",              product: "USDN",          productType: "pool", maturity: "12/01/27", fullName: "LP-USDN-12/01/27",     network: "ethereum",  tokenIn: "WUSDN",      tokenOut: "LP-USDN",    amountIn: "22,000",   amountOut: "21,648.30", value: "$22,000", time: "5d ago",  txHash: "0xf184...2e57" },
  { id: "16", type: "Withdrawal Req.",  product: "Flare XRP Yield Prime", productType: "metavault",                                               network: "flare",     tokenIn: "flrXRP",     tokenOut: "—",          amountIn: "8,420",    amountOut: "—",         value: "$5,000",  time: "5d ago",  txHash: "0x0c5e...a3b9" },
  { id: "17", type: "Swap",             product: "vbUSDT",        productType: "pool", maturity: "02/08/26", fullName: "PT-vbUSDT-02/08/26",   network: "sonic",     tokenIn: "USDT",       tokenOut: "PT-vbUSDT",  amountIn: "6,800",    amountOut: "7,021.44",  value: "$6,800",  time: "5d ago",  txHash: "0x94a2...7fc6" },
  { id: "18", type: "Claim Withd.",     product: "Flare XRP Yield Prime", productType: "metavault",                                               network: "flare",     tokenIn: "flrXRP",     tokenOut: "XRP",        amountIn: "8,420",    amountOut: "8,408.20",  value: "$4,998",  time: "6d ago",  txHash: "0xd83f...1b24" },
  { id: "19", type: "Swap",             product: "WFLR",          productType: "pool", maturity: "17/05/26", fullName: "PT-sFLR-17/05/26",     network: "flare",     tokenIn: "FLR",        tokenOut: "PT-sFLR",    amountIn: "125,000",  amountOut: "128,750",   value: "$3,437",  time: "1w ago",  txHash: "0x5a71...e890" },
  { id: "20", type: "Remove",           product: "avUSD",         productType: "pool", maturity: "15/05/26", fullName: "LP-avUSD-15/05/26",    network: "arbitrum",  tokenIn: "LP-avUSD",   tokenOut: "avUSDx",     amountIn: "8,420.00", amountOut: "8,545.12",  value: "$8,545",  time: "1w ago",  txHash: "0x2db4...c753" },
  { id: "21", type: "Cancel Dep.",      product: "Gami Spectra USDC", productType: "metavault",                                                 network: "base",      tokenIn: "—",          tokenOut: "USDC",       amountIn: "—",        amountOut: "2,000",     value: "$2,000",  time: "1w ago",  txHash: "0x8f16...4da2" },
  { id: "22", type: "Add",              product: "ETH",           productType: "pool", maturity: "15/07/26", fullName: "LP-weETH-15/07/26",    network: "ethereum",  tokenIn: "weETH",      tokenOut: "LP-weETH",   amountIn: "5.00",     amountOut: "4.94",      value: "$12,850", time: "2w ago",  txHash: "0xa347...9e15" },
  { id: "23", type: "Swap",             product: "sdCRV",         productType: "pool", maturity: "25/06/26", fullName: "PT-asdCRV-25/06/26",   network: "avalanche", tokenIn: "CRV",        tokenOut: "PT-asdCRV",  amountIn: "18,500",   amountOut: "19,055.00", value: "$7,957",  time: "2w ago",  txHash: "0x1e4d...7c38" },
  { id: "24", type: "Deposit Req.",     product: "Flare XRP Yield Prime", productType: "metavault",                                               network: "flare",     tokenIn: "XRP",        tokenOut: "—",          amountIn: "21,500",   amountOut: "—",         value: "$12,400", time: "3w ago",  txHash: "0xb7a3...5d61" },
  { id: "25", type: "Swap",             product: "AVAX",          productType: "pool", maturity: "30/04/26", fullName: "YT-tAVAX-30/04/26",    network: "avalanche", tokenIn: "AVAX",       tokenOut: "YT-tAVAX",   amountIn: "450",      amountOut: "61,650.00", value: "$11,250", time: "3w ago",  txHash: "0x4f92...ae84" },
  { id: "26", type: "Add",              product: "BOLD",          productType: "pool", maturity: "05/06/26", fullName: "LP-BOLD-05/06/26",     network: "sonic",     tokenIn: "BOLD",       tokenOut: "LP-BOLD",    amountIn: "5,000",    amountOut: "4,925.50",  value: "$5,000",  time: "3w ago",  txHash: "0xc815...3f29" },
  { id: "27", type: "Claim Dep.",       product: "Flare XRP Yield Prime", productType: "metavault",                                               network: "flare",     tokenIn: "XRP",        tokenOut: "flrXRP",     amountIn: "21,500",   amountOut: "21,500",    value: "$12,400", time: "3w ago",  txHash: "0x3d17...8a42" },
];

// ─── Mock data: reward claims ───
const REWARD_CLAIMS: RewardClaim[] = [
  { id: "rc1",  product: "sGHO",          productType: "pool",      network: "ethereum",  token: "SPECTRA", amount: "142.50",   value: "$42.75",  time: "7h ago",  txHash: "0x2f9b...e5d8" },
  { id: "rc2",  product: "sGHO",          productType: "pool",      network: "ethereum",  token: "sGHO",    amount: "4.21",     value: "$4.21",   time: "1d ago",  txHash: "0x6e3c...f792" },
  { id: "rc3",  product: "wstETH",        productType: "pool",      network: "ethereum",  token: "SPECTRA", amount: "23.40",    value: "$7.02",   time: "5d ago",  txHash: "0x0c5e...a3b9" },
  { id: "rc4",  product: "WFLR",          productType: "pool",      network: "flare",     token: "rFLR",    amount: "245.80",   value: "$89.00",  time: "2h ago",  txHash: "0x9d4a...37e6" },
  { id: "rc5",  product: "sGHO",          productType: "pool",      network: "ethereum",  token: "SPECTRA", amount: "3,850.00", value: "$1,155",  time: "6d ago",  txHash: "0xd83f...1b24" },
  { id: "rc6",  product: "wstETH",        productType: "pool",      network: "ethereum",  token: "wstETH",  amount: "0.0012",   value: "$4.12",   time: "2w ago",  txHash: "0xb7a3...5d61" },
  { id: "rc7",  product: "WFLR",          productType: "pool",      network: "flare",     token: "rFLR",    amount: "1,820.00", value: "$655",    time: "2w ago",  txHash: "0x6c89...b2f7" },
  { id: "rc8",  product: "Gami Spectra USDC", productType: "metavault", network: "base",   token: "SPECTRA", amount: "84.20",    value: "$25.26",  time: "1w ago",  txHash: "0xfa21...b3c8" },
];

// ─── Header class ───
const TH = "text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider";

// ─── Product tooltip ───
function formatMaturity(d?: string): string | null {
  if (!d) return null;
  const [day, month, year] = d.split("/");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} 20${year}`;
}

function ProductCell({ activity, onClick }: { activity: Activity; onClick: () => void }) {
  const maturityLabel = formatMaturity(activity.maturity);
  return (
    <button onClick={onClick} className="text-left group">
      <span className="text-[13px] text-white group-hover:text-[#00f99b] transition-colors" style={{ fontWeight: 500 }}>{activity.product}</span>
      {maturityLabel && (
        <span className="block text-[10px] text-white/30" style={{ fontWeight: 400 }}>{maturityLabel}</span>
      )}
      {activity.productType === "metavault" && (
        <span className="block text-[10px] text-white/30" style={{ fontWeight: 400 }}>MetaVault</span>
      )}
    </button>
  );
}

// ─── Main export ───
export function ActivityHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedNetworks, setSelectedNetworks] = useState<Set<string>>(() => new Set(ALL_NETWORKS.map((n) => n.id)));

  const isRewardsView = filter === "rewards";
  const isMetaVaultsView = filter === "metavaults";

  // Filter main activities
  const filteredActivities = (() => {
    let list = [...ACTIVITIES];
    if (selectedNetworks.size !== ALL_NETWORKS.length) {
      list = list.filter((a) => selectedNetworks.has(a.network));
    }
    const types = FILTER_TYPES[filter];
    if (types) list = list.filter((a) => types.includes(a.type));
    return list;
  })();

  // Filter reward claims
  const filteredRewards = (() => {
    let list = [...REWARD_CLAIMS];
    if (selectedNetworks.size !== ALL_NETWORKS.length) {
      list = list.filter((r) => selectedNetworks.has(r.network));
    }
    return list;
  })();

  const MV_ID_MAP: Record<string, string> = {
    "Gami Spectra USDC": "gami-spectra",
    "vbUSDC Katana": "vbusdc-katana",
    "Flare XRP Yield Prime": "flare-xrp",
  };

  const handleProductClick = (a: Activity) => {
    if (a.productType === "metavault") {
      const mvId = MV_ID_MAP[a.product];
      navigate(mvId ? `/metavaults/${mvId}` : "/metavaults");
      return;
    }
    if (a.type === "Swap") { navigate(`/?asset=PT&pool=${a.product}`); return; }
    navigate("/pools");
  };

  return (
    <div className="flex-1 min-w-0 font-['Inter']">
      <div className="flex flex-col min-h-full">

        {/* ── HERO ── */}
        <div className="shrink-0">
          <div className="flex items-start justify-between px-3 sm:px-5 pt-4 pb-3">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-white" style={{ fontWeight: 600 }}>Activity History</span>
              <span className="text-[13px] text-white/40" style={{ fontWeight: 400 }}>Your complete transaction history across Spectra.</span>
            </div>
          </div>

          {/* ── FILTER BAR ── */}
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 pb-3 flex-wrap">
            {/* Group 1: pool/swap activity */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden shrink-0">
              {POOL_FILTERS.map((f, i) => {
                const active = filter === f.key;
                return (
                  <button key={f.key} onClick={() => setFilter(f.key)}
                    className={`px-2 sm:px-3 py-[7px] text-[12px] transition-all ${active ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60 hover:bg-white/[0.08]"} ${i > 0 ? "border-l border-white/[0.08]" : ""}`}
                    style={{ fontWeight: active ? 500 : 400 }}
                  >{f.label}</button>
                );
              })}
            </div>
            {/* Group 2: MetaVaults */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden shrink-0">
              <button onClick={() => setFilter("metavaults")}
                className={`px-2 sm:px-3 py-[7px] text-[12px] transition-all ${filter === "metavaults" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60 hover:bg-white/[0.08]"}`}
                style={{ fontWeight: filter === "metavaults" ? 500 : 400 }}
              >MetaVaults</button>
            </div>
            {/* Group 3: Rewards */}
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden shrink-0">
              <button onClick={() => setFilter("rewards")}
                className={`px-2 sm:px-3 py-[7px] text-[12px] transition-all ${filter === "rewards" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60 hover:bg-white/[0.08]"}`}
                style={{ fontWeight: filter === "rewards" ? 500 : 400 }}
              >Rewards</button>
            </div>
            <NetworkDropdown selected={selectedNetworks} onChange={setSelectedNetworks} />
            <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>
              {isRewardsView ? filteredRewards.length : filteredActivities.length} {isRewardsView ? "claim" : isMetaVaultsView ? "action" : "transaction"}{(isRewardsView ? filteredRewards.length : filteredActivities.length) !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="border-b border-white/[0.06]" />
        </div>

        {/* ── TABLE ── */}
        <div className="flex-1 min-h-0 flex flex-col overflow-x-auto">
          {isRewardsView ? (
            /* ═══ REWARDS CLAIMS VIEW ═══ */
            <>
              <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[400px]">
                <div className="w-[20%] min-w-[80px]"><span className={TH} style={{ fontWeight: 500 }}>Time</span></div>
                <div className="w-[15%] min-w-[60px]"><span className={TH} style={{ fontWeight: 500 }}>Type</span></div>
                <div className="w-[20%] min-w-[80px]"><span className={TH} style={{ fontWeight: 500 }}>Token</span></div>
                <div className="w-[20%] min-w-[80px]"><span className={TH} style={{ fontWeight: 500 }}>Amount</span></div>
                <div className="flex-1 min-w-[70px]"><span className={TH} style={{ fontWeight: 500 }}>Value</span></div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {filteredRewards.map((r) => (
                  <div key={r.id} className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors min-w-[400px]">
                    <div className="w-[20%] min-w-[80px]">
                      <a href={`https://etherscan.io/tx/${r.txHash}`} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] text-white/50 hover:text-white/70 transition-colors" style={{ fontWeight: 400, borderBottom: "1px dotted rgba(255,255,255,0.12)" }}>
                        {r.time}
                      </a>
                    </div>
                    <div className="w-[15%] min-w-[60px]">
                      <span className="text-[11px] px-2 py-[2px] rounded-full" style={{ fontWeight: 500, backgroundColor: "#6988ff15", color: "#6988ff" }}>Claim</span>
                    </div>
                    <div className="w-[20%] min-w-[80px]"><span className="text-[13px] text-[#b8a4ff]" style={{ fontWeight: 500 }}>{r.token}</span></div>
                    <div className="w-[20%] min-w-[80px]"><span className="text-[13px] text-white/70" style={{ fontWeight: 400 }}>{r.amount}</span></div>
                    <div className="flex-1 min-w-[70px]"><span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{r.value}</span></div>
                  </div>
                ))}
                {filteredRewards.length === 0 && (
                  <div className="flex items-center justify-center py-16 text-[13px] text-white/20" style={{ fontWeight: 400 }}>No reward claims found</div>
                )}
              </div>
            </>
          ) : isMetaVaultsView ? (
            /* ═══ METAVAULTS VIEW ═══ */
            <>
              <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[500px]">
                <div className="w-[16%] min-w-[80px]"><span className={TH} style={{ fontWeight: 500 }}>Time</span></div>
                <div className="w-[24%] min-w-[140px]"><span className={TH} style={{ fontWeight: 500 }}>Action</span></div>
                <div className="w-[5%] min-w-[24px]" />
                <div className="w-[25%] min-w-[120px]"><span className={TH} style={{ fontWeight: 500 }}>Product</span></div>
                <div className="flex-1 min-w-[80px]"><span className={TH} style={{ fontWeight: 500 }}>Value</span></div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {filteredActivities.map((a) => {
                  const fullNames: Record<string, string> = {
                    "Deposit Req.": "Deposit Request",
                    "Claim Dep.": "Claim Deposit",
                    "Cancel Dep.": "Cancel Deposit Request",
                    "Withdrawal Req.": "Withdrawal Request",
                    "Claim Withd.": "Claim Withdrawal",
                    "Cancel Withd.": "Cancel Withdrawal Request",
                  };
                  return (
                    <div key={a.id} className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors min-w-[500px]">
                      <div className="w-[16%] min-w-[80px]">
                        <a href={`https://etherscan.io/tx/${a.txHash}`} target="_blank" rel="noopener noreferrer"
                          className="text-[13px] text-white/50 hover:text-white/70 transition-colors" style={{ fontWeight: 400, borderBottom: "1px dotted rgba(255,255,255,0.12)" }}>
                          {a.time}
                        </a>
                      </div>
                      <div className="w-[24%] min-w-[140px]">
                        <span className="text-[10px] sm:text-[11px] px-2 py-[2px] rounded-full whitespace-nowrap"
                          style={{ fontWeight: 500, backgroundColor: `${TYPE_COLORS[a.type] || "#666"}15`, color: TYPE_COLORS[a.type] || "#666" }}>
                          {fullNames[a.type] || a.type}
                        </span>
                      </div>
                      <div className="w-[5%] min-w-[24px] flex justify-center">
                        <NetworkIcon networkId={a.network} size={16} />
                      </div>
                      <div className="w-[25%] min-w-[120px]">
                        <button onClick={() => handleProductClick(a)} className="text-left group">
                          <span className="text-[13px] text-white group-hover:text-[#ff9900] transition-colors" style={{ fontWeight: 500 }}>{a.product}</span>
                        </button>
                      </div>
                      <div className="flex-1 min-w-[80px]">
                        <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{a.value}</span>
                      </div>
                    </div>
                  );
                })}
                {filteredActivities.length === 0 && (
                  <div className="flex items-center justify-center py-16 text-[13px] text-white/20" style={{ fontWeight: 400 }}>No MetaVault activity found</div>
                )}
              </div>
            </>
          ) : (
            /* ═══ MAIN ACTIVITY TABLE ═══ */
            <>
              <div className="flex items-center px-4 py-[10px] border-b border-white/[0.06] shrink-0 min-w-[700px]">
                <div className="w-[12%] min-w-[80px]"><span className={TH} style={{ fontWeight: 500 }}>Time</span></div>
                <div className="w-[11%] min-w-[85px]"><span className={TH} style={{ fontWeight: 500 }}>Type</span></div>
                <div className="w-[4%] min-w-[24px]" />
                <div className="w-[17%] min-w-[110px]"><span className={TH} style={{ fontWeight: 500 }}>Product</span></div>
                <div className="w-[17%] min-w-[100px] hidden sm:block"><span className={TH} style={{ fontWeight: 500 }}>From</span></div>
                <div className="w-[17%] min-w-[100px] hidden sm:block"><span className={TH} style={{ fontWeight: 500 }}>To</span></div>
                <div className="flex-1 min-w-[70px]"><span className={TH} style={{ fontWeight: 500 }}>Value</span></div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {filteredActivities.map((a) => (
                  <div key={a.id} className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors min-w-[700px]">
                    {/* Time (clickable → tx) */}
                    <div className="w-[12%] min-w-[80px]">
                      <a href={`https://etherscan.io/tx/${a.txHash}`} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] text-white/50 hover:text-white/70 transition-colors" style={{ fontWeight: 400, borderBottom: "1px dotted rgba(255,255,255,0.12)" }}>
                        {a.time}
                      </a>
                    </div>
                    {/* Type */}
                    <div className="w-[11%] min-w-[85px]">
                      <span className="text-[10px] sm:text-[11px] px-2 py-[2px] rounded-full whitespace-nowrap"
                        style={{ fontWeight: 500, backgroundColor: `${TYPE_COLORS[a.type] || "#666"}15`, color: TYPE_COLORS[a.type] || "#666" }}>
                        {a.type}
                      </span>
                    </div>
                    {/* Network icon */}
                    <div className="w-[4%] min-w-[24px] flex justify-center">
                      <NetworkIcon networkId={a.network} size={16} />
                    </div>
                    {/* Product */}
                    <div className="w-[17%] min-w-[110px]">
                      <ProductCell activity={a} onClick={() => handleProductClick(a)} />
                    </div>
                    {/* From — hidden on mobile */}
                    <div className="w-[17%] min-w-[100px] hidden sm:block">
                      <div className="flex flex-col gap-[1px]">
                        <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>{a.amountIn}</span>
                        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{a.tokenIn}</span>
                      </div>
                    </div>
                    {/* To — hidden on mobile */}
                    <div className="w-[17%] min-w-[100px] hidden sm:block">
                      <div className="flex flex-col gap-[1px]">
                        <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>{a.amountOut}</span>
                        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{a.tokenOut}</span>
                      </div>
                    </div>
                    {/* Value */}
                    <div className="flex-1 min-w-[70px]">
                      <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>{a.value}</span>
                    </div>
                  </div>
                ))}
                {filteredActivities.length === 0 && (
                  <div className="flex items-center justify-center py-16 text-[13px] text-white/20" style={{ fontWeight: 400 }}>No activity found</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
