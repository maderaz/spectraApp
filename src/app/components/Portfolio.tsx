import { PortfolioSummary } from "./PortfolioSummary";
import { PositionsTable } from "./PositionsTable";

export function Portfolio() {
  return (
    <div className="flex-1 min-w-0 overflow-auto scrollbar-hide font-['Inter']">
      <div className="flex flex-col h-full min-h-screen xl:h-screen">
        {/* ── HERO: Total Value + Allocation Donut ── */}
        <PortfolioSummary />

        {/* ── MAIN: Positions table (full width, fills rest) ── */}
        <div className="flex-1 min-h-0 flex flex-col">
          <PositionsTable />
        </div>
      </div>
    </div>
  );
}