const Row2 = () => {
    return (
        <div>
            <div className="lg:h-[251px] lg:w-[970px] border rounded-xl lg:px-6 lg:py-5 mb:px-5 mb:py-[20px] lg:my-0 mb:my-[18px]">
                <div className="w-full h-full flex flex-col gap-y-5">
                    {/* item 1 */}
                    <section className="flex gap-x-4">
                        <img
                            className="w-8 h-8"
                            src="../Images/colorfilter.png"
                            alt=""
                        />
                        <section className="flex flex-col lg:gap-y-[11px] lg:mt-0.5 mt-[2.5px] mb:gap-y-2.5 h-full">
                            <span className="text-[#717378] text-xs tracking-[1px]">
                                EFFECTS
                            </span>
                            <span className="text-[#060709] text-sm">
                                Calming, Creative, Happy, Relaxing, Sleepy,
                                Uplifting
                            </span>
                        </section>
                    </section>
                    {/* item 1 */}
                    <section className="flex gap-x-4">
                        <img
                            className="w-8 h-8"
                            src="../Images/relieve.png"
                            alt=""
                        />
                        <section className="flex flex-col lg:gap-y-[9px] lg:mt-0.5 mt-[3px] mb:gap-y-2 h-full justify-between">
                            <span className="text-[#717378] text-xs tracking-[1px]">
                                MAY RELIEVE
                            </span>
                            <span className="text-[#060709] text-[14px] lg:ml-0.5 tracking-[0.1px]">
                                Anxiety, Arthritis, Chronic Pain, Depression,
                                Fatigue, Inflammation, Insomnia, Irregular Bowel
                                Movements, Migraines, Mood Swings
                            </span>
                        </section>
                    </section>
                    {/* item 1 */}
                    <section className="flex gap-x-4 lg:translate-y-1">
                        <img
                            className="w-8 h-8"
                            src="../Images/asromas.png"
                            alt=""
                        />
                        <section className="flex flex-col lg:gap-y-[11px] lg:translate-y-[1px] lg:mt-0 mt-1 mb:gap-y-2.5 h-full justify-between">
                            <span className="text-[#717378] text-xs tracking-[0.5px]">
                                AROMAS
                            </span>
                            <span className="text-[#060709] text-sm">
                                Chemical, Citrus, Earthy, Pungent, Sour
                            </span>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Row2;
