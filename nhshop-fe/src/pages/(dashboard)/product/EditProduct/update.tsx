/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Checkbox,
    Form,
    FormProps,
    GetProp,
    Image,
    Input,
    InputNumber,
    message,
    Skeleton,
    Upload,
    UploadFile,
    UploadProps,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { AiFillBackward } from "react-icons/ai";
import { AddIProduct } from "@/common/types/IProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import instance from "@/configs/axios";
import { Category } from "@/common/types/Category";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const EditPage = () => {
    const { id } = useParams();
    const [value, setValue] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    // Khởi tạo fileList từ dữ liệu API
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => instance.get(`/product/${id}`),
    });
    const { data: category } = useQuery({
        queryKey: ["category"],
        queryFn: () => instance.get("/category"),
    });
    useEffect(() => {
        if (product?.data.gallery) {
            setFileList(
                product?.data?.gallery?.map((url: any, index: number) => {
                    return {
                        uid: index.toString(),
                        name: `gallery${index}`,
                        status: "done",
                        url: url,
                    };
                }),
            );
        }
            if (product?.data?.category) {
                // Chuyển đổi danh mục thành mảng các ID đã chọn
                const selectedCategoryIds = product.data.category.map(
                    (cat: Category) => cat._id,
                );
                form.setFieldsValue({
                    category: selectedCategoryIds,
                });
            }
    }, [product, form]);
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AddIProduct) => {
            try {
                return await instance.put(`/product/${id}`, data);
            } catch (error) {
                throw new Error(`Call api thất bại. Vui lòng thử lại sau!`);
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Bạn sửa sản phẩm thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["product"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Bạn sửa sản phẩm thất bại. Vui lòng thử lại sau!",
            });
        },
    });
    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        console.log({ newFileList });
        setFileList([...newFileList]); // Sử dụng spread operator để duy trì danh sách file
    };

    const onFinish: FormProps<AddIProduct>["onFinish"] = (values) => {
        const imageUrls = fileList
            .filter((file) => file.status === "done") // Lọc chỉ các ảnh đã tải lên thành công
            .map((file) => file.response?.secure_url); // Lấy URL từ phản hồi

        const newValues = {
            ...values,
            gallery: imageUrls,
        };
        mutate(newValues);
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
    ];
    const modules = {
        toolbar: toolbarOptions,
    };
    if (isError) return <div>{error.message}</div>;
    console.log(product?.data?.category);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl">
                    Sửa sản phẩm: {product?.data?.name}
                </h1>
                <Link to={"/admin/product"}>
                    <Button type="primary">
                        <AiFillBackward />
                        Quay lại
                    </Button>
                </Link>
            </div>
            {contextHolder}
            <Skeleton loading={isLoading}>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        ...product?.data,
                        category:
                            product?.data?.category?.map(
                                (category: Category) => category._id,
                            ) || [],
                        // product?.data?.category?.map(
                        //     (cat: Category) => cat._id,
                        // ) || [],
                    }}
                >
                    <div className="grid grid-cols-[auto,300px]">
                        <div className="py-5">
                            <Form.Item
                                label="Tên sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên sản phẩm bắt buộc nhập",
                                    },
                                ]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                            <Form.Item
                                label="Ảnh chính sản phẩm"
                                name="img"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Ảnh sản phẩm bắt buộc phải có",
                                    },
                                ]}
                            >
                                <Input disabled={isPending} />
                            </Form.Item>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <Form.Item
                                    label="Giá sản phẩm"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Giá sản phẩm bắt buộc nhập",
                                        },
                                        {
                                            type: "number",
                                            min: 0,
                                            message: "Giá không được nhỏ hơn 0",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ",",
                                            )
                                        }
                                        parser={(value) =>
                                            value
                                                ? value.replace(
                                                      /\$\s?|(,*)/g,
                                                      "",
                                                  )
                                                : ""
                                        }
                                        disabled={isPending}
                                    />
                                    {/* Thuộc tính formatter là một hàm để định dạng giá trị hiển thị trong trường đầu vào.
                        Hàm formatter nhận vào giá trị value và trả về giá trị đã được định dạng với dấu phẩy để phân cách hàng nghìn.
                        Biểu thức \B(?=(\d{3})+(?!\d)) là một biểu thức chính quy (regular expre */}
                                </Form.Item>
                                <Form.Item
                                    label="Giá khuyến mãi"
                                    name="discount"
                                    rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const price =
                                                    getFieldValue("price");
                                                if (
                                                    !value ||
                                                    (value < price &&
                                                        value >= 0)
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                if (value >= price) {
                                                    return Promise.reject(
                                                        new Error(
                                                            "Giá khuyến mãi phải nhỏ hơn giá sản phẩm",
                                                        ),
                                                    );
                                                }
                                                if (value < 0) {
                                                    return Promise.reject(
                                                        new Error(
                                                            "Giá khuyến mãi không được là số âm",
                                                        ),
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ",",
                                            )
                                        }
                                        parser={(value) =>
                                            value
                                                ? value.replace(
                                                      /\$\s?|(,*)/g,
                                                      "",
                                                  )
                                                : ""
                                        }
                                        disabled={isPending}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số lượng sản phẩm"
                                    name="countInstock"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Số lượng sản phẩm bắt buộc nhập",
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ width: "100%" }}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ",",
                                            )
                                        }
                                        parser={(value) =>
                                            value
                                                ? value.replace(
                                                      /\$\s?|(,*)/g,
                                                      "",
                                                  )
                                                : ""
                                        }
                                        disabled={isPending}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Mô tả sản phẩm"
                                name="description"
                            >
                                <ReactQuill
                                    className="h-[200px]"
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                    modules={modules}
                                />
                            </Form.Item>

                            <Form.Item
                                name="featured"
                                valuePropName="checked"
                                className="mt-20"
                            >
                                <Checkbox disabled={isPending}>
                                    Sản phẩm nổi bật
                                </Checkbox>
                            </Form.Item>
                        </div>
                        <div className="ml-5">
                            <Form.Item name="category" valuePropName="value">
                                <h1 className="text-lg text-center py-2">
                                    Danh mục sản phẩm
                                </h1>
                                <Checkbox.Group
                                    style={{ width: "100%" }}
                                    options={
                                        category?.data?.map(
                                            (cat: Category) => ({
                                                label: cat.name,
                                                value: cat._id,
                                            }),
                                        ) || []
                                    }
                                    disabled={isPending}
                                    // Sử dụng `value` của `Checkbox.Group` để hiển thị các checkbox đã được chọn
                                    value={form.getFieldValue("category")}
                                    onChange={(selectedValues) => {
                                        form.setFieldsValue({
                                            category: selectedValues,
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name="gallery">
                                <h1 className="text-lg text-center py-2">
                                    Ảnh phụ sản phẩm
                                </h1>
                                <Upload
                                    action="https://api.cloudinary.com/v1_1/ecommercer2021/image/upload"
                                    data={{ upload_preset: "demo-upload" }}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    multiple
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <Image
                                    wrapperStyle={{ display: "none" }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) =>
                                            setPreviewOpen(visible),
                                        afterOpenChange: (visible) =>
                                            !visible && setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            </Form.Item>
                            <Form.Item label="Thẻ" name="tags">
                                <Input disabled={isPending} />
                            </Form.Item>
                        </div>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <LoadingOutlined className="animate-spin" />
                                    </>
                                ) : (
                                    "Sửa"
                                )}
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Skeleton>
        </>
    );
};

export default EditPage;
