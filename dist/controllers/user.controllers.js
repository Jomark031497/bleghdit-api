"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const class_validator_1 = require("class-validator");
const User_1 = __importDefault(require("../entities/User"));
const register = async (req, res) => {
    const { username, password } = req.body;
    let errors = {};
    try {
        const userExists = await User_1.default.findOne({ username });
        if (userExists)
            errors.username = "username is already taken";
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const user = User_1.default.create({ username, password });
        errors = await (0, class_validator_1.validate)(user);
        if (errors.length > 0)
            return res.status(400).json(errors);
        await user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
exports.register = register;
//# sourceMappingURL=user.controllers.js.map