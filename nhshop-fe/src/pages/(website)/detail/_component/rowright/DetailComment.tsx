/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    Empty,
    Form,
    FormProps,
    Input,
    Modal,
    notification,
    Popover,
} from "antd";
import { useState } from "react";
import { AiOutlineEllipsis, AiOutlineSend } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
type FieldType = {
    text: string;
};
const DeatilComment = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const userId = localStorage.getItem("userId");
    const [api, contextHolder] = notification.useNotification();
    const queryClient = useQueryClient();
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
        data: comment,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["comment"],
        queryFn: () => instance.get("/comment"),
    });

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => instance.get(`/user/${userId}`),
    });

    const { id: productId } = useParams();

    const { mutate: del } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`/comment/${id}`);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Xóa Bình Luận",
                "Bạn Xóa Bình Luận Thành Công",
            );
            queryClient.invalidateQueries({
                queryKey: ["comment"],
            });
        },
        onError: () =>
            openNotification(false)(
                "error",
                "Xóa Bình Luận",
                "Bạn Xóa Bình Luận Thất Bại",
            ),
    });
    const { mutate: addComment } = useMutation({
        mutationFn: async (data: FieldType) => {
            try {
                return await instance.post(`/comment`, {
                    userId,
                    productId,
                    ...data,
                });
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comment"],
            });
            form.resetFields();
        },
        onError: () => {
            openNotification(false)(
                "error",
                "Thêm Bình Luận",
                "Thêm Bình Luận Bị Lỗi. Vui Lòng Thử Lại Sau",
            );
        },
    });
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        addComment(values);
    };
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const nav = () => {
        navigate("/login");
    };
    if (isLoading)
        return (
            <div>
                {" "}
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                />
            </div>
        );
    if (isError)
        return (
            <div>
                {" "}
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                />
            </div>
        );
    return (
        <>
            {contextHolder}
            <div className="w-[900px] mt-10 border rounded-md px-6 p-8">
                <h3 className="font-medium text-xl">Đánh Giá Sản Phẩm</h3>
                <div>
                    <p className="text-sm text-neutral-400 mb-8">
                        Vui lòng đặt câu hỏi, ai đó sẽ giúp bạn trả lời
                    </p>
                    <hr className="my-6 w-full h-1" />
                    <div className="product-description text-sm" />
                    <div className="grid grid-cols-1 gap-y-6">
                        <div className="grid grid-cols-1 gap-y-4 h-96 overflow-y-auto">
                            {comment?.data.length === 0 ? (
                                <div>
                                    {" "}
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        imageStyle={{ height: 60 }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    {comment?.data.map((item: any) => (
                                        <div className=" flex items-start space-x-3 my-5 ">
                                            <div className="flex flex-col bg-violet-100 bg-opacity-50 rounded-3xl px-3 py-4 w-96 relative">
                                                <p className="mb-2 mx-2 text-xs font-semibold flex">
                                                    <img
                                                        className=" w-10 h-10 rounded-full"
                                                        src={item.user?.avatar}
                                                        alt=""
                                                    />

                                                    <p className="my-auto mx-2">
                                                        {item.user?.name}
                                                    </p>
                                                </p>
                                                {item.user?.userId ===
                                                userId ? (
                                                    <i className="text-xl reply-btn absolute bottom-3 right-4 cursor-pointer">
                                                        <Popover
                                                            content={
                                                                <div className="w-10 text-center">
                                                                    <Link
                                                                        to={""}
                                                                    >
                                                                        <div className="mb-1 ">
                                                                            Sửa
                                                                        </div>
                                                                    </Link>

                                                                    <div
                                                                        className="cursor-pointer text-red-600"
                                                                        onClick={() =>
                                                                            del(
                                                                                item._id,
                                                                            )
                                                                        }
                                                                    >
                                                                        Xóa
                                                                    </div>
                                                                </div>
                                                            }
                                                            trigger="click"
                                                            className="cursor-pointer"
                                                        >
                                                            <AiOutlineEllipsis />
                                                        </Popover>
                                                    </i>
                                                ) : (
                                                    ""
                                                )}

                                                <p className="mb-0 text-sm">
                                                    {item.text}
                                                </p>
                                                <span className="absolute right-4 text-xs">
                                                    {new Date(
                                                        item.createdAt,
                                                    ).toLocaleString(
                                                        "vi-VN",
                                                    )}{" "}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {userId ? (
                    <>
                        <div className="flex items-start space-x-4">
                            <img
                                className=" w-10 h-10 rounded-full"
                                src={user?.data.avatar}
                                alt=""
                            />
                            <Form
                                onFinish={onFinish}
                                className="flex"
                                form={form}
                            >
                                <Form.Item name={"text"}>
                                    <Input
                                        placeholder="Nhập vào đây để bình luận"
                                        className="w-80 h-9"
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        <AiOutlineSend className="size-4" />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                ) : (
                    <div className="flex items-start space-x-4">
                        <img
                            className=" w-10 h-10 rounded-full"
                            src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/avatar-trang-4.jpg"
                            alt=""
                        />
                        <Form className="flex">
                            <Form.Item>
                                <Input
                                    placeholder="Nhập vào đây để bình luận"
                                    className="w-80 h-9"
                                />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={showModal}
                                >
                                    <AiOutlineSend className="size-4" />
                                </Button>
                            </Form.Item>
                        </Form>
                        <Modal
                            title="Thông Báo"
                            open={open}
                            onOk={nav}
                            onCancel={hideModal}
                            okText="Đăng Nhập"
                            cancelText="Hủy"
                        >
                            <p>Vui Lòng Đăng Nhập Để Bình Luận</p>
                        </Modal>
                    </div>
                )}
            </div>
        </>
    );
};

export default DeatilComment;
