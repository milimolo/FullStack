import {Product} from "../models/product";
import {Stock} from "../models/stock";

export interface StockRepository {
    create(stock: Stock): Promise<any>

    lowerStock(product: Product, amount: number): Promise<void>;

    setProductName(product: Product): Promise<any>;

    deleteStock(uId: string): Promise<any>;
}
