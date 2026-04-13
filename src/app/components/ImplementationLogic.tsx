export function ImplementationLogic() {
  const S = {
    section: "mb-6",
    h2: "font-['Inter'] text-[15px] text-white mb-3",
    h2w: { fontWeight: 600 } as const,
    h3: "font-['Inter'] text-[13px] text-white/80 mb-2",
    h3w: { fontWeight: 600 } as const,
    p: "font-['Inter'] text-[12px] text-white/50 mb-2",
    pw: { fontWeight: 300 } as const,
    ul: "list-disc pl-5 flex flex-col gap-1.5 mb-3",
    li: "font-['Inter'] text-[12px] text-white/50",
    liw: { fontWeight: 300 } as const,
    code: "font-mono text-[11px] bg-white/[0.06] border border-white/[0.06] rounded px-1.5 py-0.5 text-[#6988ff]/90",
    divider: "border-t border-white/[0.04] my-5",
    badge: "inline-block font-['Inter'] text-[10px] px-[6px] py-[2px] rounded-[4px]",
  };

  return (
    <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-5 sm:p-8 w-full font-['Inter']">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[6px] h-[6px] rounded-full bg-[#6988ff]" />
        <h2 className="font-['Inter'] text-[18px] text-white" style={{ fontWeight: 700 }}>
          Implementation Logic Instructions
        </h2>
      </div>

      {/* 1. Architecture Overview */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>1. Architecture Overview</h2>
        <p className={S.p} style={S.pw}>
          The dashboard follows a <span className={S.code}>lift-state-up</span> pattern where shared application state lives in <span className={S.code}>App.tsx</span> and
          flows down via props. The component tree is:
        </p>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}><span className={S.code}>App.tsx</span> &mdash; Root. Owns <span className={S.code}>assetType</span>, <span className={S.code}>orders[]</span>, and <span className={S.code}>history[]</span> state.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>Sidebar.tsx</span> &mdash; Global navigation. Static, no shared state yet.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>Header.tsx</span> &mdash; Pool info + Pool/Trade Yield tabs. Local <span className={S.code}>activeTab</span> state (not yet wired to App).</li>
          <li className={S.li} style={S.liw}><span className={S.code}>LiquidityPanel.tsx</span> &mdash; Trading form. Controls <span className={S.code}>assetType</span> (PT/YT) and calls <span className={S.code}>onPlaceOrder</span> in Limit mode.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>ChartPanel.tsx</span> &mdash; Receives <span className={S.code}>assetType</span> and reacts to PT/YT switch.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>ActivityTable.tsx</span> &mdash; Receives <span className={S.code}>orders</span>, <span className={S.code}>history</span>, <span className={S.code}>onCancelOrder</span>. 4-tab interface with fixed 5-row layout.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>PoolInfo.tsx</span> &mdash; Static pool metrics in 50/50 card layout.</li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 2. State Management */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>2. State Management & Data Flow</h2>

        <h3 className={S.h3} style={S.h3w}>Lifted State (App.tsx)</h3>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}><span className={S.code}>assetType: "PT" | "YT"</span> &mdash; Controls which token the trading form and chart display. Set by LiquidityPanel's Tier-1 segmented control, consumed by ChartPanel.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>orders: Order[]</span> &mdash; Active limit orders. New orders are prepended; cancelled orders are removed and moved to history.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>history: HistoryEntry[]</span> &mdash; Completed/cancelled trade history. Cancelled entries have <span className={S.code}>outcome: "Cancelled"</span> and show a red badge instead of received amount.</li>
        </ul>

        <h3 className={S.h3} style={S.h3w}>Local State (per component)</h3>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}><span className={S.code}>LiquidityPanel</span> &mdash; <span className={S.code}>tradeMode</span> (Buy/Sell), <span className={S.code}>orderType</span> (Swap/Limit), <span className={S.code}>inputAmount</span>, <span className={S.code}>limitRate</span>, <span className={S.code}>expiresIn</span>, <span className={S.code}>detailsOpen</span>.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>ActivityTable</span> &mdash; <span className={S.code}>activeTab</span> (orders/history/positions/activity). Auto-switches to "orders" when <span className={S.code}>orders.length</span> increases.</li>
          <li className={S.li} style={S.liw}><span className={S.code}>Header</span> &mdash; <span className={S.code}>activeTab</span> (pool/trade). Currently local only; next step is to lift this to App to toggle between Pool and Trade Yield views.</li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 3. Trading Panel Logic */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>3. Trading Panel Logic</h2>

        <h3 className={S.h3} style={S.h3w}>Three-tier Navigation</h3>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Tier 1:</strong> Full-width PT/YT segmented control. Blue accent (<span className={S.code}>#6988ff</span>) for PT, gold (<span className={S.code}>#d4a843</span>) for YT. Changes <span className={S.code}>assetType</span> in App.</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Tier 2:</strong> Buy/Sell toggle — solid-filled pill with glow effect. Changes local <span className={S.code}>tradeMode</span>.</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Tier 3:</strong> Swap/Limit text toggle with dot indicator. Changes local <span className={S.code}>orderType</span>.</li>
        </ul>

        <h3 className={S.h3} style={S.h3w}>Dynamic Calculations (Mock Rates)</h3>
        <p className={S.p} style={S.pw}>
          All output values are computed from <span className={S.code}>inputAmount</span> using hardcoded mock exchange rates. The formulas use:
        </p>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}>PT rate: ~1.00274 PT/USDC, YT rate: ~722.738 YT/USDC</li>
          <li className={S.li} style={S.liw}>Output amount, USD equivalent, earn yield, implied APY impact, leverage, fixed yields, price impact, min received, slippage, and exchange rate are all recalculated on every input change.</li>
          <li className={S.li} style={S.liw}>Implied APY Impact shows <span style={{ color: "#62d591" }}>green (+)</span> for favorable changes and <span style={{ color: "#ef6b6b" }}>red (-)</span> for unfavorable.</li>
        </ul>

        <h3 className={S.h3} style={S.h3w}>Limit Order Mode</h3>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}>"Latest" button injects <span className={S.code}>5.61%</span> into the limit rate input.</li>
          <li className={S.li} style={S.liw}>"Expires In" section with numeric input + time unit dropdown (Minutes/Hours/Days).</li>
          <li className={S.li} style={S.liw}>Market comparison: <span style={{ color: "#f59e0b" }}>amber warning</span> when rate is worse than market, <span style={{ color: "#62d591" }}>green checkmark</span> when better. Logic accounts for the inverse PT/YT relationship (higher APY = worse for PT buyer, better for YT buyer).</li>
          <li className={S.li} style={S.liw}>CTA: "Place Order" instead of "Swap". Glows with accent color when <span className={S.code}>inputAmount &gt; 0</span>.</li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 4. Order Lifecycle */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>4. Order Lifecycle</h2>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}>
            <strong className="text-white/70">Place:</strong> LiquidityPanel calls <span className={S.code}>onPlaceOrder({"{"} side, token, amount, impliedApy {"}"})</span>. App creates full Order with id, type "Limit", filled "0%", status "Open", time "Just now" and prepends to <span className={S.code}>orders[]</span>. ActivityTable auto-switches to "My Orders" tab.
          </li>
          <li className={S.li} style={S.liw}>
            <strong className="text-white/70">Cancel:</strong> User clicks "Cancel" button on an Open/Partial order. Confirmation modal appears (with backdrop blur, Escape and click-to-dismiss). On confirm, App removes order from <span className={S.code}>orders[]</span> and prepends a new HistoryEntry with <span className={S.code}>outcome: "Cancelled"</span> to <span className={S.code}>history[]</span>.
          </li>
          <li className={S.li} style={S.liw}>
            <strong className="text-white/70">History:</strong> Cancelled entries show a <span className={S.badge} style={{ backgroundColor: "rgba(239,107,107,0.12)", color: "#ef6b6b", fontWeight: 500 }}>Cancelled</span> badge in the "Received" column. Filled entries from initial data have <span className={S.code}>outcome: "Filled"</span>.
          </li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 5. Activity Table */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>5. Activity Table Design</h2>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Fixed 5-row layout:</strong> Every tab always renders exactly 5 rows. Data is sliced to <span className={S.code}>FIXED_ROWS</span> max, remaining slots filled with placeholder rows (three subtle dots, matching alternating stripe pattern and row height).</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Market Activity:</strong> Has expanded columns (Action, Value, Implied APY, Token In, Token Out, Pool, Tx Hash, Block, Gas, Time, User) inside a horizontally scrollable container with <span className={S.code}>min-w-[920px]</span>.</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Unified styling:</strong> All 4 tabs share <span className={S.code}>HEADER_CELL</span>, <span className={S.code}>BODY_CELL</span>, <span className={S.code}>ROW_H</span>, <span className={S.code}>HEAD_H</span> constants.</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Auto-tab switch:</strong> <span className={S.code}>prevOrderCountRef</span> tracks order count; when it increases, tab switches to "My Orders".</li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 6. Chart Panel */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>6. Chart Panel</h2>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}>Uses <span className={S.code}>requestAnimationFrame</span> deferred rendering to avoid Recharts <span className={S.code}>ResponsiveContainer</span> 0-dimension error on initial mount.</li>
          <li className={S.li} style={S.liw}>Reacts to <span className={S.code}>assetType</span> prop to show PT vs YT chart data with appropriate accent colors.</li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 7. Responsive Layout */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>7. Responsive Layout</h2>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}><strong className="text-white/70">xl (1280px+):</strong> Sidebar visible (232px sticky). Main content fills remaining space.</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">lg (1024px):</strong> Two-column layout — LiquidityPanel (465px fixed) + right panel (flex-1).</li>
          <li className={S.li} style={S.liw}><strong className="text-white/70">Below lg:</strong> Single-column stack. Sidebar is a slide-out drawer with hamburger trigger.</li>
          <li className={S.li} style={S.liw}>All components use <span className={S.code}>font-['Inter']</span>, dark theme <span className={S.code}>#191919</span> background, card surfaces <span className={S.code}>#212125</span>, borders <span className={S.code}>#313032</span>.</li>
        </ul>
      </div>

      <div className={S.divider} />

      {/* 8. Next Steps */}
      <div className={S.section}>
        <h2 className={S.h2} style={S.h2w}>8. Next Steps</h2>
        <ul className={S.ul}>
          <li className={S.li} style={S.liw}>Lift Header's <span className={S.code}>activeTab</span> to App.tsx to toggle between Pool view (LP operations) and Trade Yield view (PT/YT trading).</li>
          <li className={S.li} style={S.liw}>Wire Sidebar nav items to route between different pool pages.</li>
          <li className={S.li} style={S.liw}>Connect to Spectra SDK / smart contracts for real on-chain data (replace mock rates and hardcoded balances).</li>
          <li className={S.li} style={S.liw}>Add wallet connection flow (WalletConnect / RainbowKit) to the sidebar wallet button.</li>
          <li className={S.li} style={S.liw}>Implement real-time order book and chart data via WebSocket subscriptions.</li>
        </ul>
      </div>
    </div>
  );
}
