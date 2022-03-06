import { NextFunction, Request, Response } from "express";

const trim = (req: Request, _: Response, next: NextFunction) => {
  Object.keys(req.body).forEach((key) => {
    if (key != "password" && typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });

  next();
};

export default trim;
