import { SpectraIcon, EthereumIcon } from "./TokenIcons";
import { LiquidityPanel } from "./LiquidityPanel";
import { ChartPanel } from "./ChartPanel";
import { ActivityTable, INITIAL_ORDERS, INITIAL_HISTORY } from "./ActivityTable";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import type { Order, HistoryEntry } from "./ActivityTable";
import svgPaths from "../../imports/svg-qtk3afs1b8";

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.3715 12.372" fill="none">
      <path d={svgPaths.p2fb2bd00} fill="white" />
    </svg>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible((v) => !v)}
        className="inline-flex"
      >
        <InfoIcon />
      </button>
      {isVisible && (
        <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 z-50 w-[200px] sm:w-[220px] px-3 py-2 bg-[#2a2a2e] border border-white/[0.12] rounded-lg shadow-xl">
          <div className="absolute -top-1 left-3 sm:left-1/2 sm:-translate-x-1/2 w-2 h-2 bg-[#2a2a2e] border-t border-l border-white/[0.12] rotate-45" />
          <span className="font-['Inter'] text-[11px] text-white/80 leading-relaxed" style={{ fontWeight: 400 }}>
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

type AssetType = "PT" | "YT";

function ChangePill({ value, color }: { value: string; color: "green" | "neutral" }) {
  const bg = color === "green" ? "bg-[#00f99b]/10 text-[#00f99b]" : "bg-white/[0.06] text-white/40";
  return (
    <span className={`inline-flex items-center px-[5px] py-[1px] rounded-full text-[10px] ${bg}`} style={{ fontWeight: 500 }}>
      {value}
    </span>
  );
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
  const poolAddress = "0x2A5e...8f3B";
  const fullAddress = "0x2A5e4c91bF03C23a6D47eE2fA913C8De1c8f3B";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center px-3 sm:px-5 py-[5px] border-t border-white/[0.06] overflow-x-auto scrollbar-hide shrink-0 bg-white/[0.01]">
      {/* Pool Address */}
      <div className="flex items-center gap-2 pr-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pool</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:bg-white/[0.08] rounded px-1 py-0.5 transition-colors group"
        >
          <span className="text-[10px] text-white/50 font-mono group-hover:text-white/70 transition-colors" style={{ fontWeight: 500 }}>
            {poolAddress}
          </span>
          {copied ? (
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5l3 3 7-7" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <CopyIcon />
          )}
        </button>
      </div>

      {/* Network */}
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Network</span>
        <div className="flex items-center gap-1">
          <div className="w-[10px] h-[10px] rounded-full bg-[#627EEA] flex items-center justify-center">
            <svg width="6" height="9" viewBox="0 0 256 417" fill="none">
              <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="rgba(255,255,255,0.6)" />
              <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" fill="white" />
            </svg>
          </div>
          <span className="text-[10px] text-white/50" style={{ fontWeight: 500 }}>Ethereum</span>
        </div>
      </div>

      {/* Pool Fee */}
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pool Fee</span>
        <span className="text-[10px] text-white/60" style={{ fontWeight: 600 }}>0.05%</span>
      </div>

      {/* Protocol */}
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Protocol</span>
        <span className="text-[10px] text-white/50" style={{ fontWeight: 500 }}>Spectra v2</span>
      </div>

      {/* PT Holders */}
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>PT Holders</span>
        <span className="text-[10px] text-[#00f99b]/70" style={{ fontWeight: 600 }}>1,247</span>
      </div>

      {/* YT Holders */}
      <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>YT Holders</span>
        <span className="text-[10px] text-[#f4c071]/70" style={{ fontWeight: 600 }}>438</span>
      </div>

      {/* Created */}
      <div className="flex items-center gap-2 px-4 shrink-0">
        <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Created</span>
        <span className="text-[10px] text-white/40" style={{ fontWeight: 400 }}>Sep 14, 2025</span>
      </div>

      <div className="flex-1" />

      {/* Block confirmation */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="w-[5px] h-[5px] rounded-full bg-[#00f99b] animate-pulse" />
        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Block 21,847,293</span>
      </div>
    </div>
  );
}

export function TradingUI() {
  const [searchParams] = useSearchParams();
  const initialAsset = searchParams.get("asset") === "YT" ? "YT" : "PT";
  const [assetType, setAssetType] = useState<AssetType>(initialAsset);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);

  const handlePlaceOrder = useCallback((order: Omit<Order, "id" | "type" | "filled" | "status" | "time">) => {
    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: "Limit",
      side: order.side,
      token: order.token,
      amount: order.amount,
      impliedApy: order.impliedApy,
      filled: "0%",
      status: "Open",
      time: "Just now",
    };
    setOrders((prev) => [newOrder, ...prev]);
  }, []);

  const handleCancelOrder = useCallback((id: string) => {
    setOrders((prev) => {
      const target = prev.find((o) => o.id === id);
      if (target) {
        const historyEntry: HistoryEntry = {
          id: `hist-cancel-${Date.now()}`,
          type: "Limit",
          side: target.side,
          token: target.token,
          amount: target.amount,
          received: "— Cancelled",
          impliedApy: target.impliedApy,
          time: "Just now",
          outcome: "Cancelled",
        };
        setHistory((h) => [historyEntry, ...h]);
      }
      return prev.filter((o) => o.id !== id);
    });
  }, []);

  return (
    <div className="flex-1 min-w-0 font-['Inter']">
      {/* ═══ TERMINAL SHELL ═══ */}
      <div className="flex flex-col min-h-full">

        {/* ── TOP BAR: Token identity + stats ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 px-3 sm:px-5 py-3 border-b border-white/[0.06]">
          {/* Token badge + name */}
          <div className="flex items-center gap-2.5 shrink-0">
            <EthereumIcon size={16} />
            <div className="relative flex items-center justify-center" style={{ width: 30, height: 30 }}>
              <SpectraIcon size={30} />
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[13px] text-white truncate leading-tight" style={{ fontWeight: 400 }}>sGHO</span>
              <span className="text-[10px] text-white/40 leading-tight" style={{ fontWeight: 400 }}>Aave</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats row - pushed to the right */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-8 w-full sm:w-auto">
            {/* Maturity */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Maturity</span>
                <InfoTooltip text="The date when the Principal Token (PT) can be redeemed 1:1 for the underlying asset." />
              </div>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>Jan 31, 2026</span>
            </div>
            {/* Default Token */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Default Token</span>
                <InfoTooltip text="The default token is the underlying asset that will be returned to PT holders in case of default." />
              </div>
              <TokenNameWithTooltip tokenName="wmooStakeDaoWBTC-cbBTC-hemiBTC" />
            </div>
            {/* Max APY */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Max APY</span>
                <InfoTooltip text="This estimation is based on a single dollar input amount at the current liquidity." />
              </div>
              <span className="text-[12px] sm:text-[13px] text-[#00f99b]" style={{ fontWeight: 600 }}>5.61%</span>
            </div>
            {/* Max Yield Leverage */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Max Yield Leverage</span>
                <InfoTooltip text="This estimation is based on a single dollar input amount at the current liquidity." />
              </div>
              <span className="text-[12px] sm:text-[13px] text-[#f4c071]" style={{ fontWeight: 600 }}>x17.12</span>
            </div>
          </div>
        </div>

        {/* ── STATS TICKER BAR ── */}
        <div className="flex items-center px-3 sm:px-5 py-[7px] border-b border-white/[0.06] overflow-x-auto scrollbar-hide gap-0">
          {/* Liquidity */}
          <div className="flex items-center gap-2.5 pr-5 border-r border-white/[0.06] shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Liquidity</span>
            <span className="text-[12px] text-white leading-none" style={{ fontWeight: 600 }}>$1.56M</span>
            <ChangePill value="+0.02%" color="green" />
          </div>
          {/* 24h Volume */}
          <div className="flex items-center gap-2.5 px-5 border-r border-white/[0.06] shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>24h Volume</span>
            <span className="text-[12px] text-white leading-none" style={{ fontWeight: 600 }}>$300K</span>
            <ChangePill value="+3%" color="green" />
          </div>
          {/* Underlying APY */}
          <div className="flex items-center gap-2.5 px-5 border-r border-white/[0.06] shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Underlying APY</span>
            <span className="text-[12px] text-[#6988ff] leading-none" style={{ fontWeight: 600 }}>2.83%</span>
            <ChangePill value="+5.66%" color="green" />
          </div>
          {/* Implied APY */}
          <div className="flex items-center gap-2.5 px-5 shrink-0">
            <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Implied APY</span>
            <span className="text-[12px] text-[#00f99b] leading-none" style={{ fontWeight: 600 }}>5.61%</span>
            <ChangePill value="+0%" color="neutral" />
          </div>

          {/* Spacer to push buttons to the right */}
          <div className="flex-1 min-w-[20px]" />

          {/* Action buttons - right aligned */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button className="bg-[#d65ce9]/15 hover:bg-[#d65ce9]/25 border border-[#d65ce9]/30 rounded-md px-2 sm:px-3 py-[5px] transition-all flex items-center justify-center">
              <span className="text-[11px] sm:text-[12px] text-[#d65ce9] leading-none whitespace-nowrap" style={{ fontWeight: 500 }}>Pool</span>
            </button>
            <button className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-2 sm:px-3 py-[5px] transition-all flex items-center justify-center">
              <span className="text-[11px] sm:text-[12px] text-white/70 leading-none" style={{ fontWeight: 400 }}>Tokenize</span>
            </button>
            <button className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-2 sm:px-3 py-[5px] transition-all flex items-center justify-center">
              <span className="text-[11px] sm:text-[12px] text-white/70 leading-none" style={{ fontWeight: 400 }}>Details</span>
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT: Left panel + Right panel ── */}
        <div className="flex flex-col lg:flex-row flex-1">

          {/* LEFT: Trading Form */}
          <div className="w-full lg:w-[420px] xl:w-[440px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-y-auto">
            <div className="p-3 sm:p-4">
              <LiquidityPanel
                assetType={assetType}
                onAssetTypeChange={setAssetType}
                onPlaceOrder={handlePlaceOrder}
                flat
              />
            </div>
          </div>

          {/* RIGHT: Chart / Order Book + Activity */}
          <div className="flex-1 min-w-0 flex flex-col min-h-0">

            {/* Chart / Order Book area */}
            <div className="flex-1 min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex flex-col p-3 sm:p-4 border-b border-white/[0.06]">
              <ChartPanel assetType={assetType} flat />
            </div>

            {/* Activity Table */}
            <div className="min-h-[280px] overflow-y-auto">
              <div className="px-2 sm:px-3 py-2">
                <ActivityTable
                  orders={orders}
                  history={history}
                  onCancelOrder={handleCancelOrder}
                  flat
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM STATUS BAR ── */}
        <BottomStatusBar />
      </div>
    </div>
  );
}

function TokenNameWithTooltip({ tokenName }: { tokenName: string }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)} // For mobile tap
    >
      <span className="text-[13px] text-white truncate max-w-[120px] leading-tight cursor-pointer block" style={{ fontWeight: 400 }}>
        {tokenName}
      </span>
      {isVisible && (
        <div className="absolute left-0 top-full mt-2 z-50 px-3 py-2 bg-[#2a2a2e] border border-white/[0.12] rounded-lg shadow-xl max-w-[200px] sm:max-w-none sm:whitespace-nowrap">
          <div className="absolute -top-1 left-4 w-2 h-2 bg-[#2a2a2e] border-t border-l border-white/[0.12] rotate-45" />
          <span className="font-['Inter'] text-[11px] text-white/80 leading-relaxed" style={{ fontWeight: 400 }}>
            {tokenName}
          </span>
        </div>
      )}
    </div>
  );
}