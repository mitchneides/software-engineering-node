import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/bookmarks/:bid",
                BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.findAllBookmarks);
            app.get("/api/users/:uid/bookmarks/author/:aid",
                BookmarkController.bookmarkController.findAllBookmarksFromAuthor);
            app.get("/api/users/:uid/bookmarks/afterDate/:date",
                BookmarkController.bookmarkController.findAllBookmarksAfterDate);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmark => res.json(bookmark));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.bid)
            .then(status => res.send(status));

    findAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarks(req.params.uid)
            .then(tuits => res.json(tuits));

    findAllBookmarksFromAuthor = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarksFromAuthor(req.params.uid, req.params.aid)
            .then(tuits => res.json(tuits));

    findAllBookmarksAfterDate = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarksAfterDate(req.params.uid, req.params.date)
            .then(tuits => res.json(tuits));
};