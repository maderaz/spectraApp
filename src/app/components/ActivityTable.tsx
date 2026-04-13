import { useState, useEffect, useRef } from "react";

// ─── Tab types ───
type TabKey = "orders" | "history" | "positions" | "activity";

const TABS: { key: TabKey; label: string; mobileLabel: string }[] = [
  { key: "orders", label: "My Orders", mobileLabel: "Orders" },
  { key: "history", label: "My History", mobileLabel: "History" },
  { key: "activity", label: "Market Activity", mobileLabel: "Activity" },
  { key: "positions", label: "My Positions", mobileLabel: "Positions" },
];

// ─── Shared cell style constants ───
const HEADER_CELL = "font-['Inter'] text-[10px] sm:text-[12px] text-white/50";
const HEADER_WEIGHT = { fontWeight: 300 } as const;
const BODY_CELL = "font-['Inter'] text-[10px] sm:text-[12px] text-white";
const BODY_WEIGHT = { fontWeight: 300 } as const;
const BODY_MUTED = "font-['Inter'] text-[10px] sm:text-[12px] text-white/40";
const ROW_H = "px-4 py-[9px]";
const HEAD_H = "flex items-center px-4 py-3 w-full";

const FIXED_ROWS = 5;

// Explicit row height to keep empty rows identical to data rows
const ROW_MIN_H = "min-h-[36px]";

