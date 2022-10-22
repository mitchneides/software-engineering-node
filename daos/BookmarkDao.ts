import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = () : BookmarkDao => {
        if (BookmarkDao.bookmarkDao == null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    userUnbookmarksTuit = async (bid: string): Promise<any> =>
        BookmarkModel.deleteOne({_id: bid});
    findAllBookmarks = async (uid: string): Promise<Tuit[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
                     .populate("tuit")
                     .exec();
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


// TODO:
    findAllBookmarksAfterDate = async (uid: string, date: string): Promise<Tuit[]> => {
        // dummy return for testing - DELETE
        return await BookmarkModel.find({bookmarkedBy: uid})
                     .populate("tuit")
                     .exec();
    }






}