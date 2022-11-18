/**
 * @file Implements mongoose schema for tuits.
 */

import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef TuitSchema Represents tuits
 * @property {string} tuit Content of the tuit
 * @property {Date} postedOn When tuit is posted
 * @property {ObjectId} postedBy Id of the user who posted the tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
}, {collection: "tuits"});
export default TuitSchema;