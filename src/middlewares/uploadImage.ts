import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import Subs from "../entities/Subleddit";
import { makeID } from "../utils/helpers";

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

export const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images",
    filename: (_, file, callback) => {
      const name = makeID(15);
      callback(null, name + path.extname(file.originalname)); // e.g. 15letter + .png
    },
  }),
  fileFilter: (_, file, callback: FileFilterCallback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      callback(new Error("not an image"));
    }
  },
});
