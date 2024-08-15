/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "@/common/types/IProduct";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ConfigProvider, Empty, Form, Modal, notification, Skeleton } from "antd";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { createStyles, useTheme } from 'antd-style';
type ProductsItemProps = {
    product: IProduct;
};
const useStyle = createStyles(({ token }) => ({
    'my-modal-body': {
        background: token.blue1,
        padding: token.paddingSM,
    },
    'my-modal-mask': {
        boxShadow: `inset 0 0 15px #fff`,
    },
    'my-modal-header': {
        borderBottom: `1px dotted ${token.colorPrimary}`,
    },
    'my-modal-footer': {
        color: token.colorPrimary,
    },
    'my-modal-content': {
        border: '1px solid #333',
    },
}));
const ProductsItems = ({ product }: ProductsItemProps) => {
    const [form] = Form.useForm()
    const [selectedSize, setSelectedSize] = useState(null);
    const [localQuantity, setLocalQuantity] = useState(1);
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCart, setIsModalOpenCart] = useState([false, false]);
    const { styles } = useStyle();
    const token = useTheme()
    const toggleModal = (idx: number, target: boolean) => {
        setIsModalOpenCart((p) => {
            p[idx] = target;
            return [...p];
        });
    };
    //STYLE
    const classNames = {
        mask: styles['my-modal-mask'],
        header: styles['my-modal-header'],
        content: styles['my-modal-content'],
    };

    const modalStyles = {
        header: {
            borderLeft: `5px solid ${token.colorPrimary}`,
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        mask: {
            backdropFilter: 'blur(10px)',
        },
        content: {
            boxShadow: '0 0 30px #999',
        }
    }
    //END STYLE
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
    // CART
    const handleSizeClick = (ValueAttributeId: any) => {
        setSelectedSize(ValueAttributeId);
        console.log("Selected Size ID:", ValueAttributeId); 
    };
    const userId = localStorage.getItem("userId");
    const { data: pro, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get(`/product`),
    });
    const queyClient = useQueryClient();
    console.log("id", pro?.data);
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            if (!userId) {
                throw new Error("User ID is missing. Please log in.");
            }
            try {
                const attributes = { ValueAttributeId: selectedSize };
                const { data } = await instance.post("/carts/add-to-cart/", {
                    userId,
                    productId: id,
                    quantity: localQuantity,
                    attributes
                });
                return data;
            } catch (error: any) {
                throw new Error(error.message || "Failed to add item to cart");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Thêm giỏ hàng thành công",
                "Sản phẩm đã được thêm vào giỏ hàng.",
            )
            form.resetFields()
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Thêm giỏ hàng thất bại",
                `Vui Lòng Chọn Size`,
            );
        },
    });
    const handleQuantityChange = (action: "increase" | "decrease") => {
        if (action === "increase") {
            setLocalQuantity((count) => count + 1)
        } else if (action === "decrease" && localQuantity > 1) {
            setLocalQuantity((count) => count - 1)
        }
    }
    const sizeAttributes =
        product?.attributes.filter((size: any) =>
            size.name.toLowerCase().includes("size"),
        ) || [];
    //END CART

    // Favourite
    const { data, isLoading: favourite } = useQuery({
        queryKey: ["favourite"],
        queryFn: () => instance.get(`/favourite/${userId}`),
        enabled: !!userId, //Chỉ gọi lại API khi có userID
    });
    const favouriteProductIds = data?.data.productFavourite.map(
        (item: any) => item.productId,
    );
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
    //END FAVOURITE

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
            <Skeleton />
        </div>
    );
    return (
        <>
            {contextHolder}
            <ConfigProvider
                modal={{
                    classNames,
                    styles: modalStyles,
                }}
            >
                <Modal
                    title="Thêm Sản Phẩm Vào Giỏ Hàng"
                    open={isModalOpenCart[1]}
                    onOk={() =>
                        mutation.mutate(product._id)}
                    onCancel={() => toggleModal(1, false)}
                    okText={'Thêm Vô Giỏ Hàng'}
                    cancelText="Hủy"
                >
                    <div className="flex flex-row space-x-5 mt-6">
                        <div className="w-1/2">
                            <img src={product.gallery[0]} alt="" className="w-44" />
                        </div>
                        <div  className="w-1/2 shrink-1" >
                            <h1 className="text-gray-800 font-medium text-lg">
                                {product.name}
                            </h1>
                                <div className="flex flex-col gap-y-3 lg:mt-0 mb:-mt-1">
                                    {sizeAttributes.map((item: any) => (
                                        <section
                                            className="lg:px-[13.5px] lg:py-2.5 mb:px-3.5 mb:py-2 rounded flex gap-x-4 duration-200"
                                            key={item._id}
                                        >
                                            {item.values.map((value: any) => (
                                                <button
                                                    className={`hover:border border border-[#17AF26] px-3 py-1 rounded ${selectedSize === value._id
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
                            <div className="items-center text-sm mb-2">
                                <p className="p text-violet-700 mr-2 pb-2">
                                    Trong Kho:  {product.countInstock}x,
                                </p>
                                <p className="text-violet-700">Tình Trạng: {product.countInstock === 0 ? (
                                    'Hết Hàng') : ("Còn Hàng")}</p>
                            </div>
                            <div >
                                <p className="font-semibold mb-4 text-md"> Số Lượng</p>
                                <div className="flex items-center *:w-9 *:h-9 gap-x-1 *:grid *:place-items-center">
                                    <button
                                        className="text-lg font-medium bg-blue-500 text-white px-3 py-1 rounded duration-300 hover:bg-blue-600"
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
                                        className="text-lg font-medium bg-blue-500 text-white px-3 py-1 rounded duration-300 hover:bg-blue-600"
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
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
            <div className="rounded-3xl grid place-items-center ">
                <div className="relative h-[220px]">
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
                            className="w-60 rounded-3xl"
                            src={product.gallery[0]}
                            alt=""
                        />
                    </Link>
                </div>
                <div className="p-4 mt-20 text-center">
                    <strong className="text-md font-medium text-gray-900">
                        {" "}
                        {product.name}{" "}
                    </strong>

                    <p className="mt-2 text-pretty text-md text-gray-700">
                        {formatCurrency(product.price)}
                    </p>
                    {userId ? (
                        <>
                            <button onClick={() => toggleModal(1, true)} className="mt-4 block rounded-md border border-green-900 bg-green-600 px-16   text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-green-900"
                            >
                                     Thêm Vào Giỏ Hàng
                            </button>
                        </>
                    ) : (
                        <div>
                            <button
                                onClick={showModal}
                                className="mt-4 block rounded-md border border-green-900 bg-green-600 px-16  text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-green-900"
                            >
                                Thêm Vào Giỏ Hàng
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsItems;
