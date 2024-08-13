/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Empty, Image, notification, Popconfirm } from "antd";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { Link } from "react-router-dom";

interface Product {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    img: string;
    discount: number;
    attribute: string[];
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

const TableCart = () => {
    const [api, contextHolder] = notification.useNotification();
    const userId = localStorage.getItem("userId");
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID is missing");
            }
            const { data } = await instance.get(`/carts/${userId}`);
            return data;
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

    const { mutate: Remove } = useMutation({
        mutationFn: async (productId: string) => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("Vui lòng đăng nhập");
            }
            try {
                const { data } = await instance.post("/carts/remove", {
                    userId,
                    productId,
                });
                return data.cart;
            } catch (error: any) {
                throw new Error(error.message || "Xóa sản phẩm thất bại");
            }
        },
        onSuccess: (data) => {
            data && data.cart;

            openNotification(false)(
                "success",
                "Sản phẩm đã được xóa từ giỏ hàng.",
                "Xóa sản phẩm trong giỏ hàng thành công",
            );
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Xóa sản phẩm trong giỏ hàng thất bại",
                "Xóa sản phẩm lỗi",
            );
        },
    });
    const { mutate: Increase } = useMutation({
        mutationFn: async (productId: string) => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("Vui lòng đăng nhập");
            }
            const { data } = await instance.post("/carts/increase", {
                userId,
                productId,
            });
            return data.cart;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });
    const { mutate: Decrease } = useMutation({
        mutationFn: async (productId: string) => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("Vui lòng đăng nhập");
            }
            const { data } = await instance.post("/carts/decrease", {
                userId,
                productId,
            });
            return data.cart;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });
    const { mutate: updateQuantity } = useMutation({
        mutationFn: async ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("Vui lòng đăng nhập");
            }
            const { data } = await instance.put(`/carts/update/${userId}`, {
                userId,
                productId,
                quantity,
            });
            return data.cart;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
    });
    const cart: Cart = data;
    const handleQuantityChange = (productId: string, quantity: number) => {
        updateQuantity({ productId, quantity });
    };
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
    if (isError) {
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
    console.log("table", data.products);

    return (
        <>
            {contextHolder}
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                Your Cart
                            </h1>
                        </header>

                        <div className="mt-8">
                            {cart.totalQuantity === 0 ? (
                                <div className="mb-96">
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        imageStyle={{ height: 60 }}
                                    >
                                        <Link to={"/shop"}>
                                            <Button type="primary">
                                                Thêm vô giỏ hàng để xem
                                            </Button>
                                        </Link>
                                    </Empty>
                                </div>
                            ) : (
                                <ul className="space-y-2 w-[650px]">
                                    {cart.products.map((product) => (
                                        <li
                                            className="flex items-center gap-4"
                                            key={product.productId}
                                        >
                                            <Image
                                                src={product.img}
                                                alt={product.name}
                                                style={{ width: 100 }}
                                            />
                                            <div>
                                                <h3 className="text-xl text-gray-900">
                                                    {product.name}
                                                </h3>

                                                <dl className="mt-0.5 space-y-px text-[10px] ext-gray-900">
                                                    <div>
                                                        <dt className="inline text-lg">
                                                            Price: {""}
                                                        </dt>
                                                        <dd className="inline text-lg text-red-500">
                                                            {formatCurrency(
                                                                product.price,
                                                            )}
                                                        </dd>
                                                    </div>
                                                </dl>
{/* 
                                                <h3 className="text-lg text-gray-900">
                                                    {" "}
                                                    Size:{}
                                                </h3> */}
                                            </div>

                                            <div className="flex flex-1 items-center justify-end gap-2">
                                                <div>
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() =>
                                                                Decrease(
                                                                    product.productId,
                                                                )
                                                            }
                                                            type="button"
                                                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                        >
                                                            <AiOutlineMinusCircle />
                                                        </button>

                                                        <input
                                                            type="number"
                                                            id="Quantity"
                                                            value={
                                                                product.quantity
                                                            }
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    product.productId,
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                )
                                                            }
                                                            className="h-10 w-16 mr-5 rounded border border-gray-700 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                                        />

                                                        <button
                                                            onClick={() =>
                                                                Increase(
                                                                    product.productId,
                                                                )
                                                            }
                                                            type="button"
                                                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                                        >
                                                            <AiOutlinePlusCircle />
                                                        </button>
                                                    </div>
                                                </div>
                                                <Popconfirm
                                                    onConfirm={() =>
                                                        Remove(
                                                            product.productId,
                                                        )
                                                    }
                                                    title="Delete the product"
                                                    description="Are you sure to delete this product?"
                                                    icon={
                                                        <QuestionCircleOutlined
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <button className="text-gray-600 transition hover:text-red-600">
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
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </Popconfirm>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TableCart;
