"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const trimFields_1 = __importDefault(require("./middlewares/trimFields"));
const passportconfig_1 = __importDefault(require("../passportconfig"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const subs_routes_1 = __importDefault(require("./routes/subs.routes"));
const vote_routes_1 = __importDefault(require("./routes/vote.routes"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use((0, cookie_parser_1.default)(process.env.SECRET));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passportconfig_1.default)(passport_1.default);
app.use(trimFields_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/posts", posts_routes_1.default);
app.use("/api/subs", subs_routes_1.default);
app.use("/api/vote", vote_routes_1.default);
app.listen(PORT, async () => {
    console.log(`listening to port ${PORT}`);
    try {
        await (0, typeorm_1.createConnection)();
        console.log("connected to database");
    }
    catch (e) {
        console.error(e);
    }
});
//# sourceMappingURL=index.js.map