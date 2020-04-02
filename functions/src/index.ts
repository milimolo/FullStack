import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const serviceAccount = require("../secret.json")
const difa = new DependencyFactory()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fullstackproject-dcb89.firebaseio.com"
});

exports.addOrderRemovesStock = functions.firestore
    .document('orders/{orderId}')
    .onCreate((snap, context) => {
        return difa.getOrderController().placeOrder(snap, context);
    });

exports.productWritten = functions.firestore
    .document('products/{id}')
    .onWrite((snap, context) => {
        return difa.getProductController().writtenProducts(snap, context);
    });

exports.topProductUpdated = functions.firestore
    .document('top-products/{id}')
    .onUpdate((snap, context) => {
        return difa.getProductController().updatedTopProduct(snap, context)
    });

exports.setStockOnNewProducts = functions.firestore
    .document('products/{id}')
    .onCreate((snapshot, context) => {
        return difa.getProductController().create(snapshot, context);
    })
