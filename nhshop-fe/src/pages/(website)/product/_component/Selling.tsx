import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import ProductsItems from "../../_component/ProductsItem";
import { IProduct } from "@/common/types/IProduct";

const Selling = () => {
        const { data, isLoading } = useQuery({
            queryKey: ["product"],
            queryFn: () => instance.get(`/product`),
        });
        if(isLoading) return <div>shs</div>
    return (
        <div>
            <div className="bg-[#F2F6F4] w-full lg:rounded-2xl lg:pt-[25px] lg:pb-6 lg:px-8 pt-[22px] pb-4">
                <strong className="lg:text-2xl mb:text-lg lg:tracking-[-0.5px] mb:mx-11 lg:mx-0 font-medium">
                    Top Selling
                </strong>
                <div className="lg:w-[1224px] mb:w-[355px] sm:w-[640px] md:w-[768px] xl:w-[1000px] 2xl:w-[1000px]  mx-auto  snap-x  duration-300 scroll-smooth grid grid-flow-col *:lg:w-[850px] *:mb:w-[240px] lg:pt-[27px] mb:pt-6 lg:gap-x-[32px] gap-x-6">
                    <Swiper
                        slidesPerView={3}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {data &&
                            data?.data.map((product: IProduct) => (
                                <SwiperSlide>
                                    <ProductsItems product={product} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Selling;
