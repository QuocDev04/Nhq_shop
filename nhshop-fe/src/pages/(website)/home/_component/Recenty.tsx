import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import ProductList from "../../_component/ProductsList";
import { Empty } from "antd";

const Recenty = () => {
    const { data: product, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get("/product"),
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
            <div className="lg:w-[1100px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:py-24 mb:py-7">
                <strong className="lg:text-[64px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-4.5px] mb:tracking-[-1.8px]">
                    RECENTLY ADDED
                </strong>

                {/* <!-- menu --> */}
                <div>
                    <div className="sm:hidden mt-5">
                        <select
                            id="Tab"
                            className="w-full rounded-md border-gray-200"
                        >
                            <option>Filter by Interest</option>
                            <option>Flowers</option>
                            <option>Mushrooms</option>
                            <option>Concentrate</option>
                            <option>Edibles</option>
                            <option>Shop All Weed</option>
                        </select>
                    </div>
                    <div className="hidden sm:block mx-5">
                        <div className="flex mb:flex-col md:flex-row md:items-center mb:gap-y-8 md:gap-y-0 lg:gap-x-[40px] lg:mt-16 lg:mb-0.5 mb:my-6">
                            <span className="lg:text-2xl mb:text-base lg:tracking-[-0.5px] mr-2">
                                Filter by Interest
                            </span>
                            <ul className="*:md:h-[44px] lg:mt-0 mb:-mt-[7px]  *:border flex whitespace-nowrap *:grid *:place-items-center *:px-5 *:py-2 *:rounded-[100px] lg:gap-x-[24px] mb:gap-x-1 *:lg:text-base *:mb:text-sm *:cursor-pointer *:duration-200">
                                <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] bg-[#F2F6F4] text-[#05422C] hover:border-black border-black">
                                    Flowers
                                </li>
                                <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">
                                    Mushrooms
                                </li>
                                <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">
                                    Concentrate
                                </li>
                                <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">
                                    Edibles
                                </li>
                                <li className="hover:text-[#05422C] hover:bg-[#F2F6F4] hover:border-black">
                                    Shop All Weed
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid lg:py-16 lg:mt-[30px] lg:grid-cols-[250px_250px_250px_250px] md:grid-cols-3 sm:grid-cols-2  mb:grid-cols-1 border-t justify-between lg:gap-y-8 mb:gap-y-[29px] mb:pt-10">
                    {/* <!-- item 1 --> */}
                    <ProductList products={product?.data} />
                </div>
            </div>
        </div>
    );
};
export default Recenty;
