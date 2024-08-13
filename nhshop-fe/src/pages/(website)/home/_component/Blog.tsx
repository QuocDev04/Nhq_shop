import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import ProductList from "../../_component/ProductsList";
import { Empty } from "antd";

const Blog = () => {
    const { data: products, isLoading } = useQuery({
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
        <div className="lg:w-[1100px] mx-auto sm:w-[95vw] mb:w-[342px] flex flex-col lg:py-24 mb:py-7">
            <strong className="lg:text-[64px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-4.5px] mb:tracking-[-1.7px]">
                CHOOSE YOUR WEED
            </strong>

            {/* <!-- menu --> */}
            <div>
                <div className="sm:hidden">
                    <label htmlFor="Tab" className="sr-only">
                        Tab
                    </label>

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
                <div className="hidden sm:block">
                    <div className="flex mb:flex-col md:flex-row md:items-center mb:gap-y-8 md:gap-y-0 lg:gap-x-[40px] lg:mt-16 lg:mb-0.5 mb:my-6">
                        <span className="lg:text-2xl mb:text-base lg:tracking-[-0.5px]">
                            Filter by Interest
                        </span>
                        <ul className="*:md:h-[48px] lg:mt-0 mb:-mt-[7px]  *:border flex whitespace-nowrap *:grid *:place-items-center *:px-5 *:py-2 *:rounded-[100px] lg:gap-x-[24px] mb:gap-x-4 *:lg:text-base *:mb:text-sm *:cursor-pointer *:duration-200">
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
                <ProductList products={products?.data} />
            </div>
        </div>
    );
};

export default Blog;

// import instance from "@/configs/axios";
// import { useQuery } from "@tanstack/react-query";
// import { Tabs } from "antd";
// import React from "react";
// import ProductList from "../../_component/ProductsList";

// const Blog = () => {
//     const { data, isLoading } = useQuery({
//         queryKey: ["product"],
//         queryFn: () => instance.get("/product"),
//     });
//     const TabContent1 = () => (
//         <div>
//             <div className="flex">
//                 {/* <!-- item 1 --> */}
//                 <ProductList products={data?.data} />
//             </div>
//         </div>
//     );

//     const TabContent2 = () => <div>Nội dung của Tab 2</div>;

//     const TabContent3 = () => <div>Nội dung của Tab 3</div>;
//     if (isLoading) return <div>kahbckhdc</div>;
//     console.log(data?.data);

//     return (
//         <div className="lg:w-[1200px] mx-5 sm:w-[95vw] mb:w-[342px] flex flex-col lg:py-24 mb:py-7">
//             <strong className="lg:text-[64px] mb:text-[32px] lg:leading-[70px] mb:leading-[40px] lg:tracking-[-4.5px] mb:tracking-[-1.7px]">
//                 CHOOSE YOUR WEED
//             </strong>

//             {/* <!-- menu --> */}

//             <div>
//                 <div>
//                     <div className="flex mb:flex-col md:flex-row md:items-center mb:gap-y-8 md:gap-y-0  lg:mt-16 lg:mb-0.5 mb:my-6">
//                         <Tabs
//                             type="card"
//                             defaultActiveKey="1"
//                             items={[
//                                 {
//                                     label: "Tất cả sản phẩm",
//                                     key: "1",
//                                     children: <TabContent1 />,
//                                 },
//                                 {
//                                     label: "Tab 2",
//                                     key: "2",
//                                     children: <TabContent2 />,
//                                 },
//                                 {
//                                     label: "Tab 3",
//                                     key: "3",
//                                     children: <TabContent3 />,
//                                 },
//                             ]}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Blog;
