/* eslint-disable @typescript-eslint/no-explicit-any */
// useState
// import { useEffect, useState } from "react";
// import { IProduct } from "../../../common/types/IProduct";
// import { delProduct, getAllProduct } from "../../../services/product";
// import { Link } from "react-router-dom";
// import Loading from "./_component/Loading";
// import ErrorPage from "./_component/Error";
// const ProductPage = () => {
//     const [products, setProduct] = useState<IProduct[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [deleteId, setDeleteId] = useState("");
//     const [Modal, setOpenModal] = useState(false);
//     const closeModal = () => {
//         setOpenModal(false);
//     };
//     const handlDelete = (id: string) => {
//         setOpenModal(true);
//         setDeleteId(id);
//     };
//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await getAllProduct();
//                 const data = await response.data;
//                 if (response.status !== 200) throw new Error("Error");
//                 setProduct(data);
//             } catch (error) {
//                 setError(true);
//             } finally {
//                 setIsLoading(false);
//             }
//         })();
//     }, []);
//     const Remove = async () => {
//         try {
//             setIsLoading(true);
//             const response = await delProduct(deleteId);
//             if (response.status !== 200) return alert("loi");
//             setProduct(products.filter((pro) => pro._id !== deleteId));
//             alert("thnah cong");
//         } catch (error) {
//             setError(true);
//         } finally {
//             setIsLoading(false);
//             setOpenModal(false);
//         }
//     };
//     if (isLoading) return <Loading />;
//     if (error) return <ErrorPage />;
//     return (
//         <div>
//             <div className="relative overflow-x-auto shadow-md sm:rounded-xl ">
//                 <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
//                     <div>
//                         {" "}
//                         <Link to={"/admin/add"}>
//                             <button
//                                 id="dropdownRadioButton"
//                                 data-dropdown-toggle="dropdownRadio"
//                                 className="inline-flex items-center ml-3 text-black bg-white border border-green-900 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm px-3 py-1.5  dark:bg-white dark:text-black hover:text-white dark:border-green-900  dark:focus:ring-green-600"
//                                 type="button"
//                             >
//                                 Thêm sản phẩm
//                             </button>
//                         </Link>
//                     </div>
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
//                             <svg
//                                 className="w-5 h-5 text-black dark:text-black"
//                                 aria-hidden="true"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </div>
//                         <input
//                             type="text"
//                             id="table-search"
//                             className="block p-2 ps-10 text-sm text-black border border-gray-300 rounded-xl w-80 bg-gray-50 dark:bg-white dark:placeholder-black dark:text-black"
//                             placeholder="Search for items"
//                         />
//                     </div>
//                 </div>
//                 <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black border-2">
//                     <thead className="text-xs uppercase dark:bg-white dark:text-black">
//                         <tr>
//                             <th scope="col" className="p-4"></th>
//                             <th scope="col" className="px-6 py-3">
//                                 Image
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Product name
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Price
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Category
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Description
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Action
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products &&
//                             products.map((items, index) => (
//                                 <tr
//                                     key={index}
//                                     className="bg-white border dark:bg-white dark:border-green-700 hover:bg-gray-50"
//                                 >
//                                     <td className="w-4 p-4">
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
//                                             />
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <img
//                                             src={`${items.img}`}
//                                             alt=""
//                                             className="w-20"
//                                         />
//                                     </td>
//                                     <th className="px-6 py-4">
//                                         {items.productname}
//                                     </th>
//                                     <td className="px-6 py-4">{items.price}</td>
//                                     <td className="px-6 py-4">
//                                         {items.category}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {items.description}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <Link to={"/admin/:id/edit"}>
//                                             <i className="fa-solid fa-pen-to-square fa-lg hover:text-yellow-300"></i>
//                                         </Link>
//                                         <button
//                                             onClick={() =>
//                                                 handlDelete(items._id!)
//                                             }
//                                             className="text-red-400 ml-3 hover:text-red-600"
//                                         >
//                                             <i className="fa-solid fa-trash-can fa-lg"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         {Modal && (
//                             <div
//                                 id="modal"
//                                 className="bg-gray-600 fixed inset-0 bg-opacity-50 justify-center items-center z-50"
//                             >
//                                 <div className="flex justify-center items-center h-full w-full">
//                                     <div className=" relative rounded-xl p-8 w-2/2 dark:bg-gray-700 fade-in modal-content z-50">
//                                         <button
//                                             type="button"
//                                             onClick={closeModal}
//                                             className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-900 rounded-xl text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                                         >
//                                             <svg
//                                                 className="w-3 h-3"
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 14 14"
//                                             >
//                                                 <path
//                                                     stroke="currentColor"
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth={2}
//                                                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                                 />
//                                             </svg>
//                                         </button>
//                                         <div className="p-4 md:p-5 text-center">
//                                             <svg
//                                                 className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 20 20"
//                                             >
//                                                 <path
//                                                     stroke="currentColor"
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth={2}
//                                                     d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                                                 />
//                                             </svg>
//                                             <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
//                                                 BẠN CHẮC CHẮC MUỐN XÓA SẢN PHẨM
//                                                 NÀY CHỨ ?
//                                             </h3>
//                                             <button
//                                                 type="button"
//                                                 onClick={closeModal}
//                                                 className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                                             >
//                                                 No, cancel
//                                             </button>

//                                             <button
//                                                 onClick={Remove}
//                                                 type="button"
//                                                 className="text-white ms-3  bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-xl text-sm inline-flex items-center px-5 py-2.5 text-center"
//                                             >
//                                                 Yes, I'm sure
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
// export default ProductPage;

//useQuery
import {
    AiOutlinePlusCircle,
    AiTwotoneDelete,
    AiFillEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Category } from "@/common/types/Category";
import { IProduct } from "@/common/types/IProduct";
import { delProduct } from "@/services/product";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Empty, message, Popconfirm, Table, TableColumnsType } from "antd";

import instance from "@/configs/axios";

const ProductPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { data, isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => instance.get(`/product`),
    });
    console.log(data?.data);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                return await delProduct(id);
            } catch (error) {
                throw new Error("error");
            }
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["product"],
            });
        },
        onError: () => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thất bại",
            });
        },
    });

    const dataSource = data?.data.map((product: IProduct) => ({
        key: product._id,
        ...product,
    }));

    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const createFilter = (products: IProduct[]) => {
        return products
            .map((product: IProduct) => product.name)
            .filter(
                (value: string, index: number, self: string[]) =>
                    self.indexOf(value) === index,
            )
            .map((name: string) => ({ text: name, value: name }));
    };

    const columns: TableColumnsType = [
        {
            title: "Tên Sản Phẩm",
            width: 200,
            dataIndex: "name",
            key: "name",
            fixed: "left",
            filterSearch: true,
            filters: data ? createFilter(data?.data) : [],
            onFilter: (value: string, product: IProduct) =>
                product.name.includes(value),
            sorter: (a: IProduct, b: IProduct) => a.name.localeCompare(b.name),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Giá",
            dataIndex: "price",
            width: 150,
            key: "price",
            className: "text-red-500",
            render: (_: any, product: IProduct) =>
                formatCurrency(product.price),
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Ảnh chính",
            dataIndex: "img",
            key: "img",
            render: (img: string) => (
                <img src={img} style={{ width: "100px", height: "auto" }} />
            ),
        },
        {
            title: "Ảnh phụ",
            dataIndex: "gallery",
            key: "gallery",
            render: (gallery: string[]) => {
                const firstImage =
                    gallery && gallery.length > 0 ? gallery[0] : "";
                return firstImage ? (
                    <img
                        src={firstImage}
                        style={{ width: "100px", height: "auto" }}
                        alt="Ảnh phụ"
                    />
                ) : (
                    "Không có ảnh nào"
                );
            },
        },
        {
            title: "Sản phẩm nổi bật",
            dataIndex: "featured",
            key: "featured",
            render: (_: any, product: IProduct) => (
                <span>{product.featured ? "Có" : "Không"}</span>
            ),
        },
        {
            title: "Sản phẩm trong kho",
            dataIndex: "countInstock",
            key: "countInstock",
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags: string[]) => (
                <div>
                    {tags.map((tag, index) => (
                        <div key={index}>
                            {index + 1}. {tag}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
            render: (_: any, product: IProduct) => (
                <span>
                    {product.countInstock > 0 ? (
                        <span className="text-blue-600 font-bold">
                            Còn hàng
                        </span>
                    ) : (
                        <span className="text-red-600 font-bold">Hết hàng</span>
                    )}
                </span>
            ),
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            width: "150px",
            key: "category",
            render: (_: any, product: IProduct) =>
                product.category?.map((category: Category, index: number) => (
                    <div key={index}>
                        {index + 1}. {category.name}
                    </div>
                )),
        },
        {
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 150,
            render: (_: any, product: IProduct) => {
                return (
                    <div>
                        <Link to={`/admin/${product._id}/edit`}>
                            <Button type="primary" className="mr-2">
                                <AiFillEdit className="text-xl" />
                            </Button>
                        </Link>
                        <Popconfirm
                            onConfirm={() => mutate(product._id)}
                            title="Xóa Sản Phẩm"
                            description="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                            okText="Có"
                            cancelText="Không"
                            icon={
                                <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                />
                            }
                        >
                            <Button danger>
                                <AiTwotoneDelete className="text-lg" />
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];


    if (isLoading) return (
        <div>
            {" "}
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{ height: 60 }}
            />
        </div>
    );
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1>Quản lý sản phẩm</h1>
                <Link to={"/admin/add"}>
                    {" "}
                    <Button type="primary">
                        <AiOutlinePlusCircle />
                        Thêm Sản Phẩm
                    </Button>
                </Link>
            </div>
            {contextHolder}

            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 50 }}
                scroll={{ x: 1900, y: 500 }}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>Mô tả: {record.description}</p>
                    ),
                }}
            />
        </div>
    );
};

export default ProductPage;
