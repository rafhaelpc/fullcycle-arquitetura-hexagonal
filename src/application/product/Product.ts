import ProductInterface, { ProductStatus } from "./interfaces/ProductInterface";
import { IsUUID, IsNotEmpty, Min, validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';


export default class Product implements ProductInterface {
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  name: string;

  @Min(0)
  price: number;

  @IsNotEmpty()
  status: string;

  constructor() {
    this.id = uuidv4();
    this.status = ProductStatus.DISABLED;
  }
  
  public getId() : string {
    return this.id;
  }  
  public getName() : string {
    return this.name;
  }

  public getPrice() : number {
    return this.price;
  }

  public getStatus() : string {
    return this.status;
  }

  /**
   * 
   * @returns 
   */
  public async isValid() : Promise<boolean> {
    if (this.status == "") {
      this.status = ProductStatus.DISABLED
    }

    if (this.status !== ProductStatus.ENABLED && this.status !== ProductStatus.DISABLED) {
      return false;   
    }  

    if (this.price < 0) {
      return false;
    }   

    const validationErrors =  await validate(this);
    return validationErrors.length === 0;
  }

  /**
   * 
   * @returns 
   */
  public enable() : void {
    if (this.price > 0) {
      this.status = ProductStatus.ENABLED
      return;
    }

    throw new Error("The price must be greater than zero to enable the product");    
  }

  /**
   * 
   * @returns 
   */
  public disable() : void {
    if (this.price === 0) {
      this.status = ProductStatus.DISABLED;
      return;
    }

    throw new Error("The price must be zero in order to have the product disabled");
    
  }

}