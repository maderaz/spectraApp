import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY & FONT GLOBAL RULES — Giant Reference Card
// ═══════════════════════════════════════════════════════════════

interface TypoRule {
  element: string;
  preview: string;
  size: string;
  weight: number;
  color: string;
  colorClass: string;
  extras?: string;
}

function TypoSwatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[14px] h-[14px] rounded-[3px] shrink-0 border border-white/[0.08]" style={{ backgroundColor: hex }} />
      <span className="text-[10px] text-white/50 font-mono" style={{ fontWeight: 400 }}>{label}</span>
    </div>
  );
}

function TypoRow({ rule }: { rule: TypoRule }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 py-[10px] border-b border-white/[0.04] last:border-b-0">
      {/* Element name */}
      <div className="sm:w-[200px] shrink-0">
        <span className="text-[11px] text-white/50" style={{ fontWeight: 500 }}>{rule.element}</span>
      </div>
      {/* Live preview */}
      <div className="flex-1 min-w-0">
        <span
          className={`font-['Inter'] ${rule.colorClass}`}
          style={{ fontSize: rule.size, fontWeight: rule.weight }}
        >
          {rule.preview}
        </span>
      </div>
      {/* Specs */}
      <div className="sm:w-[280px] shrink-0 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[10px] text-white/30 font-mono" style={{ fontWeight: 400 }}>{rule.size}</span>
        <span className="text-[10px] text-white/30 font-mono" style={{ fontWeight: 400 }}>fw{rule.weight}</span>
        <span className="text-[10px] text-white/30 font-mono" style={{ fontWeight: 400 }}>{rule.color}</span>
        {rule.extras && <span className="text-[10px] text-white/20 font-mono" style={{ fontWeight: 400 }}>{rule.extras}</span>}
      </div>
    </div>
  );
}

function TypoSection({ title, rules }: { title: string; rules: TypoRule[] }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1 mt-3 first:mt-0">
        <span className="text-[10px] text-white/25 uppercase tracking-widest shrink-0" style={{ fontWeight: 600 }}>{title}</span>
        <div className="flex-1 border-t border-white/[0.04]" />
      </div>
      {rules.map((r, i) => <TypoRow key={i} rule={r} />)}
    </div>
  );
}

// ─── Data ───

const HEADINGS: TypoRule[] = [
  { element: "Page Title", preview: "Fixed Rate", size: "16px", weight: 600, color: "white", colorClass: "text-white" },
  { element: "Page Subtitle", preview: "Secure your future yield at a fixed rate.", size: "13px", weight: 400, color: "white/40", colorClass: "text-white/40", extras: "max-w-[600px]" },
  { element: "Section Header (Cards)", preview: "VAULT", size: "11px", weight: 500, color: "white/30", colorClass: "text-white/30", extras: "uppercase tracking-wider" },
  { element: "Card Title (MetaVault)", preview: "Gauntlet USDC Prime", size: "14px", weight: 500, color: "white", colorClass: "text-white" },
  { element: "Big Stat Number", preview: "12.4%", size: "22px", weight: 600, color: "accent", colorClass: "text-[#00f99b]", extras: "MetaVault MAX APY" },
];

const DATA_LABELS: TypoRule[] = [
  { element: "Top Bar Stat Label", preview: "MATURITY", size: "10px", weight: 500, color: "white/35", colorClass: "text-white/35", extras: "uppercase tracking-wider" },
  { element: "Top Bar Stat Value", preview: "Jan 31, 2026", size: "13px", weight: 400, color: "white", colorClass: "text-white", extras: "sm: 13px" },
  { element: "Top Bar Accent (PT)", preview: "5.61%", size: "13px", weight: 600, color: "#00f99b", colorClass: "text-[#00f99b]", extras: "Max APY" },
  { element: "Top Bar Accent (YT)", preview: "x17.12", size: "13px", weight: 600, color: "#f4c071", colorClass: "text-[#f4c071]", extras: "Max Yield Leverage" },
  { element: "Ticker Bar Label", preview: "Liquidity", size: "11px", weight: 400, color: "white/35", colorClass: "text-white/35", extras: "leading-none" },
  { element: "Ticker Bar Value", preview: "$1.56M", size: "12px", weight: 600, color: "white", colorClass: "text-white", extras: "leading-none" },
  { element: "Ticker Bar Accent (IBT)", preview: "2.83%", size: "12px", weight: 600, color: "#6988ff", colorClass: "text-[#6988ff]", extras: "Underlying APY" },
  { element: "Ticker Bar Accent (Implied)", preview: "5.61%", size: "12px", weight: 600, color: "#00f99b", colorClass: "text-[#00f99b]", extras: "Implied APY" },
];

