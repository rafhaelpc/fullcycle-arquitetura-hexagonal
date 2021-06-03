// import { Database } from "sqlite";
import ProductInterface from "../../application/product/interfaces/ProductInterface";
import Product from '../../application/product/Product';
import { Knex } from 'knex';
import ProductPersistenceInterface from "../../application/product/interfaces/ProductPersistenceInterface";

export default class ProductDB implements ProductPersistenceInterface {
  db :Knex;

  constructor(db :Knex) {
    this.db = db;
  }

  async get(id : string) : Promise<ProductInterface> {
    

    const queryResult = await this.db('products').first('id', 'name', 'price', 'status').where('id', id);
    const product = Object.assign(new Product(), queryResult);
  
    return product;
  }

  async save(product : ProductInterface) : Promise<ProductInterface> {
    const queryResult = await this.db('products').first('id').where('id', product.getId());

    if (!queryResult) {
      return this.create(product);   
    }

    return this.update(product);
  }

  private async create(product : ProductInterface) : Promise<ProductInterface> {
    await this.db('products').insert({
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      status: product.getStatus()
    });

    return product;
  }

  private async update(product : ProductInterface) : Promise<ProductInterface> {
    await this.db('products').where({id: product.getId()}).update({
      name: product.getName(),
      price: product.getPrice(),
      status: product.getStatus()
    });

    return product;
  }


}