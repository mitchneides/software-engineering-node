import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import TuitModel from "../mongoose/TuitModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public status getInstance = () : BookmarkDao => {
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





// come back to here
    findAllBookmarksFromAuthor = async (uid: string, aid: string): Promise<Tuit[]> => {
        var allBookmarks = await BookmarkModel
                                    .find({bookmarkedBy: uid})
                                    .populate("tuit")
                                    .exec()
        var result = new Array();
        allBookmarks.forEach(function (value) {
            var t = await TuitModel.find({_id: value.tuit})
                                   .populate('tuit')
                                   .exec()

        });
    }


// and here
    findAllBookmarksAfterDate = async (uid: string, date: string): Promise<Tuit[]> => {

    }






}