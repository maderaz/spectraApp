import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import svgPaths from "../../imports/svg-9i5mf1uili";

// ─── Nav item type ───
interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  dimmed?: boolean;
  badge?: string;
  indicator?: string;
  href?: string;
}

interface NavSection {
  key: string;
  title?: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

// ─── SVG Icon Components ───

function SpectraLogo() {
  return (
    <svg width="110" height="24" viewBox="0 0 109.48 23.998" fill="none">
      <path d={svgPaths.p2137dc00} fill="white" />
      <path d={svgPaths.p32e9700} fill="white" />
      <path d={svgPaths.p216d5380} fill="white" />
      <path clipRule="evenodd" d={svgPaths.p722c380} fill="white" fillRule="evenodd" />
      <path d={svgPaths.p38c2a200} fill="white" />
      <path clipRule="evenodd" d={svgPaths.p4a8c180} fill="white" fillRule="evenodd" />
      <path d={svgPaths.p30b45500} fill="white" />
    </svg>
  );
}

function HemiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 19.99 19.99" fill="none">
      <g clipPath="url(#hemiClip)">
        <path d={svgPaths.p91f8780} fill="#FF6C15" />
      </g>
      <defs>
        <clipPath id="hemiClip">
          <rect fill="white" height="19.99" width="19.99" />
        </clipPath>
      </defs>
    </svg>
  );
}

function MultiColorIcon() {
  return (
    <div className="overflow-hidden rounded-full" style={{ width: 20, height: 20 }}>
      <svg width="20" height="20" viewBox="-5 0 110 121" fill="none">
        <path d={svgPaths.pfd6fe00} fill="#FAA700" />
        <path d={svgPaths.pcba8600} fill="#F5F500" />
        <path d={svgPaths.p1d14a100} fill="#186FF2" />
        <path d={svgPaths.p18d92980} fill="#FAA700" />
      </svg>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="8" viewBox="0 0 10.5427 6.2436" fill="none">
      <path d={svgPaths.p332a6380} fill="white" />
    </svg>
  );
}

function SectionChevron({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10.5427 6.2436"
      fill="none"
      className="transition-transform duration-200"
      style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
    >
      <path d={svgPaths.p332a6380} fill="white" fillOpacity="0.35" />
    </svg>
  );
}

function PortfolioIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p15be79c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function FixedRatesIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p2a441f80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function YieldLeverageIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p369c91a0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function PoolsIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path
        d={svgPaths.pb742480}
        stroke={active ? "#00F99B" : "white"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MetaVaultsIcon({ active }: { active?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d={svgPaths.p1b2cbc60}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={active ? 1 : 0.3}
        strokeWidth="1.33333"
      />
    </svg>
  );
}

function MetaVaultsInfoIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14.99 14.99" fill="none">
      <path d={svgPaths.p16c8aa80} fill="white" fillOpacity="0.3" />
    </svg>
  );
}

function GaugesIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p3b5b2800} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function IncentivizeIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p3a425800} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function VeSpectraIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p12b60e00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function BridgeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p2ea9ca00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </svg>
  );
}

function WrapperIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 24.9955" fill="none">
      <path d={svgPaths.p1be2c500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function MigrateApwIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p10fc500} stroke="white" />
      <path d={svgPaths.p2cc89580} fill="white" />
      <path d={svgPaths.p2ce3f1b0} fill="white" />
      <path d={svgPaths.peefe800} fill="white" />
    </svg>
  );
}

function MigratePositionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p171812c} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.596" />
    </svg>
  );
}

function BrandComponentsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}

function FlareRewardsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#E62058" strokeWidth="1.5" />
      <path d="M15.5 10.2H8.5C7.67 10.2 7 10.87 7 11.7v0.1h6.5c0.83 0 1.5-0.67 1.5-1.5v-0.1z" fill="#E62058" />
      <path d="M17 7.5H8.5C7.67 7.5 7 8.17 7 9v0.1h8c0.83 0 1.5-0.67 1.5-1.5V7.5z" fill="#E62058" />
      <circle cx="8.5" cy="14.5" r="1.2" fill="#E62058" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p2b4b9b00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p171dd400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p22627b00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

// ─── Hamburger / Close Icons ───

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Navigation Data ───

