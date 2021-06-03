import ProductInterface from "../../application/product/interfaces/ProductInterface";
import ProductServiceInterface from "../../application/product/interfaces/ProductServiceInterface";

export default class ProductCLI {
  static async run(service: ProductServiceInterface, action: string, id: string = null, name: string = null, price: number = 0) {
    let result = '';
    let product : ProductInterface;

    switch (action) {
      case 'create':
        product = await service.create(name, price);
        result = `Product ID ${product.getId()} with the name "${product.getName()}" has been created with the price ${product.getPrice()} and status ${product.getStatus()}`
        break;
      
      case 'enable':
        product = await service.get(id);
        product = await service.enable(product);
        result = `Product "${product.getName()}" has been enabled.`

        break;
      
      case 'disable':
        product = await service.get(id);
        product = await service.disable(product);
        result = `Product "${product.getName()}" has been disabled.`

        break;
      
      case 'get':
        product = await service.get(id);

        if (!product) {
          result = 'The product does not exists'
        } else {
          result = `Product ID: ${product.getId()} \nName: ${product.getName()} \nPrice: ${product.getPrice()} \nStatus: ${product.getStatus()}`
        }

        break;
    
      default:
        result = 'Ação não implementada';
        break;
    }

    return result;
  }
}