import svgPaths from "./svg-9i5mf1uili";

function LinkSvg() {
  return (
    <div className="h-[23.998px] relative shrink-0 w-[109.48px]" data-name="Link → SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109.48 23.998">
        <g id="Link â SVG">
          <path d={svgPaths.p2137dc00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p32e9700} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p216d5380} fill="var(--fill-0, white)" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p722c380} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_4" />
          <path d={svgPaths.p38c2a200} fill="var(--fill-0, white)" id="Vector_5" />
          <path clipRule="evenodd" d={svgPaths.p4a8c180} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_6" />
          <path d={svgPaths.p30b45500} fill="var(--fill-0, white)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] pb-[24px] top-[24px]" data-name="Link:margin">
      <LinkSvg />
    </div>
  );
}

function HemiSvg() {
  return (
    <div className="relative shrink-0 size-[19.99px]" data-name="hemi.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.99 19.99">
        <g clipPath="url(#clip0_19_286)" id="hemi.svg">
          <path d={svgPaths.p91f8780} fill="var(--fill-0, #FF6C15)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_19_286">
            <rect fill="white" height="19.99" width="19.99" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function HemiSvgFill() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[19.99px]" data-name="hemi.svg fill">
      <HemiSvg />
    </div>
  );
}

function Hemi() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[35.9900016784668px] mr-[-4px] overflow-clip relative rounded-[9999px] self-stretch shrink-0 w-[19.99px]" data-name="Hemi">
      <HemiSvgFill />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute left-0 size-[99.99px] top-0" data-name="SVG">
      <div className="absolute inset-[-20.71%_0_0_-5.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 105.185 120.701">
          <g id="SVG">
            <path d={svgPaths.pfd6fe00} fill="var(--fill-0, #FAA700)" id="Vector" />
            <path d={svgPaths.pcba8600} fill="var(--fill-0, #F5F500)" id="Vector_2" />
            <path d={svgPaths.p1d14a100} fill="var(--fill-0, #186FF2)" id="Vector_3" />
            <path d={svgPaths.p18d92980} fill="var(--fill-0, #FAA700)" id="Vector_4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="overflow-clip relative rounded-[50px] shrink-0 size-[19.99px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[19.99px] items-start relative shrink-0" data-name="Container">
      <Container2 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center mr-[-4px] relative self-stretch shrink-0" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-start pr-[4px] relative shrink-0" data-name="Container">
      <Hemi />
      <Margin />
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[12px]" data-name="Frame">
      <div className="absolute inset-[11%_5.86%_10.86%_6.29%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5427 6.2436">
          <path d={svgPaths.p332a6380} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="content-stretch flex flex-col h-[7.99px] items-end justify-center overflow-clip relative shrink-0 w-[12px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="flex-[1_0_0] h-[7.99px] min-h-px min-w-[12px] relative" data-name="SVG:margin">
      <div className="flex flex-col items-end min-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-end min-w-[inherit] pl-[10.347px] relative size-full">
          <Svg1 />
        </div>
      </div>
    </div>
  );
}

function ButtonMenu() {
  return (
    <div className="absolute bg-[#25272b] content-stretch flex gap-[8px] h-[39.99px] items-center left-[24px] px-[12px] py-[6px] right-[28.94px] rounded-[6px] top-[71.99px]" data-name="Button menu">
      <Container />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">0x743D...2A73</p>
      </div>
      <SvgMargin />
    </div>
  );
}

function Margin2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[16px] top-[40.98px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="leading-[16px]">Products</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p2a441f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Fixed Rates (PT)</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[88.98px]" data-name="Link">
      <Svg2 />
      <Container4 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p369c91a0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Yield Leverage (YT)</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[129.97px]" data-name="Link">
      <Svg3 />
      <Container5 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[16px] top-[170.95px]" data-name="Margin">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] whitespace-nowrap">
        <p className="leading-[16px]">Earn on Liquidity</p>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.pb742480} id="Vector" stroke="var(--stroke-0, #00F99B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[218.95px]" data-name="Link">
      <Svg4 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#00f99b] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Pools (LP)</p>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p1b2cbc60} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-[rgba(255,255,255,0.3)] text-center whitespace-nowrap">
        <p className="leading-[20px] text-[14px]">MetaVaults</p>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[14.99px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.99 14.99">
        <g id="SVG">
          <path d={svgPaths.p16c8aa80} fill="var(--fill-0, white)" fillOpacity="0.3" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#00f99b] content-stretch flex flex-col items-center px-[8px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-black text-center whitespace-nowrap">
        <p className="leading-[16px] text-[12px]">Soon</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[6.5px] items-center relative shrink-0" data-name="Container">
      <Container8 />
      <Svg6 />
      <Background />
    </div>
  );
}

