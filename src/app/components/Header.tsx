import { SpectraIcon, EthereumIcon } from "./TokenIcons";
import svgPaths from "../../imports/svg-qtk3afs1b8";
import { useState } from "react";

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.3715 12.372" fill="none">
      <path d={svgPaths.p2fb2bd00} fill="white" />
    </svg>
  );
}

function PoolIcon() {
  return (
    <svg width="12" height="13" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.pb742480} stroke="#BDA5FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function TradeYieldIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p2a441f80} stroke="#14D18A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p369c91a0} stroke="#FC9136" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export function Header() {
  const [activeTab, setActiveTab] = useState<"pool" | "trade">("trade");

  return (
    <div className="flex flex-col w-full">
      {/* ── Mobile: single unified area ── */}
      <div className="flex flex-col lg:hidden gap-4 p-1">
        {/* Row 1: Token identity + action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <EthereumIcon size={18} />
            <div className="relative flex items-center justify-center" style={{ width: 32, height: 32 }}>
              <SpectraIcon size={32} />
            </div>
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[16px] text-[#c9c9cd]" style={{ fontWeight: 500 }}>sGHO</span>
              <span className="font-['Inter'] text-[11px] text-[#c9c9cd] opacity-80" style={{ fontWeight: 300 }}>Aave</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-[#313032] rounded px-[8px] py-[4px] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors">
              <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 300 }}>Details</span>
            </button>
            <button className="border border-[#313032] rounded px-[8px] py-[4px] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors">
              <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 300 }}>Tokenize</span>
            </button>
          </div>
        </div>

        {/* Row 2: Stats grid */}
        <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
          <div className="flex flex-col gap-1">
            <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 400 }}>Maturity</span>
            <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 400 }}>Jan 31 2026</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 400 }}>Liquidity</span>
            <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 400 }}>$2,037,485</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 400 }}>Default Token</span>
              <InfoIcon />
            </div>
            <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 400 }}>sGHO</span>
          </div>
        </div>

        {/* Row 3: Description */}
        <p className="font-['Inter'] text-[12px] text-white/50 border-t border-white/[0.06] pt-3" style={{ fontWeight: 300 }}>
          Trade yield evolution of sGHO with Principal and Yield Tokens.
        </p>

        {/* Row 4: Nav tabs — two-option segmented control */}
        <div className="flex items-center bg-[#1a1a1e] border border-[#313032] rounded-[8px] p-[3px]">
          <button
            onClick={() => setActiveTab("pool")}
            className={`flex items-center gap-1.5 basis-0 grow justify-center rounded-[6px] px-3 py-[7px] transition-colors ${
              activeTab === "pool"
                ? "bg-[rgba(83,56,158,0.1)] border border-[#bda5ff]/30"
                : "border border-transparent hover:bg-white/[0.04]"
            }`}
          >
            <PoolIcon />
            <span
              className={`font-['Inter'] text-[11px] whitespace-nowrap ${
                activeTab === "pool" ? "text-[#bda5ff]" : "text-white/40"
              }`}
              style={{ fontWeight: 600 }}
            >
              Pool
            </span>
          </button>
          <button
            onClick={() => setActiveTab("trade")}
            className={`flex items-center gap-1.5 basis-0 grow justify-center rounded-[6px] px-3 py-[7px] transition-colors ${
              activeTab === "trade"
                ? "bg-[rgba(20,209,138,0.1)] border border-[#14d18a]/30"
                : "border border-transparent hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-center gap-0.5">
              <span className="w-[5px] h-[5px] rounded-full bg-[#14d18a]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[#fc9136]" />
            </div>
            <span
              className={`font-['Inter'] text-[11px] whitespace-nowrap ${
                activeTab === "trade" ? "text-[#14d18a]" : "text-white/40"
              }`}
              style={{ fontWeight: 600 }}
            >
              Trade Yield
            </span>
          </button>
        </div>
      </div>

      {/* ── Desktop: original two-row layout ── */}
      <div className="hidden lg:flex flex-col gap-16 w-full">
        {/* Top row */}
        <div className="flex items-center w-full">
          {/* Token badge */}
          <div className="flex items-center bg-[#212125] border border-[#313032] rounded-[6px] px-[13px] py-[1px]">
            <div className="flex items-center py-[4.63px] gap-0">
              <div className="pr-2 shrink-0">
                <EthereumIcon size={20} />
              </div>
              <div className="pr-3 shrink-0">
                <div className="relative flex items-center justify-center" style={{ width: 34, height: 34 }}>
                  <SpectraIcon size={34} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[16px] text-[#c9c9cd]" style={{ fontWeight: 500 }}>sGHO</span>
                <span className="font-['Inter'] text-[12px] text-[#c9c9cd] opacity-80" style={{ fontWeight: 300 }}>Aave</span>
              </div>
            </div>
          </div>

          {/* Info section */}
          <div className="flex-1 flex items-center justify-end gap-8 pr-6">
            <div className="flex flex-col gap-[6px] items-end">
              <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 300 }}>Maturity</span>
              <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 300 }}>Jan 31 2026</span>
            </div>
            <div className="flex flex-col gap-[6px] items-end">
              <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 300 }}>Liquidity</span>
              <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 300 }}>$2,037,485</span>
            </div>
            <div className="flex flex-col gap-[6px] items-end">
              <div className="flex items-center gap-[5px]">
                <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 300 }}>Default Token</span>
                <InfoIcon />
              </div>
              <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 300 }}>sGHO</span>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center bg-[#1a1a1e] border border-[#313032] rounded-[8px] p-[3px] w-[260px] shrink-0">
            <button
              onClick={() => setActiveTab("pool")}
              className={`flex items-center gap-1.5 basis-0 grow justify-center rounded-[6px] px-2 py-[5px] transition-colors ${
                activeTab === "pool"
                  ? "bg-[rgba(83,56,158,0.1)] border border-[#bda5ff]/30"
                  : "border border-transparent hover:bg-white/[0.04]"
              }`}
            >
              <PoolIcon />
              <span
                className={`font-['Inter'] text-[12px] whitespace-nowrap ${
                  activeTab === "pool" ? "text-[#bda5ff]" : "text-white/40"
                }`}
                style={{ fontWeight: 600 }}
              >
                Pool
              </span>
            </button>
            <button
              onClick={() => setActiveTab("trade")}
              className={`flex items-center gap-1.5 basis-0 grow justify-center rounded-[6px] px-2 py-[5px] transition-colors ${
                activeTab === "trade"
                  ? "bg-[rgba(20,209,138,0.1)] border border-[#14d18a]/30"
                  : "border border-transparent hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-[3px]">
                <span className="w-[5px] h-[5px] rounded-full bg-[#14d18a]" />
                <span className="w-[5px] h-[5px] rounded-full bg-[#fc9136]" />
              </div>
              <span
                className={`font-['Inter'] text-[12px] ${
                  activeTab === "trade" ? "text-[#14d18a]" : "text-white/40"
                }`}
                style={{ fontWeight: 600 }}
              >
                Trade Yield
              </span>
            </button>
          </div>
        </div>

        {/* Sub header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 300 }}>Trade yield evolution of sGHO with Principal and Yield Tokens.</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="border border-[#313032] rounded px-[9px] py-[5px] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors">
              <span className="font-['Inter'] text-[14px] text-white text-center" style={{ fontWeight: 300 }}>Details</span>
            </button>
            <button className="border border-[#313032] rounded px-[9px] py-[5px] hover:bg-white/[0.04] hover:border-white/[0.12] transition-colors">
              <span className="font-['Inter'] text-[14px] text-white text-center" style={{ fontWeight: 300 }}>Tokenize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}