const NAV_SECTIONS: NavSection[] = [
  {
    key: "portfolio",
    items: [
      { label: "Portfolio", icon: <PortfolioIcon />, indicator: "#fde047", href: "/portfolio" },
    ],
  },
  {
    key: "products",
    title: "Products",
    items: [
      { label: "Trading", icon: <PoolsIcon />, href: "/", badge: "Preview Only" },
      { label: "Fixed Rates (PT)", icon: <FixedRatesIcon />, href: "/fixed-rates" },
      { label: "Yield Leverage (YT)", icon: <YieldLeverageIcon />, href: "/yield-leverage" },
    ],
  },
  {
    key: "earn",
    title: "Earn on Liquidity",
    items: [
      { label: "Pools", icon: <PoolsIcon />, href: "/pools" },
      { label: "MetaVaults", icon: <MetaVaultsIcon />, href: "/metavaults" },
    ],
  },
  {
    key: "governance",
    title: "Governance",
    collapsible: true,
    items: [
      { label: "Gauges", icon: <GaugesIcon /> },
      { label: "Incentivize", icon: <IncentivizeIcon /> },
      { label: "veSPECTRA", icon: <VeSpectraIcon /> },
    ],
  },
  {
    key: "tools",
    title: "Tools",
    collapsible: true,
    defaultCollapsed: false,
    items: [
      { label: "PT Bridge", icon: <BridgeIcon />, href: "/pt-bridge" },
      { label: "Flare Rewards", icon: <FlareRewardsIcon />, href: "/rewards" },
      { label: "Wrapper", icon: <WrapperIcon /> },
      { label: "Migrate APW", icon: <MigrateApwIcon /> },
      { label: "Migrate Position", icon: <MigratePositionIcon /> },
    ],
  },
];

// ─── Nav Item Row ───

function NavItemRow({ item, isRouteActive, onNavigate }: { item: NavItem; isRouteActive?: boolean; onNavigate?: (href: string) => void }) {
  const isActive = isRouteActive ?? item.active;
  return (
    <button
      onClick={() => {
        if (item.href && onNavigate) onNavigate(item.href);
      }}
      className={`flex items-center gap-2 w-full rounded-[6px] px-0 py-[5px] transition-colors text-left ${
        isActive
          ? ""
          : item.dimmed
          ? "opacity-100"
          : "hover:bg-white/[0.03]"
      }`}
    >
      <div className="shrink-0 w-6 h-6 flex items-center justify-center">
        {/* Re-render icons with active state based on route */}
        {(item.label === "Trading") ? <PoolsIcon active={isActive} /> :
         item.label === "MetaVaults" ? <MetaVaultsIcon active={isActive} /> :
         item.icon}
      </div>
      <span
        className={`text-[12px] whitespace-nowrap ${
          isActive
            ? "text-white"
            : item.dimmed
            ? "text-white/25"
            : "text-white/70"
        }`}
        style={{ fontWeight: isActive ? 500 : 400 }}
      >
        {item.label}
      </span>

      {item.dimmed && <MetaVaultsInfoIcon />}

      {item.badge && (
        <span
          className="text-white/30 text-[9px] px-1.5 py-[1px] rounded-full border border-white/[0.1] bg-white/[0.03]"
          style={{ fontWeight: 500 }}
        >
          {item.badge}
        </span>
      )}

      {item.indicator && (
        <span
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{ backgroundColor: item.indicator }}
        />
      )}
    </button>
  );
}

// ─── Sidebar Content (shared between desktop & mobile) ───

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Track collapsed state for collapsible sections
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_SECTIONS.forEach((s) => {
      if (s.collapsible) {
        initial[s.key] = s.defaultCollapsed ?? false;
      }
    });
    return initial;
  });

  const toggleSection = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavigate = (href: string) => {
    navigate(href);
    if (onClose) onClose();
  };

  const isItemActive = (item: NavItem): boolean => {
    if (!item.href) return false;
    if (item.href === "/") return location.pathname === "/";
    return location.pathname.startsWith(item.href);
  };

  return (
    <div className="flex flex-col h-full font-['Inter']">
      {/* Logo + Close button on mobile */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <SpectraLogo />
        {onClose && (
          <button
            onClick={onClose}
            className="xl:hidden p-1 rounded hover:bg-white/[0.06] transition-colors"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Wallet Button */}
      <div className="px-5 py-2.5">
        <button className="flex items-center gap-2 w-full bg-white/[0.04] rounded-[6px] px-3 py-[8px] hover:bg-white/[0.07] transition-colors border border-white/[0.06]">
          <div className="flex items-center -space-x-1">
            <HemiIcon />
            <MultiColorIcon />
          </div>
          <span className="text-[11px] text-white/60 whitespace-nowrap" style={{ fontWeight: 500 }}>
            0x743D...2A73
          </span>
          <div className="ml-auto">
            <ChevronDown />
          </div>
        </button>
      </div>

      {/* Navigation — no vertical scroll */}
      <nav className="flex-1 px-5 pt-1 pb-2">
        {NAV_SECTIONS.map((section, sIdx) => {
          const isCollapsed = collapsed[section.key] ?? false;
          const isCollapsible = section.collapsible;

          return (
            <div key={section.key} className={sIdx > 0 ? "mt-3" : ""}>
              {section.title && (
                isCollapsible ? (
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="flex items-center justify-between w-full pt-1.5 pb-1.5 group"
                  >
                    <span
                      className="text-[11px] text-white/50 group-hover:text-white/70 transition-colors"
                      style={{ fontWeight: 300 }}
                    >
                      {section.title}
                    </span>
                    <SectionChevron collapsed={isCollapsed} />
                  </button>
                ) : (
                  <span
                    className="block text-[11px] text-white/50 mb-2 pt-1.5"
                    style={{ fontWeight: 300 }}
                  >
                    {section.title}
                  </span>
                )
              )}

              {/* Items — collapse/expand with smooth transition */}
              <div
                className="flex flex-col gap-0 overflow-hidden transition-all duration-200"
                style={{
                  maxHeight: isCollapsible && isCollapsed ? 0 : section.items.length * 40,
                  opacity: isCollapsible && isCollapsed ? 0 : 1,
                }}
              >
                {section.items.map((item) => (
                  <NavItemRow key={item.label} item={item} isRouteActive={isItemActive(item)} onNavigate={handleNavigate} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Bottom Links — compact */}
      <div className="px-5 pb-4 pt-1.5 border-t border-white/[0.06] flex flex-col gap-0">
        <button
          onClick={() => handleNavigate("/brand-components")}
          className={`flex items-center gap-2 w-full py-[4px] hover:bg-white/[0.03] rounded-[6px] transition-colors text-left ${
            location.pathname === "/brand-components" ? "" : ""
          }`}
        >
          <div className="shrink-0 w-5 h-5 flex items-center justify-center">
            <BrandComponentsIcon />
          </div>
          <span
            className={`text-[11px] whitespace-nowrap ${
              location.pathname === "/brand-components" ? "text-white" : "text-white/50"
            }`}
            style={{ fontWeight: location.pathname === "/brand-components" ? 500 : 400 }}
          >
            Brand Components
          </span>
        </button>
        <button className="flex items-center gap-2 w-full py-[4px] hover:bg-white/[0.03] rounded-[6px] transition-colors text-left">
          <div className="shrink-0 w-5 h-5 flex items-center justify-center">
            <SettingsIcon />
          </div>
          <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>Settings</span>
        </button>
        <button className="flex items-center gap-2 w-full py-[4px] hover:bg-white/[0.03] rounded-[6px] transition-colors text-left">
          <div className="shrink-0 w-5 h-5 flex items-center justify-center">
            <SupportIcon />
          </div>
          <span className="text-[11px] text-white/50" style={{ fontWeight: 400 }}>Support</span>
        </button>
        <div className="flex items-center gap-3 mt-1.5">
          <button className="text-left">
            <span className="text-[11px] text-white/35 hover:text-white/60 transition-colors" style={{ fontWeight: 400 }}>Terms</span>
          </button>
          <span className="text-white/15 text-[11px]">&middot;</span>
          <button className="text-left">
            <span className="text-[11px] text-white/35 hover:text-white/60 transition-colors" style={{ fontWeight: 400 }}>Privacy</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ───

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [liquidityOpen, setLiquidityOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close liquidity dropdown when clicking outside
  useEffect(() => {
    if (!liquidityOpen) return;
    const handler = () => setLiquidityOpen(false);
    // Delay to avoid closing immediately on the same click
    const id = setTimeout(() => {
      window.addEventListener("click", handler);
    }, 0);
    return () => {
      clearTimeout(id);
      window.removeEventListener("click", handler);
    };
  }, [liquidityOpen]);

  // Close liquidity dropdown on route change
  useEffect(() => {
    setLiquidityOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setLiquidityOpen(false);
  };

  return (
    <>
      {/* ── Mobile Bottom Tab Bar ── */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141414] border-t border-white/[0.08]">
        {/* Liquidity upward dropdown */}
        {liquidityOpen && (
          <div
            className="absolute bottom-full left-0 right-0 bg-[#1c1c1e] border-t border-white/[0.08] shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleNav("/pools")}
              className={`flex items-center gap-3 w-full px-5 py-3.5 transition-colors ${
                isActive("/pools") ? "bg-white/[0.06]" : "hover:bg-white/[0.04] active:bg-white/[0.06]"
              }`}
            >
              <PoolsIcon active={isActive("/pools")} />
              <span className={`text-[13px] ${isActive("/pools") ? "text-white" : "text-white/60"}`} style={{ fontWeight: isActive("/pools") ? 500 : 400 }}>
                Pools
              </span>
            </button>
            <div className="h-px bg-white/[0.06] mx-4" />
            <button
              onClick={() => handleNav("/metavaults")}
              className={`flex items-center gap-3 w-full px-5 py-3.5 transition-colors ${
                isActive("/metavaults") ? "bg-white/[0.06]" : "hover:bg-white/[0.04] active:bg-white/[0.06]"
              }`}
            >
              <MetaVaultsIcon active={isActive("/metavaults")} />
              <span className={`text-[13px] ${isActive("/metavaults") ? "text-white" : "text-white/60"}`} style={{ fontWeight: isActive("/metavaults") ? 500 : 400 }}>
                MetaVaults
              </span>
            </button>
          </div>
        )}

        {/* Tab buttons */}
        <div className="flex items-stretch" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          {/* Fixed Rate */}
          <button
            onClick={() => handleNav("/fixed-rates")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
              isActive("/fixed-rates") ? "" : "active:bg-white/[0.04]"
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24.9955" fill="none">
                <path d={svgPaths.p2a441f80} stroke={isActive("/fixed-rates") ? "#00f99b" : "rgba(255,255,255,0.35)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <span
              className={`text-[10px] ${isActive("/fixed-rates") ? "text-[#00f99b]" : "text-white/35"}`}
              style={{ fontWeight: isActive("/fixed-rates") ? 600 : 400 }}
            >
              Fixed Rate
            </span>
          </button>

          {/* Yield Leverage */}
          <button
            onClick={() => handleNav("/yield-leverage")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
              isActive("/yield-leverage") ? "" : "active:bg-white/[0.04]"
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24.9955" fill="none">
                <path d={svgPaths.p369c91a0} stroke={isActive("/yield-leverage") ? "#f4c071" : "rgba(255,255,255,0.35)"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
            <span
              className={`text-[10px] ${isActive("/yield-leverage") ? "text-[#f4c071]" : "text-white/35"}`}
              style={{ fontWeight: isActive("/yield-leverage") ? 600 : 400 }}
            >
              Yield Leverage
            </span>
          </button>

          {/* Liquidity (dropdown trigger) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiquidityOpen((v) => !v);
            }}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
              liquidityOpen || isActive("/pools") || isActive("/metavaults")
                ? ""
                : "active:bg-white/[0.04]"
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center relative">
              <svg width="20" height="20" viewBox="0 0 24 24.9955" fill="none">
                <path
                  d={svgPaths.pb742480}
                  stroke={
                    liquidityOpen || isActive("/pools") || isActive("/metavaults")
                      ? "#d65ce9"
                      : "rgba(255,255,255,0.35)"
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span
              className={`text-[10px] ${
                liquidityOpen || isActive("/pools") || isActive("/metavaults")
                  ? "text-[#d65ce9]"
                  : "text-white/35"
              }`}
              style={{ fontWeight: liquidityOpen || isActive("/pools") || isActive("/metavaults") ? 600 : 400 }}
            >
              Liquidity
            </span>
          </button>

          {/* Hamburger — full menu */}
          <button
            onClick={() => { setMobileOpen(true); setLiquidityOpen(false); }}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 active:bg-white/[0.04] transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </div>
            <span className="text-[10px] text-white/35" style={{ fontWeight: 400 }}>
              More
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Full-Screen Sidebar Drawer ── */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-[#191919]">
          <SidebarContent onClose={() => setMobileOpen(false)} />
        </div>
      )}

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden xl:flex flex-col w-[232px] shrink-0 bg-[#191919] border-r border-white/[0.06] h-screen sticky top-0 overflow-hidden">
        <SidebarContent />
      </aside>
    </>
  );
}