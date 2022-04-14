import { validate } from "class-validator";
import { Request, Response } from "express";
import User from "../entities/User";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let errors: any = {};
  try {
    const userExists = await User.findOne({ username });
    if (userExists) errors.username = "username is already taken";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = User.create({ username, password });

    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(errors);

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
