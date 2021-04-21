import ProductInterface from "./ProductInterface";

interface ProductReader {
  get(id: string) : Promise<ProductInterface>
}

interface ProductWriter {
  save(product: ProductInterface): Promise<ProductInterface>
}

export default interface ProductPersistenceInterface extends ProductReader, ProductWriter {

}