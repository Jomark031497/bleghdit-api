import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    console.log(email, username, password);
    res.send({
      username,
      email,
      password,
    });
  } catch (e) {
    console.error(e);
  }
};
