import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
    AiOutlineExclamationCircle,
    AiTwotoneShopping,
    AiTwotoneDelete,
} from "react-icons/ai";
import { notification, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const Favourite = () => {
    const userId = localStorage.getItem("userId");
     const queryClient = useQueryClient();
    const [api, contextHolder] = notification.useNotification();

    const { data: favourite, isLoading } = useQuery({
        queryKey: ["favourite"],
        queryFn: () => instance.get(`/favourite/${userId}`),
    });
    console.log(favourite?.data?.productFavourite);
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
                queryKey:['favourite']
            })
        },
        onError:()=>{
            openNotification(false)(
                "error",
                "Sản phẩm xóa từ mục yêu thích bị lỗi.",
                "Xóa sản phẩm trong mục yêu thích thất bại",
            );
        }
    });
    const {mutate: addCart} = useMutation({
        mutationFn:async(id:string)=>{
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
        onSuccess:()=>{
            openNotification(false)(
                "success",
                "Sản phẩm đã được thêm vào giỏ hàng",
                "thêm sản phẩm vào giỏ hàng thành công",
            )
        },
        onError:()=>{
            openNotification(false)(
                "error",
                "Sản phẩm thêm vào giỏ hàng bị lỗi",
                "thêm sản phẩm vào giỏ hàng thất bại",
            )
        }
    })
    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            {contextHolder}
            <div className=" mb-96">
                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <header>
                            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                Sản phẩm yêu thích
                            </h2>
                        </header>

                        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {favourite?.data.productFavourite.map((item) => (
                                <li>
                                    <div className="group relative block bg-black">
                                        <img
                                            alt=""
                                            src={item.img}
                                            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                        />

                                        <div className="relative p-4 sm:p-6 lg:p-8">
                                            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                                {item.price}
                                            </p>

                                            <p className="text-xl font-bold text-white sm:text-2xl">
                                                {item.name}
                                            </p>

                                            <div className="mt-32 sm:mt-48 lg:mt-64">
                                                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                                    <div className="space-x-4 flex justify-center">
                                                        <button>
                                                            <Link
                                                                to={`/products/${item.productId}`}
                                                                className="text-sm text-white cursor-pointer"
                                                            >
                                                                <AiOutlineExclamationCircle className="size-8 text-blue-600" />
                                                            </Link>
                                                        </button>
                                                        <Popconfirm
                                                            onConfirm={() =>
                                                                remoteFavourite(
                                                                    item.productId,
                                                                )
                                                            }
                                                            className="mt-4"
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
                                                            <AiTwotoneDelete className="size-8 text-red-600" />
                                                        </Popconfirm>

                                                        <button
                                                            onClick={() =>
                                                                addCart(item.productId)
                                                            }
                                                            className="text-sm text-white cursor-pointer"
                                                        >
                                                            <AiTwotoneShopping className="size-8 text-red-600" />
                                                        </button>
                                                        <button className="text-sm text-white cursor-pointer bg-red-600 py-3 px-4">
                                                            Mua ngay
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Favourite;
