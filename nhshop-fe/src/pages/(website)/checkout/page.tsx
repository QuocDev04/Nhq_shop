/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Empty,
    Form,
    Input,
    Button,
    InputNumber,
    notification,
    Checkbox,
    Row,
    Col,
    Image,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import instance from "@/configs/axios";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

interface Address {
    city: string;
    district: string;
    postalCode: string;
    commune_ward: string;
    streetAddress: string;
    apartment: string;
}

type FieldType = {
    firstName: string;
    lastName: string;
    addresses: Address;
    phone: number;
    email: string;
    orderNotes: string;
};

const CheckOutPages = () => {
    const userId = localStorage.getItem("userId");
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const navigate = useNavigate();
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

    const { mutate: createOrder, isPending } = useMutation({
        mutationFn: async (orderData: FieldType) => {
            try {
                return await instance.post(`/orders`, {
                    userId,
                    ...orderData,
                });
            } catch (error) {
                throw new Error("Error creating order");
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            queryClient.refetchQueries({
                queryKey: ["cart"],
            });
            form.resetFields()
            const _id = data.data._id; // Lấy _id từ dữ liệu phản hồi
            setTimeout(() => navigate(`/bill/${userId}/${_id}`), 1000); 
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Thanh Toán Thất Bại",
                "Bạn thanh toán thất bại. Vui Lòng thử lại sau",
            );
        },
    });
    const cart = data;
    const exchangeRate = 1; // Tỷ giá hối đoái USD -> VND
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const onFinish = (values: FieldType) => {
        console.log(values); // Để kiểm tra dữ liệu gửi đi
        createOrder(values);
    };
    if (isLoading)
        return (
            <div className="mb-96">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                >
                    <Link to={"/shop"}>
                        <Button type="primary">Cần Mua Để Thanh Toán</Button>
                    </Link>
                </Empty>
            </div>
        );
    if (isError)
        return (
            <div className="mb-96">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                >
                    <Link to={"/shop"}>
                        <Button type="primary">Cần Mua Để Thanh Toán</Button>
                    </Link>
                </Empty>
            </div>
        );
    console.log(cart.products);
    return (
        <>
            {contextHolder}
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
                        <span className="hidden lg:block">Shopping Cart</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#05422C]" />
                    <div className="flex items-center gap-x-2">
                        <div className="w-[30px] h-[30px] p-2 text-white bg-[#05422C] invert rounded-[50%] flex place-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke=" #ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-credit-card"
                            >
                                <rect
                                    width={20}
                                    height={14}
                                    x={2}
                                    y={5}
                                    rx={2}
                                />
                                <line x1={2} x2={22} y1={10} y2={10} />
                            </svg>
                        </div>
                        <span>Checkout</span>
                    </div>
                    <div className="lg:w-[74.5px] mb:min-w-[39.5px] h-[1px] bg-[#C3D2CC]" />
                    <div className="flex items-center gap-x-2">
                        <img
                            className="w-[30px] h-[30px] p-2 text-white bg-white rounded-[50%]"
                            src="../Images/order.png"
                            alt=""
                        />
                        <span className="hidden lg:block">Order Complete</span>
                    </div>
                </div>
            </div>
            <div className="mb-52">
                {/* ... other sections ... */}

                {/* form */}
                {cart.quantity === 0 ? (
                    <div className="mb-96">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            imageStyle={{ height: 60 }}
                        >
                            <Link to={"/shop"}>
                                <Button type="primary">
                                    Cần Mua Để Thanh Toán
                                </Button>
                            </Link>
                        </Empty>
                    </div>
                ) : (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-2 gap-6 mx-4">
                            <div>
                                <div className="grid grid-cols-2 gap-6">
                                    <Form.Item
                                        name="firstName"
                                        label="Tên"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập tên!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="py-3 rounded-xl"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="lastName"
                                        label="Họ"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập họ!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="py-3 rounded-xl"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <Form.Item
                                        name={["addresses", "city"]}
                                        label="Thành Phố"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập thành phố!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="py-3 rounded-xl"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={["addresses", "district"]}
                                        label="Huyện"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập huyện!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="py-3 rounded-xl"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={["addresses", "commune_ward"]}
                                        label="Xã / Phường"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập xã/phường!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="py-3 rounded-xl"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    name={["addresses", "streetAddress"]}
                                    label="Địa Chỉ"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập địa chỉ!",
                                        },
                                        {
                                            min: 5,
                                            message:
                                                "Địa chỉ phải có ít nhất 5 ký tự!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="py-3 rounded-xl"
                                        placeholder="Số nhà và tên đường"
                                        disabled={isPending}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={["addresses", "apartment"]}
                                    label="Căn hộ (tùy chọn)"
                                >
                                    <Input
                                        disabled={isPending}
                                        className="py-3 rounded-xl mt-2"
                                        placeholder="Căn hộ, phòng, đơn vị, v.v."
                                    />
                                </Form.Item>
                                <div className="grid grid-cols-3 gap-6">
                                    <Form.Item
                                        name="phone"
                                        label="Số điện thoại"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập số điện thoại!",
                                            },
                                            {
                                                type: "number",
                                                min: 0,
                                                message:
                                                    "Vui lòng nhập đúng số điện thoại",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            className="py-2 rounded-xl w-56"
                                            disabled={isPending}
                                        />
                                    </Form.Item>
                                    <Form.Item name="email" label="Email">
                                        <Input
                                            disabled={isPending}
                                            className="py-3 rounded-xl"
                                            placeholder="abc@email.com"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name={["addresses", "postalCode"]}
                                        label="Mã bưu điện (Nếu có)"
                                    >
                                        <Input
                                            disabled={isPending}
                                            className="py-3 rounded-xl"
                                            placeholder="Mã bưu điện"
                                        />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    name="orderNotes"
                                    label="Ghi chú đơn hàng (tùy chọn)"
                                >
                                    <TextArea
                                        className="py-3 rounded-xl"
                                        disabled={isPending}
                                    />
                                </Form.Item>
                            </div>
                            <div className="rounded-lg mt-3">
                                {cart.totalQuantity === 0 ? (
                                    ""
                                ) : (
                                    <ul className="text-xs grid grid-cols-2">
                                        {cart.products.map((product:any) => (
                                            <li
                                                className="flex items-center gap-y-4"
                                                key={product.productId}
                                            >
                                                <Image
                                                    src={product.img}
                                                    alt={product.name}
                                                    style={{ width: 50 }}
                                                />
                                                <div className="flex justify-between gap-20">
                                                    <h3 className=" text-[#9D9EA2]">
                                                        {product.name}
                                                    </h3>
                                                    <dl className="mt-0.5 text-gray-600">
                                                        <div>
                                                            <dd className="inline text-sm text-red-500">
                                                                {formatCurrency(
                                                                    product.price,
                                                                )}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                    <h3 className=" text-[#9D9EA2]">
                                                        {product.quantity}x
                                                    </h3>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {cart.totalQuantity === 0 ? (
                                    <div className="border rounded-2xl flex flex-col gap-y-5 lg:p-6 px-5 py-[22px]">
                                        <div className="flex flex-col gap-y-[17px] border-b pb-5">
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Tổng tất cả{" "}
                                                </span>
                                                <p>0đ</p>
                                            </section>
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Tổng số lượng{" "}
                                                </span>
                                                <p>0x</p>
                                            </section>
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Tổng giảm giá{" "}
                                                </span>
                                                <p>0đ</p>
                                            </section>
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Shipping Costs{" "}
                                                </span>
                                                <p>0đ</p>
                                            </section>
                                        </div>
                                        <Checkbox.Group
                                            style={{ width: "100%" }}
                                        >
                                            <Row>
                                                <Col span={8}>
                                                    <Checkbox value="A">
                                                        Thanh toán khi nhận hàng
                                                    </Checkbox>
                                                </Col>
                                                <Col span={10}>
                                                    <Checkbox value="B">
                                                        Thanh toán trước nhận
                                                        hàng sau
                                                    </Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                        <div className="flex flex-col gap-y-4">
                                            <span className="tracking-[0.8px] text-[#717378] text-xs">
                                                SECURE PAYMENTS PROVIDED BY
                                            </span>
                                            <div className="flex items-center gap-x-3 *:cursor-pointer">
                                                <img
                                                    src="../Images/mastercard_v1.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="../Images/mastercard_v2.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="../Images/mastercard_v3.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="../Images/mastercard_v4.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="w-full text-lg mt-2 rounded-xl py-4 bg-[#FFBF00]"
                                            disabled={cart.totalQuantity === 0} // Disable if cart is empty
                                        >
                                            Checkout
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border rounded-2xl flex flex-col gap-y-5 lg:p-6 px-5 py-[22px]">
                                        <div className="flex flex-col gap-y-[17px] border-b pb-5">
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Tổng tất cả{" "}
                                                </span>
                                                <p>
                                                    {formatCurrency(
                                                        cart.finalTotalPrice,
                                                    )}
                                                </p>
                                            </section>
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Tổng số lượng{" "}
                                                </span>
                                                <p>{cart.totalQuantity}x</p>
                                            </section>
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Tổng giảm giá{" "}
                                                </span>
                                                <p>
                                                    {formatCurrency(
                                                        cart.totalDiscount,
                                                    )}
                                                </p>
                                            </section>
                                            <section className="flex justify-between text-sm">
                                                <span className="text-[#9D9EA2]">
                                                    Shipping Costs{" "}
                                                </span>
                                                <p>{cart.shippingCosts}</p>
                                            </section>
                                        </div>
                                        {/* <Checkbox.Group
                                            style={{ width: "100%" }}
                                        >
                                            <Row>
                                                <Col span={8}>
                                                    <Checkbox
                                                        value="A"
                                                        disabled={isPending}
                                                    >
                                                        Thanh toán khi nhận hàng
                                                    </Checkbox>
                                                </Col>
                                                <Col span={10}>
                                                    <Checkbox
                                                        value="B"
                                                        disabled={isPending}
                                                    >
                                                        Thanh toán trước nhận
                                                        hàng sau
                                                    </Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group> */}

                                        <div className="grid grid-cols-2 gap-4">
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="w-full text-lg mt-2 rounded-xl py-4 bg-[#e22828]"
                                                disabled={isPending}
                                            >
                                                {isPending ? (
                                                    <>
                                                        <LoadingOutlined className="animate-spin" />
                                                    </>
                                                ) : (
                                                    "Thanh toán khi nhận hàng (COD)"
                                                )}
                                            </Button>
                                            <Button
                                                type="primary"
                                                className="w-full text-lg mt-2 rounded-xl py-4 bg-[#256aff]"
                                                disabled={isPending}
                                            >
                                                {isPending ? (
                                                    <>
                                                        <LoadingOutlined className="animate-spin" />
                                                    </>
                                                ) : (
                                                    "Thanh Toán trực tuyến (Payment)"
                                                )}
                                            </Button>
                                        </div>

                                        <div className="flex flex-col gap-y-4">
                                            <span className="tracking-[0.8px] text-[#717378] text-xs">
                                                SECURE PAYMENTS PROVIDED BY
                                            </span>
                                            <div className="flex items-center gap-x-3 *:cursor-pointer">
                                                <img
                                                    src="../Images/mastercard_v1.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="../Images/mastercard_v2.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="../Images/mastercard_v3.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="../Images/mastercard_v4.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Form>
                )}
            </div>
        </>
    );
};

export default CheckOutPages;
