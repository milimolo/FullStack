import {ProductController} from './products/product.controller';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {ProductRepository} from './products/product.repository';
import {ProductService} from './products/product.service';
import {StockRepository} from "./stock/stock.repository";
import {StockRepositoryFirebase} from "./stock/stock.repository.firebase";
import {OrderController} from "./orders/order.controller";
import {OrderControllerFirebase} from "./orders/order.controller.firebase";
import {OrderService} from "./orders/order.service";
import {OrderRepository} from "./orders/order.repository";
import {OrderRepositoryFirebase} from "./orders/order.repository.firebase";

export class DependencyFactory {
    getProductController(): ProductController {
        const repoProduct: ProductRepository = new ProductRepositoryFirebase();
        const repoStock: StockRepository = new StockRepositoryFirebase();
        const service: ProductService = new ProductService(repoProduct, repoStock);
        return new ProductControllerFirebase(service)
    }

    getOrderController(): OrderController {
        const repoOrder: OrderRepository = new OrderRepositoryFirebase();
        const repoStock: StockRepository = new StockRepositoryFirebase();
        const service: OrderService = new OrderService(repoOrder, repoStock);
        return new OrderControllerFirebase(service)
    }
}
