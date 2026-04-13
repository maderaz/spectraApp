import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { SmallTokenCircle } from "./shared/TableIcons";

// ─── Pool mock data ───
const POOL_DATA: Record<string, {
  token: string; protocol: string; network: string; maturity: string;
  liquidity: string; defaultToken: string; underlying: string;
  apy: string; swapFee: string; poolComposition: { ibt: number; pt: number };
  apyBreakdown: { ptFixed: string; lpFees: string; lpRewards: string; rewardTokens: { name: string; apy: string; color: string }[] };
  iconColor: string; iconChar: string; chainColor: string; chainChar: string;
}> = {
  "1": {
    token: "avUSD", protocol: "Avant", network: "arbitrum", maturity: "May 15 2026",
    liquidity: "$3,180,186", defaultToken: "avUSDx", underlying: "avUSD",
    apy: "10.34%", swapFee: "0.04%", poolComposition: { ibt: 84, pt: 16 },
    apyBreakdown: { ptFixed: "4.12%", lpFees: "0.18%", lpRewards: "2.82%", rewardTokens: [{ name: "APT", apy: "2.82%", color: "#ef4444" }] },
    iconColor: "#ef4444", iconChar: "A", chainColor: "#8b5cf6", chainChar: "◆",
  },
  "2": {
    token: "stXRP", protocol: "Firelight", network: "sonic", maturity: "Jun 04 2026",
    liquidity: "$9,399,611", defaultToken: "stXRP", underlying: "FXRP",
    apy: "1.86%", swapFee: "0.04%", poolComposition: { ibt: 84, pt: 16 },
    apyBreakdown: { ptFixed: "0.45%", lpFees: "0.18%", lpRewards: "1.22%", rewardTokens: [{ name: "rFLR", apy: "1.22%", color: "#dc2626" }] },
    iconColor: "#f97316", iconChar: "✦", chainColor: "#22c55e", chainChar: "◆",
  },
};

// ─── Activity mock ───
const POOL_ACTIVITY = [
  { action: "Buy PT", value: "$2,042", time: "46m", user: "0xef6...252" },
  { action: "Buy YT", value: "$2,292", time: "5h 12m", user: "0xf5f...b2a" },
  { action: "Buy YT", value: "$3,080", time: "5h 14m", user: "0xf5f...b2a" },
  { action: "Buy YT", value: "$257", time: "5h 56m", user: "0xaeb...f18" },
  { action: "Buy PT", value: "$1,361", time: "6h 10m", user: "0xaeb...f18" },
  { action: "Add Liq", value: "$0.03", time: "7h 2m", user: "0x5ff...ed1" },
  { action: "Buy YT", value: "$26,600", time: "8h 1m", user: "0xcf5...7c8" },
  { action: "Buy YT", value: "$5,093", time: "12h 21m", user: "0xf5f...b2a" },
  { action: "Buy YT", value: "$1,393", time: "14h 14m", user: "0xb96...51a" },
  { action: "Add Liq", value: "$181", time: "14h 38m", user: "0x9ea...4dd" },
];

// ─── Components ───

function ToggleButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-[10px] text-[13px] rounded-[8px] transition-all ${
        active ? "bg-[#00f99b] text-black" : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
      }`}
      style={{ fontWeight: active ? 600 : 400 }}
    >{label}</button>
  );
}

function PercentButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex-1 border border-white/[0.08] rounded-[8px] py-[8px] text-[12px] text-white/50 hover:text-white/70 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all" style={{ fontWeight: 400 }}>
      {label}
    </button>
  );
}

function InfoRow({ label, value, accent, tooltip }: { label: string; value: string; accent?: boolean; tooltip?: string }) {
  return (
    <div className="flex items-center justify-between py-[8px]">
      <div className="flex items-center gap-1.5">
        <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>{label}</span>
        {tooltip && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <path d="M5.2 4.8C5.2 4.2 5.6 3.8 6 3.8S6.8 4.1 6.8 4.5C6.8 5 6.4 5.1 6 5.5V6.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
            <circle cx="6" cy="7.3" r="0.4" fill="currentColor" />
          </svg>
        )}
      </div>
      <span className={`text-[12px] ${accent ? "text-[#00f99b]" : "text-white"}`} style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function CompositionBar({ ibt, pt }: { ibt: number; pt: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>Pool Composition</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1"><span className="w-[6px] h-[6px] rounded-full bg-[#6988ff]" /><span className="text-[10px] text-white/40">IBT</span></div>
          <div className="flex items-center gap-1"><span className="w-[6px] h-[6px] rounded-full bg-[#00f99b]" /><span className="text-[10px] text-white/40">PT</span></div>
        </div>
      </div>
      <div className="flex h-[6px] rounded-full overflow-hidden bg-white/[0.04]">
        <div className="bg-[#6988ff] rounded-l-full" style={{ width: `${ibt}%` }} />
        <div className="bg-[#00f99b] rounded-r-full" style={{ width: `${pt}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{ibt}%</span>
        <span className="text-[10px] text-white/30" style={{ fontWeight: 400 }}>{pt}%</span>
      </div>
    </div>
  );
}

