import mongoose from "mongoose";
import User from "../models/User";

const MessageSchema = new mongoose.Schema({
    message: String,
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    sentOn: Date
}, {collection: 'messages'});
export default MessageSchema;