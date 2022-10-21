import mongoose from "mongoose";
import Tuit from "../models/Tuit";
import User from "../models/User";

const BookmarkSchema = new mongoose.Schema({
    tuit: {type: mongoose.Schema.Types.ObjectID, ref: 'TuitModel'},
    bookmarkedBy: {type: mongoose.Schema.Types.ObjectID, ref: 'UserModel'}
});
export default BookmarkSchema;