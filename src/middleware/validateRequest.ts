import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { AnyZodObject } from "zod";
import path from "path";
const log = logger.child({ filename: path.relative("./", __filename) })
const validate =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        return next();
      } catch (e: any) {
        log.error(e);
        return res.status(400).send(e.errors);
      }
    };

export default validate;
