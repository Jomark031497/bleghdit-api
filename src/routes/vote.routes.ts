import { Router } from "express";
import { vote } from "../controllers/vote.controller";
import requireAuth from "../middlewares/requireAuth";

const router = Router();

router.post("/", requireAuth, vote);

export default router;
