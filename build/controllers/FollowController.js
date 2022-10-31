"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
/**
 * @class FollowController Implements RESTful Web service API for Follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid_follower/follows/:uid_following to create a new Follow instance
 *     where follower follows followee</li>
 *     <li>DELETE /api/follows/:fid to remove a particular Follow instance</li>
 *     <li>GET /api/users/:uid/followers to retrieve all followers of a particular user</li>
 *     <li>GET /api/users/:uid/following to retrieve all followings of a particular user</li>
 *     <li>GET /api/users/:uid1/commonFollowers/:uid2 to retrieve all common followers between
 *     two specified users</li>
 *     <li>GET /api/users/:uid1/commonFollowing/:uid2 to retrieve all common followings between
 *     two specified users</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing tuit CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    constructor() {
        /**
         * Creates a Follow instance between a following User and a followee User.
         * @param {Request} req Represents request from client, including the path
         * parameters uid_follower (primary key for user who will be the follower) and uid_following
         * (primary key for user being followed)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the Follow
         */
        this.userFollowsUser = (req, res) => FollowController.followDao.userFollowsUser(req.params.uid_follower, req.params.uid_following)
            .then(follow => res.json(follow));
        /**
         * Deletes a Follow instance from the database and returns the status of whether
         * or not the deletion was successful
         * @param {Request} req Represents request from client, including path
         * parameter fid identifying the primary key of the Follow to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deletingthe follow was successful or not
         */
        this.userUnfollowsUser = (req, res) => FollowController.followDao.userUnfollowsUser(req.params.fid)
            .then(status => res.send(status));
        /**
         * Retrieves all Users from the database who follow a particular user and returns
         * an array of the followers (Users).
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that is followed
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUserFollowers = (req, res) => FollowController.followDao.findAllUserFollowers(req.params.uid)
            .then(followers => res.json(followers));
        /**
         * Retrieves all Users from the database that a particular user follows and returns
         * an array of the followees (Users).
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user that follows
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUserFollowings = (req, res) => FollowController.followDao.findAllUserFollowings(req.params.uid)
            .then(followings => res.json(followings));
        /**
         * Retrieves all Users from the database that follow 2 specified users
         * and returns an array of the common Users.
         * @param {Request} req Represents request from client, including path
         * parameter uid1 identifying the primary key of one of the users being followed and
         * uid2 identifying the primary key of the other user being followed
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllCommonFollowers = (req, res) => FollowController.followDao.findAllCommonFollowers(req.params.uid1, req.params.uid2)
            .then(users => res.json(users));
        /**
         * Retrieves all Users from the database that a particular user follows in common with
         * another particular user and returns an array of the followers (Users).
         * @param {Request} req Represents request from client, including path
         * parameter uid1 identifying the primary key of one of the users doing the common following and
         * uid2 identifying the primary key of the other user doing the common following
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllCommonFollowings = (req, res) => FollowController.followDao.findAllCommonFollowings(req.params.uid1, req.params.uid2)
            .then(users => res.json(users));
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.post("/api/users/:uid_follower/follows/:uid_following", FollowController.followController.userFollowsUser);
        app.delete("/api/follows/:fid", FollowController.followController.userUnfollowsUser);
        app.get("/api/users/:uid/followers", FollowController.followController.findAllUserFollowers);
        app.get("/api/users/:uid/following", FollowController.followController.findAllUserFollowings);
        app.get("/api/users/:uid1/commonFollowers/:uid2", FollowController.followController.findAllCommonFollowers);
        app.get("/api/users/:uid1/commonFollowing/:uid2", FollowController.followController.findAllCommonFollowings);
    }
    return FollowController.followController;
};
;