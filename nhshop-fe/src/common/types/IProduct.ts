import { Category } from "./Category"

export interface IProduct {
    _id: string,
    img: string,
    name: string,
    price: number,
    category:Category[]
    description: string,
    featured:boolean,
    countInstock: number,
    discount: number,
    status: string,
    attributes:string[]
    tags: string[];
    gallery: string[];
}
export interface AddIProduct {
    img: string,
    name: string,
    price: number,
    category: Category[],
    description: string,
    featured: boolean,
    countInstock: number,
    discount:number,
    attribute: string[],
    tags: string[];
    gallery: string[];
}   
