import { Request, Response } from "express";
import { omit } from "lodash";
import path from "path";
import logger from "../logger";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
const log = logger.child({ filename: path.relative("./", __filename) })
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    log.error(error);
    res.status(409).send(error.message);
  }
}
