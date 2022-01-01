import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import { getConnection, getRepository } from "typeorm";
import Post from "../entities/Post";

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

export const getSubs = async (_: Request, res: Response) => {
  try {
    const imageUrlExp = `COALESCE('${process.env.SERVER_URL}/images/' || s."imageURN" , '')`;
    const subs = await getConnection()
      .createQueryBuilder()
      .select(`s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`)
      .from(Subs, "s")
      .leftJoin(Post, "p", `s.name = p."subName"`)
      .groupBy('s.title, s.name, "imageUrl"')
      .orderBy(`"postCount"`, "DESC")
      .limit(5)
      .execute();
    return res.status(200).json(subs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getSub = async (req: Request, res: Response) => {
  const { name } = req.params; // get the sub name from the request
  const user: any = req.user; //get authenticated user if available

  try {
    const sub = await Subs.findOneOrFail({ name }); // find the sub from the Subs
    const posts = await Post.find({
      where: { sub },
      relations: ["comments", "votes"],
      order: { createdAt: "DESC" },
    });

    sub.posts = posts;

    if (user) {
      sub.posts.forEach((post) => post.setUserVote(user));
    }

    return res.json(sub);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ sub: "sub not found" });
  }
};

export const uploadSubImage = async (req: Request, res: Response) => {
  const user: any = req.user; // get the user from session
  const sub: Subs = user.sub;
  const type = req.body.type; // get the type (image/bannner) from req.body
  try {
    // check if type is banner or image
    if (type !== "image" && type !== "banner") return res.status(400).json({ error: "invalid type" });

    if (type === "image") {
      sub.imageURN = req.file!.path;
    } else {
      sub.bannerURN = req.file!.path;
    }

    await sub.save();

    return res.status(200).json(sub);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const deleteSubImage = async (req: Request, res: Response) => {
  const { name, type } = req.params;
  try {
    if (type !== "image" && type !== "banner") {
      return res.status(400).json({ error: "invalid type" }); // return an error
    }

    const sub = await Subs.findOneOrFail({ name });

    if (type === "image") {
      // delete

      sub.imageURN = "";
    } else if (type === "banner") {
      // delete
      sub.bannerURN = "";
    }

    await sub.save();

    return res.status(200).json(sub);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const searchSubs = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (isEmpty(name)) return res.status(400).json({ error: "Name must not be empty" });

    const subs = await getRepository(Subs)
      .createQueryBuilder()
      .where("LOWER(name) LIKE :name", { name: `${name.toLowerCase().trim()}%` })
      .getMany();

    return res.status(200).json(subs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "something went wrong" });
  }
};
