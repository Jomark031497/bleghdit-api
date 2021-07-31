import { Request, Response, Router } from "express";
import User from "../entities/User";
import { validate, isEmpty } from "class-validator";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import dotenv from "dotenv";
import auth from "../middlewares/auth";
import { mapErrors } from "../util/helper";

dotenv.config();

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};

    const checkEmail = await User.findOne({ email });
    const checkUsername = await User.findOne({ username });

    if (checkEmail) errors.email = "Email is already taken";
    if (checkUsername) errors.username = "Username is already taken";

    if (Object.keys(errors).length) {
      return res.status(400).json(errors);
    }

    const user = new User({ email, username, password });

    errors = await validate(user);
    if (errors.length) {
      return res.status(400).json(mapErrors(errors));
    }

    await user.save();

    return res.json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let errors: any = {};

  if (isEmpty(username)) errors.username = "Username must not be empty";
  if (isEmpty(password)) errors.password = "Password must not be empty";
  if (Object.keys(errors).length) return res.status(400).json(errors);

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      return res.status(401).json({ password: "Password is incorrect" });

    // generate the token
    const token = jwt.sign({ username }, process.env.JWT_SECRET!);

    // set cookie
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const me = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

const logout = (_: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ success: true });
};

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", auth, me);

router.get("/logout", auth, logout);

export default router;
