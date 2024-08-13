/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

const Row4 = () => {
    const { id } = useParams();
    const { data: product,isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => instance.get(`/product/${id}`),
    });

    // Trạng thái để theo dõi thuộc tính đã chọn
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // Xử lý khi bấm vào thuộc tính kích thước
    const handleSizeClick = (valueId: any) => {
        setSelectedSize(valueId);
    };

    // Xử lý khi bấm vào thuộc tính màu sắc
    const handleColorClick = (valueId: any) => {
        setSelectedColor(valueId);
    };

    // Tách thuộc tính ra theo loại
    const sizeAttributes =
        product?.data.attributes.filter((size: any) =>
            size.name.toLowerCase().includes("size"),
        ) || [];
    const colorAttributes =
        product?.data.attributes.filter((color: any) =>
            color.name.toLowerCase().includes("color"),
        ) || [];
if(isLoading) return (
    <div>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{ height: 60 }}/>
           
    </div>
);
    return (
        <div>
            <div className="flex flex-col lg:gap-y-[22px] border-t lg:mt-[5px] lg:py-5 mb:py-6">
                <div className="grid lg:grid-cols-[48.5%_48.5%] justify-between items-start">
                    {/* Kích thước */}
                    <div className="flex flex-col gap-y-3 lg:mt-0 mb:-mt-1">
                        <span className="text-[#717378] lg:translate-y-0 mb:translate-y-1 tracking-[1px] uppercase">
                            Chọn Kích Thước
                        </span>
                        {sizeAttributes.map((item: any) => (
                            <section
                                className="lg:px-[13.5px] lg:py-2.5 mb:px-3.5 mb:py-2 rounded flex gap-x-4 duration-200"
                                key={item._id}
                            >
                                {item.values.map((value: any) => (
                                    <button
                                        className={`hover:border border border-[#17AF26] px-4 py-2 rounded ${
                                            selectedSize === value._id
                                                ? "bg-[#17AF26] text-white"
                                                : "bg-white text-[#17AF26]"
                                        }`}
                                        onClick={() =>
                                            handleSizeClick(value._id)
                                        }
                                        key={value._id}
                                    >
                                        {value.name}
                                    </button>
                                ))}
                            </section>
                        ))}
                    </div>

                    {/* Màu sắc */}
                    <div className="flex flex-col gap-y-3 lg:mt-0 mb:-mt-1">
                        <span className="text-[#717378] lg:translate-y-0 mb:translate-y-1 tracking-[1px] uppercase">
                            Chọn Màu Sắc
                        </span>
                        {colorAttributes.map((item: any) => (
                            <section
                                className="lg:px-[13.5px] lg:py-2.5 mb:px-3.5 mb:py-2 rounded flex gap-x-4 duration-200"
                                key={item._id}
                            >
                                {item.values.map((value: any) => (
                                    <button
                                        className={`hover:border border border-[#17AF26] px-4 py-2 rounded ${
                                            selectedColor === value._id
                                                ? "bg-[#17AF26] text-white"
                                                : "bg-white text-[#17AF26]"
                                        }`}
                                        onClick={() =>
                                            handleColorClick(value._id)
                                        }
                                        key={value._id}
                                    >
                                        {value.name}
                                    </button>
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
                <section className="bg-[#FEF8E8] lg:tracking-0 tracking-[0.0002px] px-3.5 py-2 rounded-[100px] lg:w-[342px] lg:mt-0 mb:mt-[18px] mb:w-full text-sm">
                    Purchase this product now and earn{" "}
                    <span className="text-[#EB2606]">80</span> Points!
                </section>
            </div>
        </div>
    );
};

export default Row4;
