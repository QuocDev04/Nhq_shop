

import Contentratest from "./_component/Contentratest";
// import Order from "./_component/Order";
import Price from "./_component/Price";
import ListPro from "./_component/Products";
// import ListPro from "./_component/Products";
import RenderProducts from "./_component/RenderProducts";
// import Review from "./_component/Review";
import Selling from "./_component/Selling";

// import Text from "./_component/Text";


const Product = ()=>{

    return (
        <div>
            {/* service */}
            <div className="w-full bg-[#F2F6F4]">
                <div className="container mx-auto lg:w-[1313px] mb:w-[542px] lg:py-6 mb:py-4 flex *:lg:w-[394.67px] *:mb:w-[250px] *:lg:h-[48px] items-center justify-between *:relative">
                    {/* item */}
                    <div className="flex lg:flex-row mb:flex-col mb:items-center sm:items-center md:items-center lg:items-center lg:gap-x-4 lg:gap-y-0 gap-y-[9.9px]">
                        <img
                            className="p-2 border lg:w-12 lg:h-12 w-8 h-8 rounded-[50%] bg-white"
                            src="../Images/truck-fast.png"
                            alt=""
                        />
                        <strong className="lg:text-xl tracking-[-0.3px]  mb:text-[13px]">
                            Reliable Shipping
                        </strong>
                    </div>

                    {/* item */}
                    <div className="flex lg:flex-row mb:flex-col mb:items-center sm:items-center md:items-center lg:items-center lg:gap-x-4 lg:gap-y-0 gap-y-[9.9px] ">
                        <img
                            className="p-2 border lg:w-12 lg:h-12 w-8 h-8 rounded-[50%] bg-white"
                            src="../Images/safe-home.png"
                            alt=""
                        />
                        <strong className="lg:text-xl tracking-[-0.3px] mb:text-[13px]">
                            You're Safe With Us
                        </strong>
                    </div>

                    {/* item */}
                    <div className="flex lg:flex-row mb:flex-col mb:items-center sm:items-center md:items-center lg:items-center lg:gap-x-4 lg:gap-y-0 gap-y-[9.9px]">
                        <img
                            className="p-2 border lg:w-12 lg:h-12 w-8 h-8 rounded-[50%] bg-white"
                            src="../Images/coin.png"
                            alt=""
                        />
                        <strong className="lg:text-xl tracking-[-0.3px] mb:text-[13px]">
                            Best Quality Pricing
                        </strong>
                    </div>
                </div>
            </div>
            <div className="w-full lg:py-10 py-4 border pb-[199px]">
                <div className="lg:container lg:mx-auto lg:w-[1315px] mb:w-full grid lg:grid-cols-[304px_978px] mb:grid-cols-[100%] *:w-full justify-between">
                    {/* filter */}
                    <div className="lg:block hidden py-3 mt-0.5">
                        <span className="lg:text-xl tracking-[-0.4px]">
                            Filters
                        </span>
                        {/* category */}
                        <section className="flex flex-col pt-[47px] pb-6">
                            <span className="text-[#717378] text-xs tracking-[1px]">
                                PRODUCT CATEGORY
                            </span>
                            <fieldset>
                                <legend className="sr-only">Checkboxes</legend>

                                <div className="divide-y divide-gray-200">
                                    <label className="flex  items-start gap-4 py-4">
                                        <div className="flex items-center">
                                            &#8203;
                                            <input
                                                type="checkbox"
                                                className="size-4 rounded border-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <strong className="font-medium text-gray-900">
                                                {" "}
                                                John Clapton{" "}
                                            </strong>
                                        </div>
                                    </label>
                                </div>
                            </fieldset>
                        </section>
                        {/* price */}
                        <Price />
                        {/* order */}
                        {/* <Order /> */}
                        {/* review */}
                        {/* <Review /> */}
                        {/* clear filters */}
                        <button className="bg-[#F3FBF4] rounded-[100px] text-[14px] leading-[21px] text-[#17AF26] mt-5 h-10 px-8">
                            Clear Filters
                        </button>
                    </div>
                    {/* product */}
                    <div className="w-full flex flex-col mb:items-center lg:items-start">
                        <div className="mb:w-[342px] lg:w-full flex justify-between items-center border-b lg:pb-6 mb:pb-4">
                            <strong className="lg:text-2xl mb:text-base font-normal">
                                Shop
                            </strong>
                            <div className="flex gap-x-[10px]">
                                <div className="relative lg:hidden group w-[145px] flex place-items-center gap-x-2 h-[34px] border rounded-[100px] px-3 cursor-pointer border-gray-300 text-gray-700 text-xs tracking-[-0.5px]">
                                    <select
                                        id="Tab"
                                        className="w-full rounded-md border-gray-200"
                                    >
                                        <option>Filter by product</option>
                                        <option>Flowers</option>
                                        <option>Mushrooms</option>
                                        <option>Concentrate</option>
                                        <option>Edibles</option>
                                        <option>Shop All Weed</option>
                                    </select>
                                </div>
                                <div className="relative group lg:hidden flex lg:gap-x-3 gap-x-1.5 place-items-center py-2 border rounded-[100px] px-[14px] cursor-pointer border-gray-300 text-gray-700 lg:text-sm text-xs">
                                    <select
                                        id="Tab"
                                        className="w-full rounded-md border-gray-200"
                                    >
                                        <option>Filter by price</option>
                                        <option>Flowers</option>
                                        <option>Mushrooms</option>
                                        <option>Concentrate</option>
                                        <option>Edibles</option>
                                        <option>Shop All Weed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* top best selling */}
                        <Selling />

                        {/* render products */}
                        <RenderProducts />

                        {/* contentratest */}
                        <Contentratest />

                        <ListPro/>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Product