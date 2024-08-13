import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    Button,
    Empty,
    Form,
    FormProps,
    Input,
    notification,
    Space,
} from "antd";
import { Link, useParams } from "react-router-dom";
type FieldType = {
    email: string;
    password: string;
    name: string;
    role: string;
    city: string;
    district: string;
    commune: string;
    phone: number;
    avatar: string;
};
const EditUser = () => {
    const [api, contextHolder] = notification.useNotification();
    const { id } = useParams();
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
    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user", id],
        queryFn: () => instance.get(`/user/${id}`),
    });
    const { mutate } = useMutation({
        mutationFn: async (item: FieldType) => {
            try {
                return await instance.put(`/user/${id}`, item);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () =>
            openNotification(false)(
                "success",
                "Bạn Sửa Thành Công",
                "Bạn Đã Sửa Thành Công",
            ),
        onError: () =>
            openNotification(false)(
                "error",
                "Bạn Sửa Thất Bại",
                "Bạn Đã Sửa Thất Bại",
            ),
    });
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        mutate(values);
    };
    if (isLoading)
        return (
            <div>
                {" "}
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        );
    if (isError)
        return (
            <div>
                {" "}
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        );
    return (
        <>
            {contextHolder}
            <div className="flex justify-between m-5">
                <h1 className="text-2xl font-medium">Sửa</h1>
                <Link to={"/admin/users"}>
                    <Button type="primary">Quay Lại</Button>
                </Link>
            </div>
            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={user?.data}
            >
                <div className="grid grid-cols-3 gap-3">
                    <Form.Item
                        name="name"
                        label="Tên"
                        rules={[{ required: true }, { type: "string", min: 6 }]}
                    >
                        <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật Khẩu"
                        rules={[
                            { required: true },
                            { type: "string", min: 6 },
                        ]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    <Form.Item
                        name="city"
                        label="Thành Phố"
                        rules={[
                            { type: "string", min: 6 },
                        ]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        name="district"
                        label="Huyện"
                        rules={[
                            { type: "string", min: 6 },
                        ]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        name="commune"
                        label="Xã"
                        rules={[
                            { type: "string", min: 6 },
                        ]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số Điện Thoại"
                        rules={[
                            { type: "number", min: 6 },
                        ]}
                    >
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                </div>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true },
                        { type: "string", min: 6 },
                    ]}
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Avatar"
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

export default EditUser;
