const Delivery = () => {
    return (
        <div>
            <div className="w-full flex flex-col gap-y-3.5 lg:mt-10 mb:mt-12 mb-48">
                <div className="flex justify-between lg:gap-x-6 *:w-full">
                    <span className="text-[#17AF26]">Delivery</span>
                    <span />
                    <span className="text-[#17AF26] hidden lg:block">
                        Free Returns
                    </span>
                </div>
                <section className="w-full flex lg:flex-row mb:flex-col lg:justify-between lg:items-start lg:gap-x-6 mb:gap-y-[22px] *:w-full lg:mt-0 mb:mt-0.5">
                    <div className="p-4 flex flex-col gap-y-3.5 border rounded-xl">
                        <img
                            className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]"
                            src="../Images/transaction-minus.png"
                            alt=""
                        />
                        <span className="lg:text-lg mb:text-base mt-0.5 text-[#1A1E26]">
                            Order by 10pm for free next day delivery on Orders
                            overs $100
                        </span>
                        <p className="text-[#717378] lg:text-base mb:text-sm">
                            We deliver Monday to Saturday - excluding Holidays
                        </p>
                    </div>
                    <div className="p-4 flex flex-col lg:gap-y-3.5 mb:gap-y-4 border rounded-xl">
                        <img
                            className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]"
                            src="../Images/box-time.png"
                            alt=""
                        />
                        <span className="lg:text-lg mb:text-base lg:mt-0.5 text-[#1A1E26] lg:tracking-[0] mb:tracking-[0.1px]">
                            Free next day delivery to stores.
                        </span>
                        <p className="text-[#717378] lg:text-base mb:text-sm">
                            Home delivery is $4.99 for orders under $100 and is
                            FREE for all orders over $100
                        </p>
                    </div>
                    <span className="text-[#17AF26] lg:hidden  -mb-2">
                        Free Returns
                    </span>
                    <div className="p-4 flex flex-col gap-y-3.5 border rounded-xl">
                        <img
                            className="w-12 h-12 p-3 rounded-[50%] bg-[#F2F6F4]"
                            src="../Images/truck-time.png"
                            alt=""
                        />
                        <p className="text-[#717378] lg:text-base mt-0.5 mb:text-sm leading-[29px]">
                            30 days to return it to us for a refund. We have
                            made returns SO EASY - you can now return your order
                            to a store or send it with FedEx FOR FREE
                        </p>
                    </div>
                </section>
            </div>
            
        </div>
    );
}
 
export default Delivery;