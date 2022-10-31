"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Inserts bookmark instance into the database
         * @param {string} uid User ID who is bookmarking
         * @param {string} tid Tuit ID being bookmarking
         * @returns Promise To be notified when bookmark is inserted into the database
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ tuit: tid, bookmarkedBy: uid }); });
        /**
         * Deletes bookmark instance from the database
         * @param {string} bid Bookmark ID to be deleted
         * @returns Promise To be notified when bookmark is deleted from the database
         */
        this.userUnbookmarksTuit = (bid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ _id: bid }); });
        /**
         * Uses BookmarkModel to retrieve all bookmark documents from users collection
         * @param {string} uid User ID who is requesting bookmarks
         * @returns Promise To be notified when the bookmarks are retrieved from
         * database
         */
        this.findAllBookmarks = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default.find({ bookmarkedBy: uid })
                .populate("tuit")
                .exec();
        });
        /**
         * Uses BookmarkModel to retrieve all bookmark documents from users collection who were
         * authored by a specified user.
         * @param {string} uid User ID who is requesting bookmarks
         * @param {string} aid User ID who authored the desired tuits
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllBookmarksFromAuthor = (uid, aid) => __awaiter(this, void 0, void 0, function* () {
            var allBookmarkedTuits = yield BookmarkModel_1.default
                .where("bookmarkedBy")
                .equals(uid)
                .populate("tuit");
            var result = new Array();
            allBookmarkedTuits.forEach(function (value) {
                if (value.tuit.postedBy == aid) {
                    result.push(value);
                }
            });
            return result;
        });
        /**
         * Uses BookmarkModel to retrieve all bookmark documents from users collection who were
         * posted after a specified date.
         * @param {string} uid User ID who is requesting bookmarks
         * @param {string} date Date specified, in format 'mmddyyyy'
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllBookmarksAfterDate = (uid, date) => __awaiter(this, void 0, void 0, function* () {
            var allBookmarkedTuits = yield BookmarkModel_1.default
                .where("bookmarkedBy")
                .equals(uid)
                .populate("tuit");
            var result = new Array();
            allBookmarkedTuits.forEach(function (value) {
                // format date given from url
                var date_str = date.substring(0, 2) + "/"
                    + date.substring(2, 4) + "/"
                    + date.substring(4);
                var date_obj = new Date(date_str);
                // compare to tuits postedOn date
                var postDate = value.tuit.postedOn;
                if (postDate > date_obj) {
                    result.push(value);
                }
            });
            return result;
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao == null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
