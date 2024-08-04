import { IUser } from "./IUser";

interface Product {
    productId: string;
    quantity: number;
    name:string,
    price: number;
    img:string,
    discount: number;
    finalPrice: number;
}

export interface Cart {
    _id: string;
    userId: IUser; // hoặc IUser[] nếu giỏ hàng có thể thuộc về nhiều người dùng
    products: Product[];
    totalQuantity: number;
    totalPrice: number;
    totalDiscount: number;
    finalTotalPrice: number;
}
