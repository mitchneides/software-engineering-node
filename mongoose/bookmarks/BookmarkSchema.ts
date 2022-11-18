/**
 * @file Implements mongoose schema for bookmarks.
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef BookmarkSchema Represents bookmarks
 * @property {ObjectId} tuit Tuit id of the tuit that is being bookmarked
 * @property {ObjectId} bookmarkedBy User id of the user that is bookmarking
 * the tuit
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "bookmarks"})
export default BookmarkSchema