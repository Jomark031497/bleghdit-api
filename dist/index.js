"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const main = async () => {
    await (0, typeorm_1.createConnection)().then(() => console.log("connected to database"));
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use("/api/users", user_routes_1.default);
    app.listen(process.env.PORT, () => console.log(`listening at port ${process.env.PORT}`));
};
main().catch((error) => console.log(error));
//# sourceMappingURL=index.js.map