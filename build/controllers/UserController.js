"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
/**
 * @class UserController Implements RESTful Web service API for Users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users to find all users</li>
 *     <li>GET /api/users/:userid to find a user by ID</li>
 *     <li>POST /api/users to create a new user</li>
 *     <li>DELETE /api/users/:userid to delete a user</li>
 *     <li>PUT /api/users/:userid to update a user</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing tuit CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
class UserController {
    constructor() {
        /**
         * Retrieves all users.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the user objects
         */
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
         * Retrieves a particular user by their ID.
         * @param {Request} req Represents request from client, including the path
         * parameter userid (primary key for the user)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the user
         */
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
         * Creates a user instance.
         * @param {Request} req Represents request from client, including the user data in the body
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the user
         */
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
         * Removes a particular user instance.
         * @param {Request} req Represents request from client, including the path
         * parameter userid (primary key for the user)
         * @param {Response} res Represents response to client, including the
         * status of whether or not the deletion was successfull
         */
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
         * Updates a particular user instance.
         * @param {Request} req Represents request from client, including the path
         * parameter userid (primary key for the user) and the updated user info in the body
         * @param {Response} res Represents response to client, including the
         * status of whether or not the update was successfull
         */
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = UserController;
UserController.userDao = UserDao_1.default.getInstance();
UserController.userController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return UserController
 */
UserController.getInstance = (app) => {
    if (UserController.userController === null) {
        UserController.userController = new UserController();
        app.get('/users/hello', (req, res) => res.send('hello from users'));
        app.get('/api/users', UserController.userController.findAllUsers);
        app.get('/api/users/:userid', UserController.userController.findUserById);
        app.post('/api/users', UserController.userController.createUser);
        app.delete('/api/users/:userid', UserController.userController.deleteUser);
        app.put('/api/users/:userid', UserController.userController.updateUser);
    }
    return UserController.userController;
};
