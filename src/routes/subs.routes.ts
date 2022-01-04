import { Router } from "express";
import { createSub, getSub, getSubs, searchSubs, uploadSubImage } from "../controllers/subs.controller";
import requireAuth from "../middlewares/requireAuth";
import { upload } from "../middlewares/uploadImage";
import { userOwnsSub } from "../middlewares/userOwnsSub";

const router = Router();

router.post("/create", requireAuth, createSub);

router.get("/", getSubs);

router.get("/:name", getSub);

router.post("/:name/image", requireAuth, userOwnsSub, upload.single("file"), uploadSubImage);

router.get("/search/:name", searchSubs);

export default router;
