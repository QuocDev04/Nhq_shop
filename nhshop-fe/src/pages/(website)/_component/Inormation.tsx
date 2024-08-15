/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Empty,
    Form,
    FormProps,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Tabs,
    TabsProps,
} from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

type FieldType = {
    name: string;
    password: string;
    phone: number;
    avatar: string;
    district: string;
    city: string;
};

const Information = () => {
    //TABS1
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const cities = [
        {
            name: "Hà Nội",
            districts: [
                "Ba Đình",
                "Hoàn Kiếm",
                "Tây Hồ",
                "Cầu Giấy",
                "Đống Đa",
            ],
        },
        {
            name: "TP Hồ Chí Minh",
            districts: [
                "Quận 1",
                "Quận 2",
                "Quận 3",
                "Bình Thạnh",
                "Phú Nhuận",
            ],
        },
        {
            name: "Đà Nẵng",
            districts: [
                "Hải Châu",
                "Thanh Khê",
                "Liên Chiểu",
                "Sơn Trà",
                "Ngũ Hành Sơn",
            ],
        },
    ];
    const handleCityChange = (value: string) => {
        setSelectedCity(value);
        setSelectedDistrict(""); // Reset district to empty when city changes
    };
    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
    };
    const districts = selectedCity
        ? cities.find((city) => city.name === selectedCity)?.districts || []
        : [];
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
    };
    // const userId = localStorage.getItem("userId")
    const { id } = useParams();
    const { data: user,
        isLoading,
        isError, } = useQuery({
        queryKey: ["user", id],
        queryFn: () => instance.get(`/user/${id}`),
    });
    console.log("user", user?.data);

    // END TABS1

    // TABS 2
    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const {
        data: order,
    } = useQuery({
        queryKey: ["order"],
        queryFn: () => instance.get("/orders"),
    });
    console.log("order",order?.data);
    //ENDTABS 2
    if (isLoading)
        return (
            <>
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
            </>
        );
    if (isError)
        return (
            <>
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
            </>
        );
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Thông tin của tôi",
            children: (
                <>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                        initialValues={user?.data}
                    >
                        <Form.Item className="w-32">
                            <Image
                                src={user?.data.avatar}
                                alt=""
                                className=" w-10 h-10 rounded-full"
                            />
                        </Form.Item>
                        <Form.Item name="avatar" label="Tải ảnh lên">
                            <Input placeholder="URL ảnh" className="h-10" />
                        </Form.Item>
                        <div className="grid grid-cols-4 gap-5">
                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập tên!",
                                    },
                                    {
                                        type: "string",
                                        min: 6,
                                        message: "Tên phải có ít nhất 6 ký tự!",
                                    },
                                ]}
                            >
                                <Input placeholder="Tên" className="h-10" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email!",
                                    },
                                    {
                                        type: "email",
                                        message: "Email không hợp lệ!",
                                    },
                                ]}
                            >
                                <Input placeholder="Email" className="h-10" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Mật Khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu!",
                                    },
                                    {
                                        type: "string",
                                        min: 6,
                                        message:
                                            "Mật khẩu phải có ít nhất 6 ký tự!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    disabled
                                    placeholder="Mật Khẩu"
                                    className="h-10"
                                />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Số Điện Thoại"
                                rules={[
                                    {
                                        type: "number",
                                        min: 0,
                                        message:
                                            "Vui lòng nhập đúng số điện thoại!",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Số Điện Thoại"
                                    className="w-32 h-10"
                                />
                            </Form.Item>
                            <div className="flex gap-3">
                                <Form.Item name="city" label="Chọn Thành Phố">
                                    <Select
                                        value={selectedCity}
                                        onChange={handleCityChange}
                                        style={{ width: 300, height: 40 }}
                                        placeholder="Chọn Thành Phố"
                                    >
                                        {cities.map((city) => (
                                            <Select.Option
                                                key={city.name}
                                                value={city.name}
                                            >
                                                {city.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {selectedCity && (
                                    <Form.Item
                                        name="district"
                                        label="Chọn Huyện"
                                    >
                                        <Select
                                            value={selectedDistrict || ""}
                                            onChange={handleDistrictChange}
                                            style={{ width: 300, height: 40 }}
                                            placeholder="Chọn Huyện"
                                        >
                                            <Select.Option value="" key="empty">
                                                Chọn Huyện
                                            </Select.Option>
                                            {districts.map((district) => (
                                                <Select.Option
                                                    key={district}
                                                    value={district}
                                                >
                                                    {district}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                )}
                            </div>
                        </div>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </>
            ),
        },
        {
            key: "2",
            label: "Đơn hàng của tôi",
            children: (
                <div className="overflow-y-auto h-[700px]">
                    <h1 className="font-medium text-3xl text-center">
                        Thông Tin Đơn Hàng
                    </h1>
                    {order?.data.length === 0 ?(
                        <>
                                <Empty
                                className="w-[1150px]"
                                >
                                    <Link to={"/shop"}>
                                        <Button type="primary">Quay lại Để Mua</Button>
                                    </Link>
                                </Empty>
                        </>
                    ):(
                       <>
                        {order?.data.map((item: any) => (
                        <div className="grid grid-cols-2 relative gap-8 mt-6 my-16 border py-10 border-black rounded-3xl text-center ">
                            <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
                                {item.status}
                            </span>
                            <div className="flex flex-col space-y-6 mx-10">
                                <h4 className="font-medium text-xl">
                                    Thông tin đặt hàng
                                </h4>
                                <div className="grid grid-cols-5 ">
                                    <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                        ID Đặt Hàng
                                    </p>
                                    <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                        {item._id}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                        Thời Gian Đặt Hàng
                                    </p>
                                    <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                        {new Date(
                                            item.createdAt,
                                        ).toLocaleString("vi-VN")}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                        Thông Tin Người Đặt
                                    </p>
                                    <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                        {item.lastName + " " + item.firstName}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                        Email
                                    </p>
                                    <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                        {item.email}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                        Số Điện Thoại
                                    </p>
                                    <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                        {item.phone}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className=" mb-0 font-medium col-span-2 text-md text-neutral-600">
                                        Giao đến địa chỉ{" "}
                                    </p>
                                    <p className=" mb-0 font-medium col-span-3 text-base w-full">
                                        {item.addresses.map(
                                            (item: any) =>
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
                                <div className="grid grid-cols-2">
                                    {item.items.map((item: any) => (
                                        <div
                                            className="flex items-center my-2"
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
                                </div>
                                <hr className="w-full my-3" />
                                <div className="flex justify-between ">
                                    <p className="font-semibold text-sm">
                                        Tổng số tiền (Bao gồm phí vận chuyển)
                                    </p>
                                    <p className="font-semibold text-sm mr-9">
                                        {formatCurrency(item.totalPrice)}
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
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-red-700 hover:bg-red-800 text-white rounded-full mt-6 w-96 py-2">
                                    Hủy Đơn Hàng
                                </button>
                            </div>
                        </div>
                    ))}
                       </> 
                    )}
                   
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto max-w-[1440px] mb-96 p-4 pt-14 md:p-8 ">
            <div className="mx-auto max-w-[1200px] rounded-md bg-white border border-black">
                <div className="flex items-center justify-between">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        type="card"
                        className="px-4 overflow-y-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Information;
