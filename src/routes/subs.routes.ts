import { Router } from "express";
import { createSub, getSub, uploadSubImage } from "../controllers/subs.controller";
import requireAuth from "../middlewares/requireAuth";
import { userOwnsSub, upload } from "../middlewares/uploadImage";

const router = Router();

router.post("/create", requireAuth, createSub);

router.get("/:name", getSub);

router.post("/:name/image", requireAuth, userOwnsSub, upload.single("file"), uploadSubImage);

export default router;
