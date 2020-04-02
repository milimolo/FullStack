import {StockRepository} from "./stock.repository";
import {Product} from "../models/product";
import {Stock} from "../models/stock";
import * as admin from "firebase-admin";
import FieldValue = admin.firestore.FieldValue;

export class StockRepositoryFirebase implements StockRepository{
    stockPath = 'stock'

    async create(product: Product, number: number): Promise<Stock> {
        const stock: Stock = {product: product, count: number};
        await this.db().collection(`${this.stockPath}`).add(stock);
        return Promise.resolve(stock);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }

    async lowerStock(product: Product, amount: number): Promise<void> {
        const stock = await this.db().doc(`${this.stockPath}/${product.id}`);
        stock.update({count: FieldValue.increment(-amount) });
        return Promise.resolve();
    }
}
