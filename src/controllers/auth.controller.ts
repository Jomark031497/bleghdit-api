import { NextFunction, Request, Response } from "express";
import User from "../entities/User";
import passport from "passport";
import { isEmpty, validate } from "class-validator";
import { mapErrors } from "../utils/helpers";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body; // destructure fields
  try {
    let errors: any = {}; // initialize variable to store errors

    // Check if there's already an existing username and password in the database
    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    // insert the errors to the errors object with their respective key-value pair
    if (checkUser) errors.username = "Username is already taken";
    if (checkEmail) errors.email = "Email is already taken";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors); // return a 400 error if there are errors

    const user = new User({ email, username, password }); // create a new User
    errors = await validate(user); // validate the user using class validator
    if (errors.length > 0) return res.status(400).json(mapErrors(errors)); // premature return if errors found

    // save the user to the database
    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body; // destructure fields
  try {
    let errors: any = {}; // initialize variables to store errors

    // check if the fields are empty
    if (isEmpty(username)) errors.username = "Username must not be empty";
    if (isEmpty(password)) errors.password = "Password must not be empty";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors); // premature return if errors found

    // authenticate the login
    passport.authenticate("local", async (err, user, _) => {
      try {
        if (err) return next(err); // premature return if errors found
        if (!user) return res.status(400).json({ error: "Usernames/Password is incorrect" }); // premature return if wrong credentials

        // authorize the login
        req.logIn(user, (err: Error) => {
          if (err) return next(err); // premature return if errors found
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
  if (!req.user) return res.status(404).json({ error: "no user found" }); // return if no user is found
  return res.status(200).json(req.user);
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(404).json({ error: "no user found" }); // return if no user is found
    req.logout(); // logout curent session user
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
