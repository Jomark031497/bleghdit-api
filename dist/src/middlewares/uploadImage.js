"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.userOwnsSub = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const Subleddit_1 = __importDefault(require("../entities/Subleddit"));
const helpers_1 = require("../utils/helpers");
const userOwnsSub = async (req, res, next) => {
    const user = req.user;
    try {
        const sub = await Subleddit_1.default.findOneOrFail({ where: { name: req.params.name } });
        if (sub.username !== user.username)
            return res.status(403).json({ error: "You don't own this sub" });
        user.sub = sub;
        return next();
    }
    catch (error) {
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.userOwnsSub = userOwnsSub;
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: "public/images",
        filename: (_, file, callback) => {
            const name = (0, helpers_1.makeID)(15);
            callback(null, name + path_1.default.extname(file.originalname));
        },
    }),
    fileFilter: (_, file, callback) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            callback(null, true);
        }
        else {
            callback(new Error("not an image"));
        }
    },
});
//# sourceMappingURL=uploadImage.js.map