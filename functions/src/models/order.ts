import {Product} from "./product";

export interface Order {
    orderLines:
        { product: Product, amount: number; }[];
    totalPrice: number;
}
