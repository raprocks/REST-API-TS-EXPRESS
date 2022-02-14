import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import productModel, { ProductDocument } from "../models/product.model";

export async function createProduct(
  input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
) {
  return productModel.create(input);
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return productModel.findOne(query, {}, options);
}

export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return productModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return productModel.deleteOne(query);
}
