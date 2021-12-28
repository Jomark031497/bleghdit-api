"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const Post_1 = __importDefault(require("./Post"));
const RootEntity_1 = __importDefault(require("./RootEntity"));
const User_1 = __importDefault(require("./User"));
let Subs = class Subs extends RootEntity_1.default {
    constructor(sub) {
        super();
        Object.assign(this, sub);
    }
    name;
    title;
    description;
    imageURN;
    bannerURN;
    username;
    user;
    posts;
    get imageUrl() {
        return this.imageURN
            ? `${process.env.APP_URL}/images/${this.imageURN}`
            : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    }
    get bannerUrl() {
        return this.bannerURN ? `${process.env.APP_URL}/images/${this.bannerURN}` : undefined;
    }
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Subs.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subs.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Subs.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subs.prototype, "imageURN", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subs.prototype, "bannerURN", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subs.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default),
    (0, typeorm_1.JoinColumn)({ name: "username", referencedColumnName: "username" }),
    __metadata("design:type", User_1.default)
], Subs.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_1.default, (post) => post.sub),
    __metadata("design:type", Array)
], Subs.prototype, "posts", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Subs.prototype, "imageUrl", null);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Subs.prototype, "bannerUrl", null);
Subs = __decorate([
    (0, typeorm_1.Entity)("subs"),
    __metadata("design:paramtypes", [Object])
], Subs);
exports.default = Subs;
//# sourceMappingURL=Subleddit.js.map