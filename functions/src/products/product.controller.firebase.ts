import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Product} from '../models/product';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {Stock} from "../models/stock";

export class ProductControllerFirebase implements ProductController {

    constructor(private productService: ProductService) {}

    writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.writeProducts(context.params.id, productBefore, productAfter)
    };

    updatedTopProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.updateTopProduct(context.params.id, productBefore, productAfter);
    }

    updatedProductName(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {
        const productBefore = snap.before.data() as Product;
        const productAfter = snap.after.data() as Product;
        return this.productService.updateStockProductName(context.params.id, productBefore, productAfter);
    }

    create(snap: DocumentSnapshot, context: EventContext): Promise<Stock> {
        const product = snap.data() as Product;

        product.id = context.params.id;
        const stock = {
            productId: product.id,
            productName: product.name,
            stockAmount: 5
        }
        return this.productService.create(stock);
    }
}
