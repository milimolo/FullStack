import {Product} from '../models/product';

export interface ProductRepository {
    setTopProducts(product: Product): Promise<any>;
    deleteTopProducts(uid: string): Promise<any>;
    create(product: Product): Promise<Product>;
}
