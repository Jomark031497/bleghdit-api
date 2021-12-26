"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.get("/me", requireAuth_1.default, auth_controller_1.me);
router.get("/logout", requireAuth_1.default, auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map