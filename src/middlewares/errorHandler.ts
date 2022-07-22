import { NextFunction, Request, Response } from "express";

import AppLog from "../utils/AppLog";
import { errorTypeToStatusCode, isAppError } from "../utils/errorUtils";
import "express-async-errors";

export default function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isAppError(err)) {
    const statusCode = errorTypeToStatusCode(err.type);
    AppLog("Error", err.message);
    return res.status(statusCode).send(err.message);
  }

  AppLog("Error", "Error not tracked");
  res.sendStatus(500);
}
