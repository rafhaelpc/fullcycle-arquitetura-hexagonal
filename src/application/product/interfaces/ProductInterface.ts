export default interface ProductInterface {
  isValid() : Promise<boolean>;
  enable() : void;
  disable() : void;
  getId() : string;
  getName() : string;
  getStatus() : string;
  getPrice() : number;
}

export enum ProductStatus {
  DISABLED = "disabled",
  ENABLED = "enabled"
}