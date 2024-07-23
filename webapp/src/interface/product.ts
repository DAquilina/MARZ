import { ProductStatus } from "../enum/product-status";


export interface IProduct {
    ProductID: number;
    ProductName: string;
    ProductPhotoURL: string;
    ProductStatus: ProductStatus;
}
