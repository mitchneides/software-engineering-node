"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Defines mongoose schema for the tuits collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' }
}, { collection: 'tuits' });
exports.default = TuitSchema;
