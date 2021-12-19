import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import Post from "../entities/Post";
import Comment from "../entities/Comment";

export const createPost = async (req: Request, res: Response) => {
  // destructure the fields
  const { title, body, sub } = req.body;

  // get user from session
  const user: any = req.user;
  // return an error if there is no authenticated user
  if (!user) return res.status(404).json({ error: "unauthenticated" });

  try {
    const findSub = await Subs.findOneOrFail({ name: sub }); // check if the sub exists
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

export const getPosts = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    // find all the posts
    const posts = await Post.find({
      order: { createdAt: "DESC" }, // display the latest post
      relations: ["comments", "votes", "sub"],
    });

    if (user) posts.forEach((p) => p.setUserVote(user));

    return res.json(posts);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { slug, identifier } = req.params; // destructure the slug and identifier from params

  const user: any = req.user;
  try {
    // find the specific post
    const post = await Post.findOneOrFail(
      { identifier, slug },
      {
        relations: ["sub", "votes"], // add sub from the JSON
      }
    );

    if (user) {
      post.setUserVote(user);
    }

    return res.status(200).json(post);
  } catch (e) {
    return res.status(404).json({ error: "Post not found" });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params; // destructure the body, slug and identifier from params and body
  const body = req.body.body;

  const user: any = req.user; // get the current authorized user from session
  try {
    const post = await Post.findOneOrFail({ identifier, slug });
    const comment = new Comment({
      body,
      user,
      post,
    });

    // save the comment
    await comment.save();

    return res.status(200).json(comment);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: "Post not found" });
  }
};
