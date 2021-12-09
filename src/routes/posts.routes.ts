import { Router } from "express";
import { commentOnPost, createPost, getPost, getPosts } from "../controllers/posts.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/create", requireAuth, createPost);
router.get("/", getPosts);
router.get("/:identifier/:slug", getPost);
router.post("/:identifier/:slug/comments", requireAuth, commentOnPost);

export default router;
