import ProductServiceInterface from "./interfaces/ProductServiceInterface";
import ProductPersistenceInterface from "./interfaces/ProductPersistenceInterface";
import ProductInterface from "./interfaces/ProductInterface";
import Product from "./Product";

export default class ProductService implements ProductServiceInterface {
  persistence: ProductPersistenceInterface;

  /**
   * 
   * @param persistence 
   */
  constructor(persistence: ProductPersistenceInterface) {
    this.persistence = persistence;
  }
  
  /**
   * 
   * @param id 
   * @returns 
   */
  get(id: string): Promise<ProductInterface> {
    return this.persistence.get(id);
  }

  /**
   * 
   * @param name 
   * @param price 
   */
  create(name: string, price: number): Promise<ProductInterface> {
    const product = new Product();
    product.name = name;
    product.price = price;

    const isValid = product.isValid();
    if (!isValid) {
      return Promise.resolve(new Product());
    }

    return this.persistence.save(product);
  }
  /**
   * 
   * @param product 
   */

  enable(product: ProductInterface): Promise<ProductInterface> {
    product.enable();
    return this.persistence.save(product);
  }

  /**
   * 
   * @param product 
   */
  disable(product: ProductInterface): Promise<ProductInterface> {
    product.disable();
    return this.persistence.save(product);
  }
  
}