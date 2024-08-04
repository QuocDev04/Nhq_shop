const Row5 = () => {
    return (
        <div>
            <div className="lg:p-6 mb:py-5 mb:px-5 rounded-xl *:w-full border lg:-mt-5 -mt-1">
                {/* price */}
                <div className="flex flex-col gap-y-3.5 lg:pb-0 mb:pb-6 tracking-[-0.2px]">
                    <section className="flex justify-between *:font-medium *:text-sm">
                        <span className="flex gap-x-4 text-[#46494F]">
                            Khalifa Kush (AAAA){" "}
                            <p className="text-[#9D9EA2]">2x</p>
                        </span>
                        <strong>$120.00</strong>
                    </section>
                    <section className="flex justify-between *:font-medium *:text-sm">
                        <span className="text-[#46494F]">
                            Add Integra Pack - 4g
                        </span>
                        <strong>$2.00</strong>
                    </section>
                </div>
                {/* quantity */}
                <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] justify-between lg:items-center mb:items-start border-y lg:mt-[22px]">
                    {/* up , dow quantity */}
                    <div className="border lg:py-2.5 lg:pr-6 lg:pl-4 mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
                        <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={12}
                                    height={12}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-minus"
                                >
                                    <path d="M5 12h14" />
                                </svg>
                            </button>
                            <div className="bg-[#F4F4F4]">2</div>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={12}
                                    height={12}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-plus"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </button>
                        </div>
                        |
                        <span className="text-[#17AF26] lg:tracking-[0.5px]">
                            In Stock
                        </span>
                    </div>
                    {/* add cart */}
                    <button className="lg:text-base mb:text-sm font-medium flex place-items-center gap-x-4 text-white bg-[#17AF26] rounded-[100px] lg:px-[30px] mb:px-[22px] lg:h-14 mb:h-12">
                        <span>Add to Cart</span> | <span>$242.00</span>
                    </button>
                </div>
                {/* service , voucher */}
                <section className="flex lg:mt-0 mt-0.5 flex-col pt-[23px] gap-y-[13px] *:flex *:items-center *:gap-x-2 *:lg:text-sm *:mb:text-xs *:text-[#46494F]">
                    <span>
                        <img src="../Images/tick-circle.png" alt="" />
                        Free Xpress Shipping on orders over{" "}
                        <p className="text-[#F2BC1B]">$149</p>
                    </span>
                    <span>
                        <img src="../Images/tick-circle.png" alt="" />
                        Order before 12:00pm for same day dispatch
                    </span>
                    <span>
                        <img src="../Images/tick-circle.png" alt="" />
                        Support &amp; ordering open 7 day a week
                    </span>
                </section>
            </div>
        </div>
    );
};

export default Row5;
