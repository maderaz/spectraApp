import svgPaths from "./svg-4m6t2wsogl";

function Container2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-[1_0_0] flex-col font-['Lexend:Light',sans-serif] font-light justify-center leading-[0] min-h-px min-w-px relative text-[24px] text-white">
        <p className="leading-[32px] whitespace-pre-wrap">Flare rFLR Rewards</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start max-w-[896px] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">View and claim your rFLR rewards earned through Spectra</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[7.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-full">
          <p className="leading-[12px] whitespace-pre-wrap">Claimable</p>
        </div>
      </div>
    </div>
  );
}

function FlareSvg() {
  return (
    <div className="relative shrink-0 size-[19.99px]" data-name="flare.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.99 19.99">
        <g clipPath="url(#clip0_53_165)" id="flare.svg">
          <path d={svgPaths.p1ac64840} fill="var(--fill-0, white)" id="background" />
          <path d={svgPaths.p27e22100} fill="var(--fill-0, #E62058)" id="Path_2898" />
          <path d={svgPaths.p2df35780} fill="var(--fill-0, #E62058)" id="Path_2899" />
          <path d={svgPaths.p30ec6e00} fill="var(--fill-0, #E62058)" id="Ellipse_9" />
        </g>
        <defs>
          <clipPath id="clip0_53_165">
            <rect fill="white" height="19.99" width="19.99" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FlareSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[19.99px]" data-name="flare.svg fill">
      <FlareSvg />
    </div>
  );
}

function RFlr() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[365.8299865722656px] overflow-clip relative shrink-0 size-[19.99px]" data-name="rFLR">
      <FlareSvgFill />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#00f99b] text-[18px] whitespace-nowrap">
        <p className="leading-[18px]">11,813.23 rFLR</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <RFlr />
        <Container9 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] w-full">
          <p className="leading-[16px] whitespace-pre-wrap">≈$110</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#212125] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(228,228,231,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[6px] items-start px-[20.988px] py-[16.988px] relative size-full">
        <Container7 />
        <Container8 />
        <Container10 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-full">
          <p className="leading-[12px] whitespace-pre-wrap">Pending</p>
        </div>
      </div>
    </div>
  );
}

function FlareSvg1() {
  return (
    <div className="relative shrink-0 size-[19.99px]" data-name="flare.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.99 19.99">
        <g clipPath="url(#clip0_53_165)" id="flare.svg">
          <path d={svgPaths.p1ac64840} fill="var(--fill-0, white)" id="background" />
          <path d={svgPaths.p27e22100} fill="var(--fill-0, #E62058)" id="Path_2898" />
          <path d={svgPaths.p2df35780} fill="var(--fill-0, #E62058)" id="Path_2899" />
          <path d={svgPaths.p30ec6e00} fill="var(--fill-0, #E62058)" id="Ellipse_9" />
        </g>
        <defs>
          <clipPath id="clip0_53_165">
            <rect fill="white" height="19.99" width="19.99" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FlareSvgFill1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[19.99px]" data-name="flare.svg fill">
      <FlareSvg1 />
    </div>
  );
}

function RFlr1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[365.8299865722656px] overflow-clip relative shrink-0 size-[19.99px]" data-name="rFLR">
      <FlareSvgFill1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[18px]">28,579.56 rFLR</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <RFlr1 />
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.4)] w-full">
          <p className="leading-[16px] whitespace-pre-wrap">≈$267</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#212125] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(228,228,231,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[6px] items-start px-[20.988px] py-[16.988px] relative size-full">
        <Container11 />
        <Container12 />
        <Container14 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#00f99b] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Flare Portal</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#a9b2bc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Claim your rFLR on the `}</p>
      </div>
      <Link />
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#a9b2bc] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">→ Emissions Tab → select Spectra from the dropdown.</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Epoch Details</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Epoch 20</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(234,179,8,0.15)] content-stretch flex flex-col items-start pb-[1.995px] pt-[1.405px] px-[8px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#facc15] text-[9.6px] whitespace-nowrap">
        <p className="leading-[14.4px]">Pending</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Container">
      <Container19 />
      <Overlay />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">28,579.56 rFLR</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container18 />
        <Container20 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#a9b2bc] text-[12px] w-full">
          <p className="leading-[16px] whitespace-pre-wrap">Jan 27, 2026 – Feb 26, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#a9b2bc] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">stXRP(FXRP)-2026/03/05</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">28,579.56 rFLR</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[12px] pr-[11.99px] py-[8px] relative w-full">
          <Container22 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#212125] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(228,228,231,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16.988px] relative w-full">
        <Container17 />
        <Container21 />
        <Overlay1 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Epoch 19</p>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(34,197,94,0.15)] content-stretch flex flex-col items-start pb-[1.985px] pt-[1.415px] px-[8px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4ade80] text-[9.6px] whitespace-nowrap">
        <p className="leading-[14.4px]">Claimable</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Container">
      <Container26 />
      <Overlay2 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">11,813.23 rFLR</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative w-full">
        <Container25 />
        <Container27 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#a9b2bc] text-[12px] w-full">
          <p className="leading-[16px] whitespace-pre-wrap">Dec 28, 2025 – Jan 27, 2026</p>
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[#a9b2bc] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">stXRP(FXRP)-2026/03/05</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
        <p className="leading-[16px]">11,813.23 rFLR</p>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] relative rounded-[12px] shrink-0 w-full" data-name="Overlay">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pl-[12px] pr-[11.99px] py-[8px] relative w-full">
          <Container29 />
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#212125] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(228,228,231,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16.988px] relative w-full">
        <Container24 />
        <Container28 />
        <Overlay3 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[23.9px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1400px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[inherit] pt-[32px] px-[32px] relative w-full">
        <Container1 />
        <Container5 />
      </div>
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#1c1c1e] content-stretch flex flex-col items-start pb-[32px] relative size-full" data-name="Background">
      <Container />
    </div>
  );
}