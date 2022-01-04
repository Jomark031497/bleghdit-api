import { Request, Response } from "express";
import Subs from "../entities/Subleddit";
import Post from "../entities/Post";
import Comment from "../entities/Comment";
import User from "../entities/User";

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body; // destructure fields
  const user: any = req.user; // get user from the session
  if (!user) return res.status(404).json({ error: "unauthenticated" }); // return an error if there is no authenticated user
  try {
    const findSub = await Subs.findOneOrFail({ name: sub }); // check if the sub exists
    const post = new Post({ title, body, user, sub: findSub }); //create a post
    await post.save(); // save to the database
    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const user: any = req.user; // get session user
  const currentPage: number = (req.query.page || 0) as number; // initialize currentPage for inifinite loading
  const postsPerPage: number = (req.query.count || 8) as number; // set number of pages to render for infinite loading

  try {
    // find all the posts
    const posts = await Post.find({
      order: { createdAt: "DESC" }, // display the latest post
      relations: ["sub", "votes", "comments"], // fetch relations
      skip: currentPage * postsPerPage,
      take: postsPerPage,
    });

    if (user) posts.forEach((p) => p.setUserVote(user)); // set the userVote for voting indicators
    return res.json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { slug, identifier } = req.params; // destructure fields
  const user: any = req.user; // get user from session

  try {
    // find the specific post
    const post = await Post.findOneOrFail(
      { identifier, slug },
      {
        relations: ["sub", "votes", "comments"], // add sub from the JSON
      }
    );
    if (user) post.setUserVote(user); // set the userVote to see voting indicator (if user is present)
    return res.status(200).json(post);
  } catch (e) {
    return res.status(404).json({ error: "Post not found" });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params; // destructure fields
  const { body } = req.body; // destructure fields
  const user: any = req.user; // get the current authorized user from session
  try {
    const post = await Post.findOneOrFail({ identifier, slug }); // fetch the post

    // create the new comment
    const comment = new Comment({
      body,
      user,
      post,
    });
    await comment.save(); // save the comment
    return res.status(200).json(comment);
  } catch (e) {
    console.error(e);
    return res.status(404).json({ error: "Posts not found" });
  }
};

export const getPostComments = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params; // destructure fields
  const user: any = req.user; // get the user from session
  try {
    const post = await Post.findOneOrFail({ identifier, slug }); //fetch the post

    // find the comments of the post
    const comments = await Comment.find({
      where: { post },
      order: { createdAt: "DESC" },
      relations: ["votes"],
    });
    if (user) comments.forEach((comment) => comment.setUserVote(user)); // set the user vote if there is a user
    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getUserSubmissions = async (req: Request, res: Response) => {
  const { username } = req.params; // destructure field
  const sessionUser: any = req.user; // get session user
  try {
    // fetch user data
    const user = await User.findOneOrFail({
      where: { username },
      select: ["username", "createdAt"],
    });
    // fetch posts of user
    const posts = await Post.find({
      where: { username },
      order: { createdAt: "DESC" }, // display the latest post
      relations: ["comments", "votes", "sub"],
    });
    // fetch comments of user
    const comments = await Comment.find({
      where: { username },
      order: { createdAt: "DESC" },
      relations: ["post"],
    });
    if (sessionUser) posts.forEach((p) => p.setUserVote(sessionUser)); // set uservote for comments and post
    if (sessionUser) comments.forEach((p) => p.setUserVote(sessionUser));

    let submissions: any = []; // variable to store comments and post
    posts.forEach((post) => submissions.push({ type: "POST", ...post })); // attach type to the posts
    comments.forEach((comment) => submissions.push({ type: "COMMENT", ...comment })); // attach type to the comments
    return res.json({ user, submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};
