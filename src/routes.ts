import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/product.controller";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import validateRequest from "./middleware/validateRequest";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schemas/product.schema";
import { createdSessionSchema } from "./schemas/session.schema";
import { createdUserSchema } from "./schemas/user.schema";

export default function (app: Express) {
  app.get("/", (req: Request, res: Response<{ status: string }>) => {
    res.json({ status: "OK" });
  });
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  app.post("/api/users", validateRequest(createdUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateRequest(createdSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get(
    "/api/products/:productId",
    validateRequest(getProductSchema),
    getProductHandler
  );
  app.post(
    "/api/products",
    [requireUser, validateRequest(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateRequest(updateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateRequest(deleteProductSchema)],
    deleteProductHandler
  );
}
