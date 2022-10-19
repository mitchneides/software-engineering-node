import mongoose from "mongoose";
import Follow from "../models/Follow";

const FollowSchema = new mongoose.Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    followee: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: "follows"});
export default FollowSchema;