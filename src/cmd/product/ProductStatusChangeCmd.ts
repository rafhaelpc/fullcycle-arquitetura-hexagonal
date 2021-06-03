import inquirer from 'inquirer';
import ProductServiceInterface from '../../application/product/interfaces/ProductServiceInterface';
import ProductCLI from '../../adapters/cli/ProductCLI';

export default async function(productService : ProductServiceInterface, action: string, productId : string) {
  let answers : any = {};
  let response : any;

  if (!productId) {
    response = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'Qual é o id do produto?',
        validate: value => value ? true : 'Informe o id do produto'
      }
    ]);

    answers = { ...answers, ...response}
  }    
 
  productId = productId ?? answers.id;  

  const result = await ProductCLI.run(productService, action, productId, null, null);
  console.log(result);
  return Promise.resolve();
}