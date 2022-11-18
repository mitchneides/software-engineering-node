/**
 * @file Implements mongoose schema for likes.
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef LikeSchema Represents likes
 * @property {ObjectId} tuit tuit PK
 * @property {ObjectId} likedBy user PK
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;