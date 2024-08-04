import instance from "@/configs/axios";
import ProductList from "@/pages/(website)/_component/ProductsList";
import { useQuery } from "@tanstack/react-query";

const FeaturedProduct = () => {
    const {data:product, isLoading} = useQuery({
        queryKey:['product'],
        queryFn:()=>instance.get(`/product`)
    })
    if(isLoading) return <div>jhdsbak</div>
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mb-60">
                <header className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        Sản phẩm liên quan
                    </h2>
                </header>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 items-center lg:py-16 mb-40">
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <ProductList products={product?.data} />
                    </div>
                </div>
                {/* list page */}
                <div className="lg:w-full flex lg:flex-row mb:flex-col justify-between items-center lg:pt-6 pt-[18px] mb:gap-y-5 lg:gap-y-0">
                    {/* show page */}
                    <span className="lg:w-auto  mb:w-full text-[#717378] lg:text-sm mb:text-xs">
                        Showing 1-30 of 393 results
                    </span>
                    {/* list page */}
                    <div className="lg:w-auto mb:w-[342px] flex items-center justify-left *:w-9 *:h-9 *:rounded-[50%] *:grid *:place-items-center lg:gap-x-[9.5px] gap-x-1 text-xs lg:text-sm">
                        <button className="border">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-left"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>
                        {/* **** */}
                        <button className="bg-[#F2F6F4]">1</button>
                        <button className="hover:bg-[#f2f6f4]">2</button>
                        <button className="hover:bg-[#f2f6f4]">3</button>
                        <button className="hover:bg-[#f2f6f4]">4</button>
                        <span className="hover:bg-[#f2f6f4]">...</span>
                        <button className="hover:bg-[#f2f6f4]">55</button>
                        {/* **** */}
                        <button className="border">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturedProduct;
