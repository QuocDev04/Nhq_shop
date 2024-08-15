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
import { Empty } from "antd";

const Selling = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get(`/product`),
    });
    if (isLoading) return (
        <div>
            {" "}
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
        </div>
    );
    return (
        <div>
            <div className="bg-[#F2F6F4] w-full lg:rounded-2xl lg:pt[25px] lg:pb-6 lg:px-8 pt-[22px] pb-4">
                <strong className="lg:text-2xl mb:text-lg lg:tracking-[-0.5px] mb:mx-12 lg:mx-0 font-medium">
                    Top Selling
                </strong>
                <div className=" mx-auto  duration-300 scroll-smooth grid grid-flow-col *:lg:w-[850px] *:mb:w-[240px] lg:pt-[27px] mb:pt-6  lg:gap-x-[32px] gap-x-6">
                    <Swiper
                        slidesPerView={3}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {data &&
                            data?.data.map((product: IProduct) => (
                                <SwiperSlide className="mx-4">
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
