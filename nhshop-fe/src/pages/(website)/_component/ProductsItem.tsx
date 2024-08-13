/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "@/common/types/IProduct";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Modal, notification } from "antd";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
type ProductsItemProps = {
    product: IProduct;
};

const ProductsItems = ({ product }: ProductsItemProps) => {
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const openNotification =
        (pauseOnHover: boolean) =>
        (type: "success" | "error", message: string, description: string) => {
            api.open({
                message,
                description,
                type,
                showProgress: true,
                pauseOnHover,
            });
        };
    const userId = localStorage.getItem("userId");
    const { data: pro, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get(`/product`),
    });
    const queyClient = useQueryClient();
    console.log("id", pro?.data);
    const { data, isLoading:favourite } = useQuery({
        queryKey: ["favourite"],
        queryFn: () => instance.get(`/favourite/${userId}`),
    });
    const favouriteProductIds = data?.data.productFavourite.map(
        (item: any) => item.productId,
    );
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            if (!userId) {
                throw new Error("User ID is missing. Please log in.");
            }
            try {
                const { data } = await instance.post("/carts/add-to-cart/", {
                    userId,
                    productId: id,
                    quantity: 1,
                });
                return data;
            } catch (error: any) {
                throw new Error(error.message || "Failed to add item to cart");
            }
        },
        onSuccess: (data) => {
            if (data && data.cart) {
                openNotification(false)(
                    "success",
                    "Thêm giỏ hàng thành công",
                    "Sản phẩm đã được thêm vào giỏ hàng.",
                );
            } else {
                openNotification(false)(
                    "error",
                    "Thêm giỏ hàng thất bại",
                    "Dữ liệu giỏ hàng không hợp lệ.",
                );
            }
        },
        onError: (error: any) => {
            openNotification(false)(
                "error",
                "Thêm giỏ hàng thất bại",
                `Thêm giỏ hàng thất bại: ${error.message}`,
            );
        },
    });
    const { mutate: AddFavourite } = useMutation({
        mutationFn: async (productId: string) => {
            try {
                return await instance.post(`/favourite/add-to-favourite`, {
                    userId,
                    productId,
                });
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            queyClient.invalidateQueries({
                queryKey: ["favourite"],
            });
        },

        onError: () =>
            openNotification(false)(
                "success",
                "Thêm sản phảm vào mục yêu thích thất bại",
                "Thêm sản phẩm vô mục yêu thích không thành công",
            ),
    });
    const { mutate: delFavourite } = useMutation({
        mutationFn: async (productId: string) => {
            try {
                return await instance.post(`/favourite/remove`, {
                    userId,
                    productId,
                });
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            queyClient.invalidateQueries({
                queryKey: ["favourite"],
            });
        },
        onError: () => {
            openNotification(false)("error", "Lỗi", "Thất Bại");
        },
    });
    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    if (isLoading) return (
        <div>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
        </div>
    );
    if (favourite) return (
        <div>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
              
        </div>
    );
        return (
            <>
                {contextHolder}
                <div className="relative block rounded-3xl border border-gray-400">
                    <div className="relative group w-full h-[240px] bg-[#F4F4F4] rounded-3xl grid place-items-center">
                        {userId ? (
                            <>
                                <button
                                    onClick={() => {
                                        if (
                                            favouriteProductIds?.includes(
                                                product._id,
                                            )
                                        ) {
                                            delFavourite(product._id);
                                        } else {
                                            AddFavourite(product._id);
                                        }
                                    }}
                                    className="absolute end-4 top-4 z-10 rounded-full p-1.5 text-gray-900 transition hover:text-gray-900/75"
                                >
                                    {favouriteProductIds?.includes(
                                        product._id,
                                    ) ? (
                                        <AiFillHeart className="text-red-600 size-6" />
                                    ) : (
                                        <AiOutlineHeart className="text-black size-6" />
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={showModal}
                                    className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                </button>
                                <Modal
                                    title="Thông Báo"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Đăng Nhập"
                                    cancelText="Hủy"
                                >
                                    <p>
                                        Quý Khách Vui Lòng Đăng Nhập Để Làm Bước
                                        Tiếp Theo
                                    </p>
                                </Modal>
                            </>
                        )}

                        <Link to={`/products/${product._id}`}>
                            <img
                                className="h-[230px] rounded-3xl"
                                src={product.img}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="p-4 text-center">
                        <strong className="text-xl font-medium text-gray-900">
                            {" "}
                            {product.name}{" "}
                        </strong>

                        <p className="mt-2 text-pretty text-lg text-gray-700">
                            {formatCurrency(product.price)}
                        </p>
                        {userId ? (
                            <>
                                <button
                                    onClick={() => mutation.mutate(product._id)}
                                    disabled={mutation.isPending}
                                    className="mt-4 block rounded-md border border-green-900 bg-green-600 px-16 ml-3 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-green-900"
                                >
                                    {mutation.isPending
                                        ? "Loading..."
                                        : "Add to cart"}
                                </button>
                            </>
                        ) : (
                            <div>
                                <button
                                    onClick={showModal}
                                    className="mt-4 block rounded-md border border-green-900 bg-green-600 px-16 ml-3 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-green-900"
                                >
                                    Add to cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
};

export default ProductsItems;