// ─── Main Page ───
export function PoolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pool = POOL_DATA[id || "1"] || POOL_DATA["1"];
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [inputAmount, setInputAmount] = useState("");

  return (
    <div className="flex-1 min-w-0 font-['Inter']">
      <div className="flex flex-col min-h-full">

        {/* ── TOP BAR ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 px-3 sm:px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 shrink-0">
            <button onClick={() => navigate("/pools")} className="text-white/30 hover:text-white/60 transition-colors mr-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="rounded-full flex items-center justify-center" style={{ width: 16, height: 16, backgroundColor: pool.chainColor }}>
              <span className="text-white text-[7px]" style={{ fontWeight: 700 }}>{pool.chainChar}</span>
            </div>
            <SmallTokenCircle color={pool.iconColor} char={pool.iconChar} size={30} />
            <div className="flex flex-col gap-[2px]">
              <span className="text-[13px] text-white leading-tight" style={{ fontWeight: 500 }}>{pool.token}</span>
              <span className="text-[10px] text-white/40 leading-tight" style={{ fontWeight: 400 }}>{pool.protocol}</span>
            </div>
          </div>
          <div className="flex-1" />
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-8 w-full sm:w-auto">
            <div className="flex flex-col gap-[4px]">
              <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Maturity</span>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>{pool.maturity}</span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Liquidity</span>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>{pool.liquidity}</span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Default Token</span>
              <span className="text-[12px] sm:text-[13px] text-white" style={{ fontWeight: 400 }}>{pool.defaultToken}</span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-[10px] text-white/35 uppercase tracking-wider" style={{ fontWeight: 500 }}>Pool APY</span>
              <span className="text-[12px] sm:text-[13px] text-[#00f99b]" style={{ fontWeight: 600 }}>{pool.apy}</span>
            </div>
          </div>
        </div>

        {/* ── DESCRIPTION BAR ── */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-[8px] border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Earn pool fees and incentives by providing liquidity.</span>
            <span className="text-[11px] bg-[#00f99b]/15 text-[#00f99b] px-2 py-[2px] rounded-full" style={{ fontWeight: 600 }}>Pool APY: {pool.apy}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button className="border border-white/[0.08] rounded px-2.5 py-[4px] hover:bg-white/[0.08] transition-colors">
              <span className="text-[11px] text-white/70" style={{ fontWeight: 400 }}>Details</span>
            </button>
            <button className="border border-white/[0.08] rounded px-2.5 py-[4px] hover:bg-white/[0.08] transition-colors">
              <span className="text-[11px] text-white/70" style={{ fontWeight: 400 }}>Tokenize</span>
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="flex flex-col lg:flex-row flex-1">

          {/* LEFT: Add / Remove Form */}
          <div className="w-full lg:w-[420px] xl:w-[440px] lg:shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-y-auto">
            <div className="p-3 sm:p-4 flex flex-col gap-4">

              {/* Add / Remove toggle */}
              <div className="flex bg-white/[0.04] rounded-[10px] p-[3px] border border-white/[0.06]">
                <ToggleButton active={mode === "add"} label="Add" onClick={() => setMode("add")} />
                <ToggleButton active={mode === "remove"} label="Remove" onClick={() => setMode("remove")} />
              </div>

              {mode === "add" ? (
                /* ─── ADD LIQUIDITY ─── */
                <>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Input</span>
                    <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-[10px] px-4 py-3">
                      <div className="flex-1">
                        <input type="text" placeholder="0" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
                          className="bg-transparent text-[20px] text-white outline-none w-full" style={{ fontWeight: 500 }} />
                        <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>≈$0</span>
                      </div>
                      <button className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-[8px] px-3 py-[6px] hover:bg-white/[0.08] transition-colors">
                        <SmallTokenCircle color={pool.iconColor} char={pool.iconChar} size={20} />
                        <span className="text-[12px] text-white" style={{ fontWeight: 500 }}>Select</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-[32px] h-[3px] rounded-full bg-[#00f99b]/30" />
                    <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>Balanced Mode (Recommended)</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" /><path d="M5.2 4.8C5.2 4.2 5.6 3.8 6 3.8S6.8 4.1 6.8 4.5C6.8 5 6.4 5.1 6 5.5V6.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" /><circle cx="6" cy="7.3" r="0.4" fill="currentColor" /></svg>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Output</span>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <SmallTokenCircle color="#d65ce9" char="LP" size={22} />
                        <span className="text-[12px] text-white/70" style={{ fontWeight: 400 }}>LP-{pool.token}-{pool.maturity.replace(/ /g, "/").slice(-8)}</span>
                      </div>
                      <span className="text-[12px] text-white/30" style={{ fontWeight: 400 }}>—</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <SmallTokenCircle color="#f4c071" char="YT" size={22} />
                        <span className="text-[12px] text-white/70" style={{ fontWeight: 400 }}>YT-{pool.token}-{pool.maturity.replace(/ /g, "/").slice(-8)}</span>
                      </div>
                      <span className="text-[12px] text-white/30" style={{ fontWeight: 400 }}>—</span>
                    </div>
                  </div>

                  <InfoRow label="Pool Share" value="—" />
                  <InfoRow label="Implied APY Change" value="—" tooltip="The change in implied APY after your action." />
                  <InfoRow label="New Pool APY" value="—" tooltip="The projected pool APY after your deposit." />

                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-2 border-t border-white/[0.06]">
                      <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Details</span>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="transition-transform group-open:rotate-180"><path d="M1 1L5 5L9 1" stroke="white" strokeOpacity="0.3" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </summary>
                    <div className="pt-2 text-[11px] text-white/30" style={{ fontWeight: 400 }}>Detailed transaction breakdown will appear here after entering an amount.</div>
                  </details>

                  <button className="w-full bg-[#00f99b] hover:bg-[#00e08a] text-black rounded-[10px] py-[12px] text-[14px] transition-colors" style={{ fontWeight: 600 }}>
                    Connect Wallet
                  </button>
                </>
              ) : (
                /* ─── REMOVE LIQUIDITY ─── */
                <>
                  <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Choose how much to withdraw</span>

                  <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-[10px] px-4 py-3">
                    <div className="flex-1">
                      <input type="text" placeholder="0" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
                        className="bg-transparent text-[20px] text-white outline-none w-full" style={{ fontWeight: 500 }} />
                      <span className="text-[11px] text-white/25" style={{ fontWeight: 400 }}>≈$0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SmallTokenCircle color="#d65ce9" char="LP" size={22} />
                      <span className="text-[12px] text-white/60" style={{ fontWeight: 400 }}>LP-{pool.token}-...</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <PercentButton label="25%" onClick={() => {}} />
                    <PercentButton label="50%" onClick={() => {}} />
                    <PercentButton label="75%" onClick={() => {}} />
                    <PercentButton label="100%" onClick={() => {}} />
                  </div>

                  <div className="border-t border-white/[0.06]" />

                  <div className="flex items-center gap-2">
                    <div className="w-[32px] h-[3px] rounded-full bg-[#00f99b]/30" />
                    <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>No Price Impact Mode</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/25"><circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" /><path d="M5.2 4.8C5.2 4.2 5.6 3.8 6 3.8S6.8 4.1 6.8 4.5C6.8 5 6.4 5.1 6 5.5V6.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" /><circle cx="6" cy="7.3" r="0.4" fill="currentColor" /></svg>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>Output</span>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <SmallTokenCircle color={pool.iconColor} char={pool.iconChar} size={22} />
                        <span className="text-[12px] text-white/70" style={{ fontWeight: 400 }}>{pool.defaultToken}</span>
                      </div>
                      <span className="text-[12px] text-white/30" style={{ fontWeight: 400 }}>—</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <SmallTokenCircle color="#00f99b" char="PT" size={22} />
                        <span className="text-[12px] text-white/70" style={{ fontWeight: 400 }}>PT-{pool.token}-{pool.maturity.replace(/ /g, "/").slice(-8)}</span>
                      </div>
                      <span className="text-[12px] text-white/30" style={{ fontWeight: 400 }}>—</span>
                    </div>
                  </div>

                  <InfoRow label="Pool Share" value="—" />

                  {/* MetaVault upsell */}
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-[12px] text-white/50" style={{ fontWeight: 400 }}>
                      Continue earning up to <span className="text-[#00f99b]" style={{ fontWeight: 600 }}>5.25% APY</span> via MetaVault <span className="text-[10px] bg-white/[0.06] text-white/40 px-1.5 py-[1px] rounded-full" style={{ fontWeight: 500 }}>New</span>
                    </span>
                    <button onClick={() => navigate("/metavaults")} className="flex items-center justify-between bg-white/[0.03] border border-white/[0.08] rounded-[10px] p-3 hover:bg-white/[0.05] transition-colors">
                      <div className="flex items-center gap-2.5">
                        <SmallTokenCircle color={pool.iconColor} char={pool.iconChar} size={28} />
                        <div className="flex flex-col">
                          <span className="text-[12px] text-[#00f99b]" style={{ fontWeight: 600 }}>Flare XRP Yield Prime</span>
                          <span className="text-[10px] text-white/40" style={{ fontWeight: 400 }}>Gami Labs</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-white border border-white/[0.12] rounded-[6px] px-2.5 py-[5px]" style={{ fontWeight: 500 }}>Open MetaVault</span>
                    </button>
                    <span className="text-[11px] text-white/30" style={{ fontWeight: 400 }}>Or remove liquidity from the pool</span>
                  </div>

                  <button className="w-full bg-[#00f99b] hover:bg-[#00e08a] text-black rounded-[10px] py-[12px] text-[14px] transition-colors" style={{ fontWeight: 600 }}>
                    Connect Wallet
                  </button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Chart + Activity + Pool Info */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Chart placeholder */}
            <div className="flex-1 min-h-[300px] sm:min-h-[340px] flex flex-col p-3 sm:p-4 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5"><span className="w-[6px] h-[6px] rounded-full bg-[#f4c071]" /><span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>Base APY (30d)</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-[6px] h-[6px] rounded-full bg-[#00f99b]" /><span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>Implied APY</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[11px] text-white/40 hover:text-white/60 transition-colors" style={{ fontWeight: 400 }}>APY ▾</button>
                  <button className="text-[11px] text-white/40 hover:text-white/60 transition-colors" style={{ fontWeight: 400 }}>Tools ▾</button>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-white/[0.02] rounded-[8px] border border-white/[0.04]">
                <span className="text-[12px] text-white/15" style={{ fontWeight: 400 }}>APY Chart</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-white/25" style={{ fontWeight: 400 }}>30d Volume: $7M · Lifetime: $10.7M</span>
                <div className="flex items-center gap-2">
                  <button className="text-[10px] text-white/30 hover:text-white/50 transition-colors" style={{ fontWeight: 400 }}>Custom</button>
                  <button className="text-[10px] bg-white/[0.06] text-white/50 px-2 py-[2px] rounded" style={{ fontWeight: 500 }}>All</button>
                </div>
              </div>
            </div>

            {/* Activity Table */}
            <div className="min-h-[200px] border-b border-white/[0.06]">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>Activity</span>
                <button className="text-[11px] text-white/40 hover:text-white/60 transition-colors" style={{ fontWeight: 400 }}>All ▾</button>
              </div>
              <div className="overflow-x-auto">
                <div className="flex items-center px-4 py-[8px] border-b border-white/[0.06] min-w-[400px]">
                  <div className="w-[25%]"><span className="text-[10px] text-white/30 uppercase tracking-wider" style={{ fontWeight: 500 }}>Action</span></div>
                  <div className="w-[20%]"><span className="text-[10px] text-white/30 uppercase tracking-wider" style={{ fontWeight: 500 }}>Value</span></div>
                  <div className="w-[25%]"><span className="text-[10px] text-white/30 uppercase tracking-wider" style={{ fontWeight: 500 }}>Time</span></div>
                  <div className="flex-1 text-right"><span className="text-[10px] text-white/30 uppercase tracking-wider" style={{ fontWeight: 500 }}>User</span></div>
                </div>
                {POOL_ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center px-4 py-[8px] border-b border-white/[0.04] hover:bg-white/[0.06] transition-colors min-w-[400px]">
                    <div className="w-[25%]"><span className="text-[12px] text-[#00f99b]" style={{ fontWeight: 500 }}>{a.action}</span></div>
                    <div className="w-[20%]"><span className="text-[12px] text-white" style={{ fontWeight: 500 }}>{a.value}</span></div>
                    <div className="w-[25%]"><span className="text-[12px] text-white/40" style={{ fontWeight: 400 }}>{a.time}</span></div>
                    <div className="flex-1 text-right"><span className="text-[11px] text-[#6988ff] font-mono" style={{ fontWeight: 400 }}>{a.user}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pool Info + APY Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Pool Info */}
              <div className="p-4 border-b md:border-b-0 md:border-r border-white/[0.06]">
                <span className="text-[13px] text-white mb-3 block" style={{ fontWeight: 600 }}>Pool Info</span>
                <InfoRow label="Default Input/Output Token" value={pool.defaultToken} tooltip="The default token used for swaps." />
                <InfoRow label="Underlying" value={pool.underlying} />
                <InfoRow label="APY" value={pool.apy} accent />
                <InfoRow label="Liquidity" value={pool.liquidity} />
                <InfoRow label="Maturity" value={pool.maturity} />
                <InfoRow label="Swap Fee" value={pool.swapFee} />
                <div className="mt-3">
                  <CompositionBar ibt={pool.poolComposition.ibt} pt={pool.poolComposition.pt} />
                </div>
              </div>
              {/* APY Breakdown */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-white" style={{ fontWeight: 600 }}>Pool APY Breakdown</span>
                  <span className="text-[13px] text-[#00f99b]" style={{ fontWeight: 600 }}>{pool.apy}</span>
                </div>
                <InfoRow label="PT Fixed Rate" value={pool.apyBreakdown.ptFixed} />
                <InfoRow label="LP Fees" value={pool.apyBreakdown.lpFees} tooltip="Fees earned from swaps in the pool." />
                <InfoRow label="LP Rewards" value={pool.apyBreakdown.lpRewards} />
                {pool.apyBreakdown.rewardTokens.map((rt) => (
                  <div key={rt.name} className="flex items-center justify-between py-[6px] pl-4">
                    <div className="flex items-center gap-2">
                      <SmallTokenCircle color={rt.color} char={rt.name[0]} size={16} />
                      <span className="text-[11px] text-white/40" style={{ fontWeight: 400 }}>{rt.name}</span>
                    </div>
                    <span className="text-[11px] text-white/60" style={{ fontWeight: 400 }}>{rt.apy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
