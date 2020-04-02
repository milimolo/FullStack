import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock, Mock} from 'moq.ts';
import {Product} from '../../src/models/product';
import {StockRepository} from "../../src/stock/stock.repository";
import {TestHelper} from "../helpers/helper";

describe('ProductService', () => {
    let testHelper: TestHelper;
    let productRepository: IMock<ProductRepository>;
    let stockRepo: IMock<StockRepository>;
    let productService: ProductService;
    let product: Product = {photo: 'a', timesPurchased: 0, name: 'b', price: 22, id:'ab'}
    beforeEach(() => {
        testHelper = new TestHelper();
        productRepository = new Mock<ProductRepository>()
            .setup(pr => pr.setTopProducts(product))
            .returns(new Promise((resolve, reject) => {resolve()}));
        stockRepo = testHelper.getStockRepositoryMock();
        productService = new ProductService(productRepository.object(), stockRepo.object());
    });

    it('Buying a product adds one to timesPurchased', async () => {
        const beforePurchased = product.timesPurchased;
        expect(beforePurchased).toBe(0);
        const productAfter: Product = productService.buy(product);
        const afterPurchased = productAfter.timesPurchased;
        expect(afterPurchased).toBe(1);
        product.timesPurchased = 0;
    });

    it('Buying a product with undefined value should not throw an exception', async () => {
        const productAfter: Product = productService.buy(undefined as any);
        expect(productAfter).toBeUndefined();
    });

    it('Refunding a product detracts one from timesPurchased', async () => {
        product.timesPurchased++;
        const beforeRefunded = product.timesPurchased;
        expect(beforeRefunded).toBe(1);
        const productAfter: Product = productService.refund(product);
        const afterRefunded = productAfter.timesPurchased;
        expect(afterRefunded).toBe(0);
    });


});
