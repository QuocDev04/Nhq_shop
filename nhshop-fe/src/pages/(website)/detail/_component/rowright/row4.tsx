const Row4 = () => {
    return (
        <div>
            <div className="flex flex-col lg:gap-y-[22px] border-t lg:mt-[5px] lg:py-5 mb:py-6">
                <div className="grid lg:grid-cols-[48.5%_48.5%] justify-between items-start">
                    <div className="*:text-xs flex flex-col gap-y-3 lg:mt-0 mb:-mt-1">
                        <span className="text-[#717378] lg:translate-y-0 mb:translate-y-1 tracking-[1px] uppercase">
                            WEIGHT
                        </span>
                        <section className="*:lg:px-[13.5px] *:lg:py-2.5 *:mb:px-3.5 *:mb:py-2 *:rounded flex gap-x-4 *:duration-200">
                            <button className="hover:border border border-[#17AF26]">
                                28g
                            </button>
                            <button className="hover:border-[#17AF26] border bg-[#F4F4F4] hover:bg-[#F3FBF4] border-[#F3FBF4]">
                                1/2lb
                            </button>
                            <button className="hover:border-[#17AF26] border bg-[#F4F4F4] hover:bg-[#F3FBF4] border-[#F3FBF4]">
                                1/4lb
                            </button>
                        </section>
                    </div>
                    {/* ***** */}
                    <div className="flex flex-col lg:gap-y-4 gap-y-3 lg:mt-0 mb:mt-7">
                        <span className="text-[#717378] text-xs lg:tracking-[1px] tracking-[0.8px] uppercase">
                            Add Integra Pack
                        </span>
                        <section className="*:text-sm *:py-1 flex lg:gap-x-12 gap-x-14 *:duration-200">
                            <div className="flex items-center *:lg:px-3.5 *:mb:px-2.5">
                                <input
                                    className="rounded-xl w-[22px] h-[22px]"
                                    type="checkbox"
                                />
                                <span>4g (+$2.00)</span>
                            </div>
                            <span>8g (+$3.00)</span>
                        </section>
                    </div>
                </div>
                <section className="bg-[#FEF8E8] lg:tracking-0 tracking-[0.0002px] px-3.5 py-2 rounded-[100px] lg:w-[342px] lg:mt-0 mb:mt-[18px] mb:w-full text-sm">
                    Purchase this product now and earn{" "}
                    <span className="text-[#EB2606]">80</span> Points!
                </section>
            </div>
        </div>
    );
};

export default Row4;
