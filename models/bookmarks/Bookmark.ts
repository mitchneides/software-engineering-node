/**
 * @file Declares Bookmark data type representing bookmarks of a user on a tuit.
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents bookmark relationship between tuit and a user
 * @property {Tuit} tuit tuit being bookmarked
 * @property {User} bookmarkedBy User that is bookmarked tuit
 */
export default interface Bookmark {
    tuit: Tuit,
    bookmarkedBy: User
}