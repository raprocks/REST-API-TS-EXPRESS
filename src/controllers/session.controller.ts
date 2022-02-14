import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
// import {} from "../schemas/session.schema";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password!");
  }

  // create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  // create access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 min
  );
  // create refresh token

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 15 min
  );
  // return refersh and access token
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  // log.info(`Getting user session: ${res.locals}`);
  const userId = res.locals.user._id;
  log.info(`Logged in user id: ${userId}`);

  const session = await findSessions({ user: userId, valid: true });

  return res.send(session);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