/** Renders empty placeholder rows to always reach exactly FIXED_ROWS */
function EmptyRows({ count, startIndex }: { count: number; startIndex: number }) {
  if (count <= 0) return null;
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const rowIndex = startIndex + i;
        return (
          <div
            key={`empty-${rowIndex}`}
            className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${rowIndex % 2 === 1 ? "bg-white/[0.03]" : ""}`}
          >
            <div className="w-full flex items-center justify-center">
              <div className="flex gap-[3px]">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-[3px] h-[3px] rounded-full bg-white/[0.06]"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ─── Shared Order type ───
export interface Order {
  id: string;
  type: "Limit";
  side: "Buy" | "Sell";
  token: "PT" | "YT";
  amount: string;
  impliedApy: string;
  filled: string;
  status: "Open" | "Partial" | "Filled" | "Cancelled";
  time: string;
}

export interface HistoryEntry {
  id: string;
  type: "Swap" | "Limit";
  side: "Buy" | "Sell";
  token: string;
  amount: string;
  received: string;
  impliedApy: string;
  time: string;
  outcome?: "Cancelled" | "Filled";
}

// ─── Initial mock orders (Filled order moved to history) ───
export const INITIAL_ORDERS: Order[] = [
  { id: "mock-1", type: "Limit", side: "Buy", token: "PT", amount: "5,200 USDC", impliedApy: "5.80%", filled: "0%", status: "Open", time: "2m ago" },
  { id: "mock-2", type: "Limit", side: "Sell", token: "PT", amount: "1,800 PT", impliedApy: "5.55%", filled: "62%", status: "Partial", time: "14m ago" },
  { id: "mock-4", type: "Limit", side: "Sell", token: "YT", amount: "45,000 YT", impliedApy: "5.42%", filled: "0%", status: "Open", time: "3h ago" },
  { id: "mock-5", type: "Limit", side: "Buy", token: "PT", amount: "12,000 USDC", impliedApy: "6.10%", filled: "0%", status: "Open", time: "5h ago" },
  { id: "mock-6", type: "Limit", side: "Sell", token: "PT", amount: "3,500 PT", impliedApy: "5.30%", filled: "25%", status: "Partial", time: "8h ago" },
];

// ─── Initial mock history ───
export const INITIAL_HISTORY: HistoryEntry[] = [
  { id: "hist-0", type: "Limit", side: "Buy", token: "YT", amount: "320 USDC", received: "231,169 YT", impliedApy: "5.90%", time: "1h ago", outcome: "Filled" },
  { id: "hist-1", type: "Swap", side: "Buy", token: "PT", amount: "2,500 USDC", received: "2,506.85 PT", impliedApy: "5.61%", time: "22m ago" },
  { id: "hist-2", type: "Swap", side: "Sell", token: "YT", amount: "18,200 YT", received: "25.18 USDC", impliedApy: "5.58%", time: "1h 14m ago" },
  { id: "hist-3", type: "Limit", side: "Buy", token: "YT", amount: "500 USDC", received: "361,369 YT", impliedApy: "5.90%", time: "3h 40m ago" },
  { id: "hist-4", type: "Swap", side: "Buy", token: "PT", amount: "10,000 USDC", received: "10,027.40 PT", impliedApy: "5.63%", time: "1d 2h ago" },
  { id: "hist-5", type: "Swap", side: "Sell", token: "PT", amount: "4,200 PT", received: "4,188.53 USDC", impliedApy: "5.59%", time: "2d 8h ago" },
  { id: "hist-6", type: "Limit", side: "Sell", token: "YT", amount: "95,000 YT", received: "131.48 USDC", impliedApy: "5.42%", time: "3d 14h ago" },
  { id: "hist-7", type: "Swap", side: "Buy", token: "PT", amount: "750 USDC", received: "752.06 PT", impliedApy: "5.65%", time: "5d 6h ago" },
];

// ─── Other mock data ───

const positionsData = [
  { 
    token: "PT-sGHO", 
    type: "PT" as const, 
    balance: "14,284.20", 
    balanceUsd: "14,245.22",
    value: "$14,245.22", 
    apy: "8.68%",
    maturityRedemption: "14,432.64 sGHO",
    maturityValue: "$14,284.20",
    maturity: "Jan 31, 2026",
  },
  { 
    token: "YT-sGHO", 
    type: "YT" as const, 
    balance: "361,369.00",
    balanceUsd: "500.14", 
    value: "$500.14", 
    apy: "16.61%",
    accruedYield: "12.840 sGHO",
    accruedYieldUsd: "$12.84",
    claimableYield: "4.210 sGHO",
    claimableYieldUsd: "$4.21",
    maturity: "Jan 31, 2026",
  },
];

const activityData = [
  { action: "Sell YT", value: "$1,541", time: "53m", user: "0x6b1...bb1" },
  { action: "Sell PT", value: "$1,832", time: "54m", user: "0x6b1...bb1" },
  { action: "Buy PT", value: "$11,526", time: "1h 21m", user: "0xed5...e90" },
  { action: "Buy YT", value: "$2,340", time: "2h 11m", user: "0x41b...56d" },
  { action: "Sell PT", value: "$4,810", time: "3h 40m", user: "0xe3f...3f5" },
  { action: "Buy YT", value: "$51,194", time: "4h 20m", user: "0xe3f...3f5" },
  { action: "Buy PT", value: "$86,718", time: "5h 19m", user: "0xeb3...a43" },
  { action: "Sell YT", value: "$12,450", time: "6h 05m", user: "0xa2c...d19" },
  { action: "Buy PT", value: "$3,275", time: "7h 32m", user: "0x7f8...e21" },
];

// ─── Status badge ───
function StatusBadge({ status }: { status: "Open" | "Partial" | "Filled" | "Cancelled" }) {
  const styles: Record<string, { bg: string; text: string }> = {
    Open: { bg: "rgba(0,249,155,0.12)", text: "#00f99b" },
    Partial: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
    Filled: { bg: "rgba(0,249,155,0.12)", text: "#00f99b" },
    Cancelled: { bg: "rgba(239,107,107,0.12)", text: "#ef6b6b" },
  };
  const s = styles[status] || styles.Open;
  return (
    <span
      className="font-['Inter'] text-[10px] sm:text-[11px] px-[6px] py-[2px] rounded-[4px]"
      style={{ fontWeight: 500, backgroundColor: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

// ─── Side badge ───
function SideBadge({ side }: { side: "Buy" | "Sell" }) {
  return (
    <span
      className="font-['Inter'] text-[10px] sm:text-[11px]"
      style={{ fontWeight: 500, color: side === "Buy" ? "#00f99b" : "#ef6b6b" }}
    >
      {side}
    </span>
  );
}

// ─── Cancel Confirmation Modal ───
function CancelOrderModal({
  order,
  onConfirm,
  onDismiss,
}: {
  order: Order;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onDismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* Modal card */}
      <div
        className="relative bg-[#212125] border border-[#3a3a3e] rounded-[16px] p-6 sm:p-8 w-[90%] max-w-[400px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning icon */}
        <div className="flex justify-center mb-5">
          <div className="w-[48px] h-[48px] rounded-full bg-[#ef6b6b]/10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef6b6b" strokeWidth="1.5" />
              <path d="M12 7v5.5" stroke="#ef6b6b" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#ef6b6b" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-['Inter'] text-[16px] text-white text-center mb-2"
          style={{ fontWeight: 600 }}
        >
          Cancel Order
        </h3>

        {/* Description */}
        <p
          className="font-['Inter'] text-[13px] text-white/50 text-center mb-6"
          style={{ fontWeight: 400 }}
        >
          Are you sure you want to cancel your{" "}
          <span style={{ color: order.side === "Buy" ? "#00f99b" : "#ef6b6b", fontWeight: 500 }}>
            {order.side}
          </span>{" "}
          <span style={{ color: "white", fontWeight: 500 }}>{order.token}</span>{" "}
          limit order for{" "}
          <span style={{ color: "white", fontWeight: 500 }}>{order.amount}</span>{" "}
          at{" "}
          <span style={{ color: "white", fontWeight: 500 }}>{order.impliedApy}</span>
          ?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 h-[44px] rounded-[8px] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all flex items-center justify-center"
            onClick={onDismiss}
          >
            <span
              className="font-['Inter'] text-[13px] text-white/70"
              style={{ fontWeight: 500 }}
            >
              No
            </span>
          </button>
          <button
            className="flex-1 h-[44px] rounded-[8px] bg-[#ef6b6b] hover:bg-[#e85d5d] transition-all flex items-center justify-center"
            style={{ boxShadow: "0 0 20px rgba(239,107,107,0.25)" }}
            onClick={onConfirm}
          >
            <span
              className="font-['Inter'] text-[13px] text-white"
              style={{ fontWeight: 600 }}
            >
              Yes, Cancel Order
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tab content renderers ───

function OrdersTable({
  orders,
  onCancelOrder,
}: {
  orders: Order[];
  onCancelOrder: (id: string) => void;
}) {
  const [cancelTarget, setCancelTarget] = useState<Order | null>(null);

  const handleConfirmCancel = () => {
    if (cancelTarget) {
      onCancelOrder(cancelTarget.id);
      setCancelTarget(null);
    }
  };

  const cancellable = (status: string) => status === "Open" || status === "Partial";

  const visible = orders.slice(0, FIXED_ROWS);

  return (
    <div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[560px]">
          <div className={HEAD_H}>
            <div className="w-[10%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Type</span></div>
            <div className="w-[8%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Side</span></div>
            <div className="w-[19%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Amount</span></div>
            <div className="w-[14%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Implied APY</span></div>
            <div className="w-[12%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Filled</span></div>
            <div className="w-[13%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Status</span></div>
            <div className="w-[13%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Time</span></div>
            <div className="w-[11%] text-right"><span className={HEADER_CELL} style={HEADER_WEIGHT}></span></div>
          </div>
          <div>
            {visible.map((item, i) => (
              <div key={item.id} className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${i % 2 === 1 ? "bg-white/[0.03]" : ""}`}>
                <div className="w-[10%]">
                  <span className={BODY_CELL} style={{ fontWeight: 400, opacity: 0.7 }}>{item.type}</span>
                </div>
                <div className="w-[8%]"><SideBadge side={item.side} /></div>
                <div className="w-[19%]">
                  <span className={BODY_CELL} style={BODY_WEIGHT}>{item.amount}</span>
                </div>
                <div className="w-[14%]">
                  <span className={BODY_CELL} style={BODY_WEIGHT}>{item.impliedApy}</span>
                </div>
                <div className="w-[12%]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-[32px] h-[3px] bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: item.filled,
                          backgroundColor: item.filled === "100%" ? "#00f99b" : item.filled === "0%" ? "transparent" : "#f59e0b",
                        }}
                      />
                    </div>
                    <span className="font-['Inter'] text-[10px] sm:text-[11px] text-white/50" style={{ fontWeight: 400 }}>{item.filled}</span>
                  </div>
                </div>
                <div className="w-[13%]"><StatusBadge status={item.status} /></div>
                <div className="w-[13%]">
                  <span className={BODY_MUTED} style={BODY_WEIGHT}>{item.time}</span>
                </div>
                <div className="w-[11%] text-right">
                  {cancellable(item.status) ? (
                    <button
                      onClick={() => setCancelTarget(item)}
                      className="font-['Inter'] text-[10px] sm:text-[11px] text-[#ef6b6b]/60 hover:text-[#ef6b6b] px-[6px] py-[3px] rounded-[4px] hover:bg-[#ef6b6b]/[0.08] transition-all"
                      style={{ fontWeight: 500 }}
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="w-[38px] inline-block" />
                  )}
                </div>
              </div>
            ))}
            <EmptyRows count={FIXED_ROWS - visible.length} startIndex={visible.length} />
          </div>
        </div>
      </div>

      {/* Cancel confirmation modal */}
      {cancelTarget && (
        <CancelOrderModal
          order={cancelTarget}
          onConfirm={handleConfirmCancel}
          onDismiss={() => setCancelTarget(null)}
        />
      )}
    </div>
  );
}

