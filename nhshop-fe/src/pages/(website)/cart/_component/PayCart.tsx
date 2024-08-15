import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Empty } from "antd";
import { Link } from "react-router-dom";
interface Product {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    img: string;
    discount: number;
    finalPrice: number;
}

export interface Cart {
    _id: string;
    userId: string;
    products: Product[];
    totalQuantity: number;
    totalPrice: number;
    totalDiscount: number;
    finalTotalPrice: number;
}
const PayCart = () => {
    const exchangeRate = 1; // Tỷ giá hối đoái USD -> VND
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const userId = localStorage.getItem("userId");
    const { data, isLoading, error } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID is missing");
            }
            const { data } = await instance.get(`/carts/${userId}`);
            return data;
        },
    });
    const cart: Cart = data;
    if (isLoading) {
        return (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                >
                    <Link to={"/shop"}>
                        <Button type="primary">Thêm vô giỏ hàng để xem</Button>
                    </Link>
                </Empty>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                >
                    <Link to={"/shop"}>
                        <Button type="primary">Thêm vô giỏ hàng để xem</Button>
                    </Link>
                </Empty>
            </div>
        );
    }
    console.log("paycart", data.products);
    return (
        <div>
            <div className="hidden lg:block">
                <div className="w-full lg:p-6 mb:p-5 border rounded-2xl flex flex-col gap-y-[3px]">
                    <div className="flex flex-col gap-y-4">
                        <section className="flex justify-between text-sm">
                            <span className="text-[#9D9EA2]">
                                Tổng số lượng{" "}
                            </span>
                            <p>{cart.totalQuantity}</p>
                        </section>
                        <section className="flex justify-between text-sm">
                            <span className="text-[#9D9EA2]">
                                Tổng giá{" "}
                            </span>
                            <p>{formatCurrency(cart.totalPrice)}</p>
                        </section>
                        <section className="flex justify-between text-sm">
                            <span className="text-[#9D9EA2]">
                                Tổng mã giảm giá{" "}
                            </span>
                            <p>{formatCurrency(cart.totalDiscount)}</p>
                        </section>
                        <section className="flex justify-between text-sm">
                            <span className="text-[#9D9EA2]">
                                Tổng giá phải thanh toán{" "}
                            </span>
                            <p>{formatCurrency(cart.finalTotalPrice)}</p>
                        </section>
                    </div>

                    {/* *** */}
                    <div className="my-3">
                        <span
                            role="progressbar"
                            aria-labelledby="ProgressLabel"
                            aria-valuenow={60}
                            className="block rounded-full bg-[#F4F4F4]"
                        >
                            <span
                                className="block h-[7px] rounded-full bg-[#17AF26]"
                                style={{ width: "58%" }}
                            />
                        </span>
                    </div>
                    {/* *** */}
                    <span className="flex mt-0.5 gap-x-[3px] items-center font-medium text-sm text-[#717378]">
                        Get Free <p className="text-[#1A1E26]">Shipping</p>{" "}
                        for orders over{" "}
                        <p className="text-[#EB2606]">$100.00</p>
                    </span>
                    <a
                        href=""
                        className="font-semibold text-sm underline cursor-pointer my-1 tracking-[-0.1px]"
                    >
                        Continue Shopping
                    </a>
                    {cart.totalQuantity === 0 ? (
                        <button
                            disabled
                            className="bg-gray-500 w-full h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center"                            >
                            <span>Thanh Toán: </span>
                            <span>
                                {formatCurrency(cart.finalTotalPrice)}
                            </span>
                        </button>
                    ) : (
                        <Link to={"/order"}>
                            <button className="bg-green-500 w-full h-14 rounded-[100px] text-white flex my-[13px] gap-x-4 place-items-center justify-center">
                                <span>Thanh Toán: </span>
                                <span>
                                    {formatCurrency(cart.finalTotalPrice)}
                                </span>
                            </button>
                        </Link>
                    )}
                    {/* payment */}
                    <div className="flex flex-col gap-y-4 border-t mt-[3px] pt-[22px]">
                        <span className="tracking-[0.8px] text-[#717378] text-xs">
                            SECURE PAYMENTS PROVIDED BY
                        </span>
                        <div className="flex items-center gap-x-3 *:cursor-pointer">
                            <img src="../Images/mastercard_v1.png" alt="" />
                            <img src="../Images/mastercard_v2.png" alt="" />
                            <img src="../Images/mastercard_v3.png" alt="" />
                            <img src="../Images/mastercard_v4.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayCart;
