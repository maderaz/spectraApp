import { useState } from "react";
import { SpectraIcon, AaveProtocolIcon, EthereumIcon, SpectraTokenWithRing } from "./TokenIcons";
import { TypographyRulesCard } from "./TypographyRules";

// ─── Reusable wrapper for each documented component ───

function ComponentCard({
  title,
  children,
  instructions,
}: {
  title: string;
  children: React.ReactNode;
  instructions: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-white/[0.06] rounded-[10px] overflow-hidden">
      {/* Preview area */}
      <div className="bg-[#1e1e1e] px-5 py-5">
        <span
          className="block font-['Inter'] text-[11px] text-white/30 uppercase tracking-wider mb-4"
          style={{ fontWeight: 500 }}
        >
          {title}
        </span>
        <div className="flex flex-wrap items-center gap-4">{children}</div>
      </div>

      {/* Instructions toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 bg-white/[0.02] border-t border-white/[0.06] hover:bg-white/[0.04] transition-colors"
      >
        <span
          className="font-['Inter'] text-[12px] text-white/50"
          style={{ fontWeight: 500 }}
        >
          AI Recreation Instructions
        </span>
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M1 1.5L5 5.5L9 1.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Instructions body */}
      {expanded && (
        <div className="px-5 py-4 bg-[#161616] border-t border-white/[0.06]">
          <ul className="flex flex-col gap-2">
            {instructions.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-white/20 font-['Inter'] text-[11px] shrink-0" style={{ fontWeight: 500 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-['Inter'] text-[12px] text-white/60 leading-relaxed"
                  style={{ fontWeight: 400 }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── 1. ChangePill ───

function ChangePill({ value, color }: { value: string; color: "green" | "red" | "neutral" }) {
  const bg =
    color === "green"
      ? "bg-[#00f99b]/10 text-[#00f99b]"
      : color === "red"
      ? "bg-[#ef6b6b]/10 text-[#ef6b6b]"
      : "bg-white/[0.06] text-white/40";
  return (
    <span className={`inline-flex items-center px-[5px] py-[1px] rounded-full text-[10px] ${bg}`} style={{ fontWeight: 500 }}>
      {value}
    </span>
  );
}

// ─── 2. USDCTokenIcon ───

function USDCTokenIcon({ size = 34 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[#2775CA] shrink-0 flex items-center justify-center"
    >
      <span className="font-['Inter'] text-white" style={{ fontSize: size * 0.38, fontWeight: 700 }}>$</span>
    </div>
  );
}

// ─── Page Export ───

export function BrandComponents() {
  const [demoAssetType, setDemoAssetType] = useState<"PT" | "YT">("PT");
  const [demoDirection, setDemoDirection] = useState<"buy" | "sell">("buy");
  const [demoOrderType, setDemoOrderType] = useState<"swap" | "limit">("swap");
  const [demoViewMode, setDemoViewMode] = useState<"chart" | "orderbook" | "marketdetails">("chart");
  const [demoPillTab, setDemoPillTab] = useState<"deposit" | "withdraw">("deposit");
  const [demoSegmented, setDemoSegmented] = useState("3M");
  const [demoSearchValue, setDemoSearchValue] = useState("");
  const [demoSortDir, setDemoSortDir] = useState<"asc" | "desc">("desc");
  const [demoPositionTab, setDemoPositionTab] = useState<"pt" | "yt" | "lp" | "mv" | "rewards">("pt");

  return (
    <div className="flex-1 min-w-0 overflow-auto scrollbar-hide font-['Inter']">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1
            className="font-['Inter'] text-[16px] text-white mb-2"
            style={{ fontWeight: 600 }}
          >
            Brand Components
          </h1>
          <p
            className="font-['Inter'] text-[13px] text-white/40 max-w-[600px]"
            style={{ fontWeight: 400 }}
          >
            Live previews and AI-readable recreation instructions for every atomic component used on the Trading page. Each card shows the rendered element + step-by-step specs.
          </p>
        </div>

        <div className="flex flex-col gap-5">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* ─── 0. TYPOGRAPHY & FONT GLOBAL RULES (GIANT) ─── */}
          {/* ═══════════════════════════════════════════════════════ */}
          <TypographyRulesCard />

          {/* ─── 1. Token Identity Badge ─── */}
          <ComponentCard
            title="Token Identity Badge"
            instructions={[
              "Container: `flex items-center gap-2.5` row.",
              "First child: EthereumIcon (16px) — small chain/network icon.",
              "Second child: 30px SpectraIcon — standalone token icon, no protocol overlay.",
              "Third child: `flex flex-col gap-[2px]` with two spans — token name (13px, white, fontWeight 400, leading-tight) and protocol label (10px, white/40, fontWeight 400, leading-tight).",
              "Font: Inter. No background or border on the outer container (it sits inside the top bar).",
            ]}
          >
            <div className="flex items-center gap-2.5">
              <EthereumIcon size={16} />
              <SpectraIcon size={30} />
              <div className="flex flex-col gap-[2px]">
                <span className="text-[13px] text-white leading-tight" style={{ fontWeight: 400 }}>sGHO</span>
                <span className="text-[10px] text-white/40 leading-tight" style={{ fontWeight: 400 }}>Aave</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 2. Change Pill ─── */}
          <ComponentCard
            title="Change Pill"
            instructions={[
              "Element: `<span>` with `inline-flex items-center px-[5px] py-[1px] rounded-full text-[10px]`.",
              "Green variant: `bg-[#00f99b]/10 text-[#00f99b]` — used for positive changes.",
              "Red variant: `bg-[#ef6b6b]/10 text-[#ef6b6b]` — used for negative changes.",
              "Neutral variant: `bg-white/[0.06] text-white/40` — used for zero/negligible changes.",
              "fontWeight: 500. Font: Inter.",
              "Content is the change string, e.g. '+0.02%', '+3%', '+0%'.",
              "Always prefix with '+' or '-'. Neutral uses '+0%' style.",
            ]}
          >
            <ChangePill value="+0.02%" color="green" />
            <ChangePill value="+3%" color="green" />
            <ChangePill value="+5.66%" color="green" />
            <ChangePill value="-0.02%" color="red" />
            <ChangePill value="-3%" color="red" />
            <ChangePill value="-5.66%" color="red" />
            <ChangePill value="+0%" color="neutral" />
          </ComponentCard>

          {/* ─── 3. Stat Cell (Ticker Bar) ─── */}
          <ComponentCard
            title="Stat Cell (Ticker Bar Item)"
            instructions={[
              "Container: `flex items-center gap-2.5 px-5 border-r border-white/[0.06] shrink-0`.",
              "First element: label — `text-[11px] text-white/35 leading-none`, fontWeight 400.",
              "Second element: value — `text-[12px] text-white leading-none`, fontWeight 600.",
              "Optional third element: ChangePill component (see Change Pill card).",
              "For special colored values: Underlying APY uses `text-[#6988ff]`, Implied APY uses `text-[#00f99b]`.",
              "The last cell in a row omits `border-r`. First cell uses `pr-5` instead of `px-5`.",
              "Parent bar: `flex items-center px-3 sm:px-5 py-[7px] border-b border-white/[0.06] overflow-x-auto scrollbar-hide`.",
            ]}
          >
            {/* Liquidity */}
            <div className="flex items-center gap-2.5 pr-5 border-r border-white/[0.06] shrink-0">
              <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Liquidity</span>
              <span className="text-[12px] text-white leading-none" style={{ fontWeight: 600 }}>$1.56M</span>
              <ChangePill value="+0.02%" color="green" />
            </div>
            {/* Implied APY */}
            <div className="flex items-center gap-2.5 px-5 shrink-0">
              <span className="text-[11px] text-white/35 leading-none" style={{ fontWeight: 400 }}>Implied APY</span>
              <span className="text-[12px] text-[#00f99b] leading-none" style={{ fontWeight: 600 }}>5.61%</span>
              <ChangePill value="+0%" color="neutral" />
            </div>
          </ComponentCard>

          {/* ─── 4. Asset Type Toggle (PT / YT) ─── */}
          <ComponentCard
            title="Asset Type Toggle (PT / YT)"
            instructions={[
              "Outer container: `flex bg-[#191919] rounded-[8px] w-full p-[3px]`.",
              "Two `<button>` children, each `flex-1 py-[7px] text-center rounded-[6px] transition-all`, font Inter 13px.",
              "Active state: `text-white bg-[#191919] border border-white/[0.08]`, fontWeight 500.",
              "Inactive state: `text-white/50 bg-[#191919] hover:text-white/70`, fontWeight 400 — no border.",
              "Labels: 'Fix rate (PT)' and 'Yield Leverage (YT)' — not just 'PT'/'YT'.",
              "onClick toggles the asset type between 'PT' and 'YT'. The state controls which tab content renders below.",
              "This is the primary (Tier 1) toggle in the LiquidityPanel, taking full width.",
            ]}
          >
            <div className="flex bg-[#191919] rounded-[8px] w-full max-w-[440px] p-[3px]">
              {(["PT", "YT"] as const).map((type) => {
                const isActive = demoAssetType === type;
                return (
                  <button
                    key={type}
                    className={`flex-1 py-[7px] text-center text-[13px] rounded-[6px] transition-all ${
                      isActive
                        ? "text-white bg-[#191919] border border-white/[0.08]"
                        : "text-white/50 bg-[#191919] hover:text-white/70"
                    }`}
                    style={{ fontWeight: isActive ? 500 : 400 }}
                    onClick={() => setDemoAssetType(type)}
                  >
                    {type === "PT" ? "Fix rate (PT)" : "Yield Leverage (YT)"}
                  </button>
                );
              })}
            </div>
          </ComponentCard>

          {/* ─── 5. Buy / Sell Toggle ─── */}
          <ComponentCard
            title="Buy / Sell Toggle"
            instructions={[
              "Outer container: `flex bg-[#2a2a2e] rounded-[6px] p-[2px]`.",
              "Two `<button>` children: `px-4 py-[6px] text-center text-[12px] rounded-[5px] transition-all border`.",
              "Active state: `text-white bg-[#1a1a1d] border-white/[0.18]`, fontWeight 500.",
              "Inactive state: `text-white/50 bg-transparent border-transparent hover:text-white/70 hover:border-white/[0.08]`, fontWeight 400.",
              "Font: Inter.",
              "Labels: 'Buy' and 'Sell'.",
              "This is a Tier 2 toggle, placed on the left side of a `flex items-center justify-between` row. The Swap/Limit toggle sits on the right of the same row.",
            ]}
          >
            <div className="flex bg-[#2a2a2e] rounded-[6px] p-[2px]">
              {(["buy", "sell"] as const).map((dir) => {
                const isActive = demoDirection === dir;
                return (
                  <button
                    key={dir}
                    className={`px-4 py-[6px] text-center text-[12px] rounded-[5px] transition-all border ${
                      isActive
                        ? "text-white bg-[#1a1a1d] border-white/[0.18]"
                        : "text-white/50 bg-transparent border-transparent hover:text-white/70 hover:border-white/[0.08]"
                    }`}
                    style={{ fontWeight: isActive ? 500 : 400 }}
                    onClick={() => setDemoDirection(dir)}
                  >
                    {dir === "buy" ? "Buy" : "Sell"}
                  </button>
                );
              })}
            </div>
          </ComponentCard>

          {/* ─── 6. Swap / Limit Toggle ─── */}
          <ComponentCard
            title="Swap / Limit Toggle"
            instructions={[
              "Container: `flex items-center gap-3`.",
              "Each option is a `<button>` with `relative pb-[6px] pt-[6px] text-[12px] transition-all`.",
              "Active state: `text-white`, fontWeight 500. Plus an underline indicator: `absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-white/70`.",
              "Inactive state: `text-white/50 hover:text-white/70`, fontWeight 400.",
              "Labels: 'Swap' and 'Limit'. Capitalized first letter.",
              "Font: Inter. This sits on the right side of the Buy/Sell row (justify-between).",
              "When 'Limit' is selected, additional fields appear below: 'Buy/Sell PT at Implied APY' input + 'Expires In' input with dropdown.",
            ]}
          >
            <div className="flex items-center gap-3">
              {(["swap", "limit"] as const).map((type) => {
                const isActive = demoOrderType === type;
                return (
                  <button
                    key={type}
                    className={`relative pb-[6px] pt-[6px] text-[12px] transition-all ${
                      isActive ? "text-white" : "text-white/50 hover:text-white/70"
                    }`}
                    style={{ fontWeight: isActive ? 500 : 400 }}
                    onClick={() => setDemoOrderType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-white/70" />
                    )}
                  </button>
                );
              })}
            </div>
          </ComponentCard>

          {/* ─── 7. Action Buttons (Pool / Tokenize / Details) ─── */}
          <ComponentCard
            title="Action Buttons (Pool / Tokenize / Details)"
            instructions={[
              "Container: `flex items-center gap-1.5 sm:gap-2 shrink-0`.",
              "Pool button (accent): `bg-[#d65ce9]/15 hover:bg-[#d65ce9]/25 border border-[#d65ce9]/30 rounded-md px-2 sm:px-3 py-[5px] transition-all flex items-center justify-center`.",
              "Pool label: `text-[11px] sm:text-[12px] text-[#d65ce9] leading-none whitespace-nowrap`, fontWeight 500.",
              "Secondary buttons (Tokenize, Details): `bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-2 sm:px-3 py-[5px] transition-all`.",
              "Secondary label: `text-[11px] sm:text-[12px] text-white/70 leading-none`, fontWeight 400.",
              "Font: Inter. These sit at the far right of the Stats Ticker Bar row.",
            ]}
          >
            <div className="flex items-center gap-2">
              <button className="bg-[#d65ce9]/15 hover:bg-[#d65ce9]/25 border border-[#d65ce9]/30 rounded-md px-3 py-[5px] transition-all flex items-center justify-center">
                <span className="text-[12px] text-[#d65ce9] leading-none whitespace-nowrap" style={{ fontWeight: 500 }}>Pool</span>
              </button>
              <button className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-3 py-[5px] transition-all flex items-center justify-center">
                <span className="text-[12px] text-white/70 leading-none" style={{ fontWeight: 400 }}>Tokenize</span>
              </button>
              <button className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] rounded-md px-3 py-[5px] transition-all flex items-center justify-center">
                <span className="text-[12px] text-white/70 leading-none" style={{ fontWeight: 400 }}>Details</span>
              </button>
            </div>
          </ComponentCard>

          {/* ─── 8. Chart View Mode Toggle ─── */}
          <ComponentCard
            title="Chart View Mode Toggle"
            instructions={[
              "Outer: `flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px] shrink-0`.",
              "Each option `<button>`: `flex items-center gap-[6px] px-3 py-[5px] rounded-[4px] text-[12px] transition-all`.",
              "Active: `bg-white/[0.1] text-white`, fontWeight 500.",
              "Inactive: `text-white/35 hover:text-white/55`, fontWeight 400.",
              "Each button has an SVG icon (14x14) to the left of the label. Icons reduce opacity when inactive.",
              "Chart icon: polyline path `M2 12L5.5 7.5L8.5 9.5L14 3` + bottom line, stroke white, strokeWidth 1.5.",
              "Order Book icon: colored rects (green #00f99b for bids, red #ef6b6b for asks) in a grid pattern.",
              "Market Details icon: circle with 'i' — `cx=8 cy=8 r=6` stroke white, vertical line + dot.",
              "Labels: 'Chart', 'Order Book', 'Market Details'. Font: Inter.",
            ]}
          >
            <div className="flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px]">
              {(["chart", "orderbook", "marketdetails"] as const).map((mode) => {
                const isActive = demoViewMode === mode;
                const label = mode === "chart" ? "Chart" : mode === "orderbook" ? "Order Book" : "Market Details";
                return (
                  <button
                    key={mode}
                    className={`flex items-center gap-[6px] px-3 py-[5px] rounded-[4px] text-[12px] transition-all ${
                      isActive ? "bg-white/[0.1] text-white" : "text-white/35 hover:text-white/55"
                    }`}
                    style={{ fontWeight: isActive ? 500 : 400 }}
                    onClick={() => setDemoViewMode(mode)}
                  >
                    {mode === "chart" && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 12L5.5 7.5L8.5 9.5L14 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={isActive ? 1 : 0.5} />
                        <path d="M2 14h12" stroke="white" strokeWidth="1" strokeLinecap="round" opacity={isActive ? 0.4 : 0.2} />
                      </svg>
                    )}
                    {mode === "orderbook" && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" opacity={isActive ? 1 : 0.5}>
                        <rect x="2" y="2" width="5" height="1.8" rx="0.5" fill="#00f99b" />
                        <rect x="2" y="4.6" width="7" height="1.8" rx="0.5" fill="#00f99b" opacity="0.7" />
                        <rect x="2" y="10.4" width="3.5" height="1.8" rx="0.5" fill="#ef6b6b" opacity="0.45" />
                        <rect x="2" y="13" width="6" height="1.8" rx="0.5" fill="#ef6b6b" opacity="0.7" />
                        <rect x="9" y="2" width="5" height="1.8" rx="0.5" fill="#ef6b6b" />
                      </svg>
                    )}
                    {mode === "marketdetails" && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" opacity={isActive ? 1 : 0.5}>
                        <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.2" />
                        <path d="M8 7v4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                        <circle cx="8" cy="5" r="0.75" fill="white" />
                      </svg>
                    )}
                    {label}
                  </button>
                );
              })}
            </div>
          </ComponentCard>

          {/* ─── 9. Token Icons ─── */}
          <ComponentCard
            title="Token Icons"
            instructions={[
              "All token icons are circular and accept a `size` prop (default 34px).",
              "SpectraTokenWithRing: Colored inset ring around the Spectra icon (`boxShadow: inset 0 0 0 1.5px {ringColor}`). No text badge — ring color identifies the type. Ring colors: PT = `#00f99b`, YT = `#f4c071`, LP = `#d65ce9`.",
              "SpectraIcon: Base Spectra token, no ring. 34px default.",
              "EthereumIcon: Default 20px. Used as small chain/network identifier (14–16px) placed before token icons in rows.",
              "AaveProtocolIcon: Default 16px. Standalone protocol icon — no longer used as overlay on token icons.",
              "USDCTokenIcon: Blue (#2775CA) circle. 34px default.",
              "GhoTokenIcon: Green (#00F99B) circle. 34px default.",
            ]}
          >
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <SpectraIcon size={34} />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Spectra</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SpectraTokenWithRing ringColor="#00f99b" />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>PT Ring</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SpectraTokenWithRing ringColor="#f4c071" />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>YT Ring</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SpectraTokenWithRing ringColor="#d65ce9" />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>LP Ring</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <EthereumIcon size={34} />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Ethereum</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AaveProtocolIcon size={34} />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Aave</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <USDCTokenIcon size={34} />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>USDC</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 10. Bottom Status Bar Segment ─── */}
          <ComponentCard
            title="Bottom Status Bar"
            instructions={[
              "Full bar: `flex items-center px-3 sm:px-5 py-[5px] border-t border-white/[0.06] overflow-x-auto scrollbar-hide shrink-0 bg-white/[0.01]`.",
              "Each segment is a `flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0` div.",
              "Label: `text-[10px] text-white/25`, fontWeight 400.",
              "Value: `text-[10px] text-white/50`, fontWeight 500. Special colors: PT Holders = `text-[#00f99b]/70` fw600, YT Holders = `text-[#f4c071]/70` fw600.",
              "Copy button: Pool address segment has a copy icon (two overlapping rects, 10x10, stroke white/35, strokeWidth 1.3). On click, copies full address and shows a green checkmark for 1.5s.",
              "Network segment: tiny 10px Ethereum icon (blue circle #627EEA with white diamond SVG).",
              "Rightmost: block confirmation dot `w-[5px] h-[5px] rounded-full bg-[#00f99b] animate-pulse` + 'Block 21,847,293' in text-[10px] text-white/30.",
              "Font: Inter throughout. Bar sticks to the bottom of the terminal shell.",
            ]}
          >
            <div className="flex items-center gap-0 w-full overflow-x-auto scrollbar-hide bg-white/[0.01] rounded-[6px] py-[5px] px-3">
              <div className="flex items-center gap-2 pr-4 border-r border-white/[0.06] shrink-0">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pool</span>
                <span className="text-[10px] text-white/50 font-mono" style={{ fontWeight: 500 }}>0x2A5e...8f3B</span>
              </div>
              <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Network</span>
                <span className="text-[10px] text-white/50" style={{ fontWeight: 500 }}>Ethereum</span>
              </div>
              <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>Pool Fee</span>
                <span className="text-[10px] text-white/60" style={{ fontWeight: 600 }}>0.05%</span>
              </div>
              <div className="flex items-center gap-2 px-4 border-r border-white/[0.06] shrink-0">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>PT Holders</span>
                <span className="text-[10px] text-[#00f99b]/70" style={{ fontWeight: 600 }}>1,247</span>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-[5px] h-[5px] rounded-full bg-[#00f99b] animate-pulse" />
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Block 21,847,293</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 11. Header Stats Cell ─── */}
          <ComponentCard
            title="Header Stats Cell (Top Bar)"
            instructions={[
              "Container: `flex flex-col gap-[6px]`.",
              "Top row: `flex items-center gap-1 h-[14px]` — label + optional InfoTooltip.",
              "Label: `text-[10px] text-white/35 uppercase tracking-wider`, fontWeight 500.",
              "Bottom row: `h-[13px] flex items-center` — value span.",
              "Value defaults: `text-[13px] text-white`, fontWeight 400.",
              "Special colors: Max APY uses `text-[#00f99b] fontWeight 600`. Max Yield Leverage uses `text-[#f4c071] fontWeight 600`.",
              "Cells sit in a `flex items-center gap-6 sm:gap-8` row on the right side of the top bar.",
              "For long token names, use `truncate max-w-[120px]` with a hover tooltip showing the full name.",
            ]}
          >
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-1 h-[14px]">
                  <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Maturity</span>
                </div>
                <div className="h-[13px] flex items-center">
                  <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>Jan 31, 2026</span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-1 h-[14px]">
                  <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Max APY</span>
                </div>
                <div className="h-[13px] flex items-center">
                  <span className="text-[13px] text-[#00f99b]" style={{ fontWeight: 600 }}>5.61%</span>
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-1 h-[14px]">
                  <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Max Yield Leverage</span>
                </div>
                <div className="h-[13px] flex items-center">
                  <span className="text-[13px] text-[#f4c071]" style={{ fontWeight: 600 }}>x17.12</span>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 12. Input Field Section ─── */}
          <ComponentCard
            title="Input Field (Amount + Token Selector)"
            instructions={[
              "Container: `flex w-full` — two halves: input left, token selector right.",
              "Left half: `flex-1 rounded-l-[8px] px-[13px] py-[1px] flex flex-col justify-center h-[50px]`, border `1px solid rgba(255,255,255,0.15)`.",
              "Input element: `bg-transparent text-[16px] text-white pl-1 w-full outline-none placeholder-[#a1a1aa]`, fontWeight 500. Placeholder: '0'.",
              "USD estimate below input: `text-[10px] text-white/30 pl-1`, fontWeight 400. Format: '≈$0' or '≈$123.45'.",
              "Right half (token button): `border border-white/15 rounded-r-[8px] px-[11px] py-[10px] h-[50px] gap-2`. Contains token icon (24px) + token label (`text-[13px] text-white/60`, fw400) + ChevronDown.",
              "Balance row below: `flex items-center justify-between`. Left: 'Balance:' (11px, white/50, fw400) + value (11px, white/70, fw500). Right: quick buttons 25%/50%/Max (10px, white/35, fw400, hover:white/55, rounded-[4px]).",
            ]}
          >
            <div className="w-full max-w-[440px]">
              <div className="flex w-full">
                <div className="flex-1 rounded-l-[8px] px-[13px] py-[1px] flex flex-col justify-center h-[50px]" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  <input type="text" placeholder="0" className="bg-transparent text-[16px] text-white pl-1 w-full outline-none placeholder-[#a1a1aa]" style={{ fontWeight: 500 }} readOnly />
                  <span className="text-[10px] text-white/30 pl-1" style={{ fontWeight: 400 }}>≈$0</span>
                </div>
                <button className="flex items-center justify-between border border-white/15 rounded-r-[8px] px-[11px] py-[10px] h-[50px] gap-2">
                  <div className="flex items-center gap-2">
                    <USDCTokenIcon size={24} />
                    <span className="text-[13px] text-white/60" style={{ fontWeight: 400 }}>USDC</span>
                  </div>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>Balance:&nbsp;</span>
                  <span className="text-[11px] text-white/70" style={{ fontWeight: 500 }}>0</span>
                </div>
                <div className="flex items-center gap-1">
                  {["25%", "50%", "Max"].map((l) => (
                    <button key={l} className="text-[10px] text-white/35 hover:text-white/55 px-[6px] py-[2px] rounded-[4px] hover:bg-white/[0.04] transition-all" style={{ fontWeight: 400 }}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 13. Output Token Row ─── */}
          <ComponentCard
            title="Output Token Row"
            instructions={[
              "Container: `flex items-center justify-between min-h-[36px]`.",
              "Left: token icon (SpectraTokenWithRing 34px or USDCTokenIcon 34px) + label (`text-[13px] text-white/70`, fw400, e.g. 'PT-USDC-13/02/26').",
              "Right: `flex flex-col items-end` — value (`text-[13px]`, fw500, white when has input, #a1a1aa when empty, shows '-' or formatted number) + optional USD estimate below (`text-[10px] text-white/30`, fw400, '≈$123.45').",
              "Separator above output section: `border-t border-white/10 mb-3`.",
              "Section label above: 'Output' (`text-[12px] text-white/50`, fw400).",
            ]}
          >
            <div className="w-full max-w-[440px]">
              <span className="text-[12px] text-white/50 mb-2 block" style={{ fontWeight: 400 }}>Output</span>
              <div className="flex items-center justify-between min-h-[36px]">
                <div className="flex items-center gap-2">
                  <SpectraTokenWithRing ringColor="#00f99b" />
                  <span className="text-[13px] text-white/70" style={{ fontWeight: 400 }}>PT-USDC-13/02/26</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[13px] text-white" style={{ fontWeight: 500 }}>1,002.74</span>
                  <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>≈$999.99</span>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 14. Metric Row (Key-Value) ─── */}
          <ComponentCard
            title="Metric Row (Trading Panel)"
            instructions={[
              "Container: `flex items-center justify-between h-[30px]`.",
              "Left: label — `text-[12px] text-white/50`, fontWeight 400. Optionally followed by a QuestionIcon (20x20, opacity 50%).",
              "Right: value — `text-[12px]`, fontWeight 500. Color depends on state: white (active), #a1a1aa (inactive/empty shows '-'), #00f99b (positive APY impact), #ef6b6b (negative APY impact).",
              "Examples: 'Fixed Maturity Yield' → '0.27%', 'Fixed APR / APY' → '8.33% / 8.68%', 'Implied APY Impact' → '+0.03%' (green), 'Yield Leverage' → '722.00x'.",
              "Separator between output and metrics: `border-t border-white/10 my-0.5`.",
            ]}
          >
            <div className="w-full max-w-[440px] flex flex-col gap-0">
              <div className="flex items-center justify-between h-[30px]">
                <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Fixed Maturity Yield</span>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>0.27%</span>
              </div>
              <div className="flex items-center justify-between h-[30px]">
                <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Fixed APR / APY</span>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>8.33% / 8.68%</span>
              </div>
              <div className="flex items-center justify-between h-[30px]">
                <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Implied APY Impact</span>
                <span className="text-[12px] text-[#00f99b]" style={{ fontWeight: 500 }}>+0.03%</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 15. Details Accordion ─── */}
          <ComponentCard
            title="Details Accordion"
            instructions={[
              "Toggle button: `flex items-center w-full pb-3 cursor-pointer`.",
              "Label: 'Details' (`text-[12px] text-white/50`, fw400).",
              "Separator line: `flex-1 border-t border-white/10 mx-4` between label and chevron.",
              "Chevron: 12x8 SVG, rotates 180deg when open. stroke white, opacity 0.3.",
              "Detail rows: `flex flex-col gap-2 pb-2`. Each row: `flex items-center justify-between`.",
              "Row label: `text-[11px] text-white/35`, fw400 (e.g. 'Rate', 'Price Impact', 'Min. Received', 'Slippage').",
              "Row value: `text-[11px] text-white/60`, fw500. Price Impact uses `text-[#00f99b]`.",
            ]}
          >
            <div className="w-full max-w-[440px]">
              <div className="flex items-center w-full pb-3">
                <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Details</span>
                <div className="flex-1 border-t border-white/10 mx-4" />
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>Rate</span>
                  <span className="text-[11px] text-white/60" style={{ fontWeight: 500 }}>1 USDC ≈ 1.00274 PT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>Price Impact</span>
                  <span className="text-[11px] text-[#00f99b]" style={{ fontWeight: 500 }}>&lt;0.01%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>Min. Received</span>
                  <span className="text-[11px] text-white/60" style={{ fontWeight: 500 }}>997.72 PT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>Slippage</span>
                  <span className="text-[11px] text-white/60" style={{ fontWeight: 500 }}>0.5%</span>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 16. Accent CTA Button ─── */}
          <ComponentCard
            title="Accent CTA Button (Buy / Sell)"
            instructions={[
              "Container: `w-full rounded-[6px] h-[42px] flex items-center justify-center transition-all`.",
              "Active state (has input): background = accentColor (PT: #00f99b, YT: #f4c071), `boxShadow: 0 0 20px {accentColor}33`.",
              "Active label: `text-[13px] text-[#191919]`, fontWeight 500. Text: 'Buy PT', 'Sell PT', 'Buy YT', 'Sell YT', or 'Place Order' (limit mode).",
              "Inactive state (no input): `bg-[#313032]`, no boxShadow.",
              "Inactive label: `text-[13px] text-[#6f797f]`, fontWeight 500.",
            ]}
          >
            <div className="flex items-center gap-4">
              <button className="rounded-[6px] h-[42px] px-10 flex items-center justify-center transition-all" style={{ backgroundColor: "#00f99b", boxShadow: "0 0 20px #00f99b33" }}>
                <span className="text-[13px] text-[#191919]" style={{ fontWeight: 500 }}>Buy PT</span>
              </button>
              <button className="rounded-[6px] h-[42px] px-10 flex items-center justify-center transition-all" style={{ backgroundColor: "#f4c071", boxShadow: "0 0 20px #f4c07133" }}>
                <span className="text-[13px] text-[#191919]" style={{ fontWeight: 500 }}>Buy YT</span>
              </button>
              <button className="rounded-[6px] h-[42px] px-10 flex items-center justify-center bg-[#313032]">
                <span className="text-[13px] text-[#6f797f]" style={{ fontWeight: 500 }}>Buy PT</span>
              </button>
            </div>
          </ComponentCard>

          {/* ─── 17. Market Details Key-Value Row ─── */}
          <ComponentCard
            title="Market Details Key-Value Row"
            instructions={[
              "Container: `flex items-center justify-between py-3 border-b border-white/[0.06]` (last row omits border-b).",
              "Label: `text-[12px] text-white/40`, fontWeight 400. Some labels have a circle-i info icon (14x14, stroke white/30).",
              "Value: `text-[12px] text-white`, fontWeight 500. For linked values (sGHO), add ExternalLinkIcon button (14x14, stroke white/30, hover:opacity-70).",
              "Pool Composition section header: `text-[12px] text-white/50`, fontWeight 500.",
              "Pool Composition bar: `relative w-full h-[16px] rounded-[6px] overflow-hidden bg-white/[0.03]` with colored divs for IBT (#6988ff) and PT (#00f99b).",
              "Pool Composition labels: `text-[11px] text-white/50`, fontWeight 500.",
            ]}
          >
            <div className="w-full max-w-[440px] flex flex-col">
              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                <span className="text-[12px] text-white/40" style={{ fontWeight: 400 }}>Default Input/Output Token</span>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>sGHO</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                <span className="text-[12px] text-white/40" style={{ fontWeight: 400 }}>APY</span>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>5.96%</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[12px] text-white/40" style={{ fontWeight: 400 }}>Swap Fee</span>
                <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>0.04%</span>
              </div>
              <div className="mt-3">
                <span className="text-[12px] text-white/50 block mb-3" style={{ fontWeight: 500 }}>Pool Composition</span>
                <div className="relative w-full h-[16px] rounded-[6px] overflow-hidden bg-white/[0.03]">
                  <div className="absolute left-0 top-0 bottom-0 bg-[#6988ff]" style={{ width: "86.17%" }} />
                  <div className="absolute right-0 top-0 bottom-0 bg-[#00f99b]" style={{ width: "13.82%" }} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-white/50" style={{ fontWeight: 500 }}>86.17% ($1.2M)</span>
                  <span className="text-[11px] text-white/50" style={{ fontWeight: 500 }}>13.82% ($185.8K)</span>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 18. Activity Table Row ─── */}
          <ComponentCard
            title="Activity Table (Orders / History)"
            instructions={[
              "Tabs: 'Open Orders' and 'History' — same pattern as Swap/Limit toggle (text-based, underline indicator).",
              "Column headers: `text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider`, fontWeight 500.",
              "Cell values: `text-[11px] sm:text-[12px] text-white`, fontWeight 500.",
              "Side badge (Buy/Sell): Buy = `bg-[#00f99b]/10 text-[#00f99b]`, Sell = `bg-[#ef6b6b]/10 text-[#ef6b6b]`. 10px, fw600, px-[6px] py-[1px] rounded-full.",
              "Status badge: Open = `bg-white/[0.06] text-white/50`, Partial = `bg-[#f4c071]/10 text-[#f4c071]`. 10px, fw500, rounded-full.",
              "Cancel button: `text-[10px] text-[#ef6b6b]/60 hover:text-[#ef6b6b] border border-[#ef6b6b]/15 hover:border-[#ef6b6b]/40 rounded-md px-2 py-[3px]`, fw500.",
              "Empty state: 'No open orders' — `text-[12px] text-white/20`, fw400, py-6 centered.",
              "Alternating rows: odd rows `bg-white/[0.02]`.",
            ]}
          >
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center px-[6px] py-[1px] rounded-full text-[10px] bg-[#00f99b]/10 text-[#00f99b]" style={{ fontWeight: 600 }}>Buy</span>
                <span className="inline-flex items-center px-[6px] py-[1px] rounded-full text-[10px] bg-[#ef6b6b]/10 text-[#ef6b6b]" style={{ fontWeight: 600 }}>Sell</span>
                <span className="inline-flex items-center px-[6px] py-[1px] rounded-full text-[10px] bg-white/[0.06] text-white/50" style={{ fontWeight: 500 }}>Open</span>
                <span className="inline-flex items-center px-[6px] py-[1px] rounded-full text-[10px] bg-[#f4c071]/10 text-[#f4c071]" style={{ fontWeight: 500 }}>Partial</span>
                <button className="text-[10px] text-[#ef6b6b]/60 hover:text-[#ef6b6b] border border-[#ef6b6b]/15 hover:border-[#ef6b6b]/40 rounded-md px-2 py-[3px] transition-all" style={{ fontWeight: 500 }}>Cancel</button>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 19. InfoTooltip ─── */}
          <ComponentCard
            title="InfoTooltip"
            instructions={[
              "Trigger: InfoIcon SVG (12x12, imported path, fill white). Wrapped in `<button>` with onMouseEnter/onMouseLeave handlers.",
              "Tooltip container: `absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-[220px] px-3 py-2 bg-[#2a2a2e] border border-white/[0.12] rounded-lg shadow-xl`.",
              "Arrow: `absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2a2a2e] border-t border-l border-white/[0.12] rotate-45`.",
              "Text: `text-[11px] text-white/80 leading-relaxed`, fontWeight 400.",
              "Used alongside header stat labels (Maturity, Default Token, Max APY, Max Yield Leverage) and metric labels (Earn Yield On, Implied APY Impact, Yield Leverage).",
            ]}
          >
            <div className="relative inline-block">
              <div className="px-3 py-2 bg-[#2a2a2e] border border-white/[0.12] rounded-lg shadow-xl w-[220px]">
                <span className="text-[11px] text-white/80 leading-relaxed" style={{ fontWeight: 400 }}>
                  The default token is the underlying asset that will be returned to PT holders in case of default.
                </span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 20. Limit Order Rate Signal ─── */}
          <ComponentCard
            title="Limit Order Rate Signal"
            instructions={[
              "Container: `flex items-center gap-1.5 mt-0.5 px-1`.",
              "Icon: 14x14 SVG circle. Worse = stroke #f59e0b (warning). Better = stroke #00f99b (check). Neutral = stroke #a1a1aa (dash).",
              "Text: `text-[10px]`, fontWeight 400. Color matches icon.",
              "Messages: 'Worse than market rate (5.61%)', 'Better than market rate (5.61%)', 'Equal to market rate (5.61%)'.",
              "Appears below the 'Buy/Sell PT at Implied APY' input field in Limit order mode.",
            ]}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#f59e0b" strokeWidth="1.2" />
                  <path d="M7 4v3.5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="7" cy="9.75" r="0.65" fill="#f59e0b" />
                </svg>
                <span className="text-[10px]" style={{ fontWeight: 400, color: "#f59e0b" }}>Worse than market rate (5.61%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#00f99b" strokeWidth="1.2" />
                  <path d="M4.5 7l1.75 1.75L9.5 5.25" stroke="#00f99b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px]" style={{ fontWeight: 400, color: "#00f99b" }}>Better than market rate (5.61%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#a1a1aa" strokeWidth="1.2" />
                  <path d="M4.5 7h5" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span className="text-[10px]" style={{ fontWeight: 400, color: "#a1a1aa" }}>Equal to market rate (5.61%)</span>
              </div>
            </div>
          </ComponentCard>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ─── TASK 1: Toggle Patterns ─────────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}

          {/* ─── 21. Pill Tab Switch ─── */}
          <ComponentCard
            title="Pill Tab Switch"
            instructions={[
              "Outer container: `flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px]`.",
              "Each `<button>`: `flex-1 py-[6px] rounded-[4px] text-[12px] transition-colors text-center`.",
              "Active state: `bg-white/[0.1] text-white`, fontWeight 500.",
              "Inactive state: `text-white/35 hover:text-white/55`, fontWeight 400.",
              "Used for binary choices: Deposit/Withdraw (MetaVault), Swap/Limit (to be migrated), etc.",
              "Variant with accent fill: active button gets `background: accentColor` and `color: #191919` instead of `bg-white/[0.1] text-white`. Used in MetaVault deposit panel.",
              "This is a canonical Tier-2 toggle. Contrast with Asset Type Toggle (Tier-1, full-width, bg-[#191919]).",
            ]}
          >
            <div className="flex flex-col gap-4 w-full max-w-[440px]">
              <div>
                <span className="text-[10px] text-white/25 block mb-2" style={{ fontWeight: 400 }}>Standard</span>
                <div className="flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px] max-w-[260px]">
                  {(["deposit", "withdraw"] as const).map((tab) => {
                    const isActive = demoPillTab === tab;
                    return (
                      <button key={tab} onClick={() => setDemoPillTab(tab)} className={`flex-1 py-[6px] rounded-[4px] text-[12px] transition-colors text-center ${isActive ? "bg-white/[0.1] text-white" : "text-white/35 hover:text-white/55"}`} style={{ fontWeight: isActive ? 500 : 400 }}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/25 block mb-2" style={{ fontWeight: 400 }}>Accent Fill (MetaVault)</span>
                <div className="flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px] max-w-[260px]">
                  {(["deposit", "withdraw"] as const).map((tab) => {
                    const isActive = demoPillTab === tab;
                    return (
                      <button key={`accent-${tab}`} onClick={() => setDemoPillTab(tab)} className={`flex-1 py-[6px] rounded-[4px] text-[12px] transition-colors text-center ${isActive ? "text-[#191919]" : "text-white/35 hover:text-white/55"}`} style={{ fontWeight: isActive ? 500 : 400, background: isActive ? "#00f99b" : "transparent" }}>
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 22. Segmented Filter ─── */}
          <ComponentCard
            title="Segmented Filter"
            instructions={[
              "Outer container: `flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-[8px] p-[2px]`.",
              "Each `<button>`: `px-2.5 py-[3px] rounded-[6px] text-[10px] transition-colors`.",
              "Active state: `bg-white/[0.08] text-white`, fontWeight 500.",
              "Inactive state: `text-white/40 hover:text-white/60`, fontWeight 400.",
              "Used for time-range selectors (1W, 1M, 3M, 6M, 1Y, All) and Custom/All toggles.",
              "Differs from Pill Tab Switch: has outer border, smaller text (10px vs 12px), more options (up to 6+), lighter bg.",
            ]}
          >
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] text-white/25 block mb-2" style={{ fontWeight: 400 }}>Time Range</span>
                <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-[8px] p-[2px]">
                  {["1W", "1M", "3M", "6M", "1Y", "All"].map((r) => (
                    <button key={r} onClick={() => setDemoSegmented(r)} className={`px-2.5 py-[3px] rounded-[6px] text-[10px] transition-colors ${demoSegmented === r ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"}`} style={{ fontWeight: demoSegmented === r ? 500 : 400 }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/25 block mb-2" style={{ fontWeight: 400 }}>Minimal (Custom / All)</span>
                <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-[8px] p-[2px]">
                  {["Custom", "All"].map((r) => (
                    <button key={r} onClick={() => setDemoSegmented(r)} className={`px-2.5 py-[3px] rounded-[6px] text-[10px] transition-colors ${demoSegmented === r ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"}`} style={{ fontWeight: demoSegmented === r ? 500 : 400 }}>{r}</button>
                  ))}
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ─── TASK 2: Table Primitives ─────────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}

          {/* ─── 23. Token Circle (Generic) ─── */}
          <ComponentCard
            title="Token Circle (Generic)"
            instructions={[
              "Container: `rounded-full flex items-center justify-center shrink-0` with style `width/height/background`.",
              "Content: `<span>` text-white font-['Inter'], fontSize = size * 0.38 (single char) or size * 0.28 (multi-char), fontWeight 700.",
              "Default size: 32px (Pools table). SmallTokenCircle: 20px (IBT column). Chain icon: 16px (separate, not overlapping).",
              "Color + character identify the token (e.g. A = Avant red, Y = Yearn blue, Ξ = Ethereum).",
              "Chain icon placed before the token circle in Pool rows — separate elements, not an overlap stack.",
            ]}
          >
            <div className="flex items-center gap-4">
              {[
                { char: "A", color: "#ef4444", label: "Avant (32px)", size: 32 },
                { char: "Y", color: "#3b82f6", label: "Yearn (32px)", size: 32 },
                { char: "Ξ", color: "#627EEA", label: "ETH (16px)", size: 16 },
                { char: "✦", color: "#f97316", label: "Firelight (20px)", size: 20 },
                { char: "B", color: "#3b82f6", label: "BOLD (20px)", size: 20 },
                { char: "◆", color: "#dc2626", label: "Flare (16px)", size: 16 },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1.5">
                  <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: t.size, height: t.size, background: t.color }}>
                    <span className="text-white font-['Inter']" style={{ fontSize: t.size * (t.char.length > 1 ? 0.28 : 0.38), fontWeight: 700 }}>{t.char}</span>
                  </div>
                  <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{t.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 16, height: 16, background: "#8b5cf6" }}>
                    <span className="text-white font-['Inter']" style={{ fontSize: 7, fontWeight: 700 }}>◆</span>
                  </div>
                  <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: "#ef4444" }}>
                    <span className="text-white font-['Inter']" style={{ fontSize: 12, fontWeight: 700 }}>A</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Chain + Token</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 24. Sort Header ─── */}
          <ComponentCard
            title="Sort Header (Table Column)"
            instructions={[
              "Container: `flex items-center gap-1 cursor-pointer select-none group`.",
              "Label: `text-[10px] sm:text-[11px] text-white/40 uppercase tracking-wider`, fontWeight 500.",
              "Sort indicator: SVG 8x10 with two triangles (up at y=0.5, down at y=9.5).",
              "Neutral: both fill-white/15. Asc: up fill-white/60. Desc: down fill-white/60.",
              "onClick cycles: neutral → desc → asc → neutral.",
              "Used in Pools, Activity, and Positions table column headers.",
            ]}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Pool</span>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M4 0.5L7 3.5H1L4 0.5Z" fill="rgba(255,255,255,0.15)" /><path d="M4 9.5L1 6.5H7L4 9.5Z" fill="rgba(255,255,255,0.15)" /></svg>
              </div>
              <button onClick={() => setDemoSortDir(demoSortDir === "desc" ? "asc" : "desc")} className="flex items-center gap-1 cursor-pointer">
                <span className="text-[11px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Max APY</span>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M4 0.5L7 3.5H1L4 0.5Z" fill={demoSortDir === "asc" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"} /><path d="M4 9.5L1 6.5H7L4 9.5Z" fill={demoSortDir === "desc" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)"} /></svg>
              </button>
            </div>
          </ComponentCard>

          {/* ─── 25. Pool Table Row ─── */}
          <ComponentCard
            title="Pool Table Row"
            instructions={[
              "Row: `flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer group min-w-[600px]`.",
              "Pool cell (w-[24%] min-w-[180px]): 16px chain circle (separate, not overlapping) + 32px TokenCircle + name (13px white fw500) + protocol (10px white/30 fw400).",
              "Max APY (w-[14%] min-w-[90px]): `text-[13px] text-[#00f99b]` fw500 with `borderBottom: '1px dotted rgba(0,249,155,0.35)'`. Has hover APY breakdown tooltip.",
              "Default Token (w-[18%] min-w-[120px]): 20px SmallTokenCircle + label 13px white/70 fw400.",
              "Liquidity (w-[18%] min-w-[100px]): 13px white fw500. Formatted: $3.2M.",
              "Expiry (w-[18%] min-w-[100px]): 13px white/50 fw400.",
              "Mobile: `overflow-x-auto` wrapper with `min-w-[600px]` on inner div.",
            ]}
          >
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="min-w-[600px]">
                <div className="flex items-center py-2 border-b border-white/[0.06]">
                  <span className="w-[24%] text-[10px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Pool</span>
                  <span className="w-[14%] text-[10px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Max APY</span>
                  <span className="w-[18%] text-[10px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Default Token</span>
                  <span className="w-[18%] text-[10px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Liquidity</span>
                  <span className="w-[18%] text-[10px] text-white/40 uppercase tracking-wider" style={{ fontWeight: 500 }}>Expiry</span>
                </div>
                <div className="flex items-center px-4 py-[12px] border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <div className="w-[24%] flex items-center gap-2.5">
                    <div className="w-[16px] flex items-center justify-center shrink-0">
                      <div className="rounded-full flex items-center justify-center" style={{ width: 16, height: 16, background: "#8b5cf6" }}><span className="text-white text-[7px]" style={{ fontWeight: 700 }}>◆</span></div>
                    </div>
                    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: "#ef4444" }}><span className="text-white font-['Inter']" style={{ fontSize: 12, fontWeight: 700 }}>A</span></div>
                    <div className="flex flex-col gap-[1px]"><span className="text-[13px] text-white" style={{ fontWeight: 500 }}>avUSD</span><span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Avant</span></div>
                  </div>
                  <div className="w-[14%]"><span className="text-[13px] text-[#00f99b] cursor-default" style={{ fontWeight: 500, borderBottom: "1px dotted rgba(0,249,155,0.35)", paddingBottom: 1 }}>10.34%</span></div>
                  <div className="w-[18%] flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center" style={{ width: 20, height: 20, background: "#ef4444" }}><span className="text-white font-['Inter']" style={{ fontSize: 8, fontWeight: 700 }}>A</span></div>
                    <span className="text-[13px] text-white/70" style={{ fontWeight: 400 }}>avUSDx</span>
                  </div>
                  <div className="w-[18%]"><span className="text-[13px] text-white" style={{ fontWeight: 500 }}>$3.2M</span></div>
                  <div className="w-[18%]"><span className="text-[13px] text-white/50" style={{ fontWeight: 400 }}>May 15 2026</span></div>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ─── TASK 3: Filter / Search Widgets ─────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}

          {/* ─── 26. Search Input ─── */}
          <ComponentCard
            title="Search Input"
            instructions={[
              "Desktop: container `flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[8px] px-3 py-[7px] sm:flex-1 sm:max-w-[240px]`.",
              "SearchIcon (14x14 magnifying glass, stroke white/30) + `<input>` placed inline in same flex row — no absolute positioning.",
              "Input: `bg-transparent text-[12px] text-white/70 placeholder:text-white/25 outline-none w-full`, fontWeight 400. Placeholder: 'Search' (not 'Search pools...').",
              "Mobile: icon-only button `w-[36px] h-[34px] rounded-[8px] bg-white/[0.04] border border-white/[0.08]` with SearchIcon centered. Shown via `flex sm:hidden`.",
              "On mobile, tapping the icon button opens an expanded search row below the filter bar.",
            ]}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[8px] px-3 py-[7px] w-[240px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                <input type="text" placeholder="Search" value={demoSearchValue} onChange={(e) => setDemoSearchValue(e.target.value)} className="bg-transparent text-[12px] text-white/70 placeholder:text-white/25 outline-none w-full font-['Inter']" style={{ fontWeight: 400 }} />
              </div>
              <div className="w-[36px] h-[34px] rounded-[8px] bg-white/[0.04] border border-white/[0.08] flex items-center justify-center cursor-pointer hover:bg-white/[0.06] transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 27. Network Dropdown ─── */}
          <ComponentCard
            title="Network Dropdown"
            instructions={[
              "Trigger: `flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-[8px] px-2.5 sm:px-3 py-[7px]`.",
              "Button icon: stacked 3-icon overlap — first 3 network circles (18px each) with `marginLeft: -5px` on 2nd/3rd, `border-[1.5px] border-[#191919]` for overlap separation.",
              "Label (sm+ only): `hidden sm:inline text-[12px] text-white/70` fw400. Shows 'All Networks' or '{n} Networks'.",
              "ChevronDown: 10x7 SVG, stroke white/40.",
              "Dropdown panel: `absolute z-50 w-[220px] bg-[#1c1c1e] border border-white/[0.1] rounded-[10px] shadow-xl p-1.5`.",
              "Each option: `flex items-center gap-2.5 px-3 py-2 rounded-[6px] hover:bg-white/[0.04]` — 32px NetworkCircle + name 12px white/70. Multi-select with checkmarks.",
              "Used in Pools page for chain filtering.",
            ]}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[8px] px-2.5 py-[7px] cursor-pointer">
                <div className="flex items-center">
                  {[{ color: "#627EEA", char: "Ξ" }, { color: "#2d374b", char: "A" }, { color: "#ef4444", char: "OP" }].map((n, i) => (
                    <div key={i} className="rounded-full flex items-center justify-center shrink-0" style={{ width: 18, height: 18, backgroundColor: n.color, marginLeft: i > 0 ? -5 : 0, zIndex: 3 - i, position: "relative", border: "1.5px solid #191919" }}>
                      <span className="text-white" style={{ fontSize: n.char.length > 1 ? 6 : 8, fontWeight: 700 }}>{n.char}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[12px] text-white/70" style={{ fontWeight: 400 }}>All Networks</span>
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 1.5L5 5.5L9 1.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 28. Checkbox Filter ─── */}
          <ComponentCard
            title="Checkbox Filter (Dropdown)"
            instructions={[
              "Same trigger style as Network Dropdown.",
              "Checkbox: `w-[22px] h-[22px] rounded-[4px]`. Checked: `bg-white/[0.12] border border-white/[0.20]` + check SVG. Unchecked: `bg-white/[0.04] border border-white/[0.10]`.",
              "Check SVG: 12x12 path `M2.5 6L5 8.5L9.5 3.5`, stroke white, strokeWidth 1.5.",
              "Label: `text-[12px] text-white/60` fw400.",
              "Used in Pools 'Filters' dropdown: 'Hide expiring soon', 'Hide negative APY', 'Hide low TVL'.",
            ]}
          >
            <div className="flex flex-col gap-2 w-full max-w-[280px] bg-[#1c1c1e] border border-white/[0.1] rounded-[10px] p-3">
              <span className="text-[10px] text-white/30 uppercase tracking-wider mb-1" style={{ fontWeight: 500 }}>Filters</span>
              {[
                { label: "Hide expiring soon", checked: true },
                { label: "Hide negative APY", checked: false },
                { label: "Hide low TVL", checked: false },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 px-1 py-1.5 cursor-pointer">
                  <div className={`w-[22px] h-[22px] rounded-[4px] flex items-center justify-center shrink-0 ${f.checked ? "bg-white/[0.12] border border-white/[0.20]" : "bg-white/[0.04] border border-white/[0.10]"}`}>
                    {f.checked && (<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                  </div>
                  <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>{f.label}</span>
                </div>
              ))}
            </div>
          </ComponentCard>

          {/* ─── 29. Quick Filter Tabs (Segmented Bar) ─── */}
          <ComponentCard
            title="Quick Filter Tabs (Category — Segmented Bar)"
            instructions={[
              "Container: `flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden shrink-0`.",
              "Each `<button>`: `px-2 sm:px-3 py-[7px] text-[12px] transition-all`. Joined segments, NOT separated pills.",
              "Separator: `border-l border-white/[0.08]` on all buttons except the first.",
              "Active: `bg-white/[0.08] text-white` fw500. Inactive: `text-white/40 hover:text-white/60 hover:bg-white/[0.04]` fw400.",
              "Labels: 'All', 'ETH', 'BTC', 'Stables'. Used in Pools for category filtering.",
              "This is a connected segmented bar — different from the standalone Segmented Filter (item 22) which uses separated rounded pills.",
            ]}
          >
            <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden">
              {["All", "ETH", "BTC", "Stables"].map((cat, i) => (
                <button key={cat} className={`px-3 py-[7px] text-[12px] transition-all ${i === 0 ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"} ${i > 0 ? "border-l border-white/[0.08]" : ""}`} style={{ fontWeight: i === 0 ? 500 : 400 }}>{cat}</button>
              ))}
            </div>
          </ComponentCard>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ─── TASK 4: MetaVault Card Elements ─────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}

          {/* ─── 30. Sparkline ─── */}
          <ComponentCard
            title="Sparkline (Mini Chart)"
            instructions={[
              "SVG: `width=100 height=40 viewBox='0 0 100 40'`.",
              "Data mapped to points. Gradient fill: vertical linearGradient stopColor={color} 0.25→0.",
              "Polygon for fill, Polyline for stroke (strokeWidth 1.5, strokeLinecap round).",
              "Color matches vault accent: green #00f99b, orange #ff9900.",
              "Used in MetaVault listing cards for 7-day APY trend.",
            ]}
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <svg width="100" height="40" viewBox="0 0 100 40"><defs><linearGradient id="spark-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00f99b" stopOpacity="0.25" /><stop offset="100%" stopColor="#00f99b" stopOpacity="0" /></linearGradient></defs><polygon points="0,40 0,30 14,25 28,28 42,20 56,15 70,18 85,10 100,5 100,40" fill="url(#spark-g)" /><polyline points="0,30 14,25 28,28 42,20 56,15 70,18 85,10 100,5" fill="none" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Uptrend</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg width="100" height="40" viewBox="0 0 100 40"><defs><linearGradient id="spark-o" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff9900" stopOpacity="0.25" /><stop offset="100%" stopColor="#ff9900" stopOpacity="0" /></linearGradient></defs><polygon points="0,40 0,15 14,18 28,12 42,20 56,25 70,22 85,28 100,30 100,40" fill="url(#spark-o)" /><polyline points="0,15 14,18 28,12 42,20 56,25 70,22 85,28 100,30" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>Downtrend</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 31. MetaVault Card ─── */}
          <ComponentCard
            title="MetaVault Card"
            instructions={[
              "Container: `bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-5 hover:border-white/[0.12] transition-all cursor-pointer flex flex-col gap-4`.",
              "Top border accent: `style={{ borderTopWidth: 2, borderTopColor: vault.sparkColor }}` — colored 2px line at top edge.",
              "Header row: VaultIcon (40px) + name column: name (14px white fw600 truncate) + curator (12px white/40 fw400).",
              "Middle row: `flex items-end justify-between` — left: MAX APY label (10px white/40 fw500 tracking-wider) + APY value (22px, fw600, color=sparkColor). Right: Sparkline (100x40).",
              "Bottom row: `border-t border-white/[0.06] pt-3` — left: TVL label + value (14px white fw500). Right: CHAIN label + chain name (13px white fw500) + ChainIcon (18px).",
              "Used on MetaVaults listing page. Grid: 1 col mobile, 2 md, 3 xl.",
            ]}
          >
            <div className="w-full max-w-[380px] bg-[#1c1c1e] border border-white/[0.06] rounded-[12px] p-5 hover:border-white/[0.12] transition-all cursor-pointer flex flex-col gap-4" style={{ borderTopWidth: 2, borderTopColor: "#00f99b" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2775ca] flex items-center justify-center shrink-0"><span className="text-white font-['Inter']" style={{ fontSize: 18, fontWeight: 700 }}>$</span></div>
                <div className="flex flex-col min-w-0"><span className="text-[14px] text-white truncate" style={{ fontWeight: 600 }}>vbUSDC Katana</span><span className="text-[12px] text-white/40" style={{ fontWeight: 400 }}>Clearstar</span></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[10px] text-white/40 tracking-wider" style={{ fontWeight: 500 }}>MAX APY</span>
                  <span className="text-[22px]" style={{ fontWeight: 600, color: "#00f99b" }}>40.02%</span>
                </div>
                <svg width="100" height="40" viewBox="0 0 100 40"><defs><linearGradient id="mv-sp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00f99b" stopOpacity="0.25" /><stop offset="100%" stopColor="#00f99b" stopOpacity="0" /></linearGradient></defs><polygon points="0,40 0,24 14,20 28,22 42,16 56,12 70,14 85,8 100,4 100,40" fill="url(#mv-sp)" /><polyline points="0,24 14,20 28,22 42,16 56,12 70,14 85,8 100,4" fill="none" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <div className="flex flex-col gap-[1px]"><span className="text-[10px] text-white/40 tracking-wider" style={{ fontWeight: 500 }}>TVL</span><span className="text-[14px] text-white" style={{ fontWeight: 500 }}>$963,794</span></div>
                <div className="flex flex-col items-end gap-[1px]"><span className="text-[10px] text-white/40 tracking-wider" style={{ fontWeight: 500 }}>CHAIN</span><div className="flex items-center gap-1.5"><span className="text-[13px] text-white" style={{ fontWeight: 500 }}>Katana</span><div className="w-[18px] h-[18px] rounded-full overflow-hidden bg-[#25272b] flex items-center justify-center shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M4 20L12 4L20 20H4Z" fill="#00f99b" /></svg></div></div></div>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 32. Allocation Bar ─── */}
          <ComponentCard
            title="Allocation Bar (Segmented)"
            instructions={[
              "Container: `flex items-center h-[6px] rounded-full overflow-hidden gap-[2px]`.",
              "Segments: `h-full rounded-full` with width % and accent color. Opacity: 1.0, 0.8, 0.6.",
              "Colors: PT=#00f99b, YT=#f4c071, LP=#d65ce9, MV=#ff9900.",
              "Labels below: colored dot (w-2 h-2) + label (10px white/40 fw400) + value (10px white/60 fw500).",
              "Used in MetaVault detail (strategies) and Portfolio (asset allocation).",
            ]}
          >
            <div className="w-full max-w-[440px]">
              <div className="flex items-center h-[6px] rounded-full overflow-hidden gap-[2px]">
                <div className="h-full rounded-full bg-[#00f99b]" style={{ width: "45%" }} />
                <div className="h-full rounded-full bg-[#f4c071]" style={{ width: "30%", opacity: 0.8 }} />
                <div className="h-full rounded-full bg-[#d65ce9]" style={{ width: "25%", opacity: 0.6 }} />
              </div>
              <div className="flex items-center gap-4 mt-2.5">
                {[{ label: "PT-aUSDC", pct: "45%", color: "#00f99b" }, { label: "PT-sGHO", pct: "30%", color: "#f4c071" }, { label: "LP sGHO/USDC", pct: "25%", color: "#d65ce9" }].map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-[10px] text-white/40" style={{ fontWeight: 400 }}>{s.label}</span>
                    <span className="text-[10px] text-white/60" style={{ fontWeight: 500 }}>{s.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </ComponentCard>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ─── TASK 5: Navigation & Badges ─────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}

          {/* ─── 33. Sidebar Nav Item ─── */}
          <ComponentCard
            title="Sidebar Nav Item"
            instructions={[
              "Container: `flex items-center gap-2 w-full rounded-[6px] px-0 py-[5px] transition-colors text-left`.",
              "Active: no background class. Text: `text-[12px] text-white` fw500. Icon: full opacity SVG.",
              "Inactive: `hover:bg-white/[0.03]`. Text: `text-[12px] text-white/70` fw400. Dimmed items: `text-white/25`.",
              "Icon container: `shrink-0 w-6 h-6 flex items-center justify-center`. 20x20 SVG icon inside.",
              "Badge: `text-white/30 text-[9px] px-1.5 py-[1px] rounded-full border border-white/[0.1] bg-white/[0.03]` fw500. Subtle outlined style — NOT green/filled.",
              "Active indicator dot (optional): `w-[6px] h-[6px] rounded-full` with color string.",
              "No left active indicator bar. No background on active state. Compact `py-[5px]` rows.",
            ]}
          >
            <div className="flex flex-col gap-0 w-full max-w-[240px] bg-[#191919] rounded-[10px] p-2">
              <div className="flex items-center gap-2 w-full rounded-[6px] px-0 py-[5px]">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>
                </div>
                <span className="text-[12px] text-white whitespace-nowrap" style={{ fontWeight: 500 }}>Trading</span>
              </div>
              <div className="flex items-center gap-2 w-full rounded-[6px] px-0 py-[5px] hover:bg-white/[0.03] transition-colors cursor-pointer">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </div>
                <span className="text-[12px] text-white/70 whitespace-nowrap" style={{ fontWeight: 400 }}>Pools</span>
              </div>
              <div className="flex items-center gap-2 w-full rounded-[6px] px-0 py-[5px] hover:bg-white/[0.03] transition-colors cursor-pointer">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15 9H21L16 14L18 21L12 17L6 21L8 14L3 9H9L12 2Z" /></svg>
                </div>
                <span className="text-[12px] text-white/25 whitespace-nowrap" style={{ fontWeight: 400 }}>MetaVaults</span>
                <span className="text-white/30 text-[9px] px-1.5 py-[1px] rounded-full border border-white/[0.1] bg-white/[0.03]" style={{ fontWeight: 500 }}>Preview Only</span>
              </div>
            </div>
          </ComponentCard>

          {/* ─── 34. Chain Badge ─── */}
          <ComponentCard
            title="Chain Badge"
            instructions={[
              "Container: `flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-white/[0.04] border border-white/[0.06]`.",
              "Icon: 16px circle with chain color + icon. Label: `text-[11px] text-white/60` fw400.",
              "Used in MetaVault cards, vault detail, pool info.",
            ]}
          >
            <div className="flex items-center gap-3">
              {[
                { name: "Katana", color: "#25272b", icon: <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M4 20L12 4L20 20H4Z" fill="#00f99b" /></svg> },
                { name: "Base", color: "#0052ff", icon: <span className="text-[7px] text-white" style={{ fontWeight: 700 }}>B</span> },
                { name: "Flare", color: "#e62058", icon: <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="white" /></svg> },
                { name: "Ethereum", color: "#627EEA", icon: <span className="text-[7px] text-white" style={{ fontWeight: 700 }}>Ξ</span> },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-white/[0.04] border border-white/[0.06]">
                  <div className="w-[16px] h-[16px] rounded-full flex items-center justify-center shrink-0" style={{ background: c.color }}>{c.icon}</div>
                  <span className="text-[11px] text-white/60" style={{ fontWeight: 400 }}>{c.name}</span>
                </div>
              ))}
            </div>
          </ComponentCard>

          {/* ─── 35. MaxApyTooltip ─── */}
          <ComponentCard
            title="MaxApyTooltip (Rich APY Breakdown)"
            instructions={[
              "Trigger: `<span>` with `color: accentColor, borderBottom: '1px dotted rgba(0,249,155,0.35)', cursor: help`. fontWeight 500.",
              "Container: `w-[260px] bg-[#232326] border border-white/[0.08] rounded-[10px] shadow-xl`. Appears on hover with safe bridge spacer.",
              "Total row: `px-4 pt-3.5 pb-2.5 border-b border-white/[0.06]` — 'Total' 12px white fw600 + value 12px white fw600. Supports range values (e.g. '36.29-36.63%').",
              "Categories: each has header row (label 11px white/60 fw400 + value 11px white/60 fw500), then mixed sub-items:",
              "── Token with icon (pl-3): 16px circle icon + name 11px white/50 fw400 + value 11px white/50 fw500.",
              "── Badge pill (pl-3): `inline-block text-[11px] text-white/50 px-2.5 py-[3px] rounded-[6px] bg-white/[0.06] border border-white/[0.08]` fw500. E.g. 'Drops', 'InfiniFi points'.",
              "── Plain text row (pl-3): label 11px white/50 fw400 + value 11px white/50 fw500. E.g. 'KAT App Rewards', 'KAT Base'.",
              "Optional highlight badges: colored bg `{color}12` pill with 18px icon + label.",
              "Footnote: 10px white/30 + Note: 10px white/25. Separated by border-t.",
            ]}
          >
            <div className="flex flex-col gap-4 w-full">
              <div>
                <span className="text-[10px] text-white/25 block mb-2" style={{ fontWeight: 400 }}>Pools (Simple)</span>
                <div className="w-[200px] bg-[#1c1c1e] border border-white/[0.1] rounded-[8px] p-3 shadow-lg">
                  <div className="text-[10px] text-white/40 mb-2" style={{ fontWeight: 500 }}>APY BREAKDOWN</div>
                  <div className="flex flex-col gap-1.5">
                    {[{ l: "PT Fixed Rate", v: "4.12%", c: "#00f99b" }, { l: "LP Fees", v: "0.18%", c: "white" }, { l: "LP Rewards", v: "2.82%", c: "#f4c071" }].map((r) => (
                      <div key={r.l} className="flex items-center justify-between"><span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>{r.l}</span><span className="text-[11px]" style={{ fontWeight: 500, color: r.c }}>{r.v}</span></div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between"><span className="text-[11px] text-white/60" style={{ fontWeight: 500 }}>Total Max APY</span><span className="text-[11px]" style={{ fontWeight: 600, color: "#00f99b" }}>10.34%</span></div>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/25 block mb-2" style={{ fontWeight: 400 }}>MetaVault (Rich — matches screenshot)</span>
                <div className="w-[260px] bg-[#232326] border border-white/[0.08] rounded-[10px] shadow-xl">
                  {/* Total */}
                  <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-white/[0.06]">
                    <span className="text-white text-[12px]" style={{ fontWeight: 600 }}>Total</span>
                    <span className="text-white text-[12px]" style={{ fontWeight: 600 }}>36.29-36.63%</span>
                  </div>
                  <div className="px-4 py-2.5 flex flex-col gap-0">
                    {/* NAV Performance */}
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-white/60 text-[11px]" style={{ fontWeight: 400 }}>NAV Performance</span>
                      <span className="text-white/60 text-[11px]" style={{ fontWeight: 500 }}>3.28%</span>
                    </div>
                    {/* Pool Rewards */}
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-white/60 text-[11px]" style={{ fontWeight: 400 }}>Pool Rewards</span>
                      <span className="text-white/60 text-[11px]" style={{ fontWeight: 500 }}>33.01-33.35%</span>
                    </div>
                    {/* Token with icon */}
                    <div className="flex items-center justify-between py-1 pl-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#0d9488] flex items-center justify-center shrink-0"><span className="text-white text-[7px]" style={{ fontWeight: 700 }}>K</span></div>
                        <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>KAT</span>
                      </div>
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>0.93%</span>
                    </div>
                    {/* Badge pills */}
                    <div className="py-1 pl-3"><span className="inline-block text-[11px] text-white/50 px-2.5 py-[3px] rounded-[6px] bg-white/[0.06] border border-white/[0.08]" style={{ fontWeight: 500 }}>Drops</span></div>
                    <div className="py-1 pl-3"><span className="inline-block text-[11px] text-white/50 px-2.5 py-[3px] rounded-[6px] bg-white/[0.06] border border-white/[0.08]" style={{ fontWeight: 500 }}>InfiniFi points</span></div>
                    {/* Token with icon */}
                    <div className="flex items-center justify-between py-1 pl-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#b6509e] flex items-center justify-center shrink-0"><span className="text-white text-[7px]" style={{ fontWeight: 700 }}>S</span></div>
                        <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>SPECTRA</span>
                      </div>
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>0.22-0.55%</span>
                    </div>
                    {/* Plain text rows */}
                    <div className="flex items-center justify-between py-1 pl-3">
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>KAT App Rewards</span>
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>2.96%</span>
                    </div>
                    <div className="flex items-center justify-between py-1 pl-3">
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 400 }}>KAT Base</span>
                      <span className="text-white/50 text-[11px]" style={{ fontWeight: 500 }}>28.88%</span>
                    </div>
                  </div>
                  {/* Footnote */}
                  <div className="px-4 pb-3.5 pt-1 border-t border-white/[0.06]">
                    <p className="text-[10px] text-white/30 leading-[1.5] mt-1.5" style={{ fontWeight: 400 }}>Rewards are claimable via Portfolio page → All Rewards button.</p>
                    <p className="text-[10px] text-white/25 leading-[1.5] mt-1.5" style={{ fontWeight: 400 }}>Note: Distribution period may vary per reward.</p>
                  </div>
                </div>
              </div>
            </div>
          </ComponentCard>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* ─── TASK 6: Portfolio & Wallet ───────────────────────────── */}
          {/* ══════════════════════════════════════════════════════════════ */}

          {/* ─── 36. Portfolio Summary (Value + Ticker Bar) ─── */}
          <ComponentCard
            title="Portfolio Summary (Value + Ticker Bar)"
            instructions={[
              "Top section: label 'Total Portfolio Value' (10px white/35 uppercase tracking-wider fw500) + large value (28px white fw600, animated counter) + change (+$142.30 in 13px text-[#00f99b] fw500) + ChangePill.",
              "Breakdown ticker bar: `flex items-center px-3 sm:px-5 py-[6px] border-t border-b border-white/[0.06] overflow-x-auto scrollbar-hide`.",
              "Each ticker segment: colored dot (6px rounded-full) + label (11px white/35 fw400) + value (12px white/80 fw500). Segments separated by `border-r border-white/[0.06]`.",
              "Colors per type: PT=#00f99b, YT=#f4c071, LP=#d65ce9, MV=#ff9900, Claimable=#6988ff.",
              "NOTE: No donut chart — this is a text-only summary with horizontal ticker breakdown.",
            ]}
          >
            <div className="w-full max-w-[600px]">
              <div className="px-3 pb-2">
                <span className="text-[10px] text-white/35 uppercase tracking-wider block mb-1" style={{ fontWeight: 500 }}>Total Portfolio Value</span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[28px] text-white" style={{ fontWeight: 600 }}>$31,742.58</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-[#00f99b]" style={{ fontWeight: 500 }}>+$142.30</span>
                    <ChangePill value="+0.45%" color="green" />
                  </div>
                </div>
              </div>
              <div className="flex items-center py-[6px] px-3 border-t border-b border-white/[0.06] overflow-x-auto scrollbar-hide gap-0">
                {[
                  { label: "PT Value", value: "$14,245.22", color: "#00f99b" },
                  { label: "YT Value", value: "$500.14", color: "#f4c071" },
                  { label: "LP Value", value: "$16,997.22", color: "#d65ce9" },
                  { label: "MV Value", value: "$16,724.53", color: "#ff9900" },
                  { label: "Claimable", value: "$12.84", color: "#6988ff" },
                ].map((item, i) => (
                  <div key={item.label} className={`flex items-center gap-2 shrink-0 ${i === 0 ? "pr-5" : "px-5"} ${i < 4 ? "border-r border-white/[0.06]" : ""}`}>
                    <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>{item.label}</span>
                    <span className="text-[12px] text-white/80" style={{ fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ComponentCard>

          {/* ─── 37. Position Tab Bar ─── */}
          <ComponentCard
            title="Position Tab Bar"
            instructions={[
              "Container: `flex items-center gap-0 px-3 sm:px-4 border-b border-white/[0.06] shrink-0 overflow-x-auto scrollbar-hide`.",
              "Each tab: `relative px-4 py-[10px] transition-colors whitespace-nowrap shrink-0`.",
              "Active: text-white fw500 + colored bottom bar `absolute bottom-0 left-4 right-4 h-[2px] rounded-full`.",
              "Inactive: text-white/35 hover:text-white/60 fw400.",
              "Label: `text-[12px]` + count badge pill: `ml-1.5 text-[10px] px-[5px] py-[1px] rounded-full` fw500. Active: bg=`{accent}18` color={accent}. Inactive: bg=rgba(255,255,255,0.04) color=rgba(255,255,255,0.25).",
              "Bottom indicator color: PT=#00f99b, YT=#f4c071, LP=#d65ce9, MV=#ff9900, Rewards=#6988ff.",
              "Used in Portfolio positions table.",
            ]}
          >
            <div className="flex items-center gap-0 border-b border-white/[0.06] w-full overflow-x-auto scrollbar-hide">
              {([
                { key: "pt", label: "PT", count: 3, color: "#00f99b" },
                { key: "yt", label: "YT", count: 2, color: "#f4c071" },
                { key: "lp", label: "LP", count: 4, color: "#d65ce9" },
                { key: "mv", label: "MetaVaults", count: 2, color: "#ff9900" },
                { key: "rewards", label: "Rewards", count: 1, color: "#6988ff" },
              ] as const).map((tab) => {
                const isActive = demoPositionTab === tab.key;
                const accent = tab.color;
                return (
                  <button key={tab.key} onClick={() => setDemoPositionTab(tab.key as typeof demoPositionTab)} className={`relative px-4 py-[10px] transition-colors whitespace-nowrap shrink-0 ${isActive ? "text-white" : "text-white/35 hover:text-white/60"}`}>
                    <span className="text-[12px]" style={{ fontWeight: isActive ? 500 : 400 }}>{tab.label}</span>
                    <span className="ml-1.5 text-[10px] px-[5px] py-[1px] rounded-full" style={{ fontWeight: 500, backgroundColor: isActive ? `${accent}18` : "rgba(255,255,255,0.04)", color: isActive ? accent : "rgba(255,255,255,0.25)" }}>{tab.count}</span>
                    {isActive && <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full" style={{ backgroundColor: accent }} />}
                  </button>
                );
              })}
            </div>
          </ComponentCard>

          {/* ─── 38. Connect Wallet Button ─── */}
          <ComponentCard
            title="Connect Wallet Button"
            instructions={[
              "Container: `w-full py-3 rounded-[8px] text-[13px] flex items-center justify-center gap-2`.",
              "Active: `background: accentColor, color: #191919` fw600. Wallet icon: 16x16 rect+line stroke #191919.",
              "Disabled: `bg-[#313032]`, label `text-[#6f797f]` fw600, no icon.",
              "Used in MetaVault deposit and standalone prompts.",
            ]}
          >
            <div className="flex items-center gap-3">
              <button className="py-3 px-8 rounded-[8px] text-[13px] flex items-center justify-center gap-2" style={{ fontWeight: 600, background: "#00f99b", color: "#191919" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                Connect Wallet
              </button>
              <button className="py-3 px-8 rounded-[8px] text-[13px] flex items-center justify-center gap-2" style={{ fontWeight: 600, background: "#ff9900", color: "#191919" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                Connect Wallet
              </button>
              <button className="py-3 px-8 rounded-[8px] text-[13px] flex items-center justify-center gap-2 bg-[#313032]" style={{ fontWeight: 600 }}>
                <span className="text-[#6f797f]">Connect Wallet</span>
              </button>
            </div>
          </ComponentCard>

        </div>
      </div>
    </div>
  );
}