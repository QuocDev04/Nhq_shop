import { IProduct } from "@/common/types/IProduct";
import ProductsItems from "./ProductsItem";

type Props = {
    products: IProduct[];
};
const ProductList = ({ products }: Props) => {
    return (
        <>
            {products.map((product: IProduct) => (
                <ProductsItems key={product._id} product={product} />
            ))}
        </>
    );
};

export default ProductList;
