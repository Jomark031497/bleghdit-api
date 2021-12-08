import { Request, Response } from "express";
import Post from "../entities/Post";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, subredditName } = req.body;

  // get user from session
  const user: any = req.user;
  if (!user) return res.status(404).json({ error: "unauthenticated" });

  try {
    // TODO: find sub
    const post = new Post({ title, body, user: user, subredditName });

    await post.save();

    return res.json(post);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};
