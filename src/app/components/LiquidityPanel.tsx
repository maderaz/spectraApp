import { useState, useMemo } from "react";
import { SpectraTokenWithRing } from "./TokenIcons";
import svgPaths from "../../imports/svg-qtk3afs1b8";

function QuestionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.99 19.99" fill="none" className="opacity-50">
      <path d={svgPaths.p2b70b700} fill="white" />
    </svg>
  );
}

function ChevronDown({ opacity = 0.3 }: { opacity?: number }) {
  return (
    <svg width="12" height="8" viewBox="0 0 12 7.99483" fill="none">
      <path d={svgPaths.p30d02200} fill="white" fillOpacity={opacity} />
    </svg>
  );
}

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

type AssetType = "PT" | "YT";
type OrderType = "swap" | "limit";
type Direction = "buy" | "sell";
type ExpiryUnit = "minute" | "hour" | "day" | "maturity";

const LATEST_IMPLIED_APY = "5.61";

// Mock exchange rates
const RATES = {
  PT: {
    buyRate: 1.00274,      // 1 USDC → 1.00274 PT
    sellRate: 0.99727,     // 1 PT → 0.99727 USDC
    ptPrice: 0.99727,      // PT price in USD
    fixedMaturityYield: 0.27,
    fixedAPR: 8.33,
    fixedAPY: 8.68,
    impliedAPYChange: 0.03,
  },
  YT: {
    buyRate: 722.73933,    // 1 USDC → 722.73933 YT
    sellRate: 0.001384,    // 1 YT → 0.001384 USDC
    ytPrice: 0.001384,     // YT price in USD
    underlyingPerYT: 0.996, // underlying USDC value per YT
    impliedAPY: 16.61,
  },
};

function getLimitRateSignal(
  limitRate: string,
  direction: Direction,
  assetType: AssetType,
  marketRate: number
): { type: "worse" | "better" | "neutral"; message: string } | null {
  const rate = parseFloat(limitRate);
  if (isNaN(rate) || rate === 0) return null;
  if (rate === marketRate) return { type: "neutral", message: `Equal to market rate (${marketRate}%)` };

  const worseThanMarket =
    (direction === "buy" && assetType === "PT") || (direction === "sell" && assetType === "YT")
      ? rate < marketRate
      : rate > marketRate;

  if (worseThanMarket) {
    return { type: "worse", message: `Worse than market rate (${marketRate}%)` };
  }
  return { type: "better", message: `Better than market rate (${marketRate}%)` };
}

function formatNumber(n: number, decimals: number = 5): string {
  if (n === 0) return "0";
  if (n < 0.00001) return n.toExponential(2);
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: decimals });
}

