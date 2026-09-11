import svgPaths from "./svg-sw98eaprsd";
type LabelledModuleProps = {
  className?: string;
  label?: string;
};

function LabelledModule({ className, label = "Dataplane Gateway" }: LabelledModuleProps) {
  return (
    <div className={className || "relative"} data-name="Labelled Module">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center relative size-full">
          <div className="relative rounded-[6px] shrink-0 size-[48px]" data-name="IconTile">
            <div className="absolute bg-[#f1f2f3] inset-0 rounded-[6px]" data-name="Tile" />
            <div className="absolute inset-[12px]" data-name="icon">
              <div className="absolute inset-[4.17%_8.33%_4.17%_4.17%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="22" preserveAspectRatio="none" viewBox="0 0 21 22" width="21">
                  <g id="Path">
                    <path d={svgPaths.p1ec15900} fill="#656A76" />
                    <path d={svgPaths.p1e63a100} fill="#656A76" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[95%] max-w-[76px] relative shrink-0 text-[#9a6f00] text-[12px] text-center tracking-[0.24px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function ModuleGroupSolid({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[144px]"} data-name="Module Group / _ Solid">
      <svg className="absolute block inset-0 size-full" fill="none" height="144" preserveAspectRatio="none" viewBox="0 0 144 144" width="144">
        <path d={svgPaths.p2edc7380} id="Module Group / _ Blank Group" stroke="#D2D4DB" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
type VaultColorProps = {
  className?: string;
  size?: "24";
};

function VaultColor({ className, size = "24" }: VaultColorProps) {
  return (
    <div className={className || "relative size-[24px]"}>
      <div className="absolute inset-[4.17%_4.17%_6.94%_4.17%]" data-name="Path">
        <svg className="absolute block inset-0 size-full" fill="none" height="21.334" preserveAspectRatio="none" viewBox="0 0 22 21.334" width="22">
          <g id="Path">
            <path d={svgPaths.p31a49c00} fill="#FFCF25" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function GatewayDiagram({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white relative"} data-name="Gateway diagram">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[39px] items-center relative size-full">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
              <ModuleGroupSolid className="col-1 h-[280px] ml-0 mt-0 relative row-1 w-[347px]" />
              <div className="col-1 h-[16px] ml-[12px] mt-[272px] relative row-1 w-[192px]" data-name="Group Label / With Icon">
                <div className="absolute bg-white inset-0" />
                <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[0_4px_0_25px] leading-[91%] text-[#9194a0] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                  VAULT DATAPLANE NETWORK
                </p>
                <div className="absolute left-[7px] size-[12px] top-[2px]" data-name="layers">
                  <div className="absolute bottom-1/2 left-[8.33%] right-[8.33%] top-[8.33%]" data-name="Shape">
                    <div className="absolute inset-[-10%_-5%]">
                      <svg className="block size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 11 6" width="11">
                        <path d={svgPaths.p1d876780} id="Shape" stroke="#9194A0" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[70.83%_8.33%_8.33%_8.33%]" data-name="Shape">
                    <div className="absolute inset-[-20%_-5%]">
                      <svg className="block size-full" fill="none" height="3.50011" preserveAspectRatio="none" viewBox="0 0 11.0002 3.50011" width="11.0002">
                        <path d={svgPaths.p13d49d00} id="Shape" stroke="#9194A0" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-[29.17%] left-[8.33%] right-[8.33%] top-1/2" data-name="Shape">
                    <div className="absolute inset-[-20%_-5%]">
                      <svg className="block size-full" fill="none" height="3.50011" preserveAspectRatio="none" viewBox="0 0 11.0002 3.50011" width="11.0002">
                        <path d={svgPaths.p13d49d00} id="Shape" stroke="#9194A0" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[8px] mt-[32px] place-items-start relative row-1">
              <div className="col-1 flex h-[84px] items-center justify-center ml-[39px] mt-[24px] relative row-1 w-[70px]">
                <div className="-scale-y-100 flex-none rotate-180">
                  <div className="h-[84px] relative w-[70px]" data-name="Line / Style / Dotted - Zigzag">
                    <div className="absolute inset-[-6.87%_-1.43%_-1.19%_0]">
                      <svg className="block size-full" fill="none" height="90.7735" preserveAspectRatio="none" viewBox="0 0 71 90.7735" width="71">
                        <path d={svgPaths.p2ff2e100} fill="#FFCF25" id="Line / Style / Dotted - Zigzag" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 ml-0 mt-[115px] relative row-1" data-name="Labelled Module">
                <div className="flex flex-col items-center size-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-center relative size-full">
                    <div className="relative rounded-[6px] shrink-0 size-[48px]" data-name="IconTile">
                      <div className="absolute bg-white border border-[rgba(101,106,118,0.2)] border-solid inset-0 rounded-[6px]" data-name="Tile" />
                      <VaultColor className="absolute inset-[8px]" />
                    </div>
                    <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[95%] max-w-[76px] relative shrink-0 text-[#9a6f00] text-[12px] text-center tracking-[0.24px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      Vault node
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-1 ml-[104px] mt-0 relative row-1" data-name="Labelled Module">
                <div className="flex flex-col items-center size-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-center relative size-full">
                    <div className="relative rounded-[6px] shrink-0 size-[48px]" data-name="IconTile">
                      <div className="absolute bg-[#f1f2f3] inset-0 rounded-[6px]" data-name="Tile" />
                      <div className="absolute inset-[12px]" data-name="icon">
                        <div className="absolute inset-[7.29%_2.08%_9.38%_2.08%]" data-name="Path">
                          <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 23 20" width="23">
                            <path clipRule="evenodd" d={svgPaths.p3668700} fill="#656A76" fillRule="evenodd" id="Path" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[95%] max-w-[76px] relative shrink-0 text-[#9a6f00] text-[12px] text-center tracking-[0.24px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      VPC default gateways
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-1 ml-[248px] mt-0 relative row-1" data-name="Labelled Module">
                <div className="flex flex-col items-center size-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-center relative size-full">
                    <div className="relative rounded-[6px] shrink-0 size-[48px]" data-name="IconTile">
                      <div className="absolute bg-[#f1f2f3] inset-0 rounded-[6px]" data-name="Tile" />
                      <div className="absolute inset-[12px]" data-name="icon">
                        <div className="absolute inset-[20.83%_10.42%_22.92%_10.42%]" data-name="Path">
                          <svg className="absolute block inset-0 size-full" fill="none" height="13.5" preserveAspectRatio="none" viewBox="0 0 19 13.5" width="19">
                            <path clipRule="evenodd" d={svgPaths.p392d2a80} fill="#656A76" fillRule="evenodd" id="Path" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[95%] max-w-[76px] relative shrink-0 text-[#9a6f00] text-[12px] text-center tracking-[0.24px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      VPC Routing Table
                    </p>
                  </div>
                </div>
              </div>
              <LabelledModule className="col-1 ml-[180px] mt-[115px] relative row-1" />
              <div className="col-1 flex h-[79px] items-center justify-center ml-[176px] mt-[29px] relative row-1 w-[42px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                  <div className="h-[42px] relative w-[79px]" data-name="Line / Style / Dotted - Zigzag">
                    <div className="absolute inset-[-13.75%_-1.27%_-2.38%_0]">
                      <svg className="block size-full" fill="none" height="48.7735" preserveAspectRatio="none" viewBox="0 0 80 48.7735" width="80">
                        <path d={svgPaths.p38383300} fill="#FFCF25" id="Line / Style / Dotted - Zigzag" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 flex h-0 items-center justify-center ml-[176px] mt-[20px] relative row-1 w-[81px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                  <div className="h-[81px] relative w-0" data-name="Line / Style / Dotted - Zigzag">
                    <div className="absolute inset-[0_-5.77px_-1.23%_-5.77px]">
                      <svg className="block size-full" fill="none" height="82" preserveAspectRatio="none" viewBox="0 0 11.547 82" width="11.547">
                        <path d={svgPaths.p1e6f1100} fill="#FFCF25" id="Line / Style / Dotted - Zigzag" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
              <ModuleGroupSolid className="col-1 h-[280px] ml-0 mt-0 relative row-1 w-[243px]" />
              <div className="col-1 h-[16px] ml-[9px] mt-[272px] relative row-1 w-[143px]" data-name="Group Label / With Icon">
                <div className="absolute bg-white inset-0" />
                <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[0_4px_0_25px] leading-[91%] text-[#9194a0] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                  YOUR NETWORK site
                </p>
                <div className="absolute left-[7px] size-[12px] top-[2px]" data-name="layers">
                  <div className="absolute bottom-1/2 left-[8.33%] right-[8.33%] top-[8.33%]" data-name="Shape">
                    <div className="absolute inset-[-10%_-5%]">
                      <svg className="block size-full" fill="none" height="6" preserveAspectRatio="none" viewBox="0 0 11 6" width="11">
                        <path d={svgPaths.p1d876780} id="Shape" stroke="#9194A0" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[70.83%_8.33%_8.33%_8.33%]" data-name="Shape">
                    <div className="absolute inset-[-20%_-5%]">
                      <svg className="block size-full" fill="none" height="3.50011" preserveAspectRatio="none" viewBox="0 0 11.0002 3.50011" width="11.0002">
                        <path d={svgPaths.p13d49d00} id="Shape" stroke="#9194A0" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-[29.17%] left-[8.33%] right-[8.33%] top-1/2" data-name="Shape">
                    <div className="absolute inset-[-20%_-5%]">
                      <svg className="block size-full" fill="none" height="3.50011" preserveAspectRatio="none" viewBox="0 0 11.0002 3.50011" width="11.0002">
                        <path d={svgPaths.p13d49d00} id="Shape" stroke="#9194A0" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[18px] mt-[147px] place-items-start relative row-1">
              <LabelledModule className="col-1 ml-0 mt-0 relative row-1" label="Site Gateway" />
              <div className="col-1 ml-[138px] mt-0 relative row-1" data-name="Labelled Module">
                <div className="flex flex-col items-center size-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-center relative size-full">
                    <div className="relative rounded-[6px] shrink-0 size-[48px]" data-name="IconTile">
                      <div className="absolute bg-[#f1f2f3] inset-0 rounded-[6px]" data-name="Tile" />
                      <div className="absolute inset-[12px]" data-name="icon">
                        <div className="absolute inset-[8.33%]" data-name="Path">
                          <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
                            <path clipRule="evenodd" d={svgPaths.p34cfda80} fill="#656A76" fillRule="evenodd" id="Path" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[95%] max-w-[76px] relative shrink-0 text-[#9a6f00] text-[12px] text-center tracking-[0.24px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      Database
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-1 flex h-0 items-center justify-center ml-[76px] mt-[24px] relative row-1 w-[58px]">
                <div className="flex-none rotate-90">
                  <div className="h-[58px] relative w-0" data-name="Line / Style / Dotted - Zigzag">
                    <div className="absolute inset-[0_-5.77px_-1.72%_-5.77px]">
                      <svg className="block size-full" fill="none" height="59" preserveAspectRatio="none" viewBox="0 0 11.547 59" width="11.547">
                        <path d={svgPaths.p8ec3980} fill="#FFCF25" id="Line / Style / Dotted - Zigzag" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute contents left-[256px] top-[156px]">
            <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[95%] left-[335px] text-[#9a6f00] text-[10px] text-center top-[184px] tracking-[0.2px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Wireguard tunnel
            </p>
            <div className="absolute bg-white h-[12px] left-[256px] top-[164px] w-[156px]" data-name="Line / Straight">
              <div className="-translate-y-1/2 absolute flex h-[2px] items-center justify-center left-0 right-0 top-1/2" style={{ containerType: "size" }}>
                <div className="-rotate-180 -scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="relative size-full" data-name="Line / Parts / Straight / Solid">
                    <div className="-translate-y-1/2 absolute flex h-0 items-center justify-center left-0 right-0 top-[calc(50%-1px)]" style={{ containerType: "size" }}>
                      <div className="-rotate-180 -scale-x-100 flex-none h-[0px] w-[100cqw]">
                        <div className="relative size-full" data-name="Line 3.1">
                          <div className="absolute inset-[-2px_0_0_0]">
                            <svg className="block size-full" fill="none" height="2" preserveAspectRatio="none" viewBox="0 0 156 2" width="156">
                              <line id="Line 3.1" stroke="#9A6F00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="1" x2="155" y1="1" y2="1" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-translate-y-1/2 absolute left-0 size-[12px] top-1/2" data-name="Line / Parts / Endpoint / Dot - Outlined">
                <div className="absolute inset-[8.33%_16.67%_8.33%_0]" data-name="Ellipse 4.2">
                  <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 10 10" width="10">
                    <circle cx="5" cy="5" fill="white" id="Ellipse 4.2" r="4" stroke="#9A6F00" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="-translate-y-1/2 absolute flex items-center justify-center right-0 size-[12px] top-1/2">
                <div className="-scale-y-100 flex-none rotate-180">
                  <div className="relative size-[12px]" data-name="Line / Parts / Endpoint / Dot - Outlined">
                    <div className="absolute inset-[8.33%_16.67%_8.33%_0]" data-name="Ellipse 4.2">
                      <svg className="absolute block inset-0 size-full" fill="none" height="10" preserveAspectRatio="none" viewBox="0 0 10 10" width="10">
                        <circle cx="5" cy="5" fill="white" id="Ellipse 4.2" r="4" stroke="#9A6F00" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white left-[calc(50%+20.05px)] size-[28px] top-[calc(50%+26px)]" data-name="Connection Label / _ Lock">
              <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 28 28" width="28">
                <circle cx="14" cy="14" fill="#9A6F00" id="Ellipse 4" r="13.25" stroke="white" strokeWidth="1.5" />
              </svg>
              <div className="absolute inset-[22.77%_28.57%_29.91%_29.36%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" height="13.2505" preserveAspectRatio="none" viewBox="0 0 11.7782 13.2505" width="11.7782">
                  <path d={svgPaths.p1f3caf00} fill="white" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GatewayDiagram1() {
  return <GatewayDiagram className="bg-white relative size-full" />;
}