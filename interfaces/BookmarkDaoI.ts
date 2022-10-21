import Tuit from "../models/Tuit";

export default interface BookmarkDaoI {
    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
    userUnbookmarksTuit (bid: string): Promise<any>;
    findAllBookmarks (uid: string): Promise<Tuit[]>;
    findAllBookmarksFromAuthor (uid: string, aid: string): Promise<Tuit[]>;
    findAllBookmarksAfterDate (uid: string, date: string): Promise<Tuit[]>;
}