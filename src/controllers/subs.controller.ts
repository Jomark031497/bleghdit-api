import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import { getRepository } from "typeorm";

export const createSub = async (req: Request, res: Response) => {
  // destructure the fields
  const { name, title, description } = req.body;

  // get user from session
  const user: any = req.user;
  // return an error if there is no authenticated user
  if (!user) return res.status(404).json({ error: "unauthenticated" });

  try {
    // validations
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be empty";
    if (isEmpty(title)) errors.title = "Title must not be empty";

    // check if there's an existing sub already
    const sub = await getRepository(Subs)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Subleddit name already exists";

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    // create a sub
    const newSub = new Subs({ name, description, title, user });
    // save to the database
    await newSub.save();

    return res.status(200).json(newSub);
  } catch (e) {
    return res.status(400).json(e);
  }
};
