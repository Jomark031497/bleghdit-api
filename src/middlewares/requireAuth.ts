import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // return 401 if user is not authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "No authentication token. Authorization denied" });
  }
  return next();
};

export default requireAuth;
