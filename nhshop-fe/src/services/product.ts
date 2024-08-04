/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import instance from "../configs/axios";
// import { AddIProduct } from "@/common/types/IProduct";
// import { AddIProduct } from "@/common/types/IProduct";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProduct = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get('/product', { params })
        return response
    } catch (error) {
        return {
            data: [],
            status: 500,
            statusText: 'error',
            config: {} as any,
            headers: {},
        }
    }
}

export const getIdProduct = async (id:string): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get(`/product/${id}`)
        return response
    } catch (error) {
        return {
            data: [],
            status: 500,
            statusText: 'error',
            config: {} as any,
            headers: {},
        }
    }
}
export const delProduct = async (id: string): Promise<AxiosResponse<any>> => {
    try {
        return await instance.delete(`/product/${id}`)
    } catch (error) {
        return {
            data: [],
            status: 500,
            statusText: 'error',
            headers: {},
            config: {} as any
        }
    }
}

// export const postProduct = async (data: AddIProduct)=> {
//     try {
//         return await instance.post("/product", data )
//     } catch (error) {
//         return {
//             data: [],
//             status: 500,
//             statusText: "error",
//             headers: {},
//             config: {} as any
//         }
//     }
// }

// export const putProduct = async (id:string,data: AddIProduct) => {
//     try {
//         return await instance.put(`/${id}`, data)
//     } catch (error) {
//         return {
//             data: [],
//             status: 500,
//             statusText: "error",
//             headers: {},
//             config: {} as any
//         }
//     }
// }