/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

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
    public static getInstance = () : BookmarkDao => {
        if (BookmarkDao.bookmarkDao == null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid User ID who is bookmarking
     * @param {string} tid Tuit ID being bookmarking
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    /**
     * Deletes bookmark instance from the database
     * @param {string} bid Bookmark ID to be deleted
     * @returns Promise To be notified when bookmark is deleted from the database
     */
    userUnbookmarksTuit = async (bid: string): Promise<any> =>
        BookmarkModel.deleteOne({_id: bid});

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from users collection
     * @param {string} uid User ID who is requesting bookmarks
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarks = async (uid: string): Promise<Tuit[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
                     .populate("tuit")
                     .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from users collection who were
     * authored by a specified user.
     * @param {string} uid User ID who is requesting bookmarks
     * @param {string} aid User ID who authored the desired tuits
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllBookmarksFromAuthor = async (uid: string, aid: string): Promise<Tuit[]> => {
        var allBookmarkedTuits = await BookmarkModel
                                    .where("bookmarkedBy")
                                    .equals(uid)
                                    .populate("tuit")
        var result = new Array();
        allBookmarkedTuits.forEach(function (value) {
            if (value.tuit.postedBy == aid) {
                result.push(value);
            }
        });
        return result;
    }

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from users collection who were
     * posted after a specified date.
     * @param {string} uid User ID who is requesting bookmarks
     * @param {string} date Date specified, in format 'mmddyyyy'
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllBookmarksAfterDate = async (uid: string, date: string): Promise<Tuit[]> => {
        var allBookmarkedTuits = await BookmarkModel
                                    .where("bookmarkedBy")
                                    .equals(uid)
                                    .populate("tuit")
        var result = new Array();
        allBookmarkedTuits.forEach(function (value) {
            // format date given from url
            var date_str = date.substring(0,2) + "/"
                         + date.substring(2,4) + "/"
                         + date.substring(4);
            var date_obj = new Date(date_str);
            // compare to tuits postedOn date
            var postDate = value.tuit.postedOn;
            if (postDate > date_obj) {
                result.push(value);
            }
        });
        return result;
    }

}