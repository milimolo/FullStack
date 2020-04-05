import {Product} from "../models/product";

export interface OrderRepository {

    setProductName(product: Product): Promise<any>;
}
