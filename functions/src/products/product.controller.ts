import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Stock} from "../models/stock";

export interface ProductController {
    writtenProducts(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    updatedTopProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void>;

    create(snap: DocumentSnapshot, context: EventContext): Promise<Stock>;
}
