import { Router } from "express";
import {
  commentOnPost,
  createPost,
  getPost,
  getPostComments,
  getPosts,
  getUserSubmissions,
} from "../controllers/posts.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.get("/user/:username", getUserSubmissions);
router.post("/create", requireAuth, createPost);
router.get("/", getPosts);
router.get("/:identifier/:slug", getPost);
router.post("/:identifier/:slug/comments", requireAuth, commentOnPost);
router.get("/:identifier/:slug/comments", getPostComments);

export default router;