const TABLE_TEXT: TypoRule[] = [
  { element: "Table Column Header", preview: "POOL", size: "10-11px", weight: 500, color: "white/40", colorClass: "text-white/40", extras: "uppercase tracking-wider" },
  { element: "Table Cell — Primary", preview: "avUSD", size: "12px", weight: 500, color: "white", colorClass: "text-white", extras: "token name" },
  { element: "Table Cell — Secondary", preview: "Avant", size: "10px", weight: 400, color: "white/40", colorClass: "text-white/40", extras: "protocol name" },
  { element: "Table Cell — Numeric", preview: "$3.2M", size: "12px", weight: 500, color: "white", colorClass: "text-white" },
  { element: "Table Cell — APY (+)", preview: "10.27%", size: "12px", weight: 600, color: "#00f99b", colorClass: "text-[#00f99b]" },
  { element: "Table Cell — APY (–)", preview: "-2.14%", size: "12px", weight: 600, color: "#ef6b6b", colorClass: "text-[#ef6b6b]" },
  { element: "Table Cell — Leverage", preview: "x53.67", size: "12px", weight: 600, color: "#f4c071", colorClass: "text-[#f4c071]" },
  { element: "Table Cell — Date", preview: "May 15 2026", size: "12px", weight: 400, color: "white/50", colorClass: "text-white/50" },
];

const TRADING_PANEL: TypoRule[] = [
  { element: "Input Value", preview: "1,000", size: "16px", weight: 500, color: "white", colorClass: "text-white" },
  { element: "Input Placeholder", preview: "0", size: "16px", weight: 500, color: "#a1a1aa", colorClass: "text-[#a1a1aa]" },
  { element: "USD Estimate", preview: "\u2248$999.99", size: "10px", weight: 400, color: "white/30", colorClass: "text-white/30" },
  { element: "Token Selector Label", preview: "USDC", size: "13px", weight: 400, color: "white/60", colorClass: "text-white/60" },
  { element: "Balance Label", preview: "Balance:", size: "11px", weight: 400, color: "white/50", colorClass: "text-white/50" },
  { element: "Balance Value", preview: "12,345.67", size: "11px", weight: 500, color: "white/70", colorClass: "text-white/70" },
  { element: "Quick Button (25%/Max)", preview: "Max", size: "10px", weight: 400, color: "white/35", colorClass: "text-white/35", extras: "hover:white/55" },
  { element: "Section Label", preview: "Output", size: "12px", weight: 400, color: "white/50", colorClass: "text-white/50" },
  { element: "Output Token Name", preview: "PT-USDC-13/02/26", size: "13px", weight: 400, color: "white/70", colorClass: "text-white/70" },
  { element: "Output Value", preview: "1,002.74", size: "13px", weight: 500, color: "white", colorClass: "text-white" },
  { element: "Metric Row Label", preview: "Fixed APR / APY", size: "12px", weight: 400, color: "white/50", colorClass: "text-white/50" },
  { element: "Metric Row Value", preview: "8.33% / 8.68%", size: "12px", weight: 500, color: "white", colorClass: "text-white" },
  { element: "Metric Row (+)", preview: "+0.03%", size: "12px", weight: 500, color: "#00f99b", colorClass: "text-[#00f99b]", extras: "APY impact" },
  { element: "Detail Row Label", preview: "Min. Received", size: "11px", weight: 400, color: "white/35", colorClass: "text-white/35" },
  { element: "Detail Row Value", preview: "997.72 PT", size: "11px", weight: 500, color: "white/60", colorClass: "text-white/60" },
  { element: "CTA Button (active)", preview: "Buy PT", size: "13px", weight: 500, color: "#191919", colorClass: "text-[#191919]", extras: "on accent bg" },
  { element: "CTA Button (inactive)", preview: "Buy PT", size: "13px", weight: 500, color: "#6f797f", colorClass: "text-[#6f797f]", extras: "on #313032 bg" },
];

