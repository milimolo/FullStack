import {OrderController} from "./order.controller";
import {Change, EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {OrderService} from "./order.service";
import {Order} from "../models/order";
import {Product} from "../models/product";

export class OrderControllerFirebase implements OrderController{
    constructor(private orderService: OrderService) {}

    placeOrder(snap: DocumentSnapshot, context: EventContext): Promise<Order> {
        const order = snap.data() as Order;
        order.uId = context.params.orderId;
        return this.orderService.deployOrder(order)
    }

    updateProductName(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;

        return this.orderService.updateOrderProductName(context.params.id, productBefore, productAfter);
    }


}
