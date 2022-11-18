/**
 * @file Implements mongoose schema for follows.
 */

import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef FollowSchema Represents follows
 * @property {ObjectId} followee User being followed
 * @property {ObjectId} follower User performing following
 */
const FollowSchema = new mongoose.Schema<Follow>({
    followee: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    follower: {type: Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: 'follows'});
export default FollowSchema