const UI_CONTROLS: TypoRule[] = [
  { element: "Segmented Active (T1)", preview: "Fix rate (PT)", size: "13px", weight: 500, color: "white", colorClass: "text-white", extras: "bg-white/[0.08] segmented" },
  { element: "Segmented Inactive (T1)", preview: "Yield Leverage (YT)", size: "13px", weight: 400, color: "white/40", colorClass: "text-white/40", extras: "hover:white/60" },
  { element: "Segmented Active (T2)", preview: "Buy", size: "12px", weight: 500, color: "white", colorClass: "text-white", extras: "bg-white/[0.08] segmented" },
  { element: "Segmented Inactive (T2)", preview: "Sell", size: "12px", weight: 400, color: "white/40", colorClass: "text-white/40", extras: "hover:white/60" },
  { element: "Tab Active (underline)", preview: "Swap", size: "12px", weight: 500, color: "white", colorClass: "text-white", extras: "2px bar" },
  { element: "Tab Inactive", preview: "Limit", size: "12px", weight: 400, color: "white/50", colorClass: "text-white/50" },
  { element: "Quick Filter Active", preview: "ETH", size: "12px", weight: 500, color: "white", colorClass: "text-white", extras: "bg-white/[0.08]" },
  { element: "Quick Filter Inactive", preview: "BTC", size: "12px", weight: 400, color: "white/40", colorClass: "text-white/40" },
  { element: "Filter Button Label", preview: "Filters", size: "12px", weight: 400, color: "white/70", colorClass: "text-white/70" },
  { element: "Search Placeholder", preview: "Search tokens, platforms", size: "12px", weight: 400, color: "white/25", colorClass: "text-white/25", extras: "placeholder" },
  { element: "Dropdown Item", preview: "Ethereum", size: "13px", weight: 400, color: "white", colorClass: "text-white" },
  { element: "Dropdown Filter", preview: "Hide Expiring Pools", size: "13px", weight: 400, color: "white", colorClass: "text-white", extras: "checkbox" },
];

const NAVIGATION: TypoRule[] = [
  { element: "Sidebar Section Title", preview: "PRODUCTS", size: "10px", weight: 500, color: "white/25", colorClass: "text-white/25", extras: "uppercase tracking-wider" },
  { element: "Sidebar Item Active", preview: "Trading", size: "13px", weight: 500, color: "white", colorClass: "text-white", extras: "bg-white/[0.06]" },
  { element: "Sidebar Item Inactive", preview: "Dashboard", size: "13px", weight: 400, color: "white/50", colorClass: "text-white/50", extras: "hover:white/70" },
  { element: "Sidebar Badge", preview: "Preview Only", size: "9px", weight: 400, color: "white/30", colorClass: "text-white/30", extras: "outline pill" },
  { element: "Header Wallet CTA", preview: "Connect Wallet", size: "12px", weight: 500, color: "white", colorClass: "text-white", extras: "accent bg" },
  { element: "Mobile Tab Active", preview: "Fixed Rate", size: "10px", weight: 500, color: "accent", colorClass: "text-[#00f99b]", extras: "varies per tab" },
  { element: "Mobile Tab Inactive", preview: "Yield Leverage", size: "10px", weight: 400, color: "white/40", colorClass: "text-white/40" },
];

const MICRO: TypoRule[] = [
  { element: "Change Pill", preview: "+0.02%", size: "10px", weight: 500, color: "accent", colorClass: "text-[#00f99b]", extras: "green/red/neutral" },
  { element: "Side Badge (Buy)", preview: "Buy", size: "10px", weight: 600, color: "#00f99b", colorClass: "text-[#00f99b]", extras: "pill" },
  { element: "Side Badge (Sell)", preview: "Sell", size: "10px", weight: 600, color: "#ef6b6b", colorClass: "text-[#ef6b6b]", extras: "pill" },
  { element: "Status Badge", preview: "Open", size: "10px", weight: 500, color: "white/50", colorClass: "text-white/50" },
  { element: "Status Bar Label", preview: "Pool", size: "10px", weight: 400, color: "white/25", colorClass: "text-white/25" },
  { element: "Status Bar Value", preview: "0x2A5e...8f3B", size: "10px", weight: 500, color: "white/50", colorClass: "text-white/50", extras: "font-mono" },
  { element: "Status Bar PT", preview: "1,247", size: "10px", weight: 600, color: "#00f99b/70", colorClass: "text-[#00f99b]/70", extras: "PT Holders" },
  { element: "Status Bar YT", preview: "438", size: "10px", weight: 600, color: "#f4c071/70", colorClass: "text-[#f4c071]/70", extras: "YT Holders" },
  { element: "Block Indicator", preview: "Block 21,847,293", size: "10px", weight: 400, color: "white/30", colorClass: "text-white/30", extras: "pulse dot" },
  { element: "Tooltip Body", preview: "The default token is the underlying asset...", size: "11px", weight: 400, color: "white/80", colorClass: "text-white/80", extras: "leading-relaxed" },
  { element: "Token Name", preview: "sGHO", size: "13px", weight: 400, color: "white", colorClass: "text-white", extras: "leading-tight" },
  { element: "Token Protocol", preview: "Aave", size: "10px", weight: 400, color: "white/40", colorClass: "text-white/40", extras: "leading-tight" },
  { element: "Market Detail Label", preview: "Default Input/Output Token", size: "12px", weight: 400, color: "white/40", colorClass: "text-white/40" },
  { element: "Market Detail Value", preview: "sGHO", size: "12px", weight: 500, color: "white", colorClass: "text-white" },
  { element: "Pool Composition %", preview: "86.17% ($1.2M)", size: "11px", weight: 500, color: "white/50", colorClass: "text-white/50" },
  { element: "Cancel Button", preview: "Cancel", size: "10px", weight: 500, color: "#ef6b6b/60", colorClass: "text-[#ef6b6b]/60", extras: "hover:full" },
  { element: "Rate Signal", preview: "Better than market rate (5.61%)", size: "10px", weight: 400, color: "#00f99b", colorClass: "text-[#00f99b]" },
];

