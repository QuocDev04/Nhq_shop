
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cartCT } from "@/common/context/cartContext";
import { IProduct } from "@/common/types/IProduct";
import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneEye, AiOutlineHeart } from "react-icons/ai";
type ProductsItemProps = {
    product: IProduct;
};

const ProductsItems = ({ product }: ProductsItemProps) => {
    const { setCart } = useContext(cartCT);
    const [api, contextHolder] = notification.useNotification();

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

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const userId = localStorage.getItem("userId");
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
                setCart(data.cart);
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

    const exchangeRate = 1; // Tỷ giá hối đoái USD -> VND
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <>
            {contextHolder}
            <div className="flex flex-col justify-between rounded-3xl border cursor-pointer mx-3 ">
                {/* <!-- img --> */}

                <div className="relative group w-full h-[240px] bg-[#F4F4F4] rounded-3xl grid place-items-center">
                    <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-2 py-2 font-medium uppercase text-white">
                        Save 10%
                    </span>
                    <img className="h-[200px]" src={product.img} alt="" />
                    <div className="absolute scale-0 group-hover:scale-100 flex gap-2 group-hover:translate-y-0  duration-200 rounded-[100px] border-none text-sm ">
                        <Link to={`/products/${product._id}`}>
                            <AiTwotoneEye className="size-9 text-white backdrop-blur-md rounded-3xl" />{" "}
                        </Link>
                        <AiOutlineHeart className="size-9 text-white backdrop-blur-md rounded-3xl" />{" "}
                    </div>
                </div>

                {/* <!-- about --> */}
                <div className="w-full h-full flex flex-col justify-between items-center">
                    <strong className="uppercase font-light text-center text-[#9D9EA2]">
                        flower
                    </strong>
                    <strong className="text-lg line-clamp-2 font-normal text-[#1A1E26] my-1 mx-3 text-center">
                        {product.name}
                    </strong>
                    <section className="w-[163px] h-[21px] *:text-md flex justify-center items-center">
                        <div className="flex items-center">
                            <div className="flex my-2 lg:-translate-y-1.5">
                                <span className="text-[#EB2606]">
                                    {formatCurrency(product.price)}
                                </span>
                            </div>
                        </div>
                    </section>

                    <button
                        onClick={() => mutation.mutate(product._id)}
                        disabled={mutation.isPending}
                        className="bg-[#17AF26] w-[128px] mb-3 h-[40px] grid place-items-center rounded-[100px] text-sm my-4 text-white"
                    >
                        {mutation.isPending ? "Loading..." : "Add to cart"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductsItems;
