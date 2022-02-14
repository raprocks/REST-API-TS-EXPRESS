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
    // Register
    // POST /api/user
    app.post(
      "/api/users",
      validateRequest(createdUserSchema),
      createUserHandler
    ),

    // Login
    // POST /api/sessions
    app.post(
      "/api/sessions",
      validateRequest(createdSessionSchema),
      createUserSessionHandler
    ),

    // Getuser session
    // GET /api/sessions
    app.get("/api/sessions", requireUser, getUserSessionHandler),

    // Logout
    // DELETE /api/session
    app.delete("/api/sessions", requireUser, deleteSessionHandler)

    // GET /api/posts /api/posts/postid
  );
}
