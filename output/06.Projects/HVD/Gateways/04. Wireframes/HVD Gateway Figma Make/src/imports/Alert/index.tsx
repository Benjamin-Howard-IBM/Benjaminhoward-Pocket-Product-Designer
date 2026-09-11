import svgPaths from "./svg-e7cha4spms";
type DismissButtonProps = {
  className?: string;
  state?: "default";
};

function DismissButton({ className, state = "default" }: DismissButtonProps) {
  return (
    <div className={className || "relative rounded-[5px] size-[20px]"}>
      <div className="absolute left-[2px] size-[16px] top-[2px]" data-name="x">
        <div className="absolute inset-[18.75%_18.76%_18.76%_18.75%]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" height="9.99855" preserveAspectRatio="none" viewBox="0 0 9.99855 9.99855" width="9.99855">
            <path d={svgPaths.p21c83c0} fill="#656A76" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#3b3d45] text-[14px] w-full" data-name="Text">
      <p className="font-['SF_UI_Text:600',sans-serif] relative shrink-0 w-full">Alert title</p>
      <p className="font-['SF_UI_Text:400',sans-serif] relative shrink-0 w-full">{`Lorem ipsum dolor amet consectetur adipiscing elit nulla dignissim felis a lectus tempor. `}</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px relative" data-name="Content">
      <Text />
    </div>
  );
}

export default function Alert() {
  return (
    <div className="bg-[#fafafa] relative size-full" data-name="Alert">
      <div aria-hidden className="absolute border-[rgba(59,61,69,0.4)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[48px] items-start pl-[48px] pr-[16px] py-[16px] relative size-full">
        <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="🔷 Content">
          <div className="content-stretch flex gap-[12px] items-start relative size-full">
            <div className="relative shrink-0 size-[20px]" data-name="Icon">
              <div className="absolute inset-[4.17%]" data-name="Path">
                <svg className="absolute block inset-0 size-full" fill="none" height="18.333" preserveAspectRatio="none" viewBox="0 0 18.333 18.333" width="18.333">
                  <path d={svgPaths.p37c42c80} fill="#656A76" id="Path" />
                </svg>
              </div>
            </div>
            <Content />
          </div>
        </div>
        <DismissButton className="relative rounded-[5px] shrink-0 size-[20px]" />
      </div>
    </div>
  );
}