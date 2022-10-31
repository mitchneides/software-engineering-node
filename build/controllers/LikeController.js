"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
/**
 * @class LikeController Implements RESTful Web service API for Likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to get all likes for a user</li>
 *     <li>GET /api/tuits/:tid/likes to get all users that have liked a particular tuit</li>
 *     <li>POST /api/users/:uid/likes/:tid for a user to like a tuit</li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid for a user to unlike a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing tuit CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 */
class LikeController {
    constructor() {
        /**
         * Retrieves all users that likes a particular tuit.
         * @param {Request} req Represents request from client, including the path
         * parameter tid (primary key for the tuit)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a particular user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid (primary key for the user)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the tuit objects
         */
        this.findAllTuitsLikedByUser = (req, res) => LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
        /**
         * Creates a like instance by a particular user on a particular tuit.
         * @param {Request} req Represents request from client, including the path
         * parameters uid (primary key for the user) and tid (primary key for the tuit)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the like instance
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Removes a particular like instance.
         * @param {Request} req Represents request from client, including the path
         * parameters uid (primary key for the user) and tid (primary key for the tuit)
         * @param {Response} res Represents response to client, including the
         * status of whether or not the deletion was successfull
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
    }
    return LikeController.likeController;
};
;
