"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Defines mongoose schema for the messages collection
 */
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    message_text: { type: String, required: true },
    to: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
    from: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel' },
    sentOn: { type: Date, default: Date.now }
}, { collection: 'messages' });
exports.default = MessageSchema;
