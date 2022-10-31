"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class TuitController Implements RESTful Web service API for Tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/tuits for a user to retrieve all tuits</li>
 *     <li>GET /api/tuits/:tuitid for a user to find a tuit by its ID</li>
 *     <li>GET /api/users/:uid/tuits for a user to find all tuits by a user</li>
 *     <li>POST /api/tuits for a user to post a new tuit</li>
 *     <li>DELETE /api/tuits/:tid for a user to delete a tuit</li>
 *     <li>PUT /api/tuits/:tid for a user to update a tuit</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor() {
        /**
         * Retrieves all tuits by a particular user.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the tuit objects
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
        /**
         * Retrieves a particular tuit by its ID.
         * @param {Request} req Represents request from client, including the path
         * parameter tid (primary key for the tuit)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the tuit
         */
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.tuitid)
            .then(tuit => res.json(tuit));
        /**
         * Retrieves all tuits authored by a particular user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid (primary key for the author)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the tuit objects
         */
        this.findTuitsByUser = (req, res) => TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuits => res.json(tuits));
        /**
         * Creates a tuit instance from an authoring user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid (primary key for the author)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the tuit
         */
        this.createTuit = (req, res) => TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
        /**
         * Removes a particular tuit instance.
         * @param {Request} req Represents request from client, including the path
         * parameter tid (primary key for the tuit)
         * @param {Response} res Represents response to client, including the
         * status of whether or not the deletion was successfull
         */
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
        /**
         * Updates a particular tuit instance.
         * @param {Request} req Represents request from client, including the path
         * parameter tid (primary key for the tuit) and the updated tuit info in the body
         * @param {Response} res Represents response to client, including the
         * status of whether or not the update was successfull
         */
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
TuitController.tuitDao = TuitDao_1.default.getInstance();
TuitController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get('/api/tuits', TuitController.tuitController.findAllTuits);
        app.get('/api/tuits/:tuitid', TuitController.tuitController.findTuitById);
        app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
        app.post('/api/tuits', TuitController.tuitController.createTuit);
        app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
        app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);
    }
    return TuitController.tuitController;
};
