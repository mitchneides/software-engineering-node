"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Defines mongoose schema for the likes collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const LikeSchema = new mongoose_1.default.Schema({
    tuit: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'TuitModel' },
    likedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
}, { collection: "likes" });
exports.default = LikeSchema;