function formatUsd(n: number): string {
  if (n === 0) return "≈$0";
  if (n < 0.01) return "≈$<0.01";
  return `≈$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function LiquidityPanel({ assetType, onAssetTypeChange, onPlaceOrder, flat }: {
  assetType: AssetType;
  onAssetTypeChange: (t: AssetType) => void;
  onPlaceOrder?: (order: { side: "Buy" | "Sell"; token: "PT" | "YT"; amount: string; impliedApy: string }) => void;
  flat?: boolean;
}) {
  const [orderType, setOrderType] = useState<OrderType>("swap");
  const [direction, setDirection] = useState<Direction>("buy");
  const [inputAmount, setInputAmount] = useState("");
  const [limitRate, setLimitRate] = useState("");
  const [expiryValue, setExpiryValue] = useState("30");
  const [expiryUnit, setExpiryUnit] = useState<ExpiryUnit>("hour");
  const [expiryDropdownOpen, setExpiryDropdownOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const tokenLabel = assetType === "PT" ? "PT-USDC-13/02/26" : "YT-USDC-13/02/26";
  const badgeColor = assetType === "PT" ? "#00f99b" : "#f4c071";
  const accentColor = assetType === "PT" ? "#00f99b" : "#f4c071";
  const accentTextColor = assetType === "PT" ? "text-[#191919]" : "text-[#191919]";
  const actionLabel = orderType === "limit"
    ? "Place Order"
    : `${direction === "buy" ? "Buy" : "Sell"} ${assetType}`;

  const inputTokenIsPTYT = direction === "sell";
  const outputTokenIsPTYT = direction === "buy";

  const inputNum = parseFloat(inputAmount) || 0;
  const hasInput = inputNum > 0;

  // Compute all derived values
  const computed = useMemo(() => {
    if (inputNum === 0) {
      return {
        outputAmount: 0,
        outputUsd: 0,
        inputUsd: 0,
        // YT-specific
        earnYieldAmount: 0,
        earnYieldUsd: 0,
        impliedAPY: RATES.YT.impliedAPY,
        yieldLeverage: 0,
        // PT-specific
        fixedMaturityYield: RATES.PT.fixedMaturityYield,
        fixedAPR: RATES.PT.fixedAPR,
        fixedAPY: RATES.PT.fixedAPY,
        impliedAPYChange: 0,
      };
    }

    if (assetType === "YT") {
      if (direction === "buy") {
        // Buying YT with USDC
        const inputUsd = inputNum;
        const outputAmount = inputNum * RATES.YT.buyRate;
        const outputUsd = outputAmount * RATES.YT.ytPrice;
        const earnYieldAmount = outputAmount;
        const earnYieldUsd = outputAmount * RATES.YT.underlyingPerYT;
        const yieldLeverage = inputUsd > 0 ? earnYieldUsd / inputUsd : 0;
        const impliedAPYChange = Math.min(inputNum * 0.03, 0.65);
        return {
          outputAmount, outputUsd, inputUsd,
          earnYieldAmount, earnYieldUsd,
          impliedAPY: RATES.YT.impliedAPY,
          yieldLeverage,
          impliedAPYChange,
          fixedMaturityYield: 0, fixedAPR: 0, fixedAPY: 0,
        };
      } else {
        // Selling YT for USDC
        const inputUsd = inputNum * RATES.YT.ytPrice;
        const outputAmount = inputNum * RATES.YT.sellRate;
        const outputUsd = outputAmount;
        const earnYieldAmount = 0;
        const earnYieldUsd = 0;
        const yieldLeverage = 0;
        const impliedAPYChange = -(Math.min(inputNum * 0.03, 0.65));
        return {
          outputAmount, outputUsd, inputUsd,
          earnYieldAmount, earnYieldUsd,
          impliedAPY: RATES.YT.impliedAPY,
          yieldLeverage,
          impliedAPYChange,
          fixedMaturityYield: 0, fixedAPR: 0, fixedAPY: 0,
        };
      }
    } else {
      // PT
      if (direction === "buy") {
        // Buying PT with USDC
        const inputUsd = inputNum;
        const outputAmount = inputNum * RATES.PT.buyRate;
        const outputUsd = outputAmount * RATES.PT.ptPrice;
        const impliedAPYChange = Math.min(inputNum * 0.02, 0.5);
        return {
          outputAmount, outputUsd, inputUsd,
          earnYieldAmount: 0, earnYieldUsd: 0,
          impliedAPY: 0, yieldLeverage: 0,
          fixedMaturityYield: RATES.PT.fixedMaturityYield,
          fixedAPR: RATES.PT.fixedAPR,
          fixedAPY: RATES.PT.fixedAPY,
          impliedAPYChange,
        };
      } else {
        // Selling PT for USDC
        const inputUsd = inputNum * RATES.PT.ptPrice;
        const outputAmount = inputNum * RATES.PT.sellRate;
        const outputUsd = outputAmount;
        const impliedAPYChange = -(Math.min(inputNum * 0.02, 0.5));
        return {
          outputAmount, outputUsd, inputUsd,
          earnYieldAmount: 0, earnYieldUsd: 0,
          impliedAPY: 0, yieldLeverage: 0,
          fixedMaturityYield: RATES.PT.fixedMaturityYield,
          fixedAPR: RATES.PT.fixedAPR,
          fixedAPY: RATES.PT.fixedAPY,
          impliedAPYChange,
        };
      }
    }
  }, [inputNum, assetType, direction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers and one decimal point
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setInputAmount(val);
    }
  };

  return (
    <div className={flat ? "w-full" : "bg-[#212125] border border-[#313032] rounded-[16px] p-4 sm:p-[25px] w-full"}>
      {/* Tier 1: Asset Type (PT / YT) — Filter bar segmented style */}
      <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-[8px] overflow-hidden w-full mb-2">
        {(["PT", "YT"] as AssetType[]).map((type, i) => {
          const isActive = assetType === type;
          return (
            <button
              key={type}
              className={`flex-1 py-[7px] text-center font-['Inter'] text-[13px] transition-all ${
                isActive
                  ? "bg-white/[0.08] text-white"
                  : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
              } ${i > 0 ? "border-l border-white/[0.08]" : ""}`}
              style={{ fontWeight: isActive ? 500 : 400 }}
              onClick={() => onAssetTypeChange(type)}
            >
              {type === "PT" ? "Fix rate (PT)" : "Yield Leverage (YT)"}
            </button>
          );
        })}
      </div>

      {/* Tier 2+3: Direction (Buy/Sell) + Order Type (Swap/Limit) in one row */}
      <div className="flex items-center justify-between mb-3">
        {/* Buy / Sell toggle — matches Chart/Order Book tab switch style */}
        <div className="flex items-center bg-[#2a2a2e] rounded-[6px] p-[2px]">
          {(["buy", "sell"] as Direction[]).map((dir) => {
            const isActive = direction === dir;
            return (
              <button
                key={dir}
                className={`px-4 py-[5px] rounded-[4px] font-['Inter'] text-[12px] transition-all ${
                  isActive
                    ? "bg-white/[0.1] text-white"
                    : "text-white/35 hover:text-white/55"
                }`}
                style={{ fontWeight: isActive ? 500 : 400 }}
                onClick={() => setDirection(dir)}
              >
                {dir === "buy" ? "Buy" : "Sell"}
              </button>
            );
          })}
        </div>

        {/* Swap / Limit toggle */}
        <div className="flex items-center gap-3">
          {(["swap", "limit"] as OrderType[]).map((type) => {
            const isActive = orderType === type;
            return (
              <button
                key={type}
                className={`relative pb-[6px] pt-[6px] font-['Inter'] text-[12px] transition-all ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/70"
                }`}
                style={{ fontWeight: isActive ? 500 : 400 }}
                onClick={() => setOrderType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-white/70"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input section */}
      <div className="pb-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Input</span>
          </div>

          <div className="flex w-full">
            <div
              className="flex-1 rounded-l-[8px] px-[13px] py-[1px] flex flex-col justify-center h-[50px] transition-colors"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <input
                type="text"
                value={inputAmount}
                onChange={handleInputChange}
                placeholder="0"
                className="bg-transparent font-['Inter'] text-[16px] text-white pl-1 w-full outline-none placeholder-[#a1a1aa]"
                style={{ fontWeight: 500 }}
              />
              <span className="font-['Inter'] text-[10px] text-white/30 pl-1 transition-colors" style={{ fontWeight: 400 }}>
                {hasInput ? formatUsd(computed.inputUsd) : "≈$0"}
              </span>
            </div>
            <button className="flex items-center justify-between border border-white/15 rounded-r-[8px] px-[11px] py-[10px] h-[50px] gap-2">
              <div className="flex items-center gap-2">
                {inputTokenIsPTYT ? (
                  <>
                    <SpectraTokenWithRing ringColor={badgeColor} size={24} />
                    <span className="font-['Inter'] text-[13px] text-white/60" style={{ fontWeight: 400 }}>{assetType}</span>
                  </>
                ) : (
                  <>
                    <USDCTokenIcon size={24} />
                    <span className="font-['Inter'] text-[13px] text-white/60" style={{ fontWeight: 400 }}>USDC</span>
                  </>
                )}
              </div>
              <div className="pl-1">
                <ChevronDown opacity={1} />
              </div>
            </button>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-['Inter'] text-[11px] text-white/50" style={{ fontWeight: 400 }}>Balance:&nbsp;</span>
              <span className="font-['Inter'] text-[11px] text-white/70" style={{ fontWeight: 500 }}>0</span>
            </div>
            {/* Quick amount buttons */}
            <div className="flex items-center gap-1">
              {["25%", "50%", "Max"].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    // Mock balance of 1000 for demo
                    const mockBalance = 1000;
                    const pct = label === "25%" ? 0.25 : label === "50%" ? 0.5 : 1;
                    setInputAmount((mockBalance * pct).toString());
                  }}
                  className="font-['Inter'] text-[10px] text-white/35 hover:text-white/55 px-[6px] py-[2px] rounded-[4px] hover:bg-white/[0.04] transition-all"
                  style={{ fontWeight: 400 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Limit Rate field (only for Limit orders) */}
      {orderType === "limit" && (
        <div className="pb-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>
                  {`${direction === "buy" ? "Buy" : "Sell"} ${assetType} at Implied APY`}
                </span>
                <QuestionIcon />
              </div>
              <button
                className="font-['Inter'] text-[11px] text-white/40 hover:text-white/60 transition-colors"
                style={{ fontWeight: 500 }}
                onClick={() => setLimitRate(LATEST_IMPLIED_APY)}
              >
                Latest
              </button>
            </div>
            <div className="flex w-full">
              <div className="flex-1 border border-white/15 rounded-[8px] px-[13px] py-[1px] flex items-center h-[42px]">
                <input
                  type="text"
                  value={limitRate}
                  onChange={(e) => setLimitRate(e.target.value)}
                  placeholder="0"
                  className="bg-transparent font-['Inter'] text-[16px] text-white pl-1 w-full outline-none placeholder-[#a1a1aa]"
                  style={{ fontWeight: 500 }}
                />
                <span className="font-['Inter'] text-[12px] text-white/30 ml-2 shrink-0" style={{ fontWeight: 400 }}>%</span>
              </div>
            </div>

            {/* Market rate signal */}
            {(() => {
              const signal = getLimitRateSignal(limitRate, direction, assetType, parseFloat(LATEST_IMPLIED_APY));
              if (!signal) return null;
              const isWorse = signal.type === "worse";
              const isNeutral = signal.type === "neutral";
              return (
                <div className="flex items-center gap-1.5 mt-0.5 px-1">
                  {isWorse ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="#f59e0b" strokeWidth="1.2" />
                      <path d="M7 4v3.5" stroke="#f59e0b" strokeWidth="1.3" strokeLinecap="round" />
                      <circle cx="7" cy="9.75" r="0.65" fill="#f59e0b" />
                    </svg>
                  ) : isNeutral ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="#a1a1aa" strokeWidth="1.2" />
                      <path d="M4.5 7h5" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="#00f99b" strokeWidth="1.2" />
                      <path d="M4.5 7l1.75 1.75L9.5 5.25" stroke="#00f99b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span
                    className="font-['Inter'] text-[10px]"
                    style={{
                      fontWeight: 400,
                      color: isWorse ? "#f59e0b" : isNeutral ? "#a1a1aa" : "#00f99b",
                    }}
                  >
                    {signal.message}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Expires In */}
          <div className="flex flex-col gap-2 mt-3">
            <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Expires In</span>
            <div className="flex w-full gap-2">
              <div className="flex-1 border border-white/15 rounded-[8px] px-[13px] flex items-center h-[42px]">
                <input
                  type="text"
                  value={expiryUnit === "maturity" ? "" : expiryValue}
                  onChange={(e) => setExpiryValue(e.target.value)}
                  placeholder={expiryUnit === "maturity" ? "—" : "30"}
                  disabled={expiryUnit === "maturity"}
                  className="bg-transparent font-['Inter'] text-[16px] text-white pl-1 w-full outline-none placeholder-[#a1a1aa] disabled:opacity-30"
                  style={{ fontWeight: 500 }}
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setExpiryDropdownOpen(!expiryDropdownOpen)}
                  className="flex items-center gap-2 border border-white/15 rounded-[8px] px-[13px] h-[42px] min-w-[130px] justify-between"
                >
                  <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>
                    {expiryUnit === "minute" ? "Minute(s)"
                      : expiryUnit === "hour" ? "Hour(s)"
                      : expiryUnit === "day" ? "Day(s)"
                      : "Until Maturity"}
                  </span>
                  <ChevronDown opacity={0.6} />
                </button>
                {expiryDropdownOpen && (
                  <div className="absolute top-[52px] right-0 w-full bg-[#2a2a2e] border border-[#313032] rounded-[8px] py-1 z-10 shadow-lg">
                    {(["minute", "hour", "day", "maturity"] as ExpiryUnit[]).map((unit) => (
                      <button
                        key={unit}
                        className={`w-full text-left px-[13px] py-[8px] font-['Inter'] text-[12px] transition-colors ${
                          expiryUnit === unit ? "text-white bg-white/[0.06]" : "text-white/40 hover:text-white/60 hover:bg-white/[0.03]"
                        }`}
                        style={{ fontWeight: expiryUnit === unit ? 500 : 400 }}
                        onClick={() => {
                          setExpiryUnit(unit);
                          setExpiryDropdownOpen(false);
                        }}
                      >
                        {unit === "minute" ? "Minute(s)"
                          : unit === "hour" ? "Hour(s)"
                          : unit === "day" ? "Day(s)"
                          : "Until Maturity"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Separator */}
      <div className="border-t border-white/10 mb-3" />

      {/* Output section */}
      <div className="flex flex-col gap-2">
        <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Output</span>

        {/* Output token row */}
        <div className="flex items-center justify-between min-h-[36px]">
          <div className="flex items-center gap-2">
            {outputTokenIsPTYT ? (
              <>
                <SpectraTokenWithRing ringColor={badgeColor} size={24} />
                <span className="font-['Inter'] text-[13px] text-white/70" style={{ fontWeight: 400 }}>{tokenLabel}</span>
              </>
            ) : (
              <>
                <USDCTokenIcon size={24} />
                <span className="font-['Inter'] text-[13px] text-white/70" style={{ fontWeight: 400 }}>USDC</span>
              </>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span
              className="font-['Inter'] text-[13px] transition-colors"
              style={{
                fontWeight: 500,
                color: hasInput ? "white" : "#a1a1aa",
              }}
            >
              {hasInput ? formatNumber(computed.outputAmount) : "-"}
            </span>
            {hasInput && (
              <span className="font-['Inter'] text-[10px] text-white/30" style={{ fontWeight: 400 }}>
                {formatUsd(computed.outputUsd)}
              </span>
            )}
          </div>
        </div>

        {/* Separator within output */}
        <div className="border-t border-white/10 my-0.5" />

        {/* YT-specific metrics */}
        {assetType === "YT" && (
          <>
            {/* Earn Yield On */}
            <div className="flex items-center justify-between min-h-[30px]">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Earn Yield On</span>
                <QuestionIcon />
              </div>
              <div className="flex flex-col items-end">
                <span
                  className="font-['Inter'] text-[12px] transition-colors"
                  style={{ fontWeight: 500, color: hasInput && direction === "buy" ? "white" : "#a1a1aa" }}
                >
                  {hasInput && direction === "buy"
                    ? `${formatNumber(computed.earnYieldAmount)} USDC`
                    : "-"}
                </span>
                {hasInput && direction === "buy" && computed.earnYieldUsd > 0 && (
                  <span className="font-['Inter'] text-[10px] text-white/30" style={{ fontWeight: 400 }}>
                    {formatUsd(computed.earnYieldUsd)}
                  </span>
                )}
              </div>
            </div>

            {/* Implied APY Impact */}
            <div className="flex items-center justify-between h-[30px]">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Implied APY Impact</span>
                <QuestionIcon />
              </div>
              <span
                className="font-['Inter'] text-[12px] transition-colors"
                style={{
                  fontWeight: 500,
                  color: hasInput
                    ? computed.impliedAPYChange >= 0 ? "#00f99b" : "#ef6b6b"
                    : "#a1a1aa",
                }}
              >
                {hasInput
                  ? `${computed.impliedAPYChange >= 0 ? "+" : ""}${computed.impliedAPYChange.toFixed(2)}%`
                  : "-"}
              </span>
            </div>

            {/* Yield Leverage */}
            <div className="flex items-center justify-between h-[30px]">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Yield Leverage</span>
                <QuestionIcon />
              </div>
              <span
                className="font-['Inter'] text-[12px] transition-colors"
                style={{ fontWeight: 500, color: hasInput && direction === "buy" ? "white" : "#a1a1aa" }}
              >
                {hasInput && direction === "buy" ? `${computed.yieldLeverage.toFixed(2)}x` : "-"}
              </span>
            </div>
          </>
        )}

        {/* PT-specific metrics */}
        {assetType === "PT" && (
          <>
            {/* Fixed Maturity Yield */}
            <div className="flex items-center justify-between h-[30px]">
              <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Fixed Maturity Yield</span>
              <span
                className="font-['Inter'] text-[12px] transition-colors"
                style={{ fontWeight: 500, color: hasInput ? "white" : "#a1a1aa" }}
              >
                {hasInput ? `${computed.fixedMaturityYield.toFixed(2)}%` : "-"}
              </span>
            </div>

            {/* Fixed APR / APY */}
            <div className="flex items-center justify-between h-[30px]">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Fixed APR /</span>
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>APY</span>
              </div>
              <span
                className="font-['Inter'] text-[12px] transition-colors"
                style={{ fontWeight: 500, color: hasInput ? "white" : "#a1a1aa" }}
              >
                {hasInput ? `${computed.fixedAPR.toFixed(2)}% / ${computed.fixedAPY.toFixed(2)}%` : "-"}
              </span>
            </div>

            {/* Implied APY Impact */}
            <div className="flex items-center justify-between h-[30px]">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Implied APY Impact</span>
                <QuestionIcon />
              </div>
              <span
                className="font-['Inter'] text-[12px] transition-colors"
                style={{
                  fontWeight: 500,
                  color: hasInput
                    ? computed.impliedAPYChange >= 0 ? "#00f99b" : "#ef6b6b"
                    : "#a1a1aa",
                }}
              >
                {hasInput
                  ? `${computed.impliedAPYChange >= 0 ? "+" : ""}${computed.impliedAPYChange.toFixed(2)}%`
                  : "-"}
              </span>
            </div>
          </>
        )}

        {/* Details */}
        <div className="pt-2">
          <button
            className="flex items-center w-full pb-3 cursor-pointer"
            onClick={() => setDetailsOpen(!detailsOpen)}
          >
            <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 400 }}>Details</span>
            <div className="flex-1 border-t border-white/10 mx-4" />
            <span
              className="transition-transform"
              style={{ transform: detailsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <ChevronDown />
            </span>
          </button>

          {/* Detail rows — toggled by click */}
          {detailsOpen && hasInput && (
            <div className="flex flex-col gap-2 pb-2">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[11px] text-white/35" style={{ fontWeight: 400 }}>Rate</span>
                <span className="font-['Inter'] text-[11px] text-white/60" style={{ fontWeight: 500 }}>
                  1 {inputTokenIsPTYT ? assetType : "USDC"} ≈{" "}
                  {assetType === "YT"
                    ? direction === "buy"
                      ? `${RATES.YT.buyRate.toFixed(2)} YT`
                      : `${RATES.YT.sellRate.toFixed(6)} USDC`
                    : direction === "buy"
                      ? `${RATES.PT.buyRate.toFixed(5)} PT`
                      : `${RATES.PT.sellRate.toFixed(5)} USDC`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[11px] text-white/35" style={{ fontWeight: 400 }}>Price Impact</span>
                <span className="font-['Inter'] text-[11px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                  {inputNum < 10 ? "<0.01%" : inputNum < 100 ? "0.03%" : inputNum < 1000 ? "0.12%" : "0.47%"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[11px] text-white/35" style={{ fontWeight: 400 }}>Min. Received</span>
                <span className="font-['Inter'] text-[11px] text-white/60" style={{ fontWeight: 500 }}>
                  {formatNumber(computed.outputAmount * 0.995)} {outputTokenIsPTYT ? assetType : "USDC"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[11px] text-white/35" style={{ fontWeight: 400 }}>Slippage</span>
                <span className="font-['Inter'] text-[11px] text-white/60" style={{ fontWeight: 500 }}>0.5%</span>
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="pt-3">
          <button
            className="w-full rounded-[6px] h-[42px] flex items-center justify-center transition-all"
            style={{
              backgroundColor: hasInput ? accentColor : "#313032",
              boxShadow: hasInput ? `0 0 20px ${accentColor}33` : "none",
            }}
            onClick={() => {
              if (!hasInput) return;
              if (orderType === "limit" && onPlaceOrder) {
                const inputToken = direction === "sell" ? assetType : "USDC";
                const formattedAmount = `${parseFloat(inputAmount).toLocaleString("en-US")} ${inputToken}`;
                const apy = limitRate ? `${limitRate}%` : "—";
                onPlaceOrder({
                  side: (direction === "buy" ? "Buy" : "Sell") as "Buy" | "Sell",
                  token: assetType,
                  amount: formattedAmount,
                  impliedApy: apy,
                });
                // Reset form after placing
                setInputAmount("");
                setLimitRate("");
              }
            }}
          >
            <span
              className="font-['Inter'] text-[13px] text-center transition-colors"
              style={{
                fontWeight: 500,
                color: hasInput
                  ? "#191919"
                  : "#6f797f",
              }}
            >
              {actionLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}