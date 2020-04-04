import {StockRepository} from "./stock.repository";
import {Product} from "../models/product";
import {Stock} from "../models/stock";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;

export class StockRepositoryFirebase implements StockRepository{
    stockPath = 'stock'

    create(stock: Stock): Promise<any> {
        const stockCollection =  this.db().collection(`${this.stockPath}`);
        return stockCollection.doc(stock.productId).set({
            productName: stock.productName,
            stockAmount: stock.stockAmount
        });
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async lowerStock(product: Product, amount: number): Promise<void> {
        const stock = await this.db().collection(`${this.stockPath}`).doc(product.id);
        await stock.update({stockAmount: FieldValue.increment(-amount)});
        return Promise.resolve();
    }
}
