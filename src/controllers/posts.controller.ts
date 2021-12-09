import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import Post from "../entities/Post";

export const createPost = async (req: Request, res: Response) => {
  // destructure the fields
  const { title, body, sub } = req.body;

  // get user from session
  const user: any = req.user;
  // return an error if there is no authenticated user
  if (!user) return res.status(404).json({ error: "unauthenticated" });

  try {
    // check if the sub exists
    const findSub = await Subs.findOneOrFail({ name: sub });
    //create a post
    const post = new Post({ title, body, user, sub: findSub });

    // save to the database
    await post.save();

    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find();

    return res.json(posts);
  } catch (e) {
    return res.json({ error: "something went wrong" });
  }
};
