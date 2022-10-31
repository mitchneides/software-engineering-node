"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Tuit Represents tuit relationship between a user and a tuit.
 * @property {Tuit} tuit Tuit PK being bookmarked
 * @property {Date} postedOn Datetime of the posting.
 * @property {User} postedBy User authoring the tuit
 */
class Tuit {
    constructor(tuit, postedOn, postedBy) {
        this.tuit = '';
        this.postedOn = new Date();
        this.postedBy = null;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }
}
exports.default = Tuit;
