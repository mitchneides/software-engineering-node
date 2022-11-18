/**
 * @file Controller RESTful Web service API for follows resource
 */

import FollowControllerI from "../interfaces/follows/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";
import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>
 *         GET /api/follows to retrieve all follow records from database
 *     </li>
 *     <li>
 *         GET /api/users/:uid/following to retrieve all users followed by user
 *     </li>
 *     <li>
 *         GET /api/users/:uid/followers to retrieve all users following user
 *     </li>
 *     <li>
 *         POST /api/users/:uid/follow/:ouid to retrieve user following another user
 *     </li>
 *     <li>
 *         DEL /api/users/:uid/follow/:ouid to remove follow relationship between user
 *         and another user
 *     </li>
 *
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance.
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return {FollowController} FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/follows", FollowController.followController
                .findAllFollows);

            app.get("/api/users/:uid/following", FollowController.followController
                .findUsersFollowedByUser);

            app.get("/api/users/:uid/followers", FollowController.followController
                .findUsersFollowingUser);

            app.post("/api/users/:uid/follow/:ouid", FollowController.followController
                .userFollowsUser);

            app.delete("/api/users/:uid/follow/:ouid", FollowController.followController
                .userUnfollowsUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all follows from the database and returns an array of follows.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollows()
            .then((follows: Follow[]) => res.json(follows));

    /**
     * Retrieves all users followed by user from database and returns an array
     * of users followed by user
     * @param {Request} req Represents from client, including the path parameter
     * uid representing the user followed by users
     * @param {Response} res Represents response to client, includes a JSON array
     * of users
     */
    findUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findUsersFollowedByUser(req.params.uid)
            .then((users: User[]) => res.json(users));

    /**
     * Retrieves all users following a user from database and returns an array
     * of users following user
     * @param {Request} req Represents from client, including the path parameter
     * uid representing the user following users
     * @param {Response} res Represents response to client, includes a JSON array
     * of users
     */
    findUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findUsersFollowingUser(req.params.uid)
            .then((users: User[]) => res.json(users))

    /**
     * Creates a new follow instance
     * @param {Request} req Represents from client, including the path parameter
     * uid and ouid representing the user and other user to follow
     * @param {Response} res Represents response to client, includes a JSON
     * of new follow relation inserted into database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.ouid)
            .then(follows => res.json(follows))

    /**
     * Removes follow instance
     * @param {Request} req Represents from client, including the path parameter
     * uid and ouid representing the user and other user to unfollow
     * @param {Response} res Represents response to client, includes a status
     * of follow relation being removed from database
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.ouid)
            .then(status => res.send(status))
}