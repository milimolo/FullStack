import { Product } from '../models/product'
import { ProductRepository } from './product.repository'
import {StockRepository} from "../stock/stock.repository";

export class ProductService {
    constructor(private productRepository: ProductRepository,
                private stockRepo: StockRepository) {}

    writeProducts(
        prodId: string,
        productBefore: Product,
        productAfter: Product
    ): Promise<void> {
        const times = productBefore.timesPurchased++;
        if (productAfter) {
            return this.productRepository.setTopProducts({
                id: prodId,
                name: productAfter.name,
                price: productAfter.price,
                photo: productAfter.photo,
                timesPurchased: times
            })
        } else {
            return this.productRepository.deleteTopProducts(prodId)
        }
    }

    updateTopProduct(
        prodId: string,
        productBefore: Product,
        productAfter: Product): Promise<void> {
        const name = productAfter.name.toUpperCase();
        return this.productRepository.setTopProducts({
            id: prodId,
            name: name,
            price: productAfter.price,
            photo: productAfter.photo,
            timesPurchased: productAfter.timesPurchased
        });
    }

    async create(product: Product): Promise<Product> {
        await this.productRepository.create(product);
        await this.stockRepo.create(product, 5);
        return Promise.resolve(product);
    }

    buy(product: Product): Product {
        if(product) {
            product.timesPurchased = product.timesPurchased +1;
            return product;
        }
        return undefined as any;
    }

    refund(product: Product): Product {
        if(product) {
            product.timesPurchased = product.timesPurchased -1;
            return product;
        }
        return undefined as any;
    }
}
