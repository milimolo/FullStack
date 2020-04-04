import {Product} from '../models/product';
import * as admin from 'firebase-admin';
import {ProductRepository} from './product.repository';

export class ProductRepositoryFirebase implements ProductRepository {
    topProductsPath = 'top-products';
    productsPath = 'products';
    setTopProducts(product: Product): Promise<any> {
        return this.db().doc(`${this.topProductsPath}/${product.id}`).set(
            product
        );
    };

    deleteTopProducts(uId: string): Promise<any> {
        return this.db().doc(`${this.topProductsPath}/${uId}`).delete();
    };

    async create(product: Product): Promise<Product> {
        await this.db().doc(`${this.productsPath}`).create(product);
        return Promise.resolve(product);
    }

    db(): FirebaseFirestore.Firestore {
        return admin.firestore();
    }
}
