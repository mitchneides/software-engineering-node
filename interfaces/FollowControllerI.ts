import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    findAllUserFollowers (req: Request, res: Response): void;
    findAllUserFollowings (req: Request, res: Response): void;
    findAllCommonFollowers (req: Request, res: Response): void;
    findAllCommonFollowings (req: Request, res: Response): void;
};