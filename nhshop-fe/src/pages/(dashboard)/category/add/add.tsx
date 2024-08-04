import instance from "@/configs/axios";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
type FieldType = {
    name: string;
};
const AddCategory = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const {mutate} = useMutation({
        mutationFn:async(data:FieldType)=>{
            try {
             return await instance.post(`/category`, data);
            } catch (error) {
                throw new Error('error')
            }
        },
        onSuccess:()=>{
            messageApi.open({
                type:"success",
                content:"Thêm danh mục thành công"
            })
            form.resetFields()
        },
        onError:()=>{
            messageApi.open({
                type:'error',
                content:"Thêm danh mục thất bại, Vui lòng thử lại sau"
            })
        }
    })
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        mutate(values)
    };
    const validateMessages = {
        required: "${label} is required!",
    };
    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                name="basic"
                initialValues={{ remember: true }}
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
}
 
export default AddCategory;