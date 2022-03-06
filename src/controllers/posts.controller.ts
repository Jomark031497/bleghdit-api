import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import Post from "../entities/Post";
import Comment from "../entities/Comment";
import User from "../entities/User";
import { isEmpty } from "class-validator";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;
  const user: any = req.user;
  if (!user) return res.status(404).json({ error: "unauthenticated" });
  try {
    let errors: any = {};
    if (isEmpty(title)) errors.title = "post title cannot be empty";
    const findSub = await Subs.findOneOrFail({ name: sub });
    const post = new Post({ title, body, user, sub: findSub });
    if (Object.keys(errors).length > 0) return res.status(400).json(errors);
    await post.save();
    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const user: any = req.user;
  const currentPage: number = (req.query.page || 0) as number;
  const postsPerPage: number = (req.query.count || 8) as number;

  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" },
      relations: ["sub", "votes", "comments"],
      skip: currentPage * postsPerPage,
      take: postsPerPage,
    });

    if (user) posts.forEach((p) => p.setUserVote(user));
    return res.json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { slug, identifier } = req.params;
  const user: any = req.user;

  try {
    const post = await Post.findOneOrFail(
      { identifier, slug },
      {
        relations: ["sub", "votes", "comments"],
      }
    );
    if (user) post.setUserVote(user);
    return res.status(200).json(post);
  } catch (e) {
    return res.status(404).json({ error: "Post not found" });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const { body } = req.body;
  const user: any = req.user;
  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comment = new Comment({
      body,
      user,
      post,
    });
    await comment.save();
    return res.status(200).json(comment);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: "Posts not found" });
  }
};

export const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const user: any = req.user;
  try {
    const post = await Post.findOneOrFail({ identifier, slug });

    const comments = await Comment.find({
      where: { post },
      order: { createdAt: "ASC" },
      relations: ["votes"],
    });
    if (user) comments.forEach((comment) => comment.setUserVote(user));
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
      where: { username },
      order: { createdAt: "DESC" },
      relations: ["comments", "votes", "sub"],
    });

    const comments = await Comment.find({
      where: { username },
      order: { createdAt: "DESC" },
      relations: ["post"],
    });
    if (sessionUser) posts.forEach((p) => p.setUserVote(sessionUser));
    if (sessionUser) comments.forEach((p) => p.setUserVote(sessionUser));

    let submissions: any = [];
    posts.forEach((post) => submissions.push({ type: "POST", ...post }));
    comments.forEach((comment) => submissions.push({ type: "COMMENT", ...comment }));
    return res.json({ user, submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};
