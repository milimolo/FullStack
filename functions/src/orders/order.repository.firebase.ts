import {OrderRepository} from "./order.repository";
import {Product} from "../models/product";
import * as admin from "firebase-admin";

export class OrderRepositoryFirebase implements OrderRepository{
    orderPath = 'orders';

    setProductName(product: Product): Promise<any> {
        const stockCollection = this.db().collection(`${this.orderPath}`);
        return stockCollection.doc(product.id).update({
            product: product
        })
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }


}
