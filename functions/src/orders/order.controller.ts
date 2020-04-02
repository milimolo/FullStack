import {EventContext} from "firebase-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {Order} from "../models/order";

export interface OrderController {
    placeOrder(snap: DocumentSnapshot, context: EventContext): Promise<Order>;
}
