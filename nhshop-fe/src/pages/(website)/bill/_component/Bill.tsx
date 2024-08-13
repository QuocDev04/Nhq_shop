import { IUser } from "@/common/types/IUser";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Empty } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

interface Product {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    img: string;
}
interface Addresses {
    city: string;
    district: string;
    postalCode: string;
    commune_ward: string;
    streetAddress: string;
    apartment: string;
}
export interface Order {
    _id: string;
    userId: IUser;
    items: Product[];
    firstName: string;
    lastName: string;
    addresses: Addresses[];
    phone: number;
    email: string;
    orderNotes: string;
    totalPrice: number;
    status: string[];
    createdAt: Date;
}
const Bill = () => {
    const userId = localStorage.getItem("userId");
    const { id } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const { data } = await instance.get(`/orders/${userId}/${id}`);
            return data;
        },
    });

    const order: Order = data;
       const exchangeRate = 1; // Tỷ giá hối đoái USD -> VND
       const formatCurrency = (price: number) => {
           const priceInVND = price * exchangeRate;
           return priceInVND.toLocaleString("vi-VN", {
               style: "currency",
               currency: "VND",
           });
       };
    if (isLoading) {
        return (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                >
                    <Link to={"/shop"}>
                        <Button type="primary">Quay lại</Button>
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
                        <Button type="primary">Quay lại</Button>
                    </Link>
                </Empty>
            </div>
        );
    }
    console.log(order.items);
    console.log("id");
    return (
        <>
            <div className="w-full lg:py-7 mb:py-[18px] bg-[#F4F4F4] grid place-items-center mb-5">
                <div className="flex -translate-x-[1px] items-center gap-x-4 text-sm">
                    <div className="flex items-center gap-x-2">
                        <div className="w-[30px] h-[30px] p-2 text-white bg-[#C3D2CC] rounded-[50%] flex place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #05422C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <span>Shopping Cart</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#05422C]" />
                    <div className="flex items-center gap-x-2">
                        <div className="w-[30px] h-[30px] p-2 text-white bg-[#C3D2CC] rounded-[50%] flex place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #05422C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <span>Checkout</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#C3D2CC]" />
                    <div className="flex items-center gap-x-2">
                        <div className="w-[30px] h-[30px] p-2 text-white bg-[#C3D2CC] rounded-[50%] flex place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #05422C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check"
                            >
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <span>Order Complete</span>
                    </div>
                </div>
            </div>
            <div className="relative mt-20 h-auto pb-20 mb-96 max-w-[1200px] mx-auto bg-gray-100 border border-black rounded-lg">
                <span className=" text-xs font-medium  text-center p-0.5 leading-none rounded-full px-2  absolute -translate-y-1/2 translate-x-1/2 right-1/2">
                    <AiOutlineCheckCircle className="size-20 text-green-600" />
                </span>
                <div className="flex items-center flex-col">
                    <h4 className="text-center mt-10 font-bold text-2xl">
                        Cảm ơn bạn đã đặt hàng #NHQ0055
                    </h4>
                    <p className="text-neutral-600 text-sm mt-2 text-center">
                        Chúng tôi sẽ gửi cho bạn một email có thông tin theo dõi
                        khi mặt hàng của bạn được giao
                    </p>
                </div>
                <div className="mt-8">
                    <div className="grid grid-cols-2 gap-8 mt-4">
                        <div className="flex flex-col space-y-6 mx-10">
                            <h4 className="font-medium text-xl">
                                Thông tin đặt hàng
                            </h4>
                            <div className="grid grid-cols-5 ">
                                <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                    ID Đặt Hàng
                                </p>
                                <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                    {order._id}
                                </p>
                            </div>
                            <div className="grid grid-cols-5">
                                <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                    Thời Gian Đặt Hàng
                                </p>
                                <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                    {new Date(order.createdAt).toLocaleString(
                                        "vi-VN",
                                    )}{" "}
                                </p>
                            </div>
                            <div className="grid grid-cols-5">
                                <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                    Thông Tin Người Đặt
                                </p>
                                <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                    {order.lastName + " " + order.firstName}
                                </p>
                            </div>
                            <div className="grid grid-cols-5">
                                <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                    Email
                                </p>
                                <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                    {order.email}
                                </p>
                            </div>
                            <div className="grid grid-cols-5">
                                <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                    Số Điện Thoại
                                </p>
                                <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                    {order.phone}
                                </p>
                            </div>
                            <div className="grid grid-cols-5">
                                <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                    Giao đến địa chỉ{" "}
                                </p>
                                <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                    {order.addresses.map(
                                        (item) =>
                                            item.city +
                                            " - " +
                                            item.district +
                                            " - " +
                                            item.streetAddress +
                                            " - " +
                                            item.commune_ward +
                                            " - " +
                                            item.apartment,
                                    )}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-xl">
                                Các Mặt Hàng
                            </h4>
                            <div>
                                {order.items.map((item) => (
                                    <div
                                        className="flex items-center"
                                        key={item.productId}
                                    >
                                        <img
                                            src={item.img}
                                            className="w-[90px] h-[70px] rounded-md"
                                        />
                                        <div className="flex flex-col space-y-2 ml-2">
                                            <p className="text-sm font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-sm font-medium">
                                                Số lượng: {item.quantity}x
                                            </p>
                                            <p className="text-sm font-medium">
                                                Giá:{" "}
                                                {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <hr className="w-full my-3" />
                            </div>
                            <div className="flex justify-between ">
                                <p className="font-semibold text-sm">
                                    Tổng số tiền (Bao gồm phí vận chuyển)
                                </p>
                                <p className="font-semibold text-sm mr-9">
                                    {formatCurrency(order.totalPrice)}
                                </p>
                            </div>
                            <div className="flex flex-col space-y-6 my-8">
                                <div className="flex items-center">
                                    <h4 className="font-medium text-lg mr-3">
                                        Hình thức thanh toán
                                    </h4>
                                    <div className="capitalize badge text-white text-xs px-2 py-1 bg-blue-500 ">
                                        (Tạm thời fix cứng)
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <h4 className="font-medium text-lg mr-3">
                                        Trạng thái đơn hàng
                                    </h4>
                                    <div className="capitalize badge text-white text-xs px-2 py-1 bg-yellow-500 rounded-3xl">
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                            <button className="bg-red-700 hover:bg-red-800 text-white rounded-full mt-6 w-96 py-2">
                                Hủy Đơn Hàng
                            </button>
                            <Link to={"/shop"}>
                                <button className="bg-slate-700 hover:bg-slate-800 text-white rounded-full mt-6 py-2 w-96">
                                    Tiếp Tục Mua Sắm
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bill;
