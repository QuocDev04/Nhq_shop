import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

const TextDescription = () => {
    const {id} = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ["product",id],
        queryFn: () => instance.get(`/product/${id}`),
    });
    if(isLoading) return (
        <div>
            <div>
                {" "}
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                />
            </div>
        </div>
    );
    return (
        <div>
            <div className="show_description">
                <section className="flex flex-col text-sm text-[#46494F] leading-[21px] gap-y-4 lg:py-6 mb:pt-[19px]">
                        <p>{data?.data.description}</p>
                </section>
            </div>
        </div>
    );
};

export default TextDescription;