const TOTAL_RULES = HEADINGS.length + DATA_LABELS.length + TABLE_TEXT.length + TRADING_PANEL.length + UI_CONTROLS.length + NAVIGATION.length + MICRO.length;

const AI_INSTRUCTIONS = [
  "GLOBAL: Every text element uses font-family: Inter (loaded via Google Fonts). No fallback stacks needed — Inter covers all weights 300-700.",
  "GLOBAL: All font sizing is done via explicit `text-[Xpx]` classes — never use Tailwind semantic sizes (text-sm, text-lg).",
  "GLOBAL: All font weights are set via inline `style={{ fontWeight: N }}` — never use Tailwind weight classes (font-bold, font-medium).",
  "GLOBAL: Background is #191919. Card surfaces: bg-white/[0.04] or bg-[#1e1e1e]. Elevated (tooltips, dropdowns): bg-[#2a2a2e].",
  "GLOBAL: Border color is `border-white/[0.06]` (structural). Interactive: `border-white/[0.08]` hover `border-white/[0.15]`.",
  "GLOBAL: Responsive — mobile-first. `sm:` 640px padding. `xl:` 1280px sidebar. `lg:` 1024px 2-col trading.",
  "HEADINGS: Page titles 16px/fw600/white. Subtitles 13px/fw400/white-40. Section headers 10-11px/fw500/white-30-40/uppercase/tracking-wider.",
  "DATA: Stat labels 10-11px/fw400-500/white-35. Values 12-13px/fw400-600/white. Accents: PT=#00f99b, YT=#f4c071, LP=#d65ce9, IBT=#6988ff.",
  "TABLES: Headers 10-11px/fw500/white-40/uppercase/tracking-wider. Cells 12px/fw500/white. Sub-labels 10px/fw400/white-40. Dates 12px/fw400/white-50.",
  "TRADING: Inputs 16px/fw500/white. Placeholders #a1a1aa. USD estimates 10px/fw400/white-30. Labels 12px/fw400/white-50. Values 12px/fw500/white.",
  "CONTROLS: All toggles use unified segmented style: bg-white/[0.04] border-white/[0.08] rounded-[8px] overflow-hidden, active bg-white/[0.08] text-white fw500, inactive text-white/40 fw400. T1 (PT/YT) 13px full-width. T2 (Buy/Sell) 12px inline. Dividers border-l border-white/[0.08].",
  "NAV: Sidebar 13px/fw400-500. Bottom tabs 10px/fw400-500. Section titles 10px/fw500/white-25/uppercase.",
  "MICRO: Badges/pills/status 10px. Change pills fw500. Side badges fw600. Status labels fw400/white-25, values fw500/white-50.",
  "MOBILE: Some elements -1px on mobile (text-[11px] sm:text-[12px]). Filter dropdowns hide text labels. Tooltips left-align.",
  "OPACITY: Labels /25-/40. Secondary values /50-/70. Primary: white or accent full. Hover: +20 opacity units.",
];

// ─── Main export ───

