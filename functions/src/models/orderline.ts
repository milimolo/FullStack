import {Product} from "./product";

export interface Orderline {
    product: Product;
    amount: number;
}
