import { Router } from "express";
import { createSub, getSub } from "../controllers/subs.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/create", requireAuth, createSub);

router.get("/:name", getSub);

export default router;
