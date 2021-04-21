import ProductService from '../src/application/product/ProductService';
import ProductInterface from '../src/application/product/interfaces/ProductInterface';
import ProductPersistenceInterface from '../src/application/product/interfaces/ProductPersistenceInterface';

const mockProduct: jest.Mocked<ProductInterface> = {
  getId: jest.fn().mockReturnValue('1'),
  getName: jest.fn(),
  getPrice: jest.fn(),
  getStatus: jest.fn(),
  disable: jest.fn(),
  enable: jest.fn(),
  isValid: jest.fn(),
}

const mockPersistence: jest.Mocked<ProductPersistenceInterface> = {
  get: jest.fn().mockResolvedValue(mockProduct),
  save: jest.fn().mockResolvedValue(mockProduct),
}

test("Test product service get function", async () => {
  const productService = new ProductService(mockPersistence); 
  const product = await productService.get('abc');
  
  expect(mockPersistence.get).toHaveBeenCalledTimes(1);
  expect(mockPersistence.get).toHaveBeenCalledWith('abc');
  expect(product).toEqual(mockProduct);
})

test("Test product service create function", async () => {
  const productService = new ProductService(mockPersistence);
  const product = await productService.create('Product 1', 10);

  expect(mockPersistence.save).toHaveBeenCalledTimes(1);
  expect(product).toEqual(mockProduct);
})

test("Test product service enable function", async () => {
  jest.clearAllMocks();
  const productService = new ProductService(mockPersistence);
  const product = await productService.enable(mockProduct);

  expect(mockProduct.enable).toHaveBeenCalledTimes(1);
  expect(mockPersistence.save).toHaveBeenCalledTimes(1);
  expect(product).toEqual(mockProduct);
})

test("Test product service disable function", async () => {
  jest.clearAllMocks();
  const productService = new ProductService(mockPersistence);
  const product = await productService.disable(mockProduct);

  expect(mockProduct.disable).toHaveBeenCalledTimes(1);
  expect(mockPersistence.save).toHaveBeenCalledTimes(1);
  expect(product).toEqual(mockProduct);
})