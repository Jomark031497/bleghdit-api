"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSubs = exports.deleteSubImage = exports.uploadSubImage = exports.getSub = exports.getSubs = exports.createSub = void 0;
const class_validator_1 = require("class-validator");
const Subleddit_1 = __importDefault(require("../entities/Subleddit"));
const typeorm_1 = require("typeorm");
const Post_1 = __importDefault(require("../entities/Post"));
const fs_1 = __importDefault(require("fs"));
const createSub = async (req, res) => {
    const { name, title, description } = req.body;
    const user = req.user;
    if (!user)
        return res.status(404).json({ error: "unauthenticated" });
    try {
        let errors = {};
        if ((0, class_validator_1.isEmpty)(name))
            errors.name = "Name must not be empty";
        if ((0, class_validator_1.isEmpty)(title))
            errors.title = "Title must not be empty";
        const sub = await (0, typeorm_1.getRepository)(Subleddit_1.default)
            .createQueryBuilder("sub")
            .where("lower(sub.name) = :name", { name: name.toLowerCase() })
            .getOne();
        if (sub)
            errors.name = "Subleddit name already exists";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const newSub = new Subleddit_1.default({ name, description, title, user });
        await newSub.save();
        return res.status(200).json(newSub);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.createSub = createSub;
const getSubs = async (_, res) => {
    try {
        const imageUrlExp = `COALESCE('${process.env.APP_URL}/images/' || s."imageURN" , '')`;
        const subs = await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .select(`s.title, s.name, ${imageUrlExp} as "imageUrl", count(p.id) as "postCount"`)
            .from(Subleddit_1.default, "s")
            .leftJoin(Post_1.default, "p", `s.name = p."subName"`)
            .groupBy('s.title, s.name, "imageUrl"')
            .orderBy(`"postCount"`, "DESC")
            .limit(5)
            .execute();
        return res.status(200).json(subs);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.getSubs = getSubs;
const getSub = async (req, res) => {
    const { name } = req.params;
    const user = req.user;
    try {
        const sub = await Subleddit_1.default.findOneOrFail({ name });
        const posts = await Post_1.default.find({
            where: { sub },
            relations: ["comments", "votes"],
            order: { createdAt: "DESC" },
        });
        sub.posts = posts;
        if (user) {
            sub.posts.forEach((post) => post.setUserVote(user));
        }
        return res.json(sub);
    }
    catch (err) {
        console.error(err);
        return res.status(404).json({ sub: "sub not found" });
    }
};
exports.getSub = getSub;
const uploadSubImage = async (req, res) => {
    const user = req.user;
    const sub = user.sub;
    const type = req.body.type;
    try {
        if (type !== "image" && type !== "banner") {
            fs_1.default.unlinkSync(req.file.path);
            return res.status(400).json({ error: "invalid type" });
        }
        let oldImageUrn = "";
        if (type === "image") {
            oldImageUrn = sub.imageURN || "";
            sub.imageURN = req.file.filename;
        }
        else if (type === "banner") {
            oldImageUrn = sub.bannerURN || "";
            sub.bannerURN = req.file.filename;
        }
        await sub.save();
        if (oldImageUrn !== "")
            fs_1.default.unlinkSync(`public/images/${oldImageUrn}`);
        return res.status(200).json(sub);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.uploadSubImage = uploadSubImage;
const deleteSubImage = async (req, res) => {
    const { name, type } = req.params;
    try {
        if (type !== "image" && type !== "banner") {
            return res.status(400).json({ error: "invalid type" });
        }
        const sub = await Subleddit_1.default.findOneOrFail({ name });
        if (type === "image") {
            sub.imageURN = "";
        }
        else if (type === "banner") {
            sub.bannerURN = "";
        }
        await sub.save();
        return res.status(200).json(sub);
    }
    catch (error) {
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.deleteSubImage = deleteSubImage;
const searchSubs = async (req, res) => {
    try {
        const { name } = req.params;
        if ((0, class_validator_1.isEmpty)(name))
            return res.status(400).json({ error: "Name must not be empty" });
        const subs = await (0, typeorm_1.getRepository)(Subleddit_1.default)
            .createQueryBuilder()
            .where("LOWER(name) LIKE :name", { name: `${name.toLowerCase().trim()}%` })
            .getMany();
        return res.status(200).json(subs);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.searchSubs = searchSubs;
//# sourceMappingURL=subs.controller.js.map