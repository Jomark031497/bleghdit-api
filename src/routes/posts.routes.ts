import { Router } from "express";
import { createPost } from "../controllers/posts.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/create", requireAuth, createPost);

export default router;
