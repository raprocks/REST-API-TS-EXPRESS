import { NextFunction, Request, Response } from "express";
import log from "../logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  log.info("Checking if user is on request");
  const user = res.locals.user;
  //   log.info(`User`);
  //   console.dir(res.locals);
  if (!user) {
    return res.sendStatus(403);
  }
  //   log.info("User found on request");
  return next();
};

export default requireUser;
