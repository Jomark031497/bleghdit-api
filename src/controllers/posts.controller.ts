import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import Post from "../entities/Post";
import Comment from "../entities/Comment";
import User from "../entities/User";

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
        relations: ["sub", "votes", "comments"], // add sub from the JSON
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
  const { body } = req.body;
  const user: any = req.user; // get the current authorized user from session
  try {
    const post = await Post.findOneOrFail({ identifier, slug }, { relations: ["post"] });
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
    return res.status(404).json({ error: "Posts not found" });
  }
};

export const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params; // destructure the identifier and slug to fetch the post
  const user: any = req.user; // get the user from session

  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comments = await Comment.find({
      where: { post },
      order: { createdAt: "DESC" },
      relations: ["votes"],
    });

    // set the user vote if there is a user
    if (user) {
      comments.forEach((comment) => comment.setUserVote(user));
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getUserSubmissions = async (req: Request, res: Response) => {
  const { username } = req.params;

  const sessionUser: any = req.user;
  try {
    const user = await User.findOneOrFail({
      where: { username },
      select: ["username", "createdAt"],
    });

    const posts = await Post.find({
      where: { user },
      order: { createdAt: "DESC" },
      relations: ["comments", "votes", "sub"],
    });

    const comments = await Comment.find({
      where: { username },
      order: { createdAt: "DESC" },
      relations: ["post"],
    });

    if (sessionUser) {
      posts.forEach((p) => p.setUserVote(sessionUser));
    }

    if (sessionUser) {
      comments.forEach((p) => p.setUserVote(sessionUser));
    }

    let submissions: any = [];
    posts.forEach((post) => submissions.push({ type: "POST", ...post }));
    comments.forEach((comment) => submissions.push({ type: "COMMENT", ...comment }));

    return res.json({ user, submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};
