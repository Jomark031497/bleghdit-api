"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ msg: "No authentication token. Authorization denied" });
    }
    return next();
};
exports.default = requireAuth;
//# sourceMappingURL=requireAuth.js.map