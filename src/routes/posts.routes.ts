import { Router } from "express";
import { createPost, getPosts } from "../controllers/posts.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/create", requireAuth, createPost);
router.get("/", getPosts);

export default router;
