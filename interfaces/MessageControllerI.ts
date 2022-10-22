import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessagesUser (req: Request, res: Response): void;
    findAllSentMessages (req: Request, res: Response): void;
    findAllReceivedMessages (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    findAllMessagesTo (req: Request, res: Response): void;
    findAllMessagesFrom (req: Request, res: Response): void;
};