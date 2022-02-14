import { NextFunction, Request, Response } from "express";
import log from "../logger";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = get(req, "headers.x-refresh");
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
  }

  if (expired && refreshToken) {
    // reissue access token
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    log.info(newAccessToken);
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }
    const result = verifyJwt(accessToken);
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
