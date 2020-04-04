import {Orderline} from "./orderline";

export interface Order {
    uId: string;
    orderLines: Orderline[];
    totalPrice: number;
}
