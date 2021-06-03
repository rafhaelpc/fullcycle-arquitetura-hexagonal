import knex  from "knex";
import ProductDB from "./adapters/db/ProductDB";
import ProductService from "./application/product/ProductService";

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/sqlite.db'
  },
  useNullAsDefault: true    
});

const productdb = new ProductDB(db);
const productService = new ProductService(productdb);

(async () => {
  const product = await productService.create('Product Example', 30);
  await productService.enable(product);
  console.log(product);
})();




