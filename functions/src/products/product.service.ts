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
        if(!productAfter.name || productAfter.name === ''){
            console.log('order', productAfter);
            throw new TypeError('You need to fill out the name of the product');
            return Promise.reject(productAfter);
        }
        if(productAfter.price === 0){
            console.log('order', productAfter);
            throw new TypeError('You need to put in a price above 0');
            return Promise.reject(productAfter);
        }
        const name = productAfter.name.toUpperCase();
        return this.productRepository.setTopProducts({
            id: prodId,
            name: name,
            price: productAfter.price,
            photo: productAfter.photo,
            timesPurchased: productAfter.timesPurchased
        });
    }

    updateStockProductName(
        prodId: string,
        productBefore: Product,
        productAfter: Product): Promise<void> {
        if(productAfter){
            if(!productAfter.name || productAfter.name === ''){
                console.log('order', productAfter);
                throw new TypeError('You need to fill out the name of the product');
                return Promise.reject(productAfter);
            }
            return this.stockRepo.setProductName({
                id: prodId,
                name: productAfter.name,
                price: productAfter.price,
                photo: productAfter.photo,
                timesPurchased: productAfter.timesPurchased
            });
            } else {
                return this.stockRepo.deleteStock(prodId);
            }
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
