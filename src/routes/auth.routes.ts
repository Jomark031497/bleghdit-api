import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", me);

router.get("/logout", logout);

export default router;
