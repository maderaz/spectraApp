import { PoolInfo } from "./PoolInfo";
import { Header } from "./Header";
import { LiquidityPanel } from "./LiquidityPanel";
import { ChartPanel } from "./ChartPanel";
import { ActivityTable, INITIAL_ORDERS, INITIAL_HISTORY } from "./ActivityTable";
import { useState, useCallback } from "react";
import type { Order, HistoryEntry } from "./ActivityTable";

type AssetType = "PT" | "YT";

export function Dashboard() {
  const [assetType, setAssetType] = useState<AssetType>("PT");
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
    <div className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pl-4 overflow-auto">
      <div className="xl:pt-0 max-w-[1200px] mx-auto flex flex-col gap-4 sm:gap-6">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
          {/* Left Panel - Liquidity Form */}
          <div className="w-full lg:w-[465px] lg:shrink-0">
            <LiquidityPanel
              assetType={assetType}
              onAssetTypeChange={setAssetType}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>

          {/* Right Panel - Chart + Activity + Pool Info */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-4 sm:gap-6">
            <ChartPanel assetType={assetType} />
            <ActivityTable orders={orders} history={history} onCancelOrder={handleCancelOrder} />
            <PoolInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
