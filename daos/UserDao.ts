/**
 * @file Implements DAO managing data storage of users. Uses mongoose to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
   private static userDao: UserDao | null = null;

   /**
    * Creates singleton DAO instance
    * @returns UserDao
    */
   public static getInstance = () : UserDao => {
       if (UserDao.userDao == null) {
           UserDao.userDao = new UserDao();
       }
       return UserDao.userDao;
   }

   private constructor() {}

    /**
     * Uses UserModel to retrieve all users in the database
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
   async findAllUsers(): Promise<User[]> {
       const allUserModels = await UserModel.find();
       return allUserModels.map(userObj =>
           new User(userObj.username, userObj.password, userObj.firstName,
                    userObj.lastName, userObj.email)
       )
   }

    /**
     * Uses UserModel to retrieve a user by its ID
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when the user is retrieved from
     * database
     */
   async findUserById(uid: string): Promise<any> {
       try {
           const userObj = await UserModel.findById(uid);
           return new User(userObj.username, userObj.password, userObj.firstName,
                           userObj.lastName, userObj.email);
       } catch(e) {
           return "User ID: " + uid + " does not match a user in the database";
       }
   }

   /**
    * Inserts user instance into the database
    * @param {User} user user object to be entered
    * @returns Promise To be notified when user is inserted into the database
    */
   async createUser(user: User): Promise<User> {
       const userObj = await UserModel.create(user);
       return new User(userObj.username, userObj.password, userObj.firstName,
                       userObj.lastName, userObj.email);
   }

    /**
     * Deletes user instance from the database
     * @param {string} uid PK of the user
     * @returns Promise To be notified when instance is deleted from the database
     */
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }

    /**
     * Updates user instance in the database
     * @param {string} uid PK of the user
     * @param {User} user Updated body of the user
     * @returns Promise To be notified when instance is updated the database
     */
   async updateUser(uid: string, user: User): Promise<any> {
       return await UserModel.updateOne({_id: uid}, {$set: user});
   }
}
