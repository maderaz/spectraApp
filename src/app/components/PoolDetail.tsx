import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { SpectraIcon, EthereumIcon } from "./TokenIcons";
import { ChartPanel } from "./ChartPanel";
import { ActivityTable, INITIAL_HISTORY } from "./ActivityTable";
import type { HistoryEntry } from "./ActivityTable";
import { SmallTokenCircle } from "./shared/TableIcons";

// ─── Reuse TradingUI helpers ───

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
      <path d="M5.2 4.8C5.2 4.2 5.6 3.8 6 3.8S6.8 4.1 6.8 4.5C6.8 5 6.4 5.1 6 5.5V6.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="6" cy="7.3" r="0.4" fill="currentColor" />
    </svg>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative inline-block">
      <button onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} onClick={() => setIsVisible((v) => !v)} className="inline-flex"><InfoIcon /></button>
      {isVisible && (
        <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 z-50 w-[200px] sm:w-[220px] px-3 py-2 bg-[#2a2a2e] border border-white/[0.12] rounded-lg shadow-xl">
          <div className="absolute -top-1 left-3 sm:left-1/2 sm:-translate-x-1/2 w-2 h-2 bg-[#2a2a2e] border-t border-l border-white/[0.12] rotate-45" />
          <span className="font-['Inter'] text-[11px] text-white/80 leading-relaxed" style={{ fontWeight: 400 }}>{text}</span>
        </div>
      )}
    </div>
  );
}

function ChangePill({ value, color }: { value: string; color: "green" | "neutral" }) {
  const bg = color === "green" ? "bg-[#00f99b]/10 text-[#00f99b]" : "bg-white/[0.06] text-white/40";
  return <span className={`inline-flex items-center px-[5px] py-[1px] rounded-full text-[10px] ${bg}`} style={{ fontWeight: 500 }}>{value}</span>;
}

function CopyIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.3" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="white" strokeOpacity="0.35" strokeWidth="1.3" />
    </svg>
  );
}

