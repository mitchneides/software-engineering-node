/**
 * @file Implements mongoose schema for messages.
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message"

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    date: {type: Date, default: Date.now()}
}, {collection: "messages"});
export default MessageSchema