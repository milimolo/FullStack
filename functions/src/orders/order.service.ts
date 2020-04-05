import {Order} from '../models/order';
import {StockRepository} from "../stock/stock.repository";
import {OrderRepository} from "./order.repository";
import {Product} from "../models/product";

export class OrderService{
    constructor(private orderRepo: OrderRepository, private stockRepo: StockRepository){
        console.log(this.orderRepo);
    }

    async deployOrder(order: Order): Promise<Order>{
        if(!order.orderLines || order.orderLines.length < 1) {
            console.log('order', order);
            throw new TypeError('You need an order line to execute an order');
            return Promise.reject(order);
        }
        if(order.orderLines[0].amount < 1){
            console.log('order', order);
            return Promise.reject(order);
        }
        await this.stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].amount);
        return Promise.resolve(order);
    }

    updateOrderProductName(
        prodId: string,
        productBefore: Product,
        productAfter: Product) {
        return this.orderRepo.setProductName({
            id: prodId,
            name: productAfter.name,
            price: productAfter.price,
            photo: productAfter.photo,
            timesPurchased: productAfter.timesPurchased
        });
    }
}
