import Product from "../src/application/product/Product";
import { ProductStatus } from '../src/application/product/interfaces/ProductInterface';
import { v4 as uuidv4 } from 'uuid';

test("Test product enable function", () => {
  const product = new Product();
  product.name = "Hello";
  product.status = ProductStatus.DISABLED;
  product.price = 10;

  const t1 = () => {
    product.enable();
  }
  
  expect(t1).not.toThrowError();

  product.price = 0;

  const t2 = () => {
    product.enable();
  }

  expect(t2).toThrowError("The price must be greater than zero to enable the product");
})

test("Test product disable function", () => {
  const product = new Product();
  product.name = "Hello";
  product.status = ProductStatus.ENABLED;
  
  product.price = 0;
  const t1 = () => {
    product.disable();
  }
  expect(t1).not.toThrowError();

  product.price = 10;
  const t2 = () => {
    product.disable();
  }
  expect(t2).toThrowError("The price must be zero in order to have the product disabled");
})

test("Test product isValid function", async () => {
  const product = new Product();
  product.name = "Hello";
  product.status = ProductStatus.DISABLED;
  product.price = 10;
  product.id = uuidv4();

  const isValid = await product.isValid();
  expect(isValid).toBeTruthy();

  product.status = "INVALID";
  let isValidStatus = await product.isValid();
  expect(isValidStatus).toBeFalsy();

  product.status = ProductStatus.ENABLED;
  isValidStatus = await product.isValid();
  expect(isValidStatus).toBeTruthy();

  product.price = -10;
  let isValidPrice = await product.isValid();
  expect(isValidPrice).toBeFalsy();

  product.price = 10;
  isValidPrice = await product.isValid();
  expect(isValidPrice).toBeTruthy();

  product.id = "1"; // Must be a valid UUID
  let isValidUUID = await product.isValid();
  expect(isValidUUID).toBeFalsy();

  product.id = uuidv4();
  isValidUUID = await product.isValid();
  expect(isValidUUID).toBeTruthy();  
})