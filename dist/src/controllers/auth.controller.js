"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.me = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../entities/User"));
const passport_1 = __importDefault(require("passport"));
const class_validator_1 = require("class-validator");
const helpers_1 = require("../utils/helpers");
const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        let errors = {};
        const checkUser = await User_1.default.findOne({ username });
        const checkEmail = await User_1.default.findOne({ email });
        if (checkUser)
            errors.username = "Username is already taken";
        if (checkEmail)
            errors.email = "Email is already taken";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const user = new User_1.default({ email, username, password });
        errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0)
            return res.status(400).json((0, helpers_1.mapErrors)(errors));
        await user.save();
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json(e);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let errors = {};
        if ((0, class_validator_1.isEmpty)(username))
            errors.username = "Username must not be empty";
        if ((0, class_validator_1.isEmpty)(password))
            errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        passport_1.default.authenticate("local", async (err, user, _) => {
            try {
                if (err)
                    return next(err);
                if (!user)
                    return res.status(400).json({ error: "Usernames/Password is incorrect" });
                req.logIn(user, (err) => {
                    if (err)
                        return next(err);
                    res.status(200).json(user);
                    next();
                });
            }
            catch (e) {
                return res.status(500).json({ error: "Something went wrong" });
            }
        })(req, res, next);
    }
    catch (e) {
        return res.status(400).json(e);
    }
    return null;
};
exports.login = login;
const me = async (req, res) => {
    if (!req.user)
        return res.status(404).json({ error: "no user found" });
    return res.status(200).json(req.user);
};
exports.me = me;
const logout = async (req, res) => {
    try {
        console.log("***************************************************************************************88");
        if (!req.user)
            return res.status(404).json({ error: "no user found" });
        req.logout();
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({ error: "something went wrong" });
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map