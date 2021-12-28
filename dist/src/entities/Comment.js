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
const helpers_1 = require("../utils/helpers");
const typeorm_1 = require("typeorm");
const Post_1 = __importDefault(require("./Post"));
const RootEntity_1 = __importDefault(require("./RootEntity"));
const User_1 = __importDefault(require("./User"));
const Vote_1 = __importDefault(require("./Vote"));
const class_transformer_1 = require("class-transformer");
let Comment = class Comment extends RootEntity_1.default {
    constructor(comment) {
        super();
        Object.assign(this, comment);
    }
    identifier;
    body;
    username;
    user;
    post;
    votes;
    get voteScore() {
        return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), 0);
    }
    userVote;
    setUserVote(user) {
        const index = this.votes?.findIndex((v) => v.username === user.username);
        this.userVote = index > -1 ? this.votes[index].value : 0;
    }
    makeId() {
        this.identifier = (0, helpers_1.makeID)(8);
    }
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default),
    (0, typeorm_1.JoinColumn)({ name: "username", referencedColumnName: "username" }),
    __metadata("design:type", User_1.default)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.default, (post) => post.comments),
    __metadata("design:type", Post_1.default)
], Comment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Vote_1.default, (vote) => vote.comment),
    __metadata("design:type", Array)
], Comment.prototype, "votes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Comment.prototype, "voteScore", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Comment.prototype, "makeId", null);
Comment = __decorate([
    (0, typeorm_1.Entity)("comments"),
    __metadata("design:paramtypes", [Object])
], Comment);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map