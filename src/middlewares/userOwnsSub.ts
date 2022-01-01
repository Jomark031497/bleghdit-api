import { NextFunction, Request, Response } from "express";
import Subs from "../entities/Subleddit";

// check if the user is the owner of the sub
export const userOwnsSub = async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user; // get the user from the session
  try {
    const sub = await Subs.findOneOrFail({ where: { name: req.params.name } }); // get the sub name from req.params

    // return an error if  the username from the sub isn't the current user
    if (sub.username !== user.username) return res.status(403).json({ error: "You don't own this sub" });

    user.sub = sub; // add the sub from the user entity

    return next();
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
