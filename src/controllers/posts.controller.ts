import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import Post from "../entities/Post";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  // get user from session
  const user: any = req.user;
  if (!user) return res.status(404).json({ error: "unauthenticated" });

  try {
    // TODO: find sub

    const findSub = await Subs.findOneOrFail({ name: sub });
    const post = new Post({ title, body, user, sub: findSub });

    await post.save();

    return res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};