function BottomStatusBar() {
  const [copied, setCopied] = useState(false);
  const poolAddress = "0x8B4e...2f1A";
  const handleCopy = () => { navigator.clipboard.writeText(poolAddress).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex items-center px-3 sm:px-5 py-[5px] border-t border-white/[0.06] overflow-x-auto scrollbar-hide shrink-0 bg-white/[0.01]">
      <div className="flex items-center gap-2 pr-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pool</span>
        <button onClick={handleCopy} className="flex items-center gap-1.5 hover:bg-white/[0.08] rounded px-1 py-0.5 transition-colors group">
          <span className="text-[10px] text-white/50 font-mono group-hover:text-white/70 transition-colors" style={{ fontWeight: 500 }}>{poolAddress}</span>
          {copied ? <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : <CopyIcon />}
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Protocol</span>
        <span className="text-[10px] text-white/50" style={{ fontWeight: 500 }}>Spectra v2</span>
      </div>
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pool Fee</span>
        <span className="text-[10px] text-white/60" style={{ fontWeight: 600 }}>0.04%</span>
      </div>
      <div className="flex items-center gap-2 px-4 shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>LP Holders</span>
        <span className="text-[10px] text-[#d65ce9]/70" style={{ fontWeight: 600 }}>892</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-[5px] h-[5px] rounded-full bg-[#00f99b] animate-pulse" />
        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Block 21,847,293</span>
      </div>
    </div>
  );
}

// ─── Left Panel: Add/Remove Liquidity ───

function LiquidityForm({ poolToken, iconColor, iconChar }: { poolToken: string; iconColor: string; iconChar: string }) {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [inputAmount, setInputAmount] = useState("");

  return (
    <div className="flex flex-col gap-4">
      {/* Add / Remove toggle */}
      <div className="flex bg-white/[0.04] rounded-[10px] p-[3px] border border-white/[0.06]">
        <button onClick={() => setMode("add")}
          className={`flex-1 py-[10px] text-[13px] rounded-[8px] transition-all ${mode === "add" ? "bg-[#d65ce9] text-white" : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"}`}
          style={{ fontWeight: mode === "add" ? 600 : 400 }}>Add</button>
        <button onClick={() => setMode("remove")}
          className={`flex-1 py-[10px] text-[13px] rounded-[8px] transition-all ${mode === "remove" ? "bg-[#d65ce9] text-white" : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"}`}
          style={{ fontWeight: mode === "remove" ? 600 : 400 }}>Remove</button>
      </div>

      {mode === "add" ? (
        <>
          {/* Input */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Input</span>
            <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-[10px] px-4 py-3">
              <div className="flex-1">
                <input type="text" placeholder="0" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
                  className="bg-transparent text-[20px] text-white outline-none w-full" style={{ fontWeight: 500 }} />
                <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>≈$0</span>
              </div>
              <button className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-[8px] px-3 py-[6px] hover:bg-white/[0.08] transition-colors">
                <SmallTokenCircle color={iconColor} char={iconChar} size={20} />
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>Select</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-white/30" style={{ fontWeight: 400 }}>Balance: 0</span>
            <div className="flex items-center gap-2">
              {["25%", "50%", "Max"].map((p) => (
                <button key={p} className="text-[10px] text-white/30 hover:text-white/60 transition-colors" style={{ fontWeight: 400 }}>{p}</button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/[0.06]" />

          {/* Balanced mode toggle */}
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[16px] rounded-full bg-[#00f99b]/40 relative cursor-pointer">
              <div className="absolute right-[2px] top-[2px] w-[12px] h-[12px] rounded-full bg-[#00f99b]" />
            </div>
            <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>Balanced Mode (Recommended)</span>
            <InfoTooltip text="Balanced mode automatically splits your deposit into the optimal IBT/PT ratio for the pool." />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Output</span>
            <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <SmallTokenCircle color="#d65ce9" char="LP" size={20} />
                <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>LP-{poolToken}</span>
              </div>
              <span className="text-[12px] text-white/30">—</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <SmallTokenCircle color="#f4c071" char="YT" size={20} />
                <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>YT-{poolToken}</span>
              </div>
              <span className="text-[12px] text-white/30">—</span>
            </div>
          </div>

          {/* Info rows */}
          <div className="flex items-center justify-between"><span className="text-[11px] text-white/40">Pool Share</span><span className="text-[11px] text-white/30">—</span></div>
          <div className="flex items-center justify-between"><span className="text-[11px] text-white/40">Implied APY Change <InfoTooltip text="Change in implied APY after your deposit." /></span><span className="text-[11px] text-white/30">—</span></div>
          <div className="flex items-center justify-between"><span className="text-[11px] text-white/40">New Pool APY <InfoTooltip text="Projected pool APY after your deposit." /></span><span className="text-[11px] text-white/30">—</span></div>

          {/* Details collapsible */}
          <details className="group border-t border-white/[0.06] pt-2">
            <summary className="flex items-center justify-between cursor-pointer">
              <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Details</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform group-open:rotate-180"><path d="M1 1L5 5L9 1" stroke="white" strokeOpacity="0.3" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </summary>
            <div className="pt-2 text-[11px] text-white/25">Transaction details will appear after entering an amount.</div>
          </details>

          <button className="w-full bg-[#d65ce9] hover:bg-[#c24dd6] text-white rounded-[10px] py-[12px] text-[14px] transition-colors" style={{ fontWeight: 600 }}>
            Connect Wallet
          </button>
        </>
      ) : (
        <>
          {/* Remove: amount input */}
          <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Choose how much to withdraw</span>
          <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-[10px] px-4 py-3">
            <div className="flex-1">
              <input type="text" placeholder="0" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
                className="bg-transparent text-[20px] text-white outline-none w-full" style={{ fontWeight: 500 }} />
              <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>≈$0</span>
            </div>
            <div className="flex items-center gap-2">
              <SmallTokenCircle color="#d65ce9" char="LP" size={20} />
              <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>LP-{poolToken}</span>
            </div>
          </div>

          {/* Percent buttons */}
          <div className="flex gap-2">
            {["25%", "50%", "75%", "100%"].map((p) => (
              <button key={p} className="flex-1 border border-white/[0.08] rounded-[8px] py-[8px] text-[12px] text-white/50 hover:text-white/70 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all" style={{ fontWeight: 400 }}>{p}</button>
            ))}
          </div>

          <div className="border-t border-white/[0.06]" />

          {/* No Price Impact Mode */}
          <div className="flex items-center gap-2">
            <div className="w-[32px] h-[16px] rounded-full bg-[#00f99b]/40 relative cursor-pointer">
              <div className="absolute right-[2px] top-[2px] w-[12px] h-[12px] rounded-full bg-[#00f99b]" />
            </div>
            <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>No Price Impact Mode</span>
            <InfoTooltip text="Withdraw in the exact pool ratio to avoid any price impact." />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Output</span>
            <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <SmallTokenCircle color={iconColor} char={iconChar} size={20} />
                <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>{poolToken}</span>
              </div>
              <span className="text-[12px] text-white/30">—</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-2">
                <SmallTokenCircle color="#00f99b" char="PT" size={20} />
                <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>PT-{poolToken}</span>
              </div>
              <span className="text-[12px] text-white/30">—</span>
            </div>
          </div>

          <div className="flex items-center justify-between"><span className="text-[11px] text-white/40">Pool Share</span><span className="text-[11px] text-white/30">—</span></div>

          <button className="w-full bg-[#d65ce9] hover:bg-[#c24dd6] text-white rounded-[10px] py-[12px] text-[14px] transition-colors" style={{ fontWeight: 600 }}>
            Connect Wallet
          </button>
        </>
      )}
    </div>
  );
}

// ─── Main Page ───
export function PoolDetail() {
  const { id } = useParams();
  const [history] = useState<HistoryEntry[]>(INITIAL_HISTORY);

  // Pool-specific data (would come from API in production)
  const poolToken = id === "2" ? "stXRP" : "avUSD";
  const protocol = id === "2" ? "Firelight" : "Avant";
  const iconColor = id === "2" ? "#f97316" : "#ef4444";
  const iconChar = id === "2" ? "✦" : "A";

  const handleCancelOrder = useCallback(() => {}, []);

  return (
    <div className="flex-1 min-w-0 font-['Inter']">
      <div className="flex flex-col min-h-full">

        {/* ── TOP BAR ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 px-3 sm:px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 shrink-0">
            <EthereumIcon size={16} />
            <div className="relative flex items-center justify-center" style={{ width: 30, height: 30 }}>
              <SpectraIcon size={30} />
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[13px] text-white truncate leading-tight" style={{ fontWeight: 400 }}>{poolToken}</span>
              <span className="text-[10px] text-white/40 leading-tight" style={{ fontWeight: 400 }}>{protocol}</span>
            </div>
          </div>
          <div className="flex-1" />
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-8 w-full sm:w-auto">
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Maturity</span>
                <InfoTooltip text="The date when LP tokens can be redeemed for the underlying assets." />
              </div>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>Jun 04, 2026</span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Liquidity</span>
              </div>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>$9,399,611</span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Default Token</span>
                <InfoTooltip text="The default token used for deposits and withdrawals." />
              </div>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>{poolToken}</span>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Pool APY</span>
                <InfoTooltip text="Total APY including PT fixed rate, LP fees, and LP rewards." />
              </div>
              <span className="text-[12px] sm:text-[13px] text-[#d65ce9]" style={{ fontWeight: 600 }}>1.86%</span>
            </div>
          </div>
        </div>

        {/* ── STATS TICKER ── */}
        <div className="flex items-center px-3 sm:px-5 py-[7px] border-b border-white/[0.06] overflow-x-auto scrollbar-hide gap-0">
          <div className="flex items-center gap-2.5 pr-5 border-r border-white/[0.06] shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Liquidity</span>
            <span className="text-[12px] text-white leading-none" style={{ fontWeight: 600 }}>$9.4M</span>
            <ChangePill value="+0.12%" color="green" />
          </div>
          <div className="flex items-center gap-2.5 px-5 border-r border-white/[0.06] shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>30d Volume</span>
            <span className="text-[12px] text-white leading-none" style={{ fontWeight: 600 }}>$7M</span>
          </div>
          <div className="flex items-center gap-2.5 px-5 border-r border-white/[0.06] shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Underlying APY</span>
            <span className="text-[12px] text-[#6988ff] leading-none" style={{ fontWeight: 600 }}>2.83%</span>
          </div>
          <div className="flex items-center gap-2.5 px-5 shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Implied APY</span>
            <span className="text-[12px] text-[#00f99b] leading-none" style={{ fontWeight: 600 }}>5.61%</span>
          </div>
          <div className="flex-1 min-w-[20px]" />
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button className="bg-[#d65ce9]/15 hover:bg-[#d65ce9]/25 border border-[#d65ce9]/30 rounded-md px-2 sm:px-3 py-[5px] transition-all">
              <span className="text-[11px] sm:text-[12px] text-[#d65ce9] leading-none whitespace-nowrap" style={{ fontWeight: 500 }}>Pool</span>
            </button>
            <button className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-2 sm:px-3 py-[5px] transition-all">
              <span className="text-[11px] sm:text-[12px] text-white/70 leading-none" style={{ fontWeight: 400 }}>Tokenize</span>
            </button>
            <button className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-2 sm:px-3 py-[5px] transition-all">
              <span className="text-[11px] sm:text-[12px] text-white/70 leading-none" style={{ fontWeight: 400 }}>Details</span>
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* LEFT: Add/Remove Liquidity */}
          <div className="w-full lg:w-[420px] xl:w-[440px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-y-auto">
            <div className="p-3 sm:p-4">
              <LiquidityForm poolToken={poolToken} iconColor={iconColor} iconChar={iconChar} />
            </div>
          </div>

          {/* RIGHT: Chart + Activity */}
          <div className="flex-1 min-w-0 flex flex-col min-h-0">
            <div className="flex-1 min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex flex-col p-3 sm:p-4 border-b border-white/[0.06]">
              <ChartPanel assetType="PT" flat />
            </div>
            <div className="min-h-[280px] overflow-y-auto">
              <div className="px-2 sm:px-3 py-2">
                <ActivityTable
                  orders={[]}
                  history={history}
                  onCancelOrder={handleCancelOrder}
                  flat
                  hideOrders
                />
              </div>
            </div>
          </div>
        </div>

        <BottomStatusBar />
      </div>
    </div>
  );
}
