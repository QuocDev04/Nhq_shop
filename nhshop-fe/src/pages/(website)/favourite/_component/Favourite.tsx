/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
    AiTwotoneShopping,
    AiTwotoneDelete,
} from "react-icons/ai";
import { Avatar, Button, Card, Empty, notification, Popconfirm, Tabs, TabsProps } from "antd";
import {
    QuestionCircleOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const Favourite = () => {
    const userId = localStorage.getItem("userId");
    const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();

    const { data: favourite, isLoading } = useQuery({
        queryKey: ["favourite"],
        queryFn: () => instance.get(`/favourite/${userId}`),
        enabled:!!userId
    });
    const navigate = useNavigate()
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
    const exchangeRate = 1; // Tỷ giá hối đoái USD -> VND
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const { mutate: remoteFavourite } = useMutation({
        mutationFn: async (productId: string) => {
            try {
                return await instance.post(`/favourite/remove`, {
                    userId,
                    productId,
                });
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Sản phẩm đã được xóa từ mục yêu thích.",
                "Xóa sản phẩm trong mục yêu thích thành công",
            );
            queryClient.invalidateQueries({
                queryKey: ["favourite"],
            });
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Sản phẩm xóa từ mục yêu thích bị lỗi.",
                "Xóa sản phẩm trong mục yêu thích thất bại",
            );
        },
    });
    const { mutate: addCart } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.post("/carts/add-to-cart/", {
                    userId,
                    productId: id,
                    quantity: 1,
                });
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Sản phẩm đã được thêm vào giỏ hàng",
                "thêm sản phẩm vào giỏ hàng thành công",
            );
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Sản phẩm thêm vào giỏ hàng bị lỗi",
                "thêm sản phẩm vào giỏ hàng thất bại",
            );
        },
    });
    if (isLoading) return (
        <div>
            {" "}
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
    );

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: (
                <button className="inline-flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                        />
                    </svg>
                </button>
            ),
            children: (
                <>
                    {!userId ? (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{ height: 60 }}
                            >
                                <Link to={"/shop"}>
                                    <Button type="primary">
                                        Thêm vào yêu thích để xem
                                    </Button>
                                </Link>
                            </Empty>
                    ) : (
                        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {favourite?.data.productFavourite.map(
                                (item: any) => (
                                    <li
                                        key={item.productId}
                                        className="flex flex-col items-start"
                                    >
                                        <Card
                                            style={{ width: 300 }}
                                            cover={
                                                <Link
                                                    to={`/products/${item.productId}`}
                                                    key="details"
                                                >
                                                    <img
                                                        alt="example"
                                                        src={item.gallery}
                                                        className="m-auto"
                                                    />
                                                </Link>
                                            }
                                            actions={[
                                                <Popconfirm
                                                    onConfirm={() =>
                                                        remoteFavourite(
                                                            item.productId,
                                                        )
                                                    }
                                                    className="m-auto h-6 w-6"
                                                    title="Delete the task"
                                                    description="Are you sure to delete this task?"
                                                    icon={
                                                        <QuestionCircleOutlined
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <AiTwotoneDelete />
                                                </Popconfirm>,
                                                <button
                                                    onClick={() =>
                                                        addCart(item.productId)
                                                    }
                                                    className="text-sm text-white cursor-pointer"
                                                >
                                                    <AiTwotoneShopping className="h-6 w-6 text-red-600" />
                                                </button>,
                                                <button className="text-sm text-white cursor-pointer bg-red-600 py-2 px-4">
                                                    Mua ngay
                                                </button>,
                                            ]}
                                        >
                                            <Meta
                                                avatar={
                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                                                }
                                                title={item.name}
                                                description={formatCurrency(
                                                    item.price,
                                                )}
                                            />
                                        </Card>
                                    </li>
                                ),
                            )}
                        </ul>
                    )}
                </>
            ),
        },
        {
            key: "2",
            label: (
                <button className="inline-flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                </button>
            ),
            children: (
                <>
                    {!userId ? (
                        <>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{ height: 60 }}
                            >
                                    <Button type="primary" onClick={()=> navigate('/login')}>
                                        Đăng Nhập Để Xem Mục Yêu Thích                                        
                                    </Button>
                            </Empty> 
                        </>
                    ) : ('')} </>
             
            ),
        },
    ];



    return (
        <>
            {contextHolder}
            <div>
                <h2 className="text-xl font-bold m-10 text-gray-900 sm:text-3xl">
                    Danh sách yêu thích
                </h2>
            </div>
            <Tabs
                defaultActiveKey="1"
                type="card"
                items={items}
                className="ml-10"
            />
        </>
    );
};

export default Favourite;
