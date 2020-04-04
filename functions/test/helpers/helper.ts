import {Order} from "../../src/models/order";
import {Product} from "../../src/models/product";
import {Stock} from "../../src/models/stock";
import {StockRepository} from "../../src/stock/stock.repository";
import {IMock, Mock} from "moq.ts";
import {OrderRepository} from "../../src/orders/order.repository";
import {ProductRepository} from "../../src/products/product.repository";
import {Orderline} from "../../src/models/orderline";

export class TestHelper {

    getProductRepositoryMock(): IMock<ProductRepository> {
        return new Mock<ProductRepository>()
            .setup(repo => repo.create(this.getProduct1()))
            .returns(Promise.resolve(this.getProduct1()));
    }

    getOrderRepositoryMock(): IMock<OrderRepository> {
        return new Mock<OrderRepository>();
    }

    getStockRepositoryMock(): IMock<StockRepository> {
        return new Mock<StockRepository>()
            .setup(stockRepo => stockRepo.create(this.getStock1()))
            .returns(Promise.resolve(this.getStock1()))
            .setup(stockRepo => stockRepo.lowerStock(this.getProduct1(), 1))
            .returns(Promise.resolve());
    }

    getProduct1(): Product {
        return this.product1;
    }

    getProduct2(): Product {
        return this.product2;
    }

    getStock1(): Stock {
        return this.stock1;
    }

    getOrder1(): Order {
        return this.order1;
    }

    stock1: Stock = {
        stockAmount: 1,
        productId: 'p1',
        productName: 'Product 1'
    };

    product1: Product = {
        name: 'Product 1',
        id: 'p1',
        photo: 'somewhere.jpg',
        price: 22,
        timesPurchased: 0
    };

    product2: Product = {
        name: 'Product 2',
        id: 'p2',
        photo: 'somewhereelse.jpg',
        price: 23,
        timesPurchased: 0
    };

    ol1: Orderline = {
        product: this.product1,
        amount: 1
    };

    order1: Order = {
        uId: 'asd',
        orderLines: [this.ol1],
        totalPrice: 1000
    };

}
