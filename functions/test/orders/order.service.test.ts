import {IMock, Times} from "moq.ts";
import {OrderService} from "../../src/orders/order.service";
import {TestHelper} from "../helpers/helper";
import {OrderRepository} from "../../src/orders/order.repository";
import {StockRepository} from "../../src/stock/stock.repository";

describe('OrderService', () => {
    let testHelper: TestHelper;
    let stockRepository: IMock<StockRepository>;
    let orderRepository: IMock<OrderRepository>;
    let orderService: OrderService;
    beforeEach(() => {
        testHelper = new TestHelper();
        orderRepository = testHelper.getOrderRepositoryMock();
        stockRepository = testHelper.getStockRepositoryMock();
        orderService = new OrderService(orderRepository.object(), stockRepository.object());
    });

    it('OrderService needs a orderRepository and a stockRepository', () => {
        orderService = new OrderService(orderRepository.object(), stockRepository.object());
        expect(orderService).toBeDefined()
    });

    it('When deploying an order I need at least 1 order line', async () => {
        const order = testHelper.order1;
        order.orderLines = [];
        await expect(() => {orderService.deployOrder(order)}).rejects;
    });

    it('When deploying an order I need to make sure that the order has an amount of 1', async () => {
        const order = testHelper.order1;
        order.orderLines[0].amount = 0;
        await expect(() => {orderService.deployOrder(order)}).rejects;
    })

    it('When I execute an order, stock should go down with the correct amount of products bought with a orderline count of 1', async () => {
        const order = testHelper.getOrder1();
        const orderAfterExecute = await orderService.deployOrder(order);
        stockRepository.verify(stockRepo => stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].amount),
            Times.Exactly(1));
        expect(orderAfterExecute).toBeDefined();
    });
});
