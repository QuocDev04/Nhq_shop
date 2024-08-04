const DetailRefer = () => {
    return (
        <div>
            <div className="show_refer hidden">
                <div className="rounded-2xl lg:px-6 lg:pt-7 lg:pb-4 mb:p-5 border flex flex-col gap-y-5 mt-5 mb-[23px]">
                    <section className="border-b pb-6">
                        <strong className="lg:text-xl mb:text-lg font-medium text-[#060709]">
                            Referral Program
                        </strong>
                        <p className="text-[#717378] lg:text-base mb:text-sm mt-4">
                            Absolutely love TopShelfBC; affordable on any budget
                            and such fast delivery, straight to my door! I
                            recommend them to all my friends and family for
                            their 420 needs.
                        </p>
                    </section>
                    <section className="*:p-4 mt-1 *:bg-[#F3FBF4] flex flex-col gap-y-6 *:rounded-xl border-b pb-6">
                        <div className="flex item-center justify-between gap-x-3">
                            {/* col line */}
                            <div className="w-0.5 bg-[#EB2606]" />
                            {/* text */}
                            <span className="flex flex-col gap-y-2 text-sm font-light">
                                Your Referral URL
                                <strong className="text-base font-medium">
                                    Referral code is available only to users
                                    with at least one order.
                                </strong>
                            </span>
                            {/* coppy */}
                            <div className="w-10 h-10 rounded-[50%] bg-white grid place-items-center">
                                <img
                                    width={18}
                                    height={18}
                                    src="../Images/copy.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        {/* *** */}
                        <div className="flex item-center justify-between gap-x-3">
                            {/* col line */}
                            <div className="w-0.5 bg-[#EB2606]" />
                            {/* text */}
                            <span className="flex flex-col gap-y-2 text-sm font-light">
                                Your Coupon Code to share
                                <strong className="text-base font-medium">
                                    Referral code is available only to users
                                    with at least one order.
                                </strong>
                            </span>
                            {/* coppy */}
                            <div className="w-10 h-10 rounded-[50%] bg-white grid place-items-center">
                                <img
                                    width={18}
                                    height={18}
                                    src="../Images/copy.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </section>
                    {/* social */}
                    <nav className="flex lg:flex-row mb:flex-col mt-1 *:lg:px-5 *:lg:py-4 *:gap-y-4 *:border *:rounded-[14px] justify-between lg:gap-x-6 *:grid *:place-items-center">
                        {/* fb */}
                        <div>
                            <button className="w-12 h-12 grid place-items-center bg-[#EDF4FF] rounded-[50%]">
                                <img src="../Images/fb_icon.png" alt="" />
                            </button>
                            <span className="text-[#46494F] text-sm">
                                Share Via Facebook
                            </span>
                        </div>
                        {/* twitter */}
                        <div>
                            <button className="w-12 h-12 grid place-items-center bg-[#EDF4FF] rounded-[50%]">
                                <img src="../Images/twitter_icon.png" alt="" />
                            </button>
                            <span className="text-[#46494F] text-sm">
                                Share Via Twitter
                            </span>
                        </div>
                        {/* hotline */}
                        <div>
                            <button className="w-12 h-12 grid place-items-center bg-[#EDF4FF] rounded-[50%]">
                                <img src="../Images/hotline_icon.png" alt="" />
                            </button>
                            <span className="text-[#46494F] text-sm">
                                Share Via Whatsapp
                            </span>
                        </div>
                    </nav>
                    <span className="text-[#C8C9CB] text-center mt-1">
                        Or share via email
                    </span>
                    {/* contact to email */}
                    <form>
                        <div className="grid mt-1 lg:grid-cols-[42%_42%_auto] items-end justify-between gap-y-4">
                            <div className="flex flex-col items-start gap-y-2">
                                <span className="text-sm">Email</span>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="border rounded-xl w-full p-3 outline-none placeholder:text-[#C8C9CB] text-[#C8C9CB] font-normal"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-y-2">
                                <span className="text-sm">Name</span>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="border rounded-xl p-3 w-full outline-none placeholder:text-[#C8C9CB] placeholder:font-normal text-[#C8C9CB] font-normal"
                                />
                            </div>
                            <button className="bg-[#F3FBF4] rounded-[50%] w-12 h-12 hover:scale-105 duration-300 cursor-pointer text-[#17AF26] text-3xl font-light grid place-items-center">
                                <img src="../Images/add.png" alt="" />
                            </button>
                            <div className="flex flex-col items-start gap-y-2">
                                <input
                                    type="text"
                                    placeholder="johndoe@example.com"
                                    className="border w-full placeholder:text-black rounded-xl p-3 outline-none text-black font-normal"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-y-2">
                                <input
                                    type="text"
                                    defaultValue="John Doe"
                                    className="border w-full rounded-xl p-3 outline-none text-black font-normal"
                                />
                            </div>
                        </div>
                        {/*btn show more */}
                        <div className="flex justify-start my-1.5">
                            <button className="px-[42px] py-4 bg-[#17AF26] rounded-[100px] text-base text-white mt-4">
                                Send Emails
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailRefer;
