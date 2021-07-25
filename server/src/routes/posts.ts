import { Request, Response, Router } from "express";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import auth from "../middlewares/auth";

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === "")
    return res.status(400).json({ title: "Title must not be empty" });

  try {
    const findSub = await Sub.findOneOrFail({ name: sub });
    const post = new Post({ title, body, user, sub: findSub });
    await post.save();

    return res.json(post);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const router = Router();

router.post("/", auth, createPost);

export default router;
