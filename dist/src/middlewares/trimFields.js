"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trim = (req, _, next) => {
    Object.keys(req.body).forEach((key) => {
        if (key != "password" && typeof req.body[key] === "string") {
            req.body[key] = req.body[key].trim();
        }
    });
    next();
};
exports.default = trim;
//# sourceMappingURL=trimFields.js.map