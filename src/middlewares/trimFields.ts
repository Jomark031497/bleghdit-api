import { NextFunction, Request, Response } from "express";

/**
 * remove whitespaces from fields (such as username, email, etc.) with the exception of passwords and non-string types
 */
const trim = (req: Request, _: Response, next: NextFunction) => {
  Object.keys(req.body).forEach((key) => {
    if (key != "password" && typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });

  next();
};

export default trim;
