import { Command } from 'commander';

import ProductService from './src/application/product/ProductService';
import ProductDB from './src/adapters/db/ProductDB';
import { fileDB } from './src/database/knex';
import { ProductCreateCmd, ProductGetCmd, ProductStatusChangeCmd }  from './src/cmd/product';

const program = new Command();
program.version('0.0.1');

const productDB = new ProductDB(fileDB);
const productService = new ProductService(productDB)

program
  .command('create [productName]')
  .description('Create a new product')
  .option('-p --price [productPrice]', 'Type the product price to create a new product with defined price')
  .action(async (productName : string, options : any) => ProductCreateCmd(productService, productName, options));

program
  .command('get [productId]')
  .description('Retrieve a exists product')
  .action(async (productId : string) => ProductGetCmd(productService, productId));

program
  .command('enable [productId]')
  .description('Enable a exists product')
  .action(async (productId : string) => ProductStatusChangeCmd(productService, 'enable', productId));

  program
  .command('disable [productId]')
  .description('Disable a exists product')
  .action(async (productId : string) => ProductStatusChangeCmd(productService, 'disable', productId));

(async () => {
  await program.parseAsync(process.argv);
  process.exit();
})()
