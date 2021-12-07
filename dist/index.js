"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
const PORT = 8080;
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