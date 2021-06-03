import inquirer from 'inquirer';
import ProductServiceInterface from '../../application/product/interfaces/ProductServiceInterface';
import ProductCLI from './../../adapters/cli/ProductCLI';

export default async function(productService : ProductServiceInterface, productName : string, options : any) {
  let answers : any = {};
  let response : any;

  if (!productName) {
    response = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Qual é o nome do produto?',
        validate: value => value ? true : 'Informe o nome do produto'
      }
    ]);

    answers = { ...answers, ...response}
  }    

  if (!options.price) {
    response = await inquirer.prompt([
      {
        type: 'input',
        name: 'price',
        message: 'Qual é o preço do produto?',
        validate: value => value ? true : 'Informe o preço do produto'
      }
    ]);

    answers = { ...answers, ...response}
  }
 
  productName = productName ?? answers.name;  
  
  const productPrice = options.price ?? answers.price; 

  const result = await ProductCLI.run(productService, 'create', null, productName, productPrice);
  console.log(result);
  return Promise.resolve();
}