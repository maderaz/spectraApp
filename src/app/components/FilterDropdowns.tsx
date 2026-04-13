import { useState, useRef, useEffect } from "react";

// ─── Network list matching Figma screenshot ───
export interface Network {
  id: string;
  name: string;
  iconColor: string;
  iconChar: string;
}

export const ALL_NETWORKS: Network[] = [
  { id: "ethereum",   name: "Ethereum",        iconColor: "#627EEA", iconChar: "Ξ" },
  { id: "arbitrum",   name: "Arbitrum One",     iconColor: "#2d374b", iconChar: "A" },
  { id: "optimism",   name: "OP Mainnet",       iconColor: "#ef4444", iconChar: "OP" },
  { id: "base",       name: "Base",             iconColor: "#3b82f6", iconChar: "B" },
  { id: "sonic",      name: "Sonic",            iconColor: "#6b7280", iconChar: "S" },
  { id: "hemi",       name: "Hemi",             iconColor: "#f97316", iconChar: "H" },
  { id: "avalanche",  name: "Avalanche",        iconColor: "#ef4444", iconChar: "▲" },
  { id: "bnb",        name: "BNB Smart Chain",  iconColor: "#f59e0b", iconChar: "B" },
  { id: "hyperevm",   name: "HyperEVM",         iconColor: "#06b6d4", iconChar: "H" },
  { id: "katana",     name: "Katana",           iconColor: "#0d9488", iconChar: "K" },
  { id: "flare",      name: "Flare Mainnet",    iconColor: "#dc2626", iconChar: "F" },
  { id: "monad",      name: "Monad",            iconColor: "#8b5cf6", iconChar: "M" },
];

// ─── Filter options ───
export interface FilterFlags {
  hideExpiring: boolean;
  hideNegativeApy: boolean;
  hideLowTvl: boolean;
}

export const DEFAULT_FILTERS: FilterFlags = {
  hideExpiring: false,
  hideNegativeApy: false,
  hideLowTvl: false,
};

// ─── Checkbox SVG ───
function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-[22px] h-[22px] rounded-[4px] flex items-center justify-center shrink-0 transition-all ${
        checked
          ? "bg-white/[0.12] border border-white/[0.20]"
          : "bg-white/[0.04] border border-white/[0.10]"
      }`}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

// ─── Network icon for the dropdown button (stacked) ───
function NetworkButtonIcons() {
  const icons = ALL_NETWORKS.slice(0, 3);
  return (
    <div className="flex items-center">
      {icons.map((n, i) => (
        <div
          key={n.id}
          className="rounded-full flex items-center justify-center border-[1.5px] border-[#191919]"
          style={{
            width: 18,
            height: 18,
            backgroundColor: n.iconColor,
            marginLeft: i > 0 ? -5 : 0,
            zIndex: 3 - i,
            position: "relative",
          }}
        >
          <span
            className="text-white"
            style={{ fontSize: n.iconChar.length > 1 ? 6 : 8, fontWeight: 700, lineHeight: 1 }}
          >
            {n.iconChar}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Network token circle in dropdown ───
function NetworkCircle({ network, size = 32 }: { network: Network; size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: network.iconColor }}
    >
      <span
        className="text-white font-['Inter']"
        style={{
          fontSize: network.iconChar.length > 1 ? size * 0.28 : size * 0.38,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {network.iconChar}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════
// NETWORK DROPDOWN
// ═══════════════════════════════════════════════
export function NetworkDropdown({
  selected,
  onChange,
}: {
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allSelected = selected.size === ALL_NETWORKS.length;
  const label = allSelected ? "All Networks" : `${selected.size} Network${selected.size !== 1 ? "s" : ""}`;

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(next);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border rounded-[8px] px-2.5 sm:px-3 py-[7px] transition-all shrink-0 ${
          open ? "border-white/[0.15]" : "border-white/[0.08]"
        }`}
      >
        <NetworkButtonIcons />
        <span className="hidden sm:inline text-[12px] text-white/70" style={{ fontWeight: 400 }}>
          {label}
        </span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 z-50 w-[260px] rounded-[10px] border border-white/[0.08] overflow-hidden py-1"
          style={{ backgroundColor: "#252525" }}
        >
          {ALL_NETWORKS.map((net) => {
            const checked = selected.has(net.id);
            return (
              <button
                key={net.id}
                onClick={() => toggle(net.id)}
                className="flex items-center justify-between w-full px-4 py-[10px] hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <NetworkCircle network={net} size={28} />
                  <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>
                    {net.name}
                  </span>
                </div>
                <CheckIcon checked={checked} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// FILTERS DROPDOWN
// ═══════════════════════════════════════════════
export function FiltersDropdown({
  filters,
  onChange,
}: {
  filters: FilterFlags;
  onChange: (next: FilterFlags) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeCount = [filters.hideExpiring, filters.hideNegativeApy, filters.hideLowTvl].filter(Boolean).length;

  const items: { key: keyof FilterFlags; label: string }[] = [
    { key: "hideExpiring", label: "Hide Expiring Pools" },
    { key: "hideNegativeApy", label: "Hide Negative APY Pools" },
    { key: "hideLowTvl", label: "Hide <$1K TVL Pools" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.07] border rounded-[8px] px-2.5 sm:px-3 py-[7px] h-[34px] transition-all shrink-0 ${
          open || activeCount > 0 ? "border-white/[0.15]" : "border-white/[0.08]"
        }`}
      >
        <span className="hidden sm:inline text-[12px] text-white/70" style={{ fontWeight: 400 }}>
          Filters
        </span>
        {activeCount > 0 && (
          <span
            className="min-w-[16px] h-[16px] rounded-full bg-white/[0.15] flex items-center justify-center text-[10px] text-white px-1"
            style={{ fontWeight: 600 }}
          >
            {activeCount}
          </span>
        )}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 3.5h10M4 7h6M5.5 10.5h3"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 z-50 w-[280px] rounded-[10px] border border-white/[0.08] overflow-hidden py-1"
          style={{ backgroundColor: "#252525" }}
        >
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => onChange({ ...filters, [item.key]: !filters[item.key] })}
              className="flex items-center justify-between w-full px-4 py-[12px] hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-[13px] text-white" style={{ fontWeight: 400 }}>
                {item.label}
              </span>
              <CheckIcon checked={filters[item.key]} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}