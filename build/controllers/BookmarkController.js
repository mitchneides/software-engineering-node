"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
/**
 * @class BookmarkController Implements RESTful Web service API for Bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new Bookmark instance for
 *     a given user</li>
 *     <li>DELETE /api/bookmarks/:bid to remove a particular Bookmark instance</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all Bookmark instances</li>
 *     <li>GET /api/users/:uid/bookmarks/author/:aid to retrieve all Bookmark instances for a
 *     given author (User)</li>
 *     <li>GET /api/users/:uid/bookmarks/afterDate/:date to retrieve all Bookmark instances
 *     that were bookmarked after a given date </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing tuit CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
class BookmarkController {
    constructor() {
        /**
         * Creates a Bookmark instance of a Tuit in the database and returns the Bookmark Object.
         * @param {Request} req Represents request from client, including the path
         * parameters uid (primary key for bookmarking user) and tid (primary key for the tuit
         * getting bookmarked)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the Bookmark
         */
        this.userBookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));
        /**
         * Deletes a Bookmark instance from the database and returns the status of whether
         * or not the deletion was successful
         * @param {Request} req Represents request from client, including path
         * parameter bid identifying the primary key of the Bookmark to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.userUnbookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.bid)
            .then(status => res.send(status));
        /**
         * Retrieves all Bookmarks from the database for a particular user and returns
         * an array of tuits that they represent.
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user whose bookmarks are being returned
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllBookmarks = (req, res) => BookmarkController.bookmarkDao.findAllBookmarks(req.params.uid)
            .then(tuits => res.json(tuits));
        /**
         * Retrieves all Bookmarks from the database for a particular user filtered by a
         * specified author and returns an array of tuits that they represent.
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user whose bookmarks are being returned
         * and aid identifying the primary key of the author who wrote the tuit(s)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllBookmarksFromAuthor = (req, res) => BookmarkController.bookmarkDao.findAllBookmarksFromAuthor(req.params.uid, req.params.aid)
            .then(tuits => res.json(tuits));
        /**
         * Retrieves all Bookmarks from the database for a particular user where the bookmarking
         * took place after a specified date
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user whose bookmarks are being returned
         * and date identifying the date constraint that the bookmarking must have taken place after
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllBookmarksAfterDate = (req, res) => BookmarkController.bookmarkDao.findAllBookmarksAfterDate(req.params.uid, req.params.date)
            .then(tuits => res.json(tuits));
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
        app.delete("/api/bookmarks/:bid", BookmarkController.bookmarkController.userUnbookmarksTuit);
        app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarks);
        app.get("/api/users/:uid/bookmarks/author/:aid", BookmarkController.bookmarkController.findAllBookmarksFromAuthor);
        app.get("/api/users/:uid/bookmarks/afterDate/:date", BookmarkController.bookmarkController.findAllBookmarksAfterDate);
    }
    return BookmarkController.bookmarkController;
};
;
