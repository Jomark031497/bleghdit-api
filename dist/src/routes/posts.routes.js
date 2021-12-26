"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts.controller");
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router = (0, express_1.Router)();
router.get("/user/:username", posts_controller_1.getUserSubmissions);
router.post("/create", requireAuth_1.default, posts_controller_1.createPost);
router.get("/", posts_controller_1.getPosts);
router.get("/:identifier/:slug", posts_controller_1.getPost);
router.post("/:identifier/:slug/comments", requireAuth_1.default, posts_controller_1.commentOnPost);
router.get("/:identifier/:slug/comments", posts_controller_1.getPostComments);
exports.default = router;
//# sourceMappingURL=posts.routes.js.map