/**
 * @file Declares API for Bookmarks related data access object methods
 */
import Bookmark from "../../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    findAllBookmarks(): Promise<Bookmark[]>;

    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;

    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;

    findAllBookmarksOfUser(uid: string): Promise<Bookmark[]>;
}