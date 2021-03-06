import knex, { Knex } from 'knex';
import ProductDB from '../src/adapters/db/ProductDB';
import Product from '../src/application/product/Product';
import { memoryDB } from '../src/database/knex';


const mockProduct = {
  id: 'abc',
  name: 'Product test',
  price: 0.0,
  status: 'disabled',
}

async function setup() {   
  await createTable(memoryDB);
  await createProduct(memoryDB);
}

async function createTable(db) {
  await db.schema.dropTableIfExists('products');
  await db.schema.createTable('products', function(table) {
    table.string('id');
    table.string('name');
    table.float('price');
    table.string('status');
  })
}

async function createProduct(db) {
  await db('products').insert(mockProduct)
}

test('Test productdb get function', async () => {
  await setup();

  const productdb = new ProductDB(memoryDB);
  const product = await productdb.get('abc');

  expect(product.getId()).toBe(mockProduct.id);
  expect(product.getName()).toBe(mockProduct.name);
  expect(product.getPrice()).toBe(mockProduct.price);
  expect(product.getStatus()).toBe(mockProduct.status);
})

test('Test productdb save function', async () => {
  await setup();

  const productdb = new ProductDB(memoryDB);
  const product = new Product();
  product.name = 'Product Test';
  product.price = 25;
  
  let productResult = await productdb.save(product); 

  expect(product.name).toBe(productResult.getName());
  expect(product.price).toBe(productResult.getPrice());
  expect(product.status).toBe(productResult.getStatus());

  const queryResult = await memoryDB('products').first('id').where({id: productResult.getId()});
  expect(queryResult.id).toBe(productResult.getId());

  //Update
  product.status = 'enabled';

  productResult = await productdb.save(product);
  expect(product.status).toBe(productResult.getStatus());

  const queryResultUpdate = await memoryDB('products').first('status').where({id: productResult.getId()});
  expect(queryResultUpdate.status).toBe(productResult.getStatus());


})

