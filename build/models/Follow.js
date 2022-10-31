"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Follow Represents a follow relationship between 2 users,
 * where a 'follower' follows a 'followee'
 * @property {User} follower User doing the following
 * @property {User} followee User being followed
 */
class Follow {
    constructor() {
        this.follower = null;
        this.followee = null;
    }
}
exports.default = Follow;
