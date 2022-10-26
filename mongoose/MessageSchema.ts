/**
 * @file Defines mongoose schema for the messages collection
 */
import mongoose from "mongoose";
import User from "../models/User";

const MessageSchema = new mongoose.Schema({
    message_text: {type: String, required: true},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    sentOn: {type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessageSchema;