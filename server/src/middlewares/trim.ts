import { NextFunction, Request, Response } from "express";

export default (req: Request, _: Response, next: NextFunction) => {
  // trim requests except password key
  const exceptions = ["password"];

  // loop through the keys of req.body
  Object.keys(req.body).forEach((key) => {
    // trim if the key isn't password and the key is a string
    if (!exceptions.includes(key) && typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });

  next();
};
