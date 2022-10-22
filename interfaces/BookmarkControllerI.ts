import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    findAllBookmarks (req: Request, res: Response): void;
    findAllBookmarksFromAuthor (req: Request, res: Response): void;
    findAllBookmarksAfterDate (req: Request, res: Response): void;
};