/**
 * @file Controller RESTful Web service API for bookmarks resource
 */

import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";
import {Request, Response, Express} from "express";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmark
 * resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>
 *         GET /api/bookmarks to retrieve all bookmarks
 *     </li>
 *     <li>
 *         GET /api/users/:uid/bookmarks to retrieve all bookmarks of a user
 *     </li>
 *     <li>
 *         POST /api/users/:uid/bookmarks/:tid to create a bookmark of a tuit by
 *         a user
 *     </li>
 *     <li>
 *         DEL /api/users/:uid/bookmarks/:tid to remove a bookmark of a tuit by
 *         a user
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD
 * operations
 * @property {BookmarkController} BookmarkController Singleton controller
 * implementing RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/bookmarks", BookmarkController.bookmarkController
                .findAllBookmarks);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController
                .findAllBookmarksOfUser)
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController
                .userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController
                .userUnbookmarksTuit);
        }
        return BookmarkController.bookmarkController
    }

    private constructor() {
    }

    /**
     * Retrieves all bookmarks from database and returns an array of bookmarks
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarks()
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    /**
     * Retrieves all bookmarks of a user from database and returns an array of
     * bookmarks
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllBookmarksOfUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarksOfUser(req.params.uid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    /**
     * Creates a new bookmark instance between tuit and a user
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new bookmark to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark relationship that
     * was inserted in the database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(
            req.params.uid,
            req.params.tid
        ).then(bookmark => res.json(bookmark));

    /**
     * Removes a bookmark instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user un-bookmarking and
     * tid identifying the primary key of the tuit being un-bookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the relationship of a bookmark between a user and a tuit
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(
            req.params.uid,
            req.params.tid
        ).then(status => res.json(status));
}