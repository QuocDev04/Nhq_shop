import { IUser } from "./IUser";

interface Product {
    productId: string;
    quantity: number;
    name: string,
    price: number;
    img: string,
    discount: number;
    finalPrice: number;
}
interface Addresses {
    city:string,
    district:string,
    postalCode:string,
    commune_ward:string,
    streetAddress:string,
    apartment:string
}
export interface Order{
    _id:string,
    userId:IUser,
    items: Product[],
    firstName:string,
    lastname:string,
    addresses:Addresses,
    phone:number,
    email:string,
    orderNotes:string,
    totalPrice:string,
    status:string,
    createAt:Date
}