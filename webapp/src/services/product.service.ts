import axios from "axios";

import { IErrorResponse } from "../interface/error-response";
import { IProduct } from "../interface/product";
import { SortedProductResponse } from "../type/sorted-product-response";
import { ProductStatus } from "../enum/product-status";


const GET_ALL_PRODUCTS_URL = "/api/products/all";

const getAllProducts = async (): Promise<Array<IProduct> | IErrorResponse> => {

    try {
        const response = await axios.get(GET_ALL_PRODUCTS_URL);

        if (response?.status === 200) {
            return response.data as Array<IProduct>;
        } else {
            return {
                message: response.data.message,
                status: response.status
            } as IErrorResponse
        }
    } catch (err: unknown) {
        console.error(err);
        
        return {
            message: err as string
        };
    }
};


const GET_PRODUCTS_BY_STATUS_URL = "/api/products/group_by_status";

const getProductsByStatus = async (): Promise<SortedProductResponse | IErrorResponse> => {

    try {
        const response = await axios.get(GET_PRODUCTS_BY_STATUS_URL);

        if (response?.status === 200) {
            return response.data.data as SortedProductResponse;
        } else {
            return {
                message: response.data.message ?? response.data.data,
                status: response.status
            } as IErrorResponse
        }
    } catch (err: unknown) {
        console.error(err);
        
        return {
            message: err as string
        };
    }
};


const UPDATE_PRODUCT_STATUS_URL = "/api/products/update_status";

const updateProductStatus = async (productId: number, newStatus: ProductStatus): Promise<boolean | IErrorResponse> => {

    try {
        const response = await axios.post(
            UPDATE_PRODUCT_STATUS_URL,
            {
                ProductID: productId,
                ProductStatus: newStatus
            }
        );

        if (response?.status === 200) {
            return true;
        } else {
            return {
                message: response.data.message ?? response.data.data,
                status: response.status
            } as IErrorResponse
        }
    } catch (err: unknown) {
        console.error(err);
        
        return {
            message: err as string
        };
    }
};


export {
    GET_ALL_PRODUCTS_URL,
    GET_PRODUCTS_BY_STATUS_URL,
    UPDATE_PRODUCT_STATUS_URL,
    getAllProducts,
    getProductsByStatus,
    updateProductStatus
};
