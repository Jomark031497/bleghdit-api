import { Router } from "express";
import requireAuth from "../middlewares/requireAuth";
import { login, logout, me, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", requireAuth, me);

router.get("/logout", requireAuth, logout);

export default router;