function ButtonLink() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Button → Link">
      <Svg5 />
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pb-[6.72px] top-[259.94px]" data-name="Container">
      <ButtonLink />
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2b4b9b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p171dd400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Link">
      <Svg7 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Settings</p>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p22627b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Link">
      <Svg8 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Support</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Terms of Service</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[3.875px] items-start relative shrink-0 w-full" data-name="Container">
      <Link5 />
      <Link6 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bottom-[0.1px] content-stretch flex flex-col gap-[16px] items-start left-0" data-name="Container">
      <Link3 />
      <Link4 />
      <Container10 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p15be79c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Link">
      <Svg9 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Portfolio</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 size-[7.99px]" data-name="Container">
      <div className="absolute bg-[#fde047] left-0 rounded-[9999px] size-[7.99px] top-0" data-name="Background" />
      <div className="absolute bg-[#fde047] left-0 rounded-[9999px] size-[7.99px] top-0" data-name="Background" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-0" data-name="Container">
      <Link7 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Governance</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[16px] right-0 top-0" data-name="Margin">
      <Container14 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p3b5b2800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link8() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[48px]" data-name="Link">
      <Svg10 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Gauges</p>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p3a425800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link9() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[88.98px]" data-name="Link">
      <Svg11 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Incentivize</p>
      </div>
    </div>
  );
}

function Svg12() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p12b60e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link10() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[129.97px]" data-name="Link">
      <Svg12 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">veSPECTRA</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.5)] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Tools</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[16px] right-0 top-[170.95px]" data-name="Margin">
      <Container15 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2ea9ca00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Link11() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[218.95px]" data-name="Link">
      <Svg13 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Bridge</p>
      </div>
    </div>
  );
}

function Svg14() {
  return (
    <div className="h-[24.996px] relative shrink-0 w-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24.9955">
        <g id="SVG">
          <path d={svgPaths.p1be2c500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Link12() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[258.95px]" data-name="Link">
      <Svg14 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Wrapper</p>
      </div>
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p171812c} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.596" />
        </g>
      </svg>
    </div>
  );
}

function Link13() {
  return (
    <div className="absolute content-stretch flex gap-[7.99px] items-center left-0 top-[339.93px]" data-name="Link">
      <Svg15 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Migrate Position</p>
      </div>
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p10fc500} id="Vector" stroke="var(--stroke-0, white)" />
          <path d={svgPaths.p2cc89580} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p2ce3f1b0} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.peefe800} fill="var(--fill-0, white)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Link">
      <Svg16 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
        <p className="leading-[20px]">Migrate APW</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex items-center left-0 right-0 top-[299.93px]" data-name="Container">
      <Link14 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[363.92px] left-0 top-[306.65px] w-[138.94px]" data-name="Container">
      <Margin4 />
      <Link8 />
      <Link9 />
      <Link10 />
      <Margin5 />
      <Link11 />
      <Link12 />
      <Link13 />
      <Container16 />
    </div>
  );
}

function Tablist() {
  return (
    <div className="h-[810.55px] relative rounded-[6px] shrink-0 w-full" data-name="Tablist">
      <Margin2 />
      <Link />
      <Link1 />
      <Margin3 />
      <Link2 />
      <Container6 />
      <Container9 />
      <Container11 />
      <Container13 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[111.98px_28.94px_-35.52px_24px] items-start justify-center pt-[32px]" data-name="Margin">
      <Tablist />
    </div>
  );
}

export default function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#1c1c1e] border-[#25272b] border-r-[1.975px] border-solid relative size-full" data-name="Background+VerticalBorder">
      <LinkMargin />
      <ButtonMenu />
      <Margin1 />
    </div>
  );
}