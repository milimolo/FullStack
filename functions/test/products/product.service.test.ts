import {ProductRepository} from '../../src/products/product.repository';
import {ProductService} from '../../src/products/product.service';
import {IMock} from 'moq.ts';
import {Product} from '../../src/models/product';
import {StockRepository} from "../../src/stock/stock.repository";
import {TestHelper} from "../helpers/helper";

describe('ProductService', () => {
    let testHelper: TestHelper;
    let productRepository: IMock<ProductRepository>;
    let stockRepo: IMock<StockRepository>;
    let productService: ProductService;
    beforeEach(() => {
        testHelper = new TestHelper();
        productRepository = testHelper.getProductRepositoryMock();
        stockRepo = testHelper.getStockRepositoryMock();
        productService = new ProductService(productRepository.object(), stockRepo.object());
    });

    it('Buying a product adds one to timesPurchased', async () => {
        const product = testHelper.getProduct2();
        const beforePurchased = product.timesPurchased;
        expect(beforePurchased).toBe(0);
        const productAfter: Product = productService.buy(product);
        const afterPurchased = productAfter.timesPurchased;
        expect(afterPurchased).toBe(1);
    });

    it('Buying a product with undefined value should not throw an exception', async () => {
        const productAfter: Product = productService.buy(undefined as any);
        expect(productAfter).toBeUndefined();
    });

    it('Refunding a product detracts one from timesPurchased', async () => {
        const product = testHelper.getProduct2();
        product.timesPurchased++;
        const beforeRefunded = product.timesPurchased;
        expect(beforeRefunded).toBe(1);
        const productAfter: Product = productService.refund(product);
        const afterRefunded = productAfter.timesPurchased;
        expect(afterRefunded).toBe(0);
    });

    it('When changing the name of a product the name must exist or not be empty', async() => {
        const productBefore = testHelper.product1;
        const productAfter = testHelper.product1;
        productAfter.name = '';
        await expect(() => {productService.updateStockProductName(productAfter.id, productBefore, productAfter)}).rejects;
    });

    it('When putting a product on the top list the name must exist or not be empty', async() => {
        const productBefore = testHelper.product1;
        const productAfter = testHelper.product1;
        productAfter.name = '';
        await expect(() => {productService.updateTopProduct(productAfter.id, productBefore, productAfter)}).rejects;
    });

    it('When putting a product on the top list the price must not be 0', async() => {
        const productBefore = testHelper.product1;
        const productAfter = testHelper.product1;
        productAfter.price = 0;
        await expect(() => {productService.updateTopProduct(productAfter.id, productBefore, productAfter)}).rejects;
    });
});
