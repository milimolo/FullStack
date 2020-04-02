import {OrderController} from "./order.controller";
import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {OrderService} from "./order.service";
import {Order} from "../models/order";

export class OrderControllerFirebase implements OrderController{
    constructor(private orderService: OrderService) {}

    placeOrder(snap: DocumentSnapshot, context: EventContext): Promise<Order> {
        return this.orderService.deployOrder(context.params.id)
    }

}
