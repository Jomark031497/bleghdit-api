"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("./src/entities/User"));
function default_1(passport) {
    passport.use(new passport_local_1.Strategy({
        usernameField: "username",
        passwordField: "password",
    }, async (username, password, done) => {
        try {
            const user = await User_1.default.findOne({ username });
            if (!user)
                return done(null, false, { message: "User not found" });
            const passwordMatched = await (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatched)
                return done(null, false);
            return done(null, user);
        }
        catch (e) {
            console.error(e);
            return done(e);
        }
    }));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User_1.default.findOne({ id });
            done(null, user);
        }
        catch (e) {
            console.error(e);
            done(e);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=passportconfig.js.map