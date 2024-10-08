import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";
import { useParams } from "react-router-dom";

const Row1 = () => {
    const exchangeRate = 1;
    const formatCurrency = (amount: number) => {
        const amountInVND = amount * exchangeRate;
        return amountInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const { id } = useParams();
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => instance.get(`/product/${id}`),
    });
    if (isLoading)
        return (
            <div>
                {" "}
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                />
            </div>
        );
    const price = product?.data.price || 0;
    return (
        <div>
            <div className="lg:w-[970px] flex flex-col lg:gap-y-4">
                <span className="text-[#9D9EA2] lg:text-sm mb:text-xs lg:tracking-[4px] mb:tracking-[2px]"></span>
                <strong className="lg:text-[32px] lg:mt-[1px] mb:mt-3.5 mb:text-[20px] lg:tracking-[-1.2px] font-medium lg:leading-[38.4px]">
                    {product?.data.name}
                </strong>
                <div>{product?.data.tags}</div>
                <div className="flex lg:items-center mb:items-end justify-between">
                    <span className="font-medium text-[#EB2606] lg:text-xl lg:tracking-[0.7px] mb:text-base flex items-center lg:gap-x-3 lg:mt-0.5 mb:gap-x-2">
                        {formatCurrency(price)}
                    </span>
                    <section className="lg:w-[163px] mb:w-[157px] mb:mt-[8px] lg:mt-0 h-[21px] *:lg:text-sm *:mb:text-xs flex justify-between items-start">
                        <div className="flex items-start lg:gap-x-0 mb:gap-x-1">
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
                                className="lucide lucide-star"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <strong>4.6/5</strong>
                        </div>
                        <div className="flex gap-x-2">
                            <strong>135</strong>
                            <span className="text-[#C8C9CB]">Reviews</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
export default Row1;
