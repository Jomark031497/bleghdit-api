import { Request, Response } from "express";
import User from "../entities/User";
import { compare } from "bcrypt";

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

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // de hashing
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) return res.status(400).json({ error: "Incorrect password, please try again" });

    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};
