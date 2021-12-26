"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSubmissions = exports.getPostComments = exports.commentOnPost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const Subleddit_1 = __importDefault(require("../entities/Subleddit"));
const Post_1 = __importDefault(require("../entities/Post"));
const Comment_1 = __importDefault(require("../entities/Comment"));
const User_1 = __importDefault(require("../entities/User"));
const createPost = async (req, res) => {
    const { title, body, sub } = req.body;
    const user = req.user;
    if (!user)
        return res.status(404).json({ error: "unauthenticated" });
    try {
        const findSub = await Subleddit_1.default.findOneOrFail({ name: sub });
        const post = new Post_1.default({ title, body, user, sub: findSub });
        await post.save();
        return res.status(200).json(post);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.createPost = createPost;
const getPosts = async (req, res) => {
    const user = req.user;
    try {
        const posts = await Post_1.default.find({
            order: { createdAt: "DESC" },
            relations: ["comments", "votes", "sub"],
        });
        if (user)
            posts.forEach((p) => p.setUserVote(user));
        return res.json(posts);
    }
    catch (e) {
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.getPosts = getPosts;
const getPost = async (req, res) => {
    const { slug, identifier } = req.params;
    const user = req.user;
    try {
        const post = await Post_1.default.findOneOrFail({ identifier, slug }, {
            relations: ["sub", "votes", "comments"],
        });
        if (user) {
            post.setUserVote(user);
        }
        return res.status(200).json(post);
    }
    catch (e) {
        return res.status(404).json({ error: "Post not found" });
    }
};
exports.getPost = getPost;
const commentOnPost = async (req, res) => {
    const { identifier, slug } = req.params;
    const { body } = req.body;
    const user = req.user;
    try {
        const post = await Post_1.default.findOneOrFail({ identifier, slug }, { relations: ["post"] });
        const comment = new Comment_1.default({
            body,
            user,
            post,
        });
        await comment.save();
        return res.status(200).json(comment);
    }
    catch (e) {
        console.error(e);
        return res.status(404).json({ error: "Posts not found" });
    }
};
exports.commentOnPost = commentOnPost;
const getPostComments = async (req, res) => {
    const { identifier, slug } = req.params;
    const user = req.user;
    try {
        const post = await Post_1.default.findOneOrFail({ identifier, slug });
        const comments = await Comment_1.default.find({
            where: { post },
            order: { createdAt: "DESC" },
            relations: ["votes"],
        });
        if (user) {
            comments.forEach((comment) => comment.setUserVote(user));
        }
        return res.status(200).json(comments);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.getPostComments = getPostComments;
const getUserSubmissions = async (req, res) => {
    const { username } = req.params;
    const sessionUser = req.user;
    try {
        const user = await User_1.default.findOneOrFail({
            where: { username },
            select: ["username", "createdAt"],
        });
        const posts = await Post_1.default.find({
            where: { username },
            order: { createdAt: "DESC" },
            relations: ["comments", "votes", "sub"],
        });
        const comments = await Comment_1.default.find({
            where: { username },
            order: { createdAt: "DESC" },
            relations: ["post"],
        });
        if (sessionUser) {
            posts.forEach((p) => p.setUserVote(sessionUser));
        }
        if (sessionUser) {
            comments.forEach((p) => p.setUserVote(sessionUser));
        }
        let submissions = [];
        posts.forEach((post) => submissions.push(Object.assign({ type: "POST" }, post)));
        comments.forEach((comment) => submissions.push(Object.assign({ type: "COMMENT" }, comment)));
        return res.json({ user, submissions });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.getUserSubmissions = getUserSubmissions;
//# sourceMappingURL=posts.controller.js.map