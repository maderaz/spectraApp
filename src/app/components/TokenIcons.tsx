import svgPaths from "../../imports/svg-qtk3afs1b8";
import imgEthereum from "figma:asset/3273179a95e7510bd0c60f7704b65e9ac3d52263.png";
import { imgGroup, imgGroup1, imgGroup2 } from "../../imports/svg-401hs";

export function SpectraIcon({ size = 34 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative overflow-clip rounded-full shrink-0">
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url('${imgGroup}')`,
          WebkitMaskImage: `url('${imgGroup}')`,
          maskSize: `${size}px ${size}px`,
          WebkitMaskSize: `${size}px ${size}px`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <path d={svgPaths.p2c011100} fill="url(#spectra_grad1)" />
          <path d={svgPaths.p2c011100} fill="url(#spectra_grad2)" />
          <path d={svgPaths.p3d5f800} fill="white" />
          <path d={svgPaths.p19a0f200} fill="white" />
          <path d={svgPaths.p271ff680} fill="white" />
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(17) rotate(90) scale(34)" gradientUnits="userSpaceOnUse" id="spectra_grad1" r="1">
              <stop stopColor="#00F99B" />
              <stop offset="0.525" stopColor="#7CD33F" />
              <stop offset="0.88" stopColor="#FFCE25" />
              <stop offset="1" stopColor="#FFCE25" />
            </radialGradient>
            <radialGradient cx="0" cy="0" gradientTransform="translate(17) rotate(90) scale(34)" gradientUnits="userSpaceOnUse" id="spectra_grad2" r="1">
              <stop stopColor="#00F99B" />
              <stop offset="0.3125" stopColor="#34C95F" />
              <stop offset="0.639423" stopColor="#5AB783" />
              <stop offset="0.817308" stopColor="#A9B2BC" />
              <stop offset="1" stopColor="#A3A2FF" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export function AaveProtocolIcon({ size = 16 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <div className="absolute inset-[1.67%]">
        <svg className="block size-full" fill="none" viewBox="0 0 16.5333 16.5333">
          <path d={svgPaths.p25f45400} fill="black" stroke="white" strokeWidth="1.06667" />
        </svg>
      </div>
      <div
        className="absolute inset-[19.1%_15.95%_18.99%_15.73%]"
        style={{
          maskImage: `url('${imgGroup1}')`,
          WebkitMaskImage: `url('${imgGroup1}')`,
          maskSize: '10.93px 10.93px',
          WebkitMaskSize: '10.93px 10.93px',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 10.9305 9.90577">
          <path d={svgPaths.p156aa980} fill="white" />
          <path d={svgPaths.p14966000} fill="white" />
          <path d={svgPaths.p2f49ec00} fill="white" />
        </svg>
      </div>
    </div>
  );
}

export function EthereumIcon({ size = 20 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative rounded-full shrink-0 overflow-hidden">
      <img alt="Ethereum" className="absolute inset-0 size-full object-cover" src={imgEthereum} />
    </div>
  );
}

export function GhoTokenIcon({ size = 34 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative overflow-clip shrink-0">
      <svg className="block size-full" fill="none" viewBox="0 0 34 34">
        <g clipPath="url(#gho_clip)">
          <path d={svgPaths.p2c011100} fill="#00F99B" />
          <path d={svgPaths.p3c025100} fill="white" />
          <path d={svgPaths.p2ece0900} fill="white" />
        </g>
        <defs>
          <clipPath id="gho_clip">
            <rect fill="white" height="34" width="34" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function SpectraTokenWithRing({ ringColor, size = 34 }: { ringColor: string; size?: number }) {
  const innerSize = size - 4;
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        boxShadow: `inset 0 0 0 1.5px ${ringColor}`,
      }}
    >
      <div
        className="absolute rounded-full overflow-clip"
        style={{ top: 2, left: 2, width: innerSize, height: innerSize }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: `url('${imgGroup2}')`,
            WebkitMaskImage: `url('${imgGroup2}')`,
            maskSize: `${innerSize}px ${innerSize}px`,
            WebkitMaskSize: `${innerSize}px ${innerSize}px`,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.05 30.05">
            <path d={svgPaths.p18756200} fill="url(#spectra_sm_grad1)" />
            <path d={svgPaths.p18756200} fill="url(#spectra_sm_grad2)" />
            <path d={svgPaths.p10f21600} fill="white" />
            <path d={svgPaths.p3f343480} fill="white" />
            <path d={svgPaths.p1602dc00} fill="white" />
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="translate(15.025) rotate(90) scale(30.05)" gradientUnits="userSpaceOnUse" id="spectra_sm_grad1" r="1">
                <stop stopColor="#00F99B" />
                <stop offset="0.525" stopColor="#7CD33F" />
                <stop offset="0.88" stopColor="#FFCE25" />
                <stop offset="1" stopColor="#FFCE25" />
              </radialGradient>
              <radialGradient cx="0" cy="0" gradientTransform="translate(15.025) rotate(90) scale(30.05)" gradientUnits="userSpaceOnUse" id="spectra_sm_grad2" r="1">
                <stop stopColor="#00F99B" />
                <stop offset="0.3125" stopColor="#34C95F" />
                <stop offset="0.639423" stopColor="#5AB783" />
                <stop offset="0.817308" stopColor="#A9B2BC" />
                <stop offset="1" stopColor="#A3A2FF" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

/** @deprecated Use SpectraTokenWithRing instead */
export function SpectraTokenWithBadge({ badge, borderColor }: { badge: string; borderColor: string }) {
  return <SpectraTokenWithRing ringColor={borderColor} />;
}