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
import { useEffect, useState } from "react";
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
                const link = document.createElement("a");
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
                <div className=" cursor-pointer w-full bg-white border grid place-items-center mb:rounded-xl lg:rounded-3xl shadow-lg mb-10">
                    <Image
                    className="h-10"
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
                                <Space size={20} className="toolbar-wrapper">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-4">
                    {gallerys &&
                        gallerys.map((item: any, index: number) => (
                            <img
                                key={index}
                                src={item}
                                alt={`Gallery image ${index + 1}`}
                                onClick={() => setImg(item)}
                                className="transition-transform duration-300 ease-in-out transform hover:scale-105 border-2 h-[150px] w-full object-cover rounded-xl cursor-pointer shadow-md"
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RowLeft;