export function TypographyRulesCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-white/[0.08] rounded-[12px] overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #161616 100%)" }}>
      {/* Hero header */}
      <div className="px-5 sm:px-6 pt-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[#00f99b]" />
          <span className="text-[10px] text-[#00f99b]/70 uppercase tracking-widest" style={{ fontWeight: 600 }}>Global Design System</span>
        </div>
        <h2 className="font-['Inter'] text-[20px] sm:text-[22px] text-white mb-2" style={{ fontWeight: 600 }}>
          Typography & Font Rules
        </h2>
        <p className="font-['Inter'] text-[12px] sm:text-[13px] text-white/40 max-w-[640px]" style={{ fontWeight: 400 }}>
          Complete font specification for every text element across all pages and devices. {TOTAL_RULES} rules covering headings, data, tables, trading panels, navigation, controls, and micro-typography. Font: Inter. Background: #191919.
        </p>
      </div>

      {/* Color palette strip */}
      <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-[10px] text-white/25 uppercase tracking-widest shrink-0" style={{ fontWeight: 600 }}>Accent Palette</span>
          <TypoSwatch hex="#00f99b" label="PT #00f99b" />
          <TypoSwatch hex="#f4c071" label="YT #f4c071" />
          <TypoSwatch hex="#d65ce9" label="LP #d65ce9" />
          <TypoSwatch hex="#ff9900" label="MV #ff9900" />
          <TypoSwatch hex="#6988ff" label="IBT #6988ff" />
          <TypoSwatch hex="#ef6b6b" label="Red #ef6b6b" />
          <TypoSwatch hex="#f59e0b" label="Warn #f59e0b" />
        </div>
      </div>

      {/* Weight scale strip */}
      <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="text-[10px] text-white/25 uppercase tracking-widest shrink-0" style={{ fontWeight: 600 }}>Weight Scale</span>
          {[
            { w: 300, l: "Light" },
            { w: 400, l: "Regular" },
            { w: 500, l: "Medium" },
            { w: 600, l: "Semi" },
            { w: 700, l: "Bold" },
          ].map((s) => (
            <span key={s.w} className="font-['Inter'] text-[13px] text-white/70" style={{ fontWeight: s.w }}>
              {s.w} {s.l}
            </span>
          ))}
        </div>
      </div>

      {/* Size scale strip */}
      <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] bg-white/[0.01]">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
          <span className="text-[10px] text-white/25 uppercase tracking-widest shrink-0 self-center" style={{ fontWeight: 600 }}>Size Scale</span>
          {["9px", "10px", "11px", "12px", "13px", "14px", "16px", "22px"].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <span className="font-['Inter'] text-white/60" style={{ fontSize: s, fontWeight: 500 }}>Aa</span>
              <span className="text-[9px] text-white/25 font-mono" style={{ fontWeight: 400 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Global rules banner */}
      <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] bg-[#00f99b]/[0.02]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <span className="text-[10px] text-[#00f99b]/50 uppercase tracking-widest shrink-0" style={{ fontWeight: 600 }}>Global Rules</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              ["Font:", "Inter"],
              ["Background:", "#191919"],
              ["Borders:", "white/[0.06]"],
              ["Radius:", "6-10px"],
              ["Responsive:", "Mobile-first, xl: desktop sidebar"],
            ].map(([k, v]) => (
              <span key={k} className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>
                {k} <span className="text-white/70 font-mono" style={{ fontWeight: 500 }}>{v}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* All typography rules */}
      <div className="px-5 sm:px-6 py-4">
        <TypoSection title="Headings & Titles" rules={HEADINGS} />
        <TypoSection title="Data Labels & Values (Top Bar / Ticker)" rules={DATA_LABELS} />
        <TypoSection title="Table Typography" rules={TABLE_TEXT} />
        <TypoSection title="Trading Panel" rules={TRADING_PANEL} />
        <TypoSection title="UI Controls & Toggles" rules={UI_CONTROLS} />
        <TypoSection title="Navigation" rules={NAVIGATION} />
        <TypoSection title="Micro Typography & Badges" rules={MICRO} />
      </div>

      {/* Expandable AI instructions */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-3 bg-white/[0.02] border-t border-white/[0.06] hover:bg-white/[0.04] transition-colors"
      >
        <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 500 }}>
          AI Recreation Instructions ({TOTAL_RULES} rules)
        </span>
        <svg
          width="10" height="7" viewBox="0 0 10 7" fill="none"
          className="transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M1 1.5L5 5.5L9 1.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {expanded && (
        <div className="px-5 sm:px-6 py-4 bg-[#131313] border-t border-white/[0.06]">
          <ul className="flex flex-col gap-2">
            {AI_INSTRUCTIONS.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-white/20 font-['Inter'] text-[11px] shrink-0" style={{ fontWeight: 500 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-['Inter'] text-[12px] text-white/60 leading-relaxed" style={{ fontWeight: 400 }}>
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