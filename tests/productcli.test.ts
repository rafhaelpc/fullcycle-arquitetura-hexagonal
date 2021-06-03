import ProductCLI from "../src/adapters/cli/ProductCLI";
import ProductInterface from "../src/application/product/interfaces/ProductInterface";
import ProductServiceInterface from "../src/application/product/interfaces/ProductServiceInterface";

const mockProduct: jest.Mocked<ProductInterface> = {
  getId: jest.fn().mockReturnValue('1'),
  getName: jest.fn().mockReturnValue('Product Name'),
  getPrice: jest.fn().mockReturnValue(123),
  getStatus: jest.fn().mockReturnValue('Enabled'),
  disable: jest.fn(),
  enable: jest.fn(),
  isValid: jest.fn(),
}

const mockService: jest.Mocked<ProductServiceInterface> = {
  create: jest.fn().mockResolvedValue(mockProduct),
  get: jest.fn().mockResolvedValue(mockProduct),
  disable:  jest.fn().mockResolvedValue(mockProduct),
  enable:  jest.fn().mockResolvedValue(mockProduct)
}

test('Test product cli create function', async () => {
  const expectedResult = `Product ID ${mockProduct.getId()} with the name "${mockProduct.getName()}" has been created with the price ${mockProduct.getPrice()} and status ${mockProduct.getStatus()}`;
  const result = await ProductCLI.run(mockService, 'create', null, 'New Product', 123);

  expect(result).toBe(expectedResult);
})

test('Test product cli get function', async () => {
  const expectedResult = `Product ID: ${mockProduct.getId()} \nName: ${mockProduct.getName()} \nPrice: ${mockProduct.getPrice()} \nStatus: ${mockProduct.getStatus()}`;
  const result = await ProductCLI.run(mockService, 'get', mockProduct.getId());
  expect(result).toBe(expectedResult);
})

test('Test product cli enable function', async () => {
  const expectedResult = `Product "${mockProduct.getName()}" has been enabled.`;
  const result = await ProductCLI.run(mockService, 'enable', mockProduct.getId());
  expect(result).toBe(expectedResult);
})

test('Test product cli disable function', async () => {
  const expectedResult = `Product "${mockProduct.getName()}" has been disabled.`;
  const result = await ProductCLI.run(mockService, 'disable', mockProduct.getId());
  expect(result).toBe(expectedResult);
})