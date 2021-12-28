"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subs_controller_1 = require("../controllers/subs.controller");
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const uploadImage_1 = require("../middlewares/uploadImage");
const router = (0, express_1.Router)();
router.post("/create", requireAuth_1.default, subs_controller_1.createSub);
router.get("/", subs_controller_1.getSubs);
router.get("/:name", subs_controller_1.getSub);
router.post("/:name/image", requireAuth_1.default, uploadImage_1.userOwnsSub, uploadImage_1.upload.single("file"), subs_controller_1.uploadSubImage);
router.delete("/:name/:type", requireAuth_1.default, uploadImage_1.userOwnsSub, subs_controller_1.deleteSubImage);
router.get("/search/:name", subs_controller_1.searchSubs);
exports.default = router;
//# sourceMappingURL=subs.routes.js.map