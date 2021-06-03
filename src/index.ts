import ProductDB from "./adapters/db/ProductDB";
import ProductService from "./application/product/ProductService";
import { fileDB } from './database/knex';

const productdb = new ProductDB(fileDB);
const productService = new ProductService(productdb);

(async () => {
  const product = await productService.create('Product Example', 30);
  await productService.enable(product);
  console.log(product);
})();




