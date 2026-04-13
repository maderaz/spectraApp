import { SpectraIcon } from "./TokenIcons";
import svgPaths from "../../imports/svg-qtk3afs1b8";

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12.3715 12.372" fill="none" className="opacity-50">
      <path d={svgPaths.p2fb2bd00} fill="white" />
    </svg>
  );
}

export function PoolInfo() {
  return (
    <div className="w-full">
      <h2 className="font-['Inter'] text-[16px] text-white mb-4" style={{ fontWeight: 600 }}>Pool Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
        {/* My Stats */}
        <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-4 sm:p-6">
          <h3 className="font-['Inter'] text-[14px] text-white mb-4" style={{ fontWeight: 500 }}>My Stats</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>My Pool Share</span>
              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>0%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>LP Tokens in Wallet</span>
              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>Boost</span>
              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>-</span>
            </div>
          </div>
        </div>

        {/* Pool APY Breakdown */}
        <div className="bg-[#212125] border border-[#313032] rounded-[16px] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 500 }}>Pool APY Breakdown</h3>
            <span className="font-['Inter'] text-[14px] text-white" style={{ fontWeight: 500 }}>9-18%</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>PT Fixed Rate</span>
              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>3.86%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>LP Fees</span>
                <InfoIcon />
              </div>
              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>0.02%</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>LP Rewards</span>
                <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>5.52-14.38%</span>
              </div>
              <div className="flex items-center justify-between pl-4">
                <div className="flex items-center gap-1.5">
                  <SpectraIcon size={16} />
                  <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>SPECTRA</span>
                </div>
                <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>5.52-14.38%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[12px] text-white/40" style={{ fontWeight: 400 }}>sGHO</span>
              <span className="font-['Inter'] text-[12px] text-white/70" style={{ fontWeight: 500 }}>-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}