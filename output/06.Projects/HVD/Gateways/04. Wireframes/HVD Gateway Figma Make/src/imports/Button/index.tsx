function Contents() {
  return (
    <div className="bg-[#fff5f5] content-stretch drop-shadow-[0px_1px_0.5px_rgba(101,106,118,0.05),0px_2px_1px_rgba(101,106,118,0.05)] flex items-center justify-center px-[16px] py-[10px] relative rounded-[5px] shrink-0" data-name="Contents">
      <div aria-hidden className="absolute border border-[#c00005] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="[word-break:break-word] font-['SF_UI_Text:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#c00005] text-[14px] text-center whitespace-nowrap">Button</p>
    </div>
  );
}

export default function Button() {
  return (
    <div className="relative rounded-[5px] size-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">
          <Contents />
        </div>
      </div>
    </div>
  );
}