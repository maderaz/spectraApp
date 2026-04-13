import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import stellarIcon from "figma:asset/930fcecf1555219178fdb46c9cf07a64e1ac9d28.png";

// ─── Types ───

type NetworkId = "ethereum" | "base" | "stellar";
type SourceNetwork = "ethereum" | "base";
type PTToken = {
  id: string;
  name: string;
  symbol: string;
  maturity: string;
  protocol: string;
  balance: string;
  usdValue: string;
  apy: string;
  network: SourceNetwork;
};

// ─── Network data ───

const NETWORKS: Record<
  NetworkId,
  { name: string; color: string; abbr: string }
> = {
  ethereum: { name: "Mainnet", color: "#627eea", abbr: "ETH" },
  base: { name: "Base", color: "#0052ff", abbr: "BASE" },
  stellar: { name: "Stellar", color: "#00f99b", abbr: "XLM" },
};

const ALL_NETWORK_IDS: NetworkId[] = ["ethereum", "base", "stellar"];

// ─── Mock PT tokens ───

const PT_TOKENS: PTToken[] = [
  // User's wallet tokens (have balance)
  { id: "pt-1", name: "PT-sGHO", symbol: "PT-sGHO", maturity: "Jan 31, 2026", protocol: "Aave", balance: "14,284.20", usdValue: "$14,245.18", apy: "8.68%", network: "ethereum" },
  { id: "pt-2", name: "PT-stETH", symbol: "PT-stETH", maturity: "Mar 27, 2026", protocol: "Lido", balance: "5.2431", usdValue: "$18,624.80", apy: "4.12%", network: "ethereum" },
  { id: "pt-3", name: "PT-weETH", symbol: "PT-weETH", maturity: "Jun 26, 2026", protocol: "EtherFi", balance: "12.8800", usdValue: "$45,108.42", apy: "5.33%", network: "ethereum" },
  { id: "pt-4", name: "PT-USDC", symbol: "PT-USDC", maturity: "Feb 13, 2026", protocol: "Aave", balance: "25,000.00", usdValue: "$24,931.75", apy: "7.91%", network: "base" },
  { id: "pt-5", name: "PT-cbETH", symbol: "PT-cbETH", maturity: "Apr 10, 2026", protocol: "Coinbase", balance: "8.1200", usdValue: "$28,712.36", apy: "3.88%", network: "base" },
  // Available tokens (no balance)
  { id: "pt-6", name: "PT-wstETH", symbol: "PT-wstETH", maturity: "Sep 25, 2026", protocol: "Lido", balance: "0", usdValue: "$0.00", apy: "3.95%", network: "ethereum" },
  { id: "pt-7", name: "PT-ezETH", symbol: "PT-ezETH", maturity: "Aug 14, 2026", protocol: "Renzo", balance: "0", usdValue: "$0.00", apy: "4.78%", network: "ethereum" },
  { id: "pt-8", name: "PT-DAI", symbol: "PT-DAI", maturity: "May 30, 2026", protocol: "Maker", balance: "0", usdValue: "$0.00", apy: "6.44%", network: "base" },
  { id: "pt-9", name: "PT-USDbC", symbol: "PT-USDbC", maturity: "Jul 18, 2026", protocol: "Aave", balance: "0", usdValue: "$0.00", apy: "5.12%", network: "base" },
];

// ─── SVG Icons ───

function EthereumNetworkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#627eea" />
      <path d="M10 3l-4.5 7L10 12.5 14.5 10z" fill="white" opacity="0.6" />
      <path d="M10 3l4.5 7L10 12.5z" fill="white" opacity="0.9" />
      <path d="M10 13.5L5.5 11 10 17.5 14.5 11z" fill="white" opacity="0.8" />
    </svg>
  );
}

function BaseNetworkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#0052ff" />
      <circle cx="10" cy="10" r="5.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M10 5.5A4.5 4.5 0 0110 14.5" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function StellarNetworkIcon({ size = 20 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full shrink-0 overflow-hidden"
    >
      <img
        alt="Stellar"
        className="absolute inset-0 size-full object-cover"
        src={stellarIcon}
      />
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.85)" }}
      />
    </div>
  );
}

function ChevronDownSmall() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1l4 4 4-4" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Network Selector ───

function NetworkIcon({ network, size = 20 }: { network: SourceNetwork | "stellar"; size?: number }) {
  if (network === "ethereum") return <EthereumNetworkIcon size={size} />;
  if (network === "base") return <BaseNetworkIcon size={size} />;
  return <StellarNetworkIcon size={size} />;
}

// ─── Recent Bridging Activity ───

const RECENT_BRIDGES = [
  { from: "ethereum" as const, to: "stellar" as const, token: "PT-sGHO", amount: "5,000", time: "2h ago", status: "Complete" },
  { from: "base" as const, to: "stellar" as const, token: "PT-USDC", amount: "12,400", time: "5h ago", status: "Complete" },
  { from: "ethereum" as const, to: "stellar" as const, token: "PT-stETH", amount: "3.20", time: "1d ago", status: "Complete" },
  { from: "ethereum" as const, to: "stellar" as const, token: "PT-weETH", amount: "1.85", time: "2d ago", status: "Complete" },
];

const MY_ACTIVITY = [
  { from: "ethereum" as const, to: "stellar" as const, token: "PT-sGHO", amount: "2,500", time: "4h ago", status: "Complete" },
  { from: "base" as const, to: "stellar" as const, token: "PT-USDC", amount: "8,000", time: "1d ago", status: "Complete" },
  { from: "ethereum" as const, to: "stellar" as const, token: "PT-weETH", amount: "0.75", time: "3d ago", status: "Complete" },
];
// ─── Main Component ───

export function PTBridge() {
  const [sourceNetwork, setSourceNetwork] = useState<NetworkId>("ethereum");
  const [destNetwork, setDestNetwork] = useState<NetworkId>("stellar");
  const [selectedToken, setSelectedToken] = useState<PTToken | null>(null);
  const [amount, setAmount] = useState("");
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showDestNetworkDropdown, setShowDestNetworkDropdown] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [bridging, setBridging] = useState(false);
  const [bridgeComplete, setBridgeComplete] = useState(false);
  const [destWallet, setDestWallet] = useState("");
  const [destWalletTouched, setDestWalletTouched] = useState(false);
  const [activityTab, setActivityTab] = useState<"recent" | "my">("recent");

  // Sorted lists: selectable first, disabled (conflict) last
  const sourceDropdownList = [...ALL_NETWORK_IDS].sort((a, b) =>
    a === destNetwork ? 1 : b === destNetwork ? -1 : 0
  );
  const destDropdownList = [...ALL_NETWORK_IDS].sort((a, b) =>
    a === sourceNetwork ? 1 : b === sourceNetwork ? -1 : 0
  );

  const handleSetSource = (net: NetworkId) => {
    if (net === destNetwork) return;
    setSourceNetwork(net);
    setSelectedToken(null);
    setAmount("");
    setShowNetworkDropdown(false);
  };

  const handleSetDest = (net: NetworkId) => {
    if (net === sourceNetwork) return;
    setDestNetwork(net);
    setShowDestNetworkDropdown(false);
  };

  // Close all dropdowns helper
  const closeAllDropdowns = () => {
    setShowNetworkDropdown(false);
    setShowDestNetworkDropdown(false);
    setShowTokenDropdown(false);
  };

  // Stellar address validation: starts with G, 56 uppercase alphanumeric chars
  const isValidStellar = /^G[A-Z2-7]{55}$/.test(destWallet);
  const showWalletError = destWalletTouched && destWallet.length > 0 && !isValidStellar;
  const walletLengthHint = destWallet.length > 0 ? `${destWallet.length}/56` : "";

  const filteredTokens = useMemo(
    () => PT_TOKENS.filter((t) => t.network === sourceNetwork),
    [sourceNetwork]
  );

  const walletTokens = useMemo(
    () => filteredTokens.filter((t) => parseFloat(t.balance.replace(/,/g, "")) > 0),
    [filteredTokens]
  );
  const otherTokens = useMemo(
    () => filteredTokens.filter((t) => parseFloat(t.balance.replace(/,/g, "")) === 0),
    [filteredTokens]
  );

  const inputNum = parseFloat(amount.replace(/,/g, "")) || 0;
  const maxBalance = selectedToken ? parseFloat(selectedToken.balance.replace(/,/g, "")) : 0;
  const hasValidAmount = inputNum > 0 && inputNum <= maxBalance;

  const estimatedTime = sourceNetwork === "ethereum" ? "~12 min" : "~3 min";
  const stellarReceive = inputNum > 0 ? inputNum.toFixed(inputNum > 100 ? 2 : 4) : "—";

  const canBridge = selectedToken !== null && hasValidAmount && isValidStellar;

  const handleBridge = () => {
    setBridging(true);
    setTimeout(() => {
      setBridging(false);
      setBridgeComplete(true);
    }, 2500);
  };

  const handleReset = () => {
    setSelectedToken(null);
    setAmount("");
    setBridgeComplete(false);
    setDestWallet("");
    setDestWalletTouched(false);
  };

  return (
    <div className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pl-4 overflow-auto">
      <div className="xl:pt-0 max-w-[760px] mx-auto flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <span className="font-['Inter'] text-[15px] sm:text-[18px] text-white" style={{ fontWeight: 600 }}>
                PT Bridge
              </span>
              <p className="font-['Inter'] text-[11px] sm:text-[12px] text-white/40 whitespace-nowrap" style={{ fontWeight: 400 }}>
                Migrate Principal Tokens across networks
              </p>
            </div>
            <button className="h-[36px] px-4 rounded-[10px] bg-[#00f99b]/10 border border-[#00f99b]/20 hover:bg-[#00f99b]/15 transition-colors flex items-center gap-2 shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline font-['Inter'] text-[12px] text-[#00f99b]" style={{ fontWeight: 600 }}>
                Get Principal Tokens
              </span>
              <span className="sm:hidden font-['Inter'] text-[12px] text-[#00f99b]" style={{ fontWeight: 600 }}>
                Get PTs
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ── Left: Bridge Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-5 sm:p-6">
              <AnimatePresence mode="wait">
                {bridgeComplete ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-5 py-6"
                  >
                    <div className="w-[56px] h-[56px] rounded-full bg-[#00f99b]/10 border border-[#00f99b]/30 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M7 14l5 5L21 9" stroke="#00f99b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="font-['Inter'] text-[18px] text-white" style={{ fontWeight: 600 }}>
                        Bridge Complete
                      </p>
                      <p className="font-['Inter'] text-[13px] text-white/40 mt-1" style={{ fontWeight: 400 }}>
                        Your {selectedToken?.symbol} tokens have been migrated to Stellar
                      </p>
                    </div>

                    <div className="bg-[#191919] rounded-[10px] border border-[#313032] px-5 py-4 w-full max-w-[320px]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-['Inter'] text-[11px] text-white/30" style={{ fontWeight: 400 }}>Amount Bridged</span>
                        <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 600 }}>
                          {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })} {selectedToken?.symbol}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-['Inter'] text-[11px] text-white/30" style={{ fontWeight: 400 }}>Received on Stellar</span>
                        <span className="font-['Inter'] text-[13px] text-[#00f99b]" style={{ fontWeight: 600 }}>
                          {stellarReceive} {selectedToken?.symbol}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="h-[44px] px-8 rounded-[10px] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center transition-all mt-2"
                    >
                      <span className="font-['Inter'] text-[13px] text-white/70" style={{ fontWeight: 500 }}>Bridge More Tokens</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-5"
                  >
                    {/* Network Route: Source → Destination (single row) */}
                    <div className="flex flex-col gap-1.5">
                      {/* Labels row — hidden on mobile, visible on sm+ */}
                      <div className="hidden sm:flex items-end gap-2">
                        {/* "From" label over source */}
                        <div className="flex-1 min-w-0">
                          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
                            From
                          </span>
                        </div>
                        {/* spacer for arrow */}
                        <div className="w-[32px] shrink-0" />
                        {/* "To" label over destination */}
                        <div className="flex-1 min-w-0">
                          <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
                            Target Network
                          </span>
                        </div>
                      </div>

                      {/* Desktop: horizontal row */}
                      <div className="hidden sm:flex items-center gap-2">
                        {/* Source Network (dropdown) */}
                        <div className="relative flex-1 min-w-0">
                          <button
                            onClick={() => { setShowNetworkDropdown(!showNetworkDropdown); setShowDestNetworkDropdown(false); setShowTokenDropdown(false); }}
                            className="w-full flex items-center bg-[#191919] border border-[#313032] rounded-[10px] px-3 py-2.5 hover:border-white/20 transition-colors"
                          >
                            <NetworkIcon network={sourceNetwork} size={20} />
                            <span className="font-['Inter'] text-[13px] text-white truncate ml-2.5" style={{ fontWeight: 500 }}>
                              {NETWORKS[sourceNetwork].name}
                            </span>
                            <span className="ml-auto shrink-0 pl-2">
                              <ChevronDownSmall />
                            </span>
                          </button>

                          {showNetworkDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1e] border border-[#313032] rounded-[10px] overflow-hidden z-20 shadow-xl">
                              {sourceDropdownList.map((net) => {
                                const isDisabled = net === destNetwork;
                                return (
                                  <button
                                    key={net}
                                    onClick={() => handleSetSource(net)}
                                    disabled={isDisabled}
                                    className={`w-full flex items-center gap-2.5 px-3 transition-colors ${
                                      isDisabled
                                        ? "opacity-35 cursor-not-allowed border-t border-white/[0.04] py-2"
                                        : `hover:bg-white/[0.04] py-2.5 ${sourceNetwork === net ? "bg-white/[0.04]" : ""}`
                                    }`}
                                  >
                                    <NetworkIcon network={net} size={20} />
                                    <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 500 }}>
                                      {NETWORKS[net].name}
                                    </span>
                                    {sourceNetwork === net && !isDisabled && (
                                      <div className="ml-auto w-[5px] h-[5px] rounded-full bg-[#00f99b]" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Arrow → */}
                        <div className="w-[32px] h-[32px] rounded-full bg-[#191919] border border-[#313032] flex items-center justify-center shrink-0">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M9 4l3 3-3 3" stroke="white" strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {/* Destination (Stellar - locked) */}
                        <div className="relative flex-1 min-w-0">
                          <button
                            onClick={() => { setShowDestNetworkDropdown(!showDestNetworkDropdown); setShowNetworkDropdown(false); setShowTokenDropdown(false); }}
                            className="w-full flex items-center bg-[#191919] border border-[#313032] rounded-[10px] px-3 py-2.5 hover:border-white/20 transition-colors"
                          >
                            <NetworkIcon network={destNetwork} size={20} />
                            <span className="font-['Inter'] text-[13px] text-white truncate ml-2.5" style={{ fontWeight: 500 }}>
                              {NETWORKS[destNetwork].name}
                            </span>
                            <span className="ml-auto shrink-0 pl-2">
                              <ChevronDownSmall />
                            </span>
                          </button>

                          {showDestNetworkDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1e] border border-[#313032] rounded-[10px] overflow-hidden z-20 shadow-xl">
                              {destDropdownList.map((net) => {
                                const isDisabled = net === sourceNetwork;
                                return (
                                  <button
                                    key={net}
                                    onClick={() => handleSetDest(net)}
                                    disabled={isDisabled}
                                    className={`w-full flex items-center gap-2.5 px-3 transition-colors ${
                                      isDisabled
                                        ? "opacity-35 cursor-not-allowed border-t border-white/[0.04] py-2"
                                        : `hover:bg-white/[0.04] py-2.5 ${destNetwork === net ? "bg-white/[0.04]" : ""}`
                                    }`}
                                  >
                                    <NetworkIcon network={net} size={20} />
                                    <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 500 }}>
                                      {NETWORKS[net].name}
                                    </span>
                                    {destNetwork === net && !isDisabled && (
                                      <div className="ml-auto w-[5px] h-[5px] rounded-full bg-[#00f99b]" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mobile: vertical stack */}
                      <div className="flex sm:hidden flex-col items-center gap-2.5">
                        {/* From */}
                        <div className="w-full">
                          <span className="font-['Inter'] text-[12px] text-white/40 mb-1.5 block" style={{ fontWeight: 400 }}>
                            From
                          </span>
                          <div className="relative">
                            <button
                              onClick={() => { setShowNetworkDropdown(!showNetworkDropdown); setShowTokenDropdown(false); }}
                              className="w-full flex items-center bg-[#191919] border border-[#313032] rounded-[10px] px-3 py-2.5 hover:border-white/20 transition-colors"
                            >
                              <NetworkIcon network={sourceNetwork} size={20} />
                              <span className="font-['Inter'] text-[13px] text-white truncate ml-2.5" style={{ fontWeight: 500 }}>
                                {NETWORKS[sourceNetwork].name}
                              </span>
                              <span className="ml-auto shrink-0 pl-2">
                                <ChevronDownSmall />
                              </span>
                            </button>

                            {showNetworkDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1e] border border-[#313032] rounded-[10px] overflow-hidden z-20 shadow-xl">
                                {sourceDropdownList.map((net) => {
                                  const isDisabled = net === destNetwork;
                                  return (
                                    <button
                                      key={net}
                                      onClick={() => handleSetSource(net)}
                                      disabled={isDisabled}
                                      className={`w-full flex items-center gap-2.5 px-3 transition-colors ${
                                        isDisabled
                                          ? "opacity-35 cursor-not-allowed border-t border-white/[0.04] py-2"
                                          : `hover:bg-white/[0.04] py-2.5 ${sourceNetwork === net ? "bg-white/[0.04]" : ""}`
                                      }`}
                                    >
                                      <NetworkIcon network={net} size={20} />
                                      <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 500 }}>
                                        {NETWORKS[net].name}
                                      </span>
                                      {sourceNetwork === net && !isDisabled && (
                                        <div className="ml-auto w-[5px] h-[5px] rounded-full bg-[#00f99b]" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Arrow ↓ */}
                        <div className="w-[32px] h-[32px] rounded-full bg-[#191919] border border-[#313032] flex items-center justify-center shrink-0">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 2v10M4 9l3 3 3-3" stroke="white" strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        {/* Target Network */}
                        <div className="w-full">
                          <span className="font-['Inter'] text-[12px] text-white/40 mb-1.5 block" style={{ fontWeight: 400 }}>
                            Target Network
                          </span>
                          <div className="relative">
                            <button
                              onClick={() => { setShowDestNetworkDropdown(!showDestNetworkDropdown); setShowNetworkDropdown(false); setShowTokenDropdown(false); }}
                              className="w-full flex items-center bg-[#191919] border border-[#313032] rounded-[10px] px-3 py-2.5 hover:border-white/20 transition-colors"
                            >
                              <NetworkIcon network={destNetwork} size={20} />
                              <span className="font-['Inter'] text-[13px] text-white truncate ml-2.5" style={{ fontWeight: 500 }}>
                                {NETWORKS[destNetwork].name}
                              </span>
                              <span className="ml-auto shrink-0 pl-2">
                                <ChevronDownSmall />
                              </span>
                            </button>

                            {showDestNetworkDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1e] border border-[#313032] rounded-[10px] overflow-hidden z-20 shadow-xl">
                                {destDropdownList.map((net) => {
                                  const isDisabled = net === sourceNetwork;
                                  return (
                                    <button
                                      key={net}
                                      onClick={() => handleSetDest(net)}
                                      disabled={isDisabled}
                                      className={`w-full flex items-center gap-2.5 px-3 transition-colors ${
                                        isDisabled
                                          ? "opacity-35 cursor-not-allowed border-t border-white/[0.04] py-2"
                                          : `hover:bg-white/[0.04] py-2.5 ${destNetwork === net ? "bg-white/[0.04]" : ""}`
                                      }`}
                                    >
                                      <NetworkIcon network={net} size={20} />
                                      <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 500 }}>
                                        {NETWORKS[net].name}
                                      </span>
                                      {destNetwork === net && !isDisabled && (
                                        <div className="ml-auto w-[5px] h-[5px] rounded-full bg-[#00f99b]" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount + PT Token Selector (combined row) */}
                    <div className="flex flex-col gap-1.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>
                          Amount
                        </span>
                        {selectedToken && (
                          <button
                            onClick={() => setAmount(selectedToken.balance.replace(/,/g, ""))}
                            className="font-['Inter'] text-[11px] text-[#00f99b]/70 hover:text-[#00f99b] transition-colors"
                            style={{ fontWeight: 500 }}
                          >
                            Max: {selectedToken.balance}
                          </button>
                        )}
                      </div>
                      <div className="flex items-stretch bg-[#191919] border border-[#313032] rounded-[10px] overflow-visible focus-within:border-[#00f99b]/30 transition-colors">
                        {/* Amount input — ~70% desktop, ~60% mobile */}
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => {
                            const v = e.target.value.replace(/[^0-9.]/g, "");
                            setAmount(v);
                          }}
                          placeholder="0.00"
                          className="w-[60%] sm:w-[70%] shrink-0 bg-transparent px-4 py-3.5 font-['Inter'] text-[18px] text-white placeholder:text-white/15 outline-none rounded-l-[10px]"
                          style={{ fontWeight: 500 }}
                        />
                        {/* PT selector — ~40% mobile, ~30% desktop */}
                        <div className="w-[40%] sm:w-[30%] border-l border-white/[0.06]">
                          <button
                            onClick={() => { setShowTokenDropdown(!showTokenDropdown); setShowNetworkDropdown(false); }}
                            className="w-full h-full flex items-center justify-between gap-1 px-3 hover:bg-white/[0.03] transition-colors rounded-r-[10px]"
                          >
                            {selectedToken ? (
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-[18px] h-[18px] rounded-full bg-[#00f99b]/10 border border-[#00f99b]/30 flex items-center justify-center shrink-0">
                                  <span className="font-['Inter'] text-[6px] text-[#00f99b]" style={{ fontWeight: 700 }}>PT</span>
                                </div>
                                <span className="font-['Inter'] text-[12px] text-white truncate" style={{ fontWeight: 500 }}>
                                  {selectedToken.symbol.replace("PT-", "")}
                                </span>
                              </div>
                            ) : (
                              <span className="font-['Inter'] text-[12px] text-white/30 truncate" style={{ fontWeight: 400 }}>
                                Select PT
                              </span>
                            )}
                            <ChevronDownSmall />
                          </button>
                        </div>
                      </div>
                      {/* Token dropdown — full width, outside the input row */}
                      {showTokenDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1e] border border-[#313032] rounded-[10px] overflow-hidden z-30 shadow-xl max-h-[300px] overflow-y-auto">
                          {filteredTokens.length === 0 ? (
                            <div className="px-4 py-4 text-center">
                              <span className="font-['Inter'] text-[12px] text-white/30" style={{ fontWeight: 400 }}>
                                No PT tokens on {NETWORKS[sourceNetwork].name}
                              </span>
                            </div>
                          ) : (
                            <>
                              {/* ── Your Wallet ── */}
                              {walletTokens.length > 0 && (
                                <>
                                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                                    <span className="font-['Inter'] text-[10px] text-white/50" style={{ fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase" }}>
                                      Your Wallet
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/[0.06]" />
                                    <span className="font-['Inter'] text-[10px] text-[#00f99b]/60" style={{ fontWeight: 500 }}>
                                      {walletTokens.length}
                                    </span>
                                  </div>
                                  {walletTokens.map((token) => (
                                    <button
                                      key={token.id}
                                      onClick={() => {
                                        setSelectedToken(token);
                                        setShowTokenDropdown(false);
                                      }}
                                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors ${
                                        selectedToken?.id === token.id ? "bg-white/[0.04]" : ""
                                      }`}
                                    >
                                      <div className="w-[20px] h-[20px] rounded-full bg-[#00f99b]/10 border border-[#00f99b]/30 flex items-center justify-center shrink-0">
                                        <span className="font-['Inter'] text-[7px] text-[#00f99b]" style={{ fontWeight: 700 }}>PT</span>
                                      </div>
                                      <div className="flex flex-col items-start flex-1 min-w-0">
                                        <span className="font-['Inter'] text-[12px] text-white" style={{ fontWeight: 500 }}>
                                          {token.symbol}
                                        </span>
                                        <span className="font-['Inter'] text-[10px] text-white/30" style={{ fontWeight: 400 }}>
                                          {token.maturity}
                                        </span>
                                      </div>
                                      <div className="flex flex-col items-end shrink-0">
                                        <span className="font-['Inter'] text-[11px] text-white/70" style={{ fontWeight: 500 }}>
                                          {token.balance}
                                        </span>
                                        <span className="font-['Inter'] text-[10px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                                          {token.usdValue}
                                        </span>
                                      </div>
                                    </button>
                                  ))}
                                </>
                              )}

                              {/* ── Other PT Tokens Available ── */}
                              {otherTokens.length > 0 && (
                                <>
                                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                                    <span className="font-['Inter'] text-[10px] text-white/30" style={{ fontWeight: 600, letterSpacing: "0.4px", textTransform: "uppercase" }}>
                                      Other PT Tokens Available
                                    </span>
                                    <div className="flex-1 h-[1px] bg-white/[0.04]" />
                                  </div>
                                  {otherTokens.map((token) => (
                                    <button
                                      key={token.id}
                                      onClick={() => {
                                        setSelectedToken(token);
                                        setShowTokenDropdown(false);
                                      }}
                                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors opacity-60 ${
                                        selectedToken?.id === token.id ? "bg-white/[0.04] opacity-100" : ""
                                      }`}
                                    >
                                      <div className="w-[20px] h-[20px] rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                                        <span className="font-['Inter'] text-[7px] text-white/40" style={{ fontWeight: 700 }}>PT</span>
                                      </div>
                                      <div className="flex flex-col items-start flex-1 min-w-0">
                                        <span className="font-['Inter'] text-[12px] text-white/60" style={{ fontWeight: 500 }}>
                                          {token.symbol}
                                        </span>
                                        <span className="font-['Inter'] text-[10px] text-white/20" style={{ fontWeight: 400 }}>
                                          {token.maturity}
                                        </span>
                                      </div>
                                      <span className="font-['Inter'] text-[11px] text-white/25 shrink-0" style={{ fontWeight: 500 }}>
                                        No balance
                                      </span>
                                    </button>
                                  ))}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      )}
                      {inputNum > maxBalance && selectedToken && (
                        <span className="font-['Inter'] text-[11px] text-[#ef6b6b]" style={{ fontWeight: 400 }}>
                          Insufficient balance
                        </span>
                      )}
                    </div>

                    {/* Destination Wallet Input */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Destination Wallet</span>
                        {isValidStellar ? (
                          <div className="flex items-center gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                              <path d="M3 7l3 3 5-5" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-['Inter'] text-[11px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                              Correct
                            </span>
                          </div>
                        ) : (
                          <span className="font-['Inter'] text-[11px] text-white/25" style={{ fontWeight: 400 }}>
                            {destWallet.length > 0 ? "Invalid" : "Not set"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-3 bg-[#191919] rounded-[10px] px-4 py-3 transition-colors"
                        style={{
                          border: showWalletError
                            ? "1px solid rgba(239,107,107,0.4)"
                            : isValidStellar && destWallet.length > 0
                            ? "1px solid rgba(0,249,155,0.25)"
                            : "1px solid #313032",
                        }}
                      >
                        <StellarNetworkIcon size={18} />
                        <input
                          type="text"
                          value={destWallet}
                          onChange={(e) => setDestWallet(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
                          onBlur={() => setDestWalletTouched(true)}
                          placeholder="GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOO..."
                          spellCheck={false}
                          className="flex-1 min-w-0 bg-transparent font-['Inter'] text-[13px] text-white/90 outline-none truncate placeholder:text-white/15 placeholder:font-light"
                          style={{ fontWeight: 400, letterSpacing: "0.3px" }}
                        />
                        {isValidStellar && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                            <path d="M3 7l3 3 5-5" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {showWalletError && (
                        <span className="font-['Inter'] text-[11px] text-[#ef6b6b]" style={{ fontWeight: 400 }}>
                          {destWallet.length !== 56
                            ? `Invalid length — Stellar addresses are exactly 56 characters`
                            : "Invalid format — must start with G and contain only A-Z, 2-7"}
                        </span>
                      )}
                      {!destWalletTouched && destWallet.length === 0 && (
                        <span className="font-['Inter'] text-[11px] text-white/25" style={{ fontWeight: 300 }}>
                          Enter your Stellar public key (starts with G, 56 characters)
                        </span>
                      )}
                      {destWallet.length > 0 && (
                        <span className="font-mono text-[10px] text-white/40 break-all" style={{ fontWeight: 400, lineHeight: "15px", letterSpacing: "0.3px" }}>
                          {destWallet}
                        </span>
                      )}
                    </div>

                    {/* Bridge Summary (unfolds when token selected) */}
                    {selectedToken && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#191919] rounded-[12px] border border-[#313032] px-4 py-4 flex flex-col gap-3">
                          {/* Sending */}
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Sending</span>
                            <div className="flex flex-col items-end">
                              <span className="font-['Inter'] text-[13px] text-white" style={{ fontWeight: 500 }}>
                                {selectedToken.symbol}
                              </span>
                              <span className="font-['Inter'] text-[11px] text-white/30" style={{ fontWeight: 400 }}>
                                {hasValidAmount ? Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"} tokens
                              </span>
                            </div>
                          </div>
                          <div className="h-[1px] bg-white/[0.05]" />

                          {/* From */}
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>From</span>
                            <div className="flex items-center gap-2">
                              <NetworkIcon network={sourceNetwork} size={16} />
                              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>
                                {NETWORKS[sourceNetwork].name}
                              </span>
                            </div>
                          </div>
                          <div className="h-[1px] bg-white/[0.05]" />

                          {/* Destination */}
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Destination</span>
                            <div className="flex items-center gap-2">
                              <NetworkIcon network={destNetwork} size={16} />
                              <span className="font-['Inter'] text-[12px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                                {NETWORKS[destNetwork].name}
                              </span>
                            </div>
                          </div>
                          <div className="h-[1px] bg-white/[0.05]" />

                          {/* Expected Bridge Time */}
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Expected Bridge Time</span>
                            <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>
                              {estimatedTime}
                            </span>
                          </div>
                          <div className="h-[1px] bg-white/[0.05]" />

                          {/* Fees */}
                          <div className="flex items-center justify-between">
                            <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Fees</span>
                            <div className="flex flex-col items-end">
                              <span className="font-['Inter'] text-[12px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                                0
                              </span>
                              <span className="font-['Inter'] text-[10px] text-white/25" style={{ fontWeight: 400 }}>
                                Network fees apply
                              </span>
                            </div>
                          </div>
                          <div className="h-[1px] bg-white/[0.05]" />

                          {/* Destination Wallet */}
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Destination Wallet</span>
                              {isValidStellar ? (
                                <div className="flex items-center gap-1.5">
                                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 7l3 3 5-5" stroke="#00f99b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <span className="font-['Inter'] text-[11px] text-[#00f99b]" style={{ fontWeight: 500 }}>
                                    Correct
                                  </span>
                                </div>
                              ) : (
                                <span className="font-['Inter'] text-[11px] text-white/25" style={{ fontWeight: 400 }}>
                                  {destWallet.length > 0 ? "Invalid" : "Not set"}
                                </span>
                              )}
                            </div>
                            {destWallet.length > 0 && (
                              <span className="font-mono text-[10px] text-white/40 break-all" style={{ fontWeight: 400, lineHeight: "15px", letterSpacing: "0.3px" }}>
                                {destWallet}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Bridge Button */}
                    <button
                      disabled={!canBridge || bridging}
                      onClick={handleBridge}
                      className="w-full h-[48px] rounded-[10px] flex items-center justify-center gap-2 transition-all mt-1"
                      style={{
                        backgroundColor: canBridge ? "#00f99b" : "rgba(255,255,255,0.06)",
                        opacity: canBridge ? 1 : 0.5,
                        boxShadow: canBridge ? "0 0 24px rgba(0,249,155,0.2)" : "none",
                        cursor: canBridge && !bridging ? "pointer" : "not-allowed",
                      }}
                    >
                      {bridging ? (
                        <div className="flex items-center gap-2">
                          <div className="w-[16px] h-[16px] border-2 border-[#191919] border-t-transparent rounded-full animate-spin" />
                          <span className="font-['Inter'] text-[14px] text-[#191919]" style={{ fontWeight: 600 }}>
                            Bridging...
                          </span>
                        </div>
                      ) : (
                        <span
                          className="font-['Inter'] text-[14px]"
                          style={{ fontWeight: 600, color: canBridge ? "#191919" : "rgba(255,255,255,0.3)" }}
                        >
                          Bridge to {NETWORKS[destNetwork].name}
                        </span>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right: Info Panel ── */}
          <div className="w-full lg:w-[280px] lg:shrink-0 flex flex-col gap-4">
            {/* Supported Networks */}
            <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-4">
              <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 500 }}>
                Supported Networks
              </span>
              <div className="flex flex-col gap-3 mt-3">
                {(["ethereum", "base"] as SourceNetwork[]).map((net) => (
                  <div key={net} className="flex items-center gap-2.5">
                    <NetworkIcon network={net} size={20} />
                    <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>
                      {NETWORKS[net].name}
                    </span>
                    <div className="ml-auto w-[6px] h-[6px] rounded-full bg-[#00f99b]" />
                  </div>
                ))}
                <div className="flex items-center gap-2.5">
                  <StellarNetworkIcon size={20} />
                  <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>
                    Stellar
                  </span>
                  <span className="ml-1 px-[5px] py-[1px] rounded-[4px] bg-[#00f99b]/10 border border-[#00f99b]/20 font-['Inter'] text-[8px] text-[#00f99b] uppercase tracking-wide" style={{ fontWeight: 700 }}>
                    New
                  </span>
                  <div className="ml-auto w-[6px] h-[6px] rounded-full bg-[#00f99b]" />
                </div>
              </div>
            </div>

            {/* Bridge Info */}
            <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-4">
              <span className="font-['Inter'] text-[12px] text-white/50" style={{ fontWeight: 500 }}>
                Bridge Info
              </span>
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 400 }}>Avg. Bridge Time</span>
                  <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>~8 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 400 }}>Bridge Fee</span>
                  <span className="font-['Inter'] text-[12px] text-[#00f99b]" style={{ fontWeight: 500 }}>0%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity / My Activity — Tabbed */}
            <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-4">
              <div className="flex items-center gap-0 bg-[#191919] rounded-[8px] p-[3px]">
                {(["recent", "my"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivityTab(tab)}
                    className={`flex-1 h-[28px] rounded-[6px] font-['Inter'] text-[11px] transition-all ${
                      activityTab === tab
                        ? "bg-[#2a2a2e] text-white shadow-sm"
                        : "text-white/35 hover:text-white/50"
                    }`}
                    style={{ fontWeight: activityTab === tab ? 600 : 400 }}
                  >
                    {tab === "recent" ? "Recent Bridges" : "My Activity"}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-0 mt-3">
                {(activityTab === "recent" ? RECENT_BRIDGES : MY_ACTIVITY).map((b, i, arr) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-1.5 py-3 ${i < arr.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                  >
                    {/* Top row: amount + token and time */}
                    <div className="flex items-center justify-between">
                      <span className="font-['Inter'] text-[12px] text-white/80 truncate" style={{ fontWeight: 600 }}>
                        {b.amount} {b.token}
                      </span>
                      <span
                        className="font-['Inter'] text-[11px] text-white/25 hover:text-[#00f99b] transition-colors cursor-default shrink-0 ml-2"
                        style={{ fontWeight: 400 }}
                      >
                        {b.time}
                      </span>
                    </div>
                    {/* Bottom row: network direction with mini icons */}
                    <div className="flex items-center gap-1.5">
                      <NetworkIcon network={b.from} size={13} />
                      <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 500 }}>
                        {NETWORKS[b.from].name}
                      </span>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="shrink-0 mx-0.5">
                        <path d="M1 4h8M7 1.5L9 4 7 6.5" stroke="white" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <NetworkIcon network={b.to} size={13} />
                      <span className="font-['Inter'] text-[11px] text-white/40" style={{ fontWeight: 500 }}>
                        {NETWORKS[b.to].name}
                      </span>
                    </div>
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