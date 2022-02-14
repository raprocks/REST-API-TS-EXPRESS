import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "description is required",
    }).min(120, "Description should be atleast 120 characters long."),
    price: number({
      required_error: "price is required",
    }).gt(0, "Price cannot be negative"),
    image: string({
      required_error: "image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "product_id is required",
    }),
  }),
};

export const createProductSchema = object({ ...payload });
export const updateProductSchema = object({
  ...payload,
  ...params,
});
export const deleteProductSchema = object({ ...params });
export const getProductSchema = object({ ...params });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
