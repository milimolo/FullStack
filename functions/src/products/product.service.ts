import { Product } from '../models/product'
import { ProductRepository } from './product.repository'
import {StockRepository} from "../stock/stock.repository";
import {Stock} from "../models/stock";

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

    async create(stock: Stock): Promise<Stock> {
        await this.stockRepo.create(stock);
        return Promise.resolve(stock);
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
