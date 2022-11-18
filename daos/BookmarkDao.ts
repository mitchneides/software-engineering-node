/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Finds all Bookmarks.
     * @returns Promise To be notified when all bookmarks are retrieved from the
     * database
     */
    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find();

    /**
     * Finds all bookmarks of a user
     * @param {string} uid Primary key of user
     * @return {Promise} Promise to be notified when bookmarks are retrieved
     * from database
     */
    findAllBookmarksOfUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Creates a bookmark of a tuit by a user
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @return {Promise} Promise to be notified when new bookmark is inserted
     * into database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    /**
     * Removes a bookmark of a tuit by a user
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @return {Promise} Promise to be notified when new bookmark is removed
     * from database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}