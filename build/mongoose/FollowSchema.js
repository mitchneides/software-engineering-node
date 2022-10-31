"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Defines mongoose schema for the follows collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const FollowSchema = new mongoose_1.default.Schema({
    follower: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
    followee: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
}, { collection: "follows" });
exports.default = FollowSchema;