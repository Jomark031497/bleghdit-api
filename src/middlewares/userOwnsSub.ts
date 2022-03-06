import { NextFunction, Request, Response } from "express";
import Subs from "../entities/Subleddit";

export const userOwnsSub = async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  try {
    const sub = await Subs.findOneOrFail({ where: { name: req.params.name } });

    if (sub.username !== user.username) return res.status(403).json({ error: "You don't own this sub" });

    user.sub = sub;

    return next();
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
