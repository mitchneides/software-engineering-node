import mongoose from "mongoose";
import Tuit from "../models/Tuit";
import User from "../models/User";

const BookmarkSchema = new mongoose.Schema({
    tuit: {type: mongoose.Schema.Types.ObjectId, ref: 'TuitModel'},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'bookmarks'});
export default BookmarkSchema;