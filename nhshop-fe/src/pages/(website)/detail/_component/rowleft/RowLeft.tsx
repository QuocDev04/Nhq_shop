/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Image, Space } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RowLeft = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => instance.get(`/product/${id}`),
    });

    const gallerys = product?.data?.gallery;
    const [img, setImg] = useState(gallerys ? gallerys[0] : "");

    useEffect(() => {
        if (gallerys && gallerys.length > 0) {
            setImg(gallerys[0]);
        }
    }, [gallerys]);
    const onDownload = (imgUrl: string) => {
        fetch(imgUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement<"a">("a");
                link.href = url;
                link.download = "image.png";
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                link.remove();
            });
    };
    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="w-full h-full">
                <div className="">
                    <div className="relative cursor-pointer w-full lg:h-[520px] mb:h-[342px] bg-white border grid place-items-center mb:rounded-xl lg:rounded-3xl">
                        <Image
                            height={515}
                            src={img}
                            preview={{
                                toolbarRender: (
                                    _,
                                    {
                                        image: { url },
                                        transform: { scale },
                                        actions: {
                                            onFlipY,
                                            onFlipX,
                                            onRotateLeft,
                                            onRotateRight,
                                            onZoomOut,
                                            onZoomIn,
                                            onReset,
                                        },
                                    },
                                ) => (
                                    <Space
                                        size={20}
                                        className="toolbar-wrapper"
                                    >
                                        <DownloadOutlined
                                            style={{ fontSize: "24px" }}
                                            onClick={() => onDownload(url)}
                                        />
                                        <SwapOutlined
                                            style={{ fontSize: "24px" }}
                                            rotate={90}
                                            onClick={onFlipY}
                                        />
                                        <SwapOutlined
                                            style={{ fontSize: "24px" }}
                                            onClick={onFlipX}
                                        />
                                        <RotateLeftOutlined
                                            style={{ fontSize: "24px" }}
                                            onClick={onRotateLeft}
                                        />
                                        <RotateRightOutlined
                                            style={{ fontSize: "24px" }}
                                            onClick={onRotateRight}
                                        />
                                        <ZoomOutOutlined
                                            style={{ fontSize: "24px" }}
                                            disabled={scale === 1}
                                            onClick={onZoomOut}
                                        />
                                        <ZoomInOutlined
                                            style={{ fontSize: "24px" }}
                                            disabled={scale === 50}
                                            onClick={onZoomIn}
                                        />
                                        <UndoOutlined
                                            style={{ fontSize: "24px" }}
                                            onClick={onReset}
                                        />
                                    </Space>
                                ),
                            }}
                        />
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                        {gallerys &&
                            gallerys.map((item: any, index: number) => (
                                <img
                                    key={index}
                                    src={item}
                                    alt=""
                                    onClick={() => setImg(item)}
                                    className="hover:scale-110 border-2 h-[100px] w-[120px] rounded-2xl cursor-pointer"
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RowLeft;
