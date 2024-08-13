/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from "@/common/types/Category";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    Button,
    Empty,
    message,
    Popconfirm,
    Table,
    TableColumnsType,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const ListCategory = () => {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category"],
        queryFn: () => instance.get("/category"),
    });
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await instance.delete(`/category/${id}`);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa danh mục thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["category"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "success",
                content: "Xóa danh mục thất bại",
            });
        },
    });
    const columns: TableColumnsType = [
        {
            title: "Danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Action",
            key: "operation",
            render: (_: any, category: Category) => (
                <div>
                    <Popconfirm
                        onConfirm={() => mutate(category._id)}
                        title="Xóa danh mục"
                        description="Bạn có chắc chắn là xóa danh mục này không?"
                        icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                    <Link to={`/admin/editCategory/${category._id}`}>
                        <Button type="primary">Sửa</Button>
                    </Link>
                </div>
            ),
        },
    ];
    const dataSource = data?.data.map((categori: Category) => ({
        key: categori._id,
        ...categori,
    }));
    if (isLoading)
        return (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    imageStyle={{ height: 60 }}
                />
            </div>
        );
    if (isError) return <div>{error.message}</div>;
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">Quản lý danh mục</h1>
                <Link to={"/admin/addCategory"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm danh mục
                    </Button>
                </Link>
            </div>
            {contextHolder}
            <Table columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default ListCategory;
