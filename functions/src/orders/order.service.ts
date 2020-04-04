import {Order} from '../models/order';
import {StockRepository} from "../stock/stock.repository";
import {OrderRepository} from "./order.repository";

export class OrderService{
    constructor(private orderRepo: OrderRepository, private stockRepo: StockRepository){
        console.log(this.orderRepo);
    }

    async deployOrder(order: Order): Promise<Order>{
        if(!order.orderLines || order.orderLines.length < 1) {
            throw new TypeError('You need an order line to execute an order');
        }
        console.log('order', order);
        await this.stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].amount);
        return Promise.resolve(order);
    }
}
