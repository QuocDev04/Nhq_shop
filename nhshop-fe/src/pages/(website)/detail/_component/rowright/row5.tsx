import { useState } from "react";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Empty, Modal, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const Row5 = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [api, contextHolder] = notification.useNotification();
    const { data: product, isLoading } = useQuery({
        queryKey: ["product", id],
        queryFn: () => instance.get(`/product/${id}`),
    });
    const queryClient = useQueryClient();

    const [localQuantity, setLocalQuantity] = useState(1); 

    const formatCurrency = (price: number) => {
        const priceInVND = price * 1;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };
    const nav = () =>{
        navigate('/login')
    }
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

    const { mutate: AddCart } = useMutation({
        mutationFn: async (productId: string) => {
            try {
                return await instance.post(`/carts/add-to-cart`, {
                    userId,
                    productId,
                    quantity: localQuantity, // Use the local quantity
                });
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Thêm vào giỏ hàng",
                "Bạn thêm vào giỏ hàng thành công",
            );
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
        onError: () =>
            openNotification(false)(
                "error",
                "Thêm vào giỏ hàng",
                "Bạn thêm vào giỏ hàng thất bại",
            ),
    });
    const handleQuantityChange = (action: "increase" | "decrease") => {
        if (action === "increase") {
            setLocalQuantity((count) => count + 1);
        } else if (action === "decrease" && localQuantity > 1) {
            setLocalQuantity((count) => count - 1);
        }
    };

    if (isLoading)
        return (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                />
            </div>
        );

    return (
        <div>
            {contextHolder}
            <div className="lg:p-6 mb:py-5 mb:px-5 rounded-xl *:w-full border lg:-mt-5 -mt-1">
                <div className="flex flex-col gap-y-3.5 lg:pb-0 mb:pb-6 tracking-[-0.2px]">
                    <section className="flex justify-between *:font-medium *:text-sm">
                        <span className="flex gap-x-4 text-[#46494F]">
                            {product?.data.name}{" "}
                            <p className="text-[#9D9EA2]">{localQuantity}x</p>{" "}
                            {/* Display local quantity */}
                        </span>
                        <strong>
                            {formatCurrency(
                                product?.data.price * localQuantity,
                            )}
                        </strong>
                    </section>
                </div>
                <div className="py-5 flex lg:flex-row mb:flex-col lg:gap-y-0 gap-y-[17px] justify-between lg:items-center mb:items-start border-y lg:mt-[22px]">
                    <div className="border lg:py-2.5 lg:pr-6 lg:pl-4 mb:py-1 mb:pl-2 mb:pr-[18px] *:text-xs flex items-center gap-x-3 rounded-xl">
                        <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                            <button
                                onClick={() => handleQuantityChange("decrease")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-minus"
                                >
                                    <path d="M5 12h14" />
                                </svg>
                            </button>
                            <div className="bg-[#F4F4F4]">{localQuantity}</div>{" "}
                            {/* Show local quantity */}
                            <button
                                onClick={() => handleQuantityChange("increase")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-plus"
                                >
                                    <path d="M5 12h14" />
                                    <path d="M12 5v14" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {userId ? (
                        <div className="flex gap-x-3 ">
                            <button
                                onClick={() => AddCart(product?.data._id)}
                                className="lg:text-base mb:text-sm font-medium flex place-items-center text-white bg-[#17AF26] rounded-[100px] px-3 py-2"
                            >
                                <span>Add to Cart</span>
                            </button>
                            <button className="lg:text-base mb:text-sm font-medium flex place-items-center text-white bg-[#17AF26] rounded-[100px] px-3 py-2">
                                <span>Buy now</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-x-3">
                            <button
                                onClick={showModal}
                                className="lg:text-base mb:text-sm font-medium flex place-items-center text-white bg-[#17AF26] rounded-[100px] px-3 py-2"
                            >
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={showModal}
                                className="lg:text-base mb:text-sm font-medium flex place-items-center text-white bg-[#17AF26] rounded-[100px] px-3 py-2"
                            >
                                <span>Buy now</span>
                            </button>
                            <Modal
                                title="Thông Báo"
                                open={open}
                                onOk={nav}
                                onCancel={hideModal}
                                okText="Đăng Nhập"
                                cancelText="Hủy"
                            >
                                <p>Vui Lòng Quý Khách Đăng Nhập Để Thực Hiện Bước Kế Tiếp</p>
                            </Modal>
                        </div>
                    )}
                </div>
                <section className="flex lg:mt-0 mt-0.5 flex-col pt-[23px] gap-y-[13px] *:flex *:items-center *:gap-x-2 *:lg:text-sm *:mb:text-xs *:text-[#46494F]">
                    <span>
                        <img src="../Images/tick-circle.png" alt="" />
                        Free Xpress Shipping on orders over{" "}
                        <p className="text-[#F2BC1B]">$149</p>
                    </span>
                    <span>
                        <img src="../Images/tick-circle.png" alt="" />
                        Order before 12:00pm for same day dispatch
                    </span>
                    <span>
                        <img src="../Images/tick-circle.png" alt="" />
                        Support &amp; ordering open 7 day a week
                    </span>
                </section>
            </div>
        </div>
    );
};

export default Row5;
