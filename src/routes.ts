import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import validateRequest from "./middleware/validateRequest";
import { createdSessionSchema } from "./schemas/session.schema";
import { createdUserSchema } from "./schemas/user.schema";

export default function (app: Express) {
  app.get(
    "/healthcheck",
    (req: Request, res: Response) => {
      return res.sendStatus(200);
    },
    app.post(
      "/api/users",
      validateRequest(createdUserSchema),
      createUserHandler
    ),
    app.post(
      "/api/sessions",
      validateRequest(createdSessionSchema),
      createUserSessionHandler
    ),
    app.get("/api/sessions", requireUser, getUserSessionHandler),
    app.delete("/api/sessions", requireUser, deleteSessionHandler)
  );
}
