import { Request, Response } from "express";
import User from "../entities/User";
import { isEmpty, validate } from "class-validator";
import { mapErrors } from "../utils/helpers";
import { verify } from "argon2";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  let errors: any = {};
  try {
    const checkUser = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });

    if (checkUser) errors.username = "Username is already taken";
    if (checkEmail) errors.email = "Email is already taken";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = new User({ email, username, password });
    errors = await validate(user);
    if (errors.length > 0) return res.status(400).json(mapErrors(errors));
    await user.save();

    req.session.userId = user.id;

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong", message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let errors: any = {};

  try {
    if (isEmpty(username)) errors.username = "Username must not be empty";
    if (isEmpty(password)) errors.password = "Password must not be empty";
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "wrong username/password" });

    const valid = await verify(user.password, password);
    if (!valid) return res.status(400).json({ error: "wrong username/password" });

    req.session.userId = user.id;

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong", message: error.message });
  }
};

export const me = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  try {
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(401).json({ error: "unauthorized" });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong", message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong", message: error.message });
  }
};
