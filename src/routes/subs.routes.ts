import { Router } from "express";
import { createSub } from "../controllers/subs.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/create", requireAuth, createSub);

export default router;
