import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const RowLeft = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => instance.get(`/product/${id}`),
    });
    if (isLoading) return <div>ajhdac</div>;
    return (
        <div>
            <div className="w-full h-full">
                <div className="w-full flex flex-col lg:items-center lg:gap-y-6 gap-y-3.5">
                    <div className="relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white border grid place-items-center mb:rounded-xl lg:rounded-3xl">
                        <img
                            className="lg:w-[320px] lg:h-auto mb:w-[240px] mb:h-[240px]"
                            src={product?.data.img}
                            alt=""
                        />
                        <div className="absolute bottom-0 cursor-pointer hover:scale-110 duration-300 right-0 -translate-x-1/2 -translate-y-1/2 lg:w-10 lg:h-10 mb:w-8 mb:h-8 lg:p-2.5 mb:p-2 rounded-[50%] bg-white grid place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-external-link"
                            >
                                <path d="M15 3h6v6" />
                                <path d="M10 14 21 3" />
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            </svg>
                        </div>
                    </div>
                    <div className="*:lg:w-32 *:lg:h-auto *:mb:w-14 *:mb:h-14 *:p-2 *:bg-[#F4F4F4] *:rounded-xl *:duration-300 *:cursor-pointer flex items-center gap-x-4">
                        <button className="hover:scale-110">
                            <img src={product?.data.gallery} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RowLeft;