function HistoryTable({ history }: { history: HistoryEntry[] }) {
  const visible = history.slice(0, FIXED_ROWS);
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="min-w-[480px]">
        <div className={HEAD_H}>
          <div className="w-[11%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Type</span></div>
          <div className="w-[9%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Side</span></div>
          <div className="w-[20%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Amount</span></div>
          <div className="w-[22%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Received</span></div>
          <div className="w-[17%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Implied APY</span></div>
          <div className="w-[21%] text-right"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Time</span></div>
        </div>
        <div>
          {visible.map((item, i) => {
            const isCancelled = item.outcome === "Cancelled";
            return (
              <div key={item.id} className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${i % 2 === 1 ? "bg-white/[0.03]" : ""}`}>
                <div className="w-[11%]">
                  <span className={BODY_CELL} style={{ fontWeight: 400, opacity: 0.7 }}>{item.type}</span>
                </div>
                <div className="w-[9%]"><SideBadge side={item.side} /></div>
                <div className="w-[20%]">
                  <span className={BODY_CELL} style={BODY_WEIGHT}>{item.amount}</span>
                </div>
                <div className="w-[22%]">
                  {isCancelled ? (
                    <span
                      className="font-['Inter'] text-[10px] sm:text-[11px] px-[6px] py-[2px] rounded-[4px]"
                      style={{ fontWeight: 500, backgroundColor: "rgba(239,107,107,0.12)", color: "#ef6b6b" }}
                    >
                      Cancelled
                    </span>
                  ) : (
                    <span className={BODY_CELL} style={BODY_WEIGHT}>{item.received}</span>
                  )}
                </div>
                <div className="w-[17%]">
                  <span className={BODY_CELL} style={BODY_WEIGHT}>{item.impliedApy}</span>
                </div>
                <div className="w-[21%] text-right">
                  <span className={BODY_MUTED} style={BODY_WEIGHT}>{item.time}</span>
                </div>
              </div>
            );
          })}
          <EmptyRows count={FIXED_ROWS - visible.length} startIndex={visible.length} />
        </div>
      </div>
    </div>
  );
}

type PositionFilter = "All" | "PT" | "YT";

const POSITION_FILTERS: PositionFilter[] = ["All", "PT", "YT"];
const FILTER_ACCENT: Record<PositionFilter, string> = {
  All: "#ffffff",
  PT: "#00f99b",
  YT: "#f4c071",
};

function PositionsTable({ filter }: { filter: PositionFilter }) {
  const filtered = filter === "All"
    ? positionsData
    : positionsData.filter((p) => p.type === filter);

  const visible = filtered.slice(0, FIXED_ROWS);
  const emptyCount = FIXED_ROWS - visible.length;

  // Determine which columns to show based on filter
  const showPTColumns = filter === "PT" || (filter === "All" && visible.some((p) => p.type === "PT"));
  const showYTColumns = filter === "YT" || (filter === "All" && visible.some((p) => p.type === "YT"));

  // For "All", we'll use a generic layout that works for both
  const isAllMode = filter === "All";

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="min-w-[360px]">
        {/* Column headers - different for PT vs YT */}
        {filter === "PT" && (
          <div className={HEAD_H}>
            <div className="flex-1 min-w-[110px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Position</span></div>
            <div className="flex-1 min-w-[100px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Balance</span></div>
            <div className="flex-1 min-w-[120px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Maturity Redemption</span></div>
            <div className="flex-1 min-w-[100px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Maturity Value</span></div>
            <div className="flex-1 min-w-[90px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Expiry</span></div>
          </div>
        )}
        {filter === "YT" && (
          <div className={HEAD_H}>
            <div className="flex-1 min-w-[110px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Position</span></div>
            <div className="flex-1 min-w-[100px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Balance</span></div>
            <div className="flex-1 min-w-[120px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Accrued Yield</span></div>
            <div className="flex-1 min-w-[100px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Claimable Yield</span></div>
            <div className="flex-1 min-w-[90px]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Expiry</span></div>
          </div>
        )}
        {filter === "All" && (
          <div className={HEAD_H}>
            <div className="w-[30%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Token</span></div>
            <div className="w-[24%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Balance</span></div>
            <div className="w-[24%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Value</span></div>
            <div className="w-[22%] text-right"><span className={HEADER_CELL} style={HEADER_WEIGHT}>APY</span></div>
          </div>
        )}

        {/* Rows */}
        <div>
          {visible.map((item, i) => {
            const typeColor = item.type === "PT" ? "#00f99b" : item.type === "YT" ? "#f4c071" : "#a78bfa";
            
            // PT specific row
            if (filter === "PT") {
              return (
                <div key={`pos-${item.token}`} className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${i % 2 === 1 ? "bg-white/[0.03]" : ""} hover:bg-white/[0.07] transition-colors`}>
                  <div className="flex-1 min-w-[110px] flex items-center gap-1.5">
                    <span className="inline-block w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: typeColor }} />
                    <span className={BODY_CELL} style={{ fontWeight: 500 }}>{item.token}</span>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className={BODY_CELL} style={{ fontWeight: 500 }}>{item.balance}</span>
                      <span className="text-[9px] text-white/30" style={{ fontWeight: 400 }}>≈${item.balanceUsd}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className={BODY_CELL} style={{ fontWeight: 500 }}>{item.maturityRedemption}</span>
                      <span className="text-[9px] text-white/30" style={{ fontWeight: 400 }}>≈{item.maturityValue}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <span className="font-['Inter'] text-[10px] sm:text-[12px]" style={{ fontWeight: 500, color: typeColor }}>
                      {item.maturityValue}
                    </span>
                  </div>
                  <div className="flex-1 min-w-[90px]">
                    <span className="text-[10px] sm:text-[11px] text-white/40" style={{ fontWeight: 400 }}>{item.maturity}</span>
                  </div>
                </div>
              );
            }
            
            // YT specific row
            if (filter === "YT") {
              return (
                <div key={`pos-${item.token}`} className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${i % 2 === 1 ? "bg-white/[0.03]" : ""} hover:bg-white/[0.07] transition-colors`}>
                  <div className="flex-1 min-w-[110px] flex items-center gap-1.5">
                    <span className="inline-block w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: typeColor }} />
                    <span className={BODY_CELL} style={{ fontWeight: 500 }}>{item.token}</span>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className={BODY_CELL} style={{ fontWeight: 500 }}>{item.balance}</span>
                      <span className="text-[9px] text-white/30" style={{ fontWeight: 400 }}>≈${item.balanceUsd}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className={BODY_CELL} style={{ fontWeight: 500 }}>{item.accruedYield || "—"}</span>
                      {item.accruedYieldUsd && (
                        <span className="text-[9px] text-white/30" style={{ fontWeight: 400 }}>≈{item.accruedYieldUsd}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <div className="flex flex-col gap-[1px]">
                      <span className="font-['Inter'] text-[10px] sm:text-[12px]" style={{ fontWeight: 500, color: typeColor }}>
                        {item.claimableYield || "—"}
                      </span>
                      {item.claimableYieldUsd && (
                        <span className="text-[9px] text-white/30" style={{ fontWeight: 400 }}>≈{item.claimableYieldUsd}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[90px]">
                    <span className="text-[10px] sm:text-[11px] text-white/40" style={{ fontWeight: 400 }}>{item.maturity}</span>
                  </div>
                </div>
              );
            }
            
            // All mode - generic row
            return (
              <div key={`pos-${item.token}`} className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${i % 2 === 1 ? "bg-white/[0.03]" : ""}`}>
                <div className="w-[30%] flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span
                    className="inline-block w-[4px] h-[4px] rounded-full shrink-0"
                    style={{ backgroundColor: typeColor }}
                  />
                  <span className={`${BODY_CELL} whitespace-nowrap`} style={{ fontWeight: 500 }}>{item.token}</span>
                </div>
                <div className="w-[24%]">
                  <span className={BODY_CELL} style={BODY_WEIGHT}>{item.balance}</span>
                </div>
                <div className="w-[24%]">
                  <span className={BODY_CELL} style={BODY_WEIGHT}>{item.value}</span>
                </div>
                <div className="w-[22%] text-right">
                  <span className="font-['Inter'] text-[10px] sm:text-[12px] text-[#00f99b]" style={{ fontWeight: 500 }}>{item.apy}</span>
                </div>
              </div>
            );
          })}

          {/* Skeleton empty rows */}
          {emptyCount > 0 && Array.from({ length: emptyCount }, (_, i) => {
            const rowIndex = visible.length + i;
            return (
              <div
                key={`pos-empty-${rowIndex}`}
                className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${rowIndex % 2 === 1 ? "bg-white/[0.03]" : ""}`}
              >
                {isAllMode ? (
                  <>
                    <div className="w-[30%] flex items-center gap-1.5 sm:gap-2">
                      <span className="inline-block w-[4px] h-[4px] rounded-full bg-white/[0.06] shrink-0" />
                      <span className="inline-block w-[52px] h-[6px] rounded-full bg-white/[0.04]\" />
                    </div>
                    <div className="w-[24%]"><span className="inline-block w-[56px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                    <div className="w-[24%]"><span className="inline-block w-[48px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                    <div className="w-[22%] flex justify-end\"><span className="inline-block w-[32px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-[110px] flex items-center gap-1.5">
                      <span className="inline-block w-[4px] h-[4px] rounded-full bg-white/[0.06] shrink-0" />
                      <span className="inline-block w-[52px] h-[6px] rounded-full bg-white/[0.04]\" />
                    </div>
                    <div className="flex-1 min-w-[100px]"><span className="inline-block w-[56px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                    <div className="flex-1 min-w-[120px]"><span className="inline-block w-[64px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                    <div className="flex-1 min-w-[100px]"><span className="inline-block w-[48px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                    <div className="flex-1 min-w-[90px]"><span className="inline-block w-[42px] h-[6px] rounded-full bg-white/[0.04]\" /></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MarketActivityTable() {
  const visible = activityData.slice(0, FIXED_ROWS);
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="min-w-[340px]">
        <div className={HEAD_H}>
          <div className="w-[25%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Action</span></div>
          <div className="w-[25%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Value</span></div>
          <div className="w-[25%]"><span className={HEADER_CELL} style={HEADER_WEIGHT}>Time</span></div>
          <div className="w-[25%] text-right"><span className={HEADER_CELL} style={HEADER_WEIGHT}>User</span></div>
        </div>
        <div>
          {visible.map((item, i) => (
            <div key={`act-${item.action}-${item.time}-${i}`} className={`flex items-center ${ROW_H} ${ROW_MIN_H} ${i % 2 === 1 ? "bg-white/[0.03]" : ""}`}>
              <div className="w-[25%]">
                <span className={BODY_CELL} style={BODY_WEIGHT}>{item.action}</span>
              </div>
              <div className="w-[25%]">
                <span className={BODY_CELL} style={BODY_WEIGHT}>{item.value}</span>
              </div>
              <div className="w-[25%]">
                <span className={BODY_MUTED} style={BODY_WEIGHT}>{item.time}</span>
              </div>
              <div className="w-[25%] text-right">
                <span className={BODY_CELL} style={BODY_WEIGHT}>{item.user}</span>
              </div>
            </div>
          ))}
          <EmptyRows count={FIXED_ROWS - visible.length} startIndex={visible.length} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───

export function ActivityTable({
  orders,
  history,
  onCancelOrder,
  flat,
  hideOrders,
}: {
  orders: Order[];
  history: HistoryEntry[];
  onCancelOrder: (id: string) => void;
  flat?: boolean;
  hideOrders?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>(hideOrders ? "history" : "activity");
  const [posFilter, setPosFilter] = useState<PositionFilter>("All");
  const prevOrderCountRef = useRef(orders.length);

  // Auto-switch to "orders" tab when a new order is placed
  useEffect(() => {
    if (orders.length > prevOrderCountRef.current) {
      setActiveTab("orders");
    }
    prevOrderCountRef.current = orders.length;
  }, [orders.length]);

  return (
    <div className={flat ? "w-full overflow-hidden" : "bg-[#212125] border border-[#313032] rounded-[16px] p-3 sm:p-[17px] w-full overflow-hidden"}>
      {/* Tab bar */}
      <div className="flex flex-wrap items-center border-b border-white/[0.06] mb-1">
        {/* Left: main tabs */}
        <div className="flex items-center gap-0">
          {TABS.filter((tab) => !(hideOrders && tab.key === "orders")).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-2 sm:px-4 pb-[10px] pt-[6px] transition-colors"
              >
                <span
                  className={`font-['Inter'] text-[11px] sm:text-[13px] whitespace-nowrap transition-colors ${
                    isActive ? "text-white" : "text-white/35 hover:text-white/55"
                  }`}
                  style={{ fontWeight: isActive ? 600 : 400 }}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                </span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-2 sm:left-4 right-2 sm:right-4 h-[2px] rounded-full bg-white/80"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: position sub-filters (only when positions tab is active) */}
        {activeTab === "positions" && (
          <div className="ml-auto flex items-center gap-[2px] pb-[4px]">
            <div className="hidden sm:block w-[1px] h-[14px] bg-white/[0.08] mr-2" />
            {POSITION_FILTERS.map((f) => {
              const isActive = posFilter === f;
              const accent = FILTER_ACCENT[f];
              return (
                <button
                  key={f}
                  onClick={() => setPosFilter(f)}
                  className={`${f === "All" ? "hidden sm:relative sm:block" : "relative"} px-[6px] sm:px-[8px] py-[4px] rounded-[5px] transition-all`}
                  style={{
                    backgroundColor: isActive ? `${accent}10` : "transparent",
                    border: isActive ? `1px solid ${accent}22` : "1px solid transparent",
                  }}
                >
                  <span
                    className="font-['Inter'] text-[10px] sm:text-[11px] transition-colors"
                    style={{
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? accent : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Tab content */}
      {activeTab === "orders" && <OrdersTable orders={orders} onCancelOrder={onCancelOrder} />}
      {activeTab === "history" && <HistoryTable history={history} />}
      {activeTab === "positions" && <PositionsTable filter={posFilter} />}
      {activeTab === "activity" && <MarketActivityTable />}
    </div>
  );
}