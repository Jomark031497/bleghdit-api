import { isEmpty } from "class-validator";
import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import { getConnection, getRepository } from "typeorm";
import Post from "../entities/Post";

export const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body; // destructure the fields
  const user: any = req.user; // get user from session
  if (!user) return res.status(404).json({ error: "unauthenticated" }); // return an error if there is no authenticated user
  try {
    // validations
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be empty";
    if (isEmpty(title)) errors.title = "Title must not be empty";

    if (name.indexOf(" ") >= 0) errors.name = "sub name shouldn't have whitespace";

    if (/[^a-z]/i.test(name)) errors.name = "sub should only have letters (a-z)";
    // check if there's an existing sub already
    const sub = await getRepository(Subs)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Subleddit name already exists"; // create the error
    if (Object.keys(errors).length > 0) return res.status(400).json(errors); // return error

    const newSub = new Subs({ name, description, title, user }); // create a sub
    await newSub.save(); // save to the database
    return res.status(200).json(newSub);
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const getSubs = async (_: Request, res: Response) => {
  try {
    const subs = await getConnection()
      .createQueryBuilder()
      .select(`s.title, s.name, s.imageURN, count(p.id) as "postCount"`)
      .from(Subs, "s")
      .leftJoin(Post, "p", `s.name = p."subName"`)
      .groupBy('s.title, s.name, "imageURN"')
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
    // fetch posts
    const posts = await Post.find({
      where: { sub },
      relations: ["comments", "votes"],
      order: { createdAt: "DESC" },
    });
    sub.posts = posts; // add posts to the sub
    if (user) sub.posts.forEach((post) => post.setUserVote(user)); // set user vote for voting display
    return res.json(sub);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ sub: "sub not found" });
  }
};

export const uploadSubImage = async (req: Request, res: Response) => {
  const user: any = req.user; // get the user from session
  const sub: Subs = user.sub; // get sub from user
  const type = req.body.type; // get the type (image/bannner) from req.body
  try {
    // check if type is banner or image
    if (type !== "image" && type !== "banner") return res.status(400).json({ error: "invalid type" });

    if (type === "image") {
      sub.imageURN = req.file!.path; // add the imageURN
    } else {
      sub.bannerURN = req.file!.path; // add the bannerURN
    }
    await sub.save();
    return res.status(200).json(sub);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const searchSubs = async (req: Request, res: Response) => {
  const { name } = req.params; // destructure field
  try {
    if (isEmpty(name)) return res.status(400).json({ error: "Name must not be empty" }); // return if search is empty

    // find the subs using wildcard
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
