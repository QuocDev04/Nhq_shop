import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import { useParams } from "react-router-dom";
type FieldType = {
    name: string;
};
const EditCategory = () => {
    const [form] = Form.useForm();
    const {id} = useParams()
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();
    const {data:category, isLoading, isError, error} = useQuery({
        queryKey:['category',id],
        queryFn:()=> instance.get(`/category/${id}`)
    })
    const { mutate } = useMutation({
        mutationFn: async (data: FieldType) => {
            try {
                return await instance.put(`/category/${id}`, data);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Sửa danh mục thành công",
            });
            queryClient.invalidateQueries({
                queryKey:['category']
            })
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Sửa danh mục thất bại, Vui lòng thử lại sau",
            });
        },
    });
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        mutate(values);
    };
    const validateMessages = {
        required: "${label} is required!",
    };
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>{error.message}</div>
    console.log(category?.data?.category);
    
    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ ...category?.data?.category }}
                onFinish={onFinish}
                autoComplete="off"
                validateMessages={validateMessages}
            >
                <Form.Item<FieldType>
                    label="Danh mục"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditCategory;
