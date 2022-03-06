import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import passport from "passport";
import { isEmpty, validate } from "class-validator";
import { mapErrors } from "../utils/helpers";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    let errors: any = {};

    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    if (checkUser) errors.username = "Username is already taken";
    if (checkEmail) errors.email = "Email is already taken";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = new User({ email, username, password });
    errors = await validate(user);
    if (errors.length > 0) return res.status(400).json(mapErrors(errors));

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    let errors: any = {};

    if (isEmpty(username)) errors.username = "Username must not be empty";
    if (isEmpty(password)) errors.password = "Password must not be empty";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    passport.authenticate("local", async (err, user, _) => {
      try {
        if (err) return next(err);
        if (!user) return res.status(400).json({ error: "Usernames/Password is incorrect" });

        req.logIn(user, (err: Error) => {
          if (err) return next(err);
          res.status(200).json(user);
          next();
        });
      } catch (e) {
        return res.status(500).json({ error: "Something went wrong" });
      }
    })(req, res, next);
  } catch (e) {
    return res.status(400).json(e);
  }
  return null;
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) return res.status(404).json({ error: "no user found" });
  return res.status(200).json(req.user);
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(404).json({ error: "no user found" });
    req.logout();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
