import { useRef, useEffect } from "react";

// ─── Allocation data ───
const ALLOCATION = [
  { label: "PT", value: 14245.22, pct: 44.9, color: "#00f99b" },
  { label: "YT", value: 500.14, pct: 1.6, color: "#f4c071" },
  { label: "LP", value: 16997.22, pct: 53.5, color: "#d65ce9" },
];

function ChangePill({ value, positive }: { value: string; positive: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-[6px] py-[2px] rounded-full text-[11px] ${
        positive
          ? "bg-[#00f99b]/10 text-[#00f99b]"
          : "bg-[#ef6b6b]/10 text-[#ef6b6b]"
      }`}
      style={{ fontWeight: 500 }}
    >
      {value}
    </span>
  );
}

// ─── Animated counter ───
function AnimatedValue({ target, prefix = "" }: { target: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const start = target * 0.95;
    const duration = 800;
    const t0 = performance.now();

    function tick(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = start + (target - start) * ease;
      if (el) el.textContent = prefix + val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, prefix]);

  return <span ref={ref}>{prefix}{target.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
}

const BREAKDOWN = [
  { label: "PT Value", value: "$14,245.22", color: "#00f99b" },
  { label: "YT Value", value: "$500.14", color: "#f4c071" },
  { label: "LP Value", value: "$16,997.22", color: "#d65ce9" },
  { label: "MV Value", value: "$16,724.53", color: "#ff9900" },
  { label: "Claimable", value: "$12.84", color: "#6988ff" },
];

export function PortfolioSummary() {
  return (
    <div className="shrink-0">
      {/* Total value */}
      <div className="px-3 sm:px-5 pt-4 pb-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>
            Total Portfolio Value
          </span>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-[28px] text-white" style={{ fontWeight: 600 }}>
              <AnimatedValue target={31742.58} prefix="$" />
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#00f99b]" style={{ fontWeight: 500 }}>+$142.30</span>
              <ChangePill value="+0.45%" positive />
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown ticker */}
      <div className="flex items-center px-3 sm:px-5 py-[6px] border-t border-b border-white/[0.06] overflow-x-auto scrollbar-hide gap-0">
        {BREAKDOWN.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 shrink-0 ${i === 0 ? "pr-5" : "px-5"} ${
              i < BREAKDOWN.length - 1 ? "border-r border-white/[0.06]" : ""
            }`}
          >
            <div className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[11px] text-white/35" style={{ fontWeight: 400 }}>{item.label}</span>
            <span className="text-[12px] text-white/80" style={{ fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}