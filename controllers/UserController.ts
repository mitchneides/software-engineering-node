/**
 * @file Controller RESTful Web service API for Users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";

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
export default class UserController implements UserControllerI {
   private static userDao: UserDao = UserDao.getInstance();
   private static userController: UserController | null = null;

   /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @return UserController
    */
   public static getInstance = (app: Express): UserController => {
       if(UserController.userController === null) {
           UserController.userController = new UserController();
           app.get('/api/users', UserController.userController.findAllUsers);
           app.get('/api/users/:userid', UserController.userController.findUserById);
           app.post('/api/users', UserController.userController.createUser);
           app.delete('/api/users/:userid', UserController.userController.deleteUser);
           app.put('/api/users/:userid', UserController.userController.updateUser);
           app.delete("/api/users", deleteAllUsers);
           app.get("/api/users/username/:username/delete", deleteUsersByUsername);
       }
       return UserController.userController;
   }

   private constructor() {}

   /**
    * Retrieves all users.
    * @param {Request} req Represents request from client
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON array of the user objects
    */
   findAllUsers = (req: Request, res: Response) =>
       UserController.userDao.findAllUsers()
           .then(users => res.json(users));

   /**
    * Retrieves a particular user by their ID.
    * @param {Request} req Represents request from client, including the path
    * parameter userid (primary key for the user)
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON object of the user
    */
   findUserById = (req: Request, res: Response) =>
       UserController.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));

   /**
    * Creates a user instance.
    * @param {Request} req Represents request from client, including the user data in the body
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON object of the user
    */
   createUser = (req: Request, res: Response) =>
       UserController.userDao.createUser(req.body)
           .then(user => res.json(user));

   /**
    * Removes a particular user instance.
    * @param {Request} req Represents request from client, including the path
    * parameter userid (primary key for the user)
    * @param {Response} res Represents response to client, including the
    * status of whether or not the deletion was successfull
    */
   deleteUser = (req: Request, res: Response) =>
       UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));

   /**
    * Updates a particular user instance.
    * @param {Request} req Represents request from client, including the path
    * parameter userid (primary key for the user) and the updated user info in the body
    * @param {Response} res Represents response to client, including the
    * status of whether or not the update was successfull
    */
   updateUser = (req: Request, res: Response) =>
       UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));

//    deleteAllUsers = (req: Request, res: Response) =>
//        UserController.userDao.deleteAllUsers()
//            .then((status) => res.send(status));

   deleteUsersByUsername = (req: Request, res: Response) =>
     UserController.userDao.deleteUsersByUsername(req.params.username)
       .then(status => res.send(status));
}
