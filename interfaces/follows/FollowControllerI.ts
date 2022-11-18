/**
 * @file Declares Controller RESTful Web service API for follows resource
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsUser(req: Request, res: Response): void;

    userUnfollowsUser(req: Request, res: Response): void;

    findUsersFollowedByUser(req: Request, res: Response): void;

    findUsersFollowingUser(req: Request, res: Response): void;

    findAllFollows(req: Request, res: Response): void;
}