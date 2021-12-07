import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import passport from "passport";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    // VALIDATIONS
    let errors: any = {};
    // Check if there's already an existing username and password in the database
    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    // insert the errors to the errors object with their respective key-value pair
    if (checkUser) errors.username = "Username is already taken";
    if (checkEmail) errors.email = "Email is already taken";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // CREATE USER
    const user = new User({ email, username, password });
    await user.save();
    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", async (err, user, _) => {
    try {
      console.log("am here");
      if (err) return next(err);
      if (!user) return res.status(400).json({ error: "Usernames/Password is incorrect" });
      console.log("am here2");
      req.logIn(user, (err: Error) => {
        console.log("am here3");
        if (err) return next(err);
        res.json(user);
        next();
      });
    } catch (e) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  })(req, res, next);
};
