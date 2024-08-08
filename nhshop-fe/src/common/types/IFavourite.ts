import { IUser } from "./IUser";

interface ProductFavourite {
    productId: string;
    name: string,
    price: number;
    img: string,
}

export interface IFavourite {
    userId:IUser,
    products:ProductFavourite[]
}
