import { Request, Response, NextFunction } from "express";
import { unauthorizedError } from "../utils/errorUtils";
import * as userUtils from "../utils/userUtils";
import AppLog from "../utils/AppLog";
import { User } from ".prisma/client";

function authValidation(endpoint?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("authorization");
    const tokenInput = header?.replace("Bearer", "").trim();

    if (!header) {
      throw unauthorizedError(
        "You need to send the needed headers for authorization"
      );
    }

    try {
      const tokenValidation = userUtils.validateToken(tokenInput);
      res.locals.user = tokenValidation;
    } catch (err) {
      throw unauthorizedError("Error trying to validate token");
    }

    res.locals.header = header;
    AppLog("Middleware", `Header for endpoint ${endpoint} processed`);
    return next();
  };
}

export default authValidation;
