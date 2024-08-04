import { IProduct } from "@/common/types/IProduct";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import ProductsItems from "../../_component/ProductsItem";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper/modules";
const Best_Dispensary = () => {
    const { data } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get(`/product`),
    });
    return (
        <div>
            <div className=" w-full text-center lg:py-[120px]">
                <div className="lg:w-[948px] mx-auto">
                    <strong className="lg:text-[64px] lg:leading-[70px] sm:text-2xl lg:tracking-[-4.8px] ">
                        BEST DISPENSARY TO BUY WEED ONLINE IN CANADA
                    </strong>
                </div>

                {/* <!-- menu service --> */}
                <div className="w-full flex justify-center lg:my-[62px] overflow-hidden">
                    <div className="lg:grid lg:grid-cols-[378.67px_378.67px_378.67px]">
                        <button className="border ml-5 rounded-3xl p-3">
                            Best Sellers
                        </button>
                        <button className="border mx-5 rounded-3xl p-3">
                            Bundles & Promotions
                        </button>
                        <button className="border mr-5 rounded-3xl p-3">
                            On Sale
                        </button>
                    </div>
                </div>

                {/* <!-- products best seler  --> */}
                <div className="w-full text-left">
                    <div className="w-full relative flex sm:flex-row justify-center lg:my-16 mb:my-8 mb:mx-10">
                        <div className=" flex justify-end *:lg:h-[470px] overflow-hidden">
                            <div className="grid sm:gap-x-[32px] sm:w-[95vw] sm:gap-y-0 sm:grid-cols-[379px_auto] overflow-hidden items-center lg:w-[1348px] lg:translate-x-[28px]">
                                {/* <!-- banner --> */}
                                <div className="lg:rounded-xl mb:rounded-2xl lg:h-full border bg-[#05422C] lg:block hidden ">
                                    <div className=" flex flex-col items-center justify-center gap-y-6 mt-10">
                                        <img
                                            src="../Images/img_product.png"
                                            className="lg:w-[160px] lg:h-[160px] "
                                            alt=""
                                        />
                                        <div className="h-[163px] flex flex-col justify-between">
                                            <strong className="text-white text-xl font-medium">
                                                Shop our Best Sellers
                                            </strong>
                                            <p className="w-[216px] text-[14px] leading-[21px] opacity-60 text-white font-light -translate-y-[5px]">
                                                Lorem ipsum dolor sit amet
                                                consectetur. Ullamcorper ipsum
                                                varius lorem blandit lectus
                                                magnis feugiat.{" "}
                                            </p>
                                            <a
                                                className="text-[#17AF26] text-sm underline"
                                                href=""
                                            >
                                                View All
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    {/* <!-- product desktop --> */}
                                    <div className="*:lg:w-[780px] sm:block hidden *:md:w-[700px]">
                                        {/* <!-- item 1 --> */}
                                        <Swiper
                                            slidesPerView={3}
                                            navigation={true}
                                            modules={[Navigation]}
                                            className="mySwiper"
                                        >
                                            {data &&
                                                data?.data.map(
                                                    (product: IProduct) =>
                                                        product.featured ? (
                                                            <SwiperSlide>
                                                                <ProductsItems
                                                                    product={
                                                                        product
                                                                    }
                                                                />
                                                            </SwiperSlide>
                                                        ) : (
                                                            ""
                                                        ),
                                                )}
                                        </Swiper>
                                    </div>
                                    {/* <!-- product mobile --> */}
                                    <div className="*:mb:w-[250px] mb:block sm:hidden md:hidden mb:mr-16">
                                        {/* <!-- item 1 --> */}
                                        <Swiper
                                            navigation={true}
                                            modules={[Navigation]}
                                            className="mySwiper"
                                        >
                                            {data &&
                                                data?.data.map(
                                                    (product: IProduct) =>
                                                        product.featured ? (
                                                            <SwiperSlide>
                                                                <ProductsItems
                                                                    product={
                                                                        product
                                                                    }
                                                                />
                                                            </SwiperSlide>
                                                        ) : (
                                                            ""
                                                        ),
                                                )}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- back, next --> */}
                        {/* <div className="lg:block hidden">
                        <div className="absolute lg:w-[52%]  lg:top-1/2  lg:left-1/2 lg:-translate-x-[24%] lg:-translate-y-[270%] flex justify-between *:shadow-2xl *:w-9 *:h-9 *:grid *:place-items-center *:rounded-[50%] *:bg-white">
                            <button className="hover:scale-105">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-chevron-left"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button className="hover:scale-105  ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-chevron-right"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Best_Dispensary;
