"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vote = void 0;
const Vote_1 = __importDefault(require("../entities/Vote"));
const Post_1 = __importDefault(require("../entities/Post"));
const Comment_1 = __importDefault(require("../entities/Comment"));
const vote = async (req, res) => {
    const { identifier, slug, commentIdentifier, value } = req.body;
    if (![-1, 0, 1].includes(value)) {
        return res.status(400).json({ value: "Value must be -1, 0 or 1" });
    }
    try {
        const user = req.user;
        let post = await Post_1.default.findOneOrFail({ identifier, slug });
        let vote;
        let comment;
        if (commentIdentifier) {
            comment = await Comment_1.default.findOneOrFail({ identifier: commentIdentifier });
            vote = await Vote_1.default.findOne({ user, comment });
        }
        else {
            vote = await Vote_1.default.findOne({ user, post });
        }
        if (!vote && value === 0) {
            return res.status(404).json({ error: "Vote not found" });
        }
        else if (!vote) {
            vote = new Vote_1.default({ user, value });
            if (comment)
                vote.comment = comment;
            else
                vote.post = post;
            await vote.save();
        }
        else if (value === 0) {
            await vote.remove();
        }
        else if (vote.value !== value) {
            vote.value = value;
            await vote.save();
        }
        post = await Post_1.default.findOneOrFail({ identifier, slug }, { relations: ["comments", "comments.votes", "sub", "votes"] });
        post.setUserVote(user);
        post.comments.forEach((c) => c.setUserVote(user));
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
exports.vote = vote;
//# sourceMappingURL=vote.controller.js.map