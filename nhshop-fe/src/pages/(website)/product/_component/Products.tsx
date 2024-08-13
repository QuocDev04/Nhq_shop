import instance from "@/configs/axios";
import ProductList from "../../_component/ProductsList";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "antd";

const ListPro = () => {
        const { data: product, isLoading } = useQuery({
            queryKey: ["product"],
            queryFn: () => instance.get("/product"),
        });
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
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 items-center lg:py-16 mb-40">
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <ProductList products={product?.data} />
                </div>
            </div>
        </>
    );
}
 
export default ListPro;