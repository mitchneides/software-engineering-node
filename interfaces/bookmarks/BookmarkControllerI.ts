/**
 * @file Declares Controller RESTful Web service API for bookmarks resource
 */

import {Response, Request} from "express";

export default interface BookmarkControllerI {
    findAllBookmarks(req: Request, res: Response): void;

    userBookmarksTuit(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;

    findAllBookmarksOfUser(req: Request, res: Response): void;
}