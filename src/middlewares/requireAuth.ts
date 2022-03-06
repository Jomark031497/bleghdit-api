import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "No authentication token. Authorization denied" });
  }
  return next();
};

export default requireAuth;
