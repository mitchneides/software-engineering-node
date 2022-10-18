import mongoose from "mongoose";
import Like from "../models/Like";

const LikeSchema = new mongoose.Schema({
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'},
    likedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: "likes"});
export default LikeSchema;