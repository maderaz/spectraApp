import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Customized } from "recharts";
import svgPaths from "../../imports/svg-qtk3afs1b8";
import { useState, useEffect, useCallback, useRef } from "react";

function ChevronDown() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 7.99483" fill="none">
      <path d={svgPaths.p30d02200} fill="white" fillOpacity={0.75} />
    </svg>
  );
}

function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 12L5.5 7.5L8.5 9.5L14 3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.5}
      />
      <path d="M2 14h12" stroke="white" strokeWidth="1" strokeLinecap="round" opacity={active ? 0.4 : 0.2} />
    </svg>
  );
}

function OrderBookIcon({ active }: { active: boolean }) {
  const o = active ? 1 : 0.5;
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" opacity={o}>
      <rect x="2" y="2" width="5" height="1.8" rx="0.5" fill="#00f99b" />
      <rect x="2" y="4.6" width="7" height="1.8" rx="0.5" fill="#00f99b" opacity="0.7" />
      <rect x="2" y="7.2" width="4" height="1.8" rx="0.5" fill="#00f99b" opacity="0.45" />
      <rect x="2" y="10.4" width="3.5" height="1.8" rx="0.5" fill="#ef6b6b" opacity="0.45" />
      <rect x="2" y="13" width="6" height="1.8" rx="0.5" fill="#ef6b6b" opacity="0.7" />
      <rect x="9" y="2" width="5" height="1.8" rx="0.5" fill="#ef6b6b" />
      <rect x="9" y="4.6" width="3" height="1.8" rx="0.5" fill="#ef6b6b" opacity="0.45" />
    </svg>
  );
}

function InfoIconSmall({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" opacity={active ? 1 : 0.5}>
      <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.2" />
      <path d="M8 7v4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="white" />
    </svg>
  );
}

type AssetType = "PT" | "YT";

// ─── Super-granular procedural chart data generator ───
// Generates ~200 data points with realistic micro-movements, mean-reversion, momentum shifts,
// and occasional volatility spikes for both Base APY (step-line) and Implied APY (smooth curve).

interface ChartPoint {
  date: string;        // x-axis key — label for major ticks, "" for micro
  displayDate: string; // human-readable date/time for tooltip
  baseAPY: number;
  impliedAPY: number;
  volume: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildDenseChartData(): ChartPoint[] {
  const rand = seededRandom(42);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const startMs = new Date("2025-10-01T00:00:00Z").getTime();
  const endMs   = new Date("2025-11-08T18:00:00Z").getTime();

  // ~6h intervals → ~154 points, then add intraday micro-noise intervals → ~220 points
  const INTERVAL_H = 6;
  const intervalMs = INTERVAL_H * 3600 * 1000;
  const totalSteps = Math.ceil((endMs - startMs) / intervalMs);

  // Anchor points for implied APY to create realistic macro structure
  // (date offset in days → target implied APY)
  const anchorPoints = [
    { day: 0, apy: 4.90 },
    { day: 1, apy: 5.80 },
    { day: 2, apy: 4.30 },
    { day: 3, apy: 5.95 },
    { day: 4, apy: 3.90 },
    { day: 5, apy: 5.50 },
    { day: 5.5, apy: 4.20 },
    { day: 6.5, apy: 6.10 },
    { day: 7, apy: 4.50 },
    { day: 8, apy: 5.80 },
    { day: 9, apy: 4.10 },
    { day: 10, apy: 6.30 },
    { day: 10.5, apy: 5.00 },
    { day: 11.5, apy: 6.50 },
    { day: 12, apy: 4.60 },
    { day: 13, apy: 5.90 },
    { day: 14, apy: 3.80 },
    { day: 15, apy: 5.70 },
    { day: 16, apy: 4.40 },
    { day: 17, apy: 6.40 },
    { day: 17.5, apy: 4.80 },
    { day: 18.5, apy: 6.20 },
    { day: 19, apy: 4.50 },
    { day: 20, apy: 6.60 },
    { day: 21, apy: 4.20 },
    { day: 22, apy: 6.10 },
    { day: 22.5, apy: 4.70 },
    { day: 23.5, apy: 5.90 },
    { day: 24, apy: 4.30 },
    { day: 25, apy: 6.30 },
    { day: 26, apy: 4.60 },
    { day: 27, apy: 5.80 },
    { day: 27.5, apy: 4.40 },
    { day: 28, apy: 6.00 },
    { day: 29, apy: 4.50 },
    { day: 30, apy: 6.20 },
    { day: 31, apy: 4.80 },
    { day: 32, apy: 5.90 },
    { day: 33, apy: 4.30 },
    { day: 34, apy: 6.40 },
    { day: 35, apy: 4.70 },
    { day: 36, apy: 5.60 },
    { day: 37, apy: 4.90 },
    { day: 37.5, apy: 6.10 },
    { day: 38, apy: 5.20 },
    { day: 38.75, apy: 5.61 },
  ];

  function interpolateAnchor(dayOffset: number): number {
    if (dayOffset <= anchorPoints[0].day) return anchorPoints[0].apy;
    if (dayOffset >= anchorPoints[anchorPoints.length - 1].day) return anchorPoints[anchorPoints.length - 1].apy;
    for (let i = 0; i < anchorPoints.length - 1; i++) {
      const a = anchorPoints[i], b = anchorPoints[i + 1];
      if (dayOffset >= a.day && dayOffset <= b.day) {
        const t = (dayOffset - a.day) / (b.day - a.day);
        // Smooth cubic interpolation
        const s = t * t * (3 - 2 * t);
        return a.apy + (b.apy - a.apy) * s;
      }
    }
    return 5.0;
  }

  const result: ChartPoint[] = [];
  let baseAPY = 3.10;
  let impliedAPY = 4.90;
  let baseVelocity = 0;
  let impliedVelocity = 0;
  let lastMajorDay = -999;

  for (let step = 0; step <= totalSteps; step++) {
    const ms = startMs + step * intervalMs;
    const d = new Date(ms);
    const dayOffset = (ms - startMs) / (24 * 3600 * 1000);
    const hour = d.getUTCHours();

    // ── Base APY: step-like with occasional jumps, mostly flat ──
    const baseMeanTarget = 2.6 + Math.sin(dayOffset * 0.18) * 0.35 + Math.cos(dayOffset * 0.07) * 0.2;
    const baseMeanReversion = (baseMeanTarget - baseAPY) * 0.02;
    const baseNoise = (rand() - 0.5) * 0.06;
    // Occasional step jumps (every ~2 days on average)
    const stepJump = rand() < 0.04 ? (rand() - 0.5) * 0.35 : 0;
    baseVelocity = baseVelocity * 0.7 + baseMeanReversion + baseNoise + stepJump;
    baseAPY = Number((baseAPY + baseVelocity).toFixed(4));
    baseAPY = Math.max(1.8, Math.min(4.5, baseAPY));

    // ── Implied APY: smooth with micro-noise around anchor curve ──
    const anchorTarget = interpolateAnchor(dayOffset);
    const meanReversion = (anchorTarget - impliedAPY) * 0.15;
    // Multi-frequency noise for realistic micro-structure
    const noise1 = Math.sin(step * 0.73 + 1.2) * 0.12;
    const noise2 = Math.cos(step * 1.47 + 0.5) * 0.08;
    const noise3 = Math.sin(step * 2.91 + 3.1) * 0.06;
    const noise4 = Math.cos(step * 4.3 + 0.7) * 0.04;
    const microNoise = (rand() - 0.5) * 0.22;
    // Occasional volatility spikes (news events, large trades)
    const spike = rand() < 0.06 ? (rand() - 0.5) * 0.7 : 0;
    // Session-based volatility (higher during "active hours")
    const sessionMult = (hour >= 8 && hour <= 20) ? 1.5 : 0.8;

    impliedVelocity = impliedVelocity * 0.35 + (meanReversion + noise1 + noise2 + noise3 + noise4 + microNoise * sessionMult + spike) * 0.7;
    impliedAPY = Number((impliedAPY + impliedVelocity).toFixed(4));
    impliedAPY = Math.max(3.2, Math.min(7.2, impliedAPY));

    // ── Volume: correlated with volatility ──
    const baseVol = 30 + Math.abs(Math.sin(dayOffset * 0.6)) * 60;
    const volSpike = Math.abs(spike) > 0.1 ? 80 : 0;
    const volNoise = rand() * 40 - 15;
    const sessionVol = (hour >= 10 && hour <= 18) ? 1.4 : 0.7;
    const volume = Math.max(5, Math.round((baseVol + volSpike + volNoise) * sessionVol));

    // ── Date label: only show for ~midnight entries every 2-3 days ──
    const dayNum = Math.floor(dayOffset);
    const showLabel = (hour < INTERVAL_H) && (dayNum % 3 === 0 || step === 0 || step === totalSteps);
    const label = showLabel ? `${months[d.getUTCMonth()]} ${d.getUTCDate()}` : "";
    const displayDate = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${String(hour).padStart(2, "0")}:00`;

    result.push({
      date: label,
      displayDate,
      baseAPY: Number(baseAPY.toFixed(3)),
      impliedAPY: Number(impliedAPY.toFixed(3)),
      volume,
    });
  }

  return result;
}

const chartData = buildDenseChartData();

// Extract labeled ticks for x-axis
const xAxisTicks = chartData.filter(p => p.date !== "").map(p => p.date);

// Separate dense volume bar data — each bar is either green (buy) or red (sell)
interface VolBar { vol: number; isBuy: boolean }
function generateVolumeBars(): VolBar[] {
  const bars: VolBar[] = [];
  const count = 128;
  for (let i = 0; i < count; i++) {
    const base = 20 + Math.abs(Math.sin(i * 0.47) * 80 + Math.cos(i * 0.23) * 40);
    const jitter = Math.sin(i * 7.3) * 15 + Math.cos(i * 11.1) * 10;
    const vol = Math.max(5, base + jitter);
    // Deterministic buy/sell based on hash-like pattern
    const isBuy = Math.sin(i * 3.7 + Math.cos(i * 1.3)) > -0.15;
    bars.push({ vol, isBuy });
  }
  return bars;
}
const volumeBars = generateVolumeBars();
const MAX_VOL = Math.max(...volumeBars.map(b => b.vol));

// Mini volume bars rendered at the bottom of the chart — dense, single color each
function VolumeBars(props: any) {
  const { xAxisMap, yAxisMap } = props;
  if (!xAxisMap || !yAxisMap) return null;

  const xAxis = Object.values(xAxisMap)[0] as any;
  const yAxis = Object.values(yAxisMap)[0] as any;
  if (!xAxis || !yAxis) return null;

  const chartLeft = xAxis.x;
  const chartWidth = xAxis.width;
  const chartBottom = yAxis.y + yAxis.height;
  const chartHeight = yAxis.height;
  const maxBarH = chartHeight * 0.10;
  const total = volumeBars.length;
  const step = chartWidth / total;
  const barW = Math.max(1, step * 0.75); // almost touching

  return (
    <g>
      {volumeBars.map((b, i) => {
        const x = chartLeft + step * i + (step - barW) / 2;
        const h = (b.vol / MAX_VOL) * maxBarH;
        return (
          <rect
            key={`vol-${i}`}
            x={x}
            y={chartBottom - h}
            width={barW}
            height={h}
            fill={b.isBuy ? "#00f99b" : "#ef6b6b"}
            opacity={0.5}
            rx={0.5}
          />
        );
      })}
    </g>
  );
}

// Renders endpoint value badges using Customized — avoids recharts key/spread issues with dot prop
function EndpointLabels(props: any) {
  const { formattedGraphicalItems } = props;
  if (!formattedGraphicalItems) return null;
  return (
    <g>
      {formattedGraphicalItems.map((item: any) => {
        const { dataKey } = item.item.props;
        const points = item.props?.points;
        if (!points || points.length === 0) return null;
        const last = points[points.length - 1];
        if (!last || last.x == null || last.y == null) return null;
        const color = dataKey === "baseAPY" ? "#6988ff" : "#00f99b";
        // Read actual last value from chartData
        const lastPoint = chartData[chartData.length - 1];
        const value = dataKey === "baseAPY"
          ? lastPoint.baseAPY.toFixed(2)
          : lastPoint.impliedAPY.toFixed(2);
        return (
          <g key={`endpoint-${dataKey}`}>
            <rect x={last.x - 2} y={last.y - 12} width={36} height={22} rx={4} fill={color} />
            <text x={last.x + 16} y={last.y + 2} textAnchor="middle" fill="white" fontSize={11} fontFamily="Inter" fontWeight={500}>
              {value}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Pro Crosshair Cursor ───
// This is kept only as a vertical line via recharts cursor — the horizontal line is an HTML overlay
function CrosshairVertical({ points, width, height, top, left, viewBox }: any) {
  if (!points || points.length === 0) return null;
  const x = points[0]?.x;
  if (x == null) return null;

  const chartTop = viewBox?.y ?? top ?? 0;
  const chartH = viewBox?.height ?? height ?? 0;
  const chartBottom = chartTop + chartH;
  if (chartH < 10) return null;

  return (
    <g>
      <line
        x1={x} y1={chartTop} x2={x} y2={chartBottom}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
    </g>
  );
}

// Custom tooltip content for pro crosshair
function ProTooltipContent({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const baseEntry = payload.find((p: any) => p.dataKey === "baseAPY");
  const impliedEntry = payload.find((p: any) => p.dataKey === "impliedAPY");

  // Get displayDate from the data point
  const dataPoint = payload[0]?.payload as ChartPoint | undefined;
  const displayDate = dataPoint?.displayDate || "";
  const totalVol = dataPoint?.volume ?? 0;

  return (
    <div
      style={{
        backgroundColor: "rgba(25,25,25,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "8px 12px",
        fontFamily: "Inter",
        minWidth: 150,
      }}
    >
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 6, fontWeight: 500 }}>
        {displayDate}
      </div>
      {impliedEntry && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00f99b" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>Implied</span>
          <span style={{ fontSize: 12, color: "#00f99b", fontWeight: 600, marginLeft: "auto" }}>
            {impliedEntry.value.toFixed(2)}%
          </span>
        </div>
      )}
      {baseEntry && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#6988ff" }} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>Base</span>
          <span style={{ fontSize: 12, color: "#6988ff", fontWeight: 600, marginLeft: "auto" }}>
            {baseEntry.value.toFixed(2)}%
          </span>
        </div>
      )}
      {/* Volume section */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 4, paddingTop: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 400, marginLeft: 12 }}>Vol</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, marginLeft: "auto" }}>
            {totalVol >= 1000 ? `$${(totalVol / 1000).toFixed(0)}K` : `$${totalVol}K`}
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Order Book mock data ---
interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

interface OrderBookData {
  bids: OrderLevel[];
  asks: OrderLevel[];
  midPrice: number;
  spread: number;
  spreadPct: string;
  maxTotal: number;
}

function buildOrderBook(
  mid: number,
  bidPrices: number[],
  bidSizes: number[],
  askPrices: number[],
  askSizes: number[]
): OrderBookData {
  const bids: OrderLevel[] = [];
  const asks: OrderLevel[] = [];
  let bidTotal = 0;
  bidPrices.forEach((p, i) => {
    bidTotal += bidSizes[i];
    bids.push({ price: p, size: bidSizes[i], total: bidTotal });
  });
  let askTotal = 0;
  askPrices.forEach((p, i) => {
    askTotal += askSizes[i];
    asks.push({ price: p, size: askSizes[i], total: askTotal });
  });
  const maxTotal = Math.max(bids[bids.length - 1].total, asks[asks.length - 1].total);
  const spread = askPrices[0] - bidPrices[0];
  const spreadPct = ((spread / mid) * 100).toFixed(2);
  return { bids, asks, midPrice: mid, spread, spreadPct, maxTotal };
}

// Both order books centered around chart's latest Implied APY: 5.61%
// PT order book — tighter spread, deeper liquidity
const ptOrderBook = buildOrderBook(
  5.61,
  [5.60, 5.58, 5.55, 5.52, 5.49, 5.45, 5.41, 5.37, 5.33, 5.28, 5.22, 5.16],
  [18400, 12300, 21600, 28100, 14800, 37200, 22700, 19300, 31500, 16200, 48300, 25800],
  [5.62, 5.64, 5.67, 5.70, 5.74, 5.78, 5.82, 5.87, 5.92, 5.97, 6.03, 6.10],
  [15100, 19700, 11200, 24400, 16600, 30800, 18500, 25100, 13900, 21400, 40200, 27700]
);

// YT order book — wider spread, thinner liquidity
const ytOrderBook = buildOrderBook(
  5.61,
  [5.59, 5.54, 5.48, 5.40, 5.31, 5.20, 5.08, 4.94, 4.78, 4.60, 4.40, 4.18],
  [3200, 5700, 2100, 8400, 4600, 11300, 6800, 3900, 9200, 7100, 15600, 10400],
  [5.63, 5.68, 5.74, 5.82, 5.91, 6.02, 6.14, 6.28, 6.44, 6.62, 6.82, 7.04],
  [2800, 6100, 3500, 7900, 5200, 12700, 8100, 4300, 10500, 6900, 18200, 11800]
);

function OrderBookView({ assetType }: { assetType: AssetType }) {
  const ob = assetType === "PT" ? ptOrderBook : ytOrderBook;
  const { bids, asks, midPrice, spread, spreadPct, maxTotal } = ob;

  // Use max size (not total) for bar widths since we removed cumulative column
  const maxSize = Math.max(...bids.map(l => l.size), ...asks.map(l => l.size));

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Column headers */}
      <div className="flex items-center px-3 pb-2">
        <span className="flex-1 font-['Inter'] text-[11px] text-white/30" style={{ fontWeight: 500 }}>
          Implied APY
        </span>
        <span className="w-[90px] text-right font-['Inter'] text-[11px] text-white/30" style={{ fontWeight: 500 }}>Size</span>
      </div>

      {/* Asks (reversed so highest at top) */}
      <div className="flex flex-col justify-end flex-1 min-h-0 overflow-hidden">
        {[...asks].reverse().map((level, i) => {
          const barWidth = (level.size / maxSize) * 100;
          return (
            <div key={`ask-${i}`} className="relative flex items-center px-3 h-[28px] group hover:bg-white/[0.07] transition-colors">
              <div
                className="absolute right-0 top-0 bottom-0 opacity-[0.08]"
                style={{ width: `${barWidth}%`, backgroundColor: "#ef4444" }}
              />
              <span className="flex-1 font-['Inter'] text-[12px] text-[#ef6b6b] relative z-10" style={{ fontWeight: 500 }}>
                {level.price.toFixed(2)}%
              </span>
              <span className="w-[90px] text-right font-['Inter'] text-[12px] text-white/60 relative z-10" style={{ fontWeight: 400 }}>
                {level.size.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mid price / spread */}
      <div className="flex items-center justify-between px-3 py-[6px] border-y border-white/[0.06] my-[2px]">
        <div className="flex items-center gap-2">
          <span className="font-['Inter'] text-[16px] text-white" style={{ fontWeight: 600 }}>
            {midPrice.toFixed(2)}%
          </span>
          <span
            className="font-['Inter'] text-[10px] px-[5px] py-[1px] rounded-[3px] bg-white/[0.08] text-white/70"
            style={{ fontWeight: 600 }}
          >
            {assetType}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-['Inter'] text-[11px] text-white/30" style={{ fontWeight: 400 }}>
            Spread
          </span>
          <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 500 }}>
            {spread.toFixed(2)} ({spreadPct}%)
          </span>
        </div>
      </div>

      {/* Bids */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {bids.map((level, i) => {
          const barWidth = (level.size / maxSize) * 100;
          return (
            <div key={`bid-${i}`} className="relative flex items-center px-3 h-[28px] group hover:bg-white/[0.07] transition-colors">
              <div
                className="absolute right-0 top-0 bottom-0 opacity-[0.08]"
                style={{ width: `${barWidth}%`, backgroundColor: "#22c55e" }}
              />
              <span className="flex-1 font-['Inter'] text-[12px] text-[#00f99b] relative z-10" style={{ fontWeight: 500 }}>
                {level.price.toFixed(2)}%
              </span>
              <span className="w-[90px] text-right font-['Inter'] text-[12px] text-white/60 relative z-10" style={{ fontWeight: 400 }}>
                {level.size.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M12 8.67v4a1.33 1.33 0 01-1.33 1.33h-8A1.33 1.33 0 011.33 12.67v-8A1.33 1.33 0 012.67 3.33h4M10.67 1.33h4v4M6.67 9.33l7.66-8"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarketDetailsView() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 py-3">
      {/* Pool Info Section */}
      <div className="mb-5">
        
        {/* Default Input/Output Token */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
              Default Input/Output Token
            </span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" />
              <path d="M8 7v4" stroke="white" strokeOpacity="0.3" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="white" fillOpacity="0.3" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
              sGHO
            </span>
            <button className="hover:opacity-70 transition-opacity">
              <ExternalLinkIcon />
            </button>
          </div>
        </div>

        {/* Underlying */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
            Underlying
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
              sGHO
            </span>
            <button className="hover:opacity-70 transition-opacity">
              <ExternalLinkIcon />
            </button>
          </div>
        </div>

        {/* APY */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
            APY
          </span>
          <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
            5.96%
          </span>
        </div>

        {/* Liquidity */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
            Liquidity
          </span>
          <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
            $1,344,324
          </span>
        </div>

        {/* Maturity */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
            Maturity
          </span>
          <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
            Jun 04 2026
          </span>
        </div>

        {/* Swap Fee */}
        <div className="flex items-center justify-between py-3">
          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
            Swap Fee
          </span>
          <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
            0.04%
          </span>
        </div>
      </div>

      {/* Pool Composition Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 500 }}>
            Pool Composition
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-[8px] h-[8px] rounded-full bg-[#6988ff]" />
              <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 400 }}>IBT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-[8px] h-[8px] rounded-full bg-[#00f99b]" />
              <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 400 }}>PT</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-[16px] rounded-[6px] overflow-hidden bg-white/[0.03] mb-2">
          <div className="absolute left-0 top-0 bottom-0 bg-[#6988ff]" style={{ width: "86.17%" }} />
          <div className="absolute right-0 top-0 bottom-0 bg-[#00f99b]" style={{ width: "13.82%" }} />
        </div>

        {/* Labels */}
        <div className="flex items-center justify-between">
          <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 500 }}>
            86.17% ($1.2M)
          </span>
          <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 500 }}>
            13.82% ($185.8K)
          </span>
        </div>
      </div>
    </div>
  );
}

type ViewMode = "chart" | "orderbook" | "marketdetails";

export function ChartPanel({ assetType, flat }: { assetType: AssetType; flat?: boolean }) {
  const [timeFilter, setTimeFilter] = useState<"custom" | "all">("all");
  const [viewMode, setViewMode] = useState<ViewMode>("chart");
  const [chartReady, setChartReady] = useState(false);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setChartReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleChartMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  const tokenLabel = assetType === "PT" ? "PT-USDC" : "YT-USDC";

  return (
    <div className={
      flat
        ? "w-full flex-1 flex flex-col min-h-0"
        : "bg-[#212125] border border-[#313032] rounded-[16px] p-3 sm:p-[17px] w-full h-[380px] sm:h-[440px] md:h-[504px] flex flex-col"
    }>
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-0 w-full pb-3 sm:pb-4">
        {/* Left: View mode toggle with icons + labels */}
        <div className="flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px] shrink-0">
          <button
            className={`flex items-center gap-[6px] px-3 py-[5px] rounded-[4px] font-['Inter'] text-[12px] transition-all ${
              viewMode === "chart"
                ? "bg-white/[0.1] text-white"
                : "text-white/35 hover:text-white/55"
            }`}
            style={{ fontWeight: viewMode === "chart" ? 500 : 400 }}
            onClick={() => setViewMode("chart")}
          >
            <ChartIcon active={viewMode === "chart"} />
            Chart
          </button>
          <button
            className={`flex items-center gap-[6px] px-3 py-[5px] rounded-[4px] font-['Inter'] text-[12px] transition-all ${
              viewMode === "orderbook"
                ? "bg-white/[0.1] text-white"
                : "text-white/35 hover:text-white/55"
            }`}
            style={{ fontWeight: viewMode === "orderbook" ? 500 : 400 }}
            onClick={() => setViewMode("orderbook")}
          >
            <OrderBookIcon active={viewMode === "orderbook"} />
            Order Book
          </button>
          <button
            className={`flex items-center gap-[6px] px-3 py-[5px] rounded-[4px] font-['Inter'] text-[12px] transition-all ${
              viewMode === "marketdetails"
                ? "bg-white/[0.1] text-white"
                : "text-white/35 hover:text-white/55"
            }`}
            style={{ fontWeight: viewMode === "marketdetails" ? 500 : 400 }}
            onClick={() => setViewMode("marketdetails")}
          >
            <InfoIconSmall active={viewMode === "marketdetails"} />
            Market Details
          </button>
        </div>

        {/* Center: contextual info */}
        <div className="flex items-center gap-3 sm:gap-5 ml-2 sm:ml-5">
          {viewMode === "chart" ? (
            <></>
          ) : viewMode === "orderbook" ? (
            <span className="font-['Inter'] text-[11px] text-white/35" style={{ fontWeight: 400 }}>
              {tokenLabel}
            </span>
          ) : null}
        </div>

        <div className="flex-1" />

        {/* Right: APY & Tools dropdowns */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-[6px] px-2 py-[3px] rounded-[5px] hover:bg-white/[0.08] transition-colors">
            <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 500 }}>APY</span>
            <ChevronDown />
          </button>
          <button className="flex items-center gap-[6px] px-2 py-[3px] rounded-[5px] hover:bg-white/[0.08] transition-colors">
            <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 500 }}>Tools</span>
            <ChevronDown />
          </button>
        </div>
      </div>

      {/* Content area */}
      {viewMode === "chart" ? (
        <>
          <div className="flex-1 w-full min-h-0" style={{ minHeight: 200 }}>
            {chartReady && (
              <div
                ref={chartWrapperRef}
                className="relative w-full h-full"
                style={{ cursor: "none" }}
                onMouseMove={handleChartMouseMove}
                onMouseLeave={handleChartMouseLeave}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 40, left: isMobile ? 0 : -10, bottom: 5 }}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      key="xaxis"
                      dataKey="date"
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Inter", fontWeight: 300 }}
                      tickLine={false}
                      axisLine={false}
                      ticks={xAxisTicks}
                    />
                    <YAxis
                      key="yaxis"
                      domain={[1, 7]}
                      ticks={[1, 2, 3, 4, 5, 6, 7]}
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Inter", fontWeight: 300 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => v.toFixed(2)}
                      width={isMobile ? 0 : 45}
                      hide={isMobile}
                    />
                    <Tooltip
                      key="tooltip"
                      contentStyle={{
                        backgroundColor: "#313032",
                        border: "1px solid #444",
                        borderRadius: 8,
                        color: "white",
                        fontFamily: "Inter",
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                      cursor={<CrosshairVertical />}
                      content={<ProTooltipContent />}
                    />
                    <ReferenceLine key="refline" y={0} stroke="rgba(255,255,255,0.1)" />
                    <Line
                      key="line-baseAPY"
                      type="stepAfter"
                      dataKey="baseAPY"
                      stroke="#6988ff"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: "#6988ff", stroke: "#191919", strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                    <Line
                      key="line-impliedAPY"
                      type="monotone"
                      dataKey="impliedAPY"
                      stroke="#00f99b"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: "#00f99b", stroke: "#191919", strokeWidth: 2 }}
                      isAnimationActive={false}
                      connectNulls
                    />
                    <Customized key="endpoints" component={EndpointLabels} />
                    <Customized key="volumes" component={VolumeBars} />
                  </LineChart>
                </ResponsiveContainer>

                {/* HTML crosshair overlay — horizontal line follows actual mouse Y */}
                {mousePos && (
                  <>
                    {/* Horizontal dashed line */}
                    <div
                      className="pointer-events-none absolute left-0 right-0"
                      style={{
                        top: mousePos.y,
                        height: 1,
                        backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 3px, transparent 3px, transparent 6px)",
                      }}
                    />
                    {/* Crosshair center dot */}
                    <div
                      className="pointer-events-none absolute"
                      style={{
                        left: mousePos.x - 5,
                        top: mousePos.y - 5,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.25)",
                      }}
                    />
                    <div
                      className="pointer-events-none absolute"
                      style={{
                        left: mousePos.x - 2,
                        top: mousePos.y - 2,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.8)",
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Time filter buttons */}
          <div className="flex items-center justify-between pt-3">
            {/* Legend on the left */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-[5px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#6988ff]" />
                <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 300 }}>Base APY (7d)</span>
              </div>
              <div className="flex items-center gap-[5px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#00f99b]" />
                <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 300 }}>Implied APY</span>
              </div>
            </div>

            {/* Buttons on the right */}
            <div className="flex items-center gap-2">
              <button
                className={`px-2 py-1 rounded-[6px] font-['Inter'] text-[12px] text-white/75 ${
                  timeFilter === "custom" ? "bg-[#00f99b] text-[#191919]" : ""
                }`}
                style={{ fontWeight: 400 }}
                onClick={() => setTimeFilter("custom")}
              >
                Custom
              </button>
              <button
                className={`px-2 py-1 rounded-[6px] font-['Inter'] text-[12px] text-white/75 ${
                  timeFilter === "all" ? "bg-[#00f99b] text-[#191919]" : ""
                }`}
                style={{ fontWeight: 400 }}
                onClick={() => setTimeFilter("all")}
              >
                All
              </button>
            </div>
          </div>
        </>
      ) : viewMode === "orderbook" ? (
        <OrderBookView assetType={assetType} />
      ) : (
        <MarketDetailsView />
      )}
    </div>
  );
}