import { isEmpty } from "class-validator";
import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";
import User from "../entities/User";
import auth from "./auth";

const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};

    if (isEmpty(name)) errors.name = "Name must not be empty";
    if (isEmpty(title)) errors.name = "Title must not be empty";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Sub already exists";

    if (Object.keys(errors).length) throw errors;
  } catch (e) {
    return res.status(400).json(e);
  }

  try {
    const sub = new Sub({ name, description, title, user });
    await sub.save();

    return res.json(sub);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const router = Router();

router.post("/", auth, createSub);

export default router;
