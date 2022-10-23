import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDaoI";

export default class UserDao implements UserDaoI {
   private static userDao: UserDao | null = null;
   public static getInstance = () : UserDao => {
       if (UserDao.userDao == null) {
           UserDao.userDao = new UserDao();
       }
       return UserDao.userDao;
   }

   private constructor() {}

   async findAllUsers(): Promise<User[]> {
       const allUserModels = await UserModel.find();
       return allUserModels.map(userObj =>
           new User(userObj.username, userObj.password, userObj.firstName,
                    userObj.lastName, userObj.email)
       )
   }
   async findUserById(uid: string): Promise<any> {
       try {
           const userObj = await UserModel.findById(uid);
           return new User(userObj.username, userObj.password, userObj.firstName,
                           userObj.lastName, userObj.email);
       } catch(e) {
           return "User ID: " + uid + " does not match a user in the database";
       }
   }
   async createUser(user: User): Promise<User> {
       const userObj = await UserModel.create(user);
       return new User(userObj.username, userObj.password, userObj.firstName,
                       userObj.lastName, userObj.email);
   }
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }
   async updateUser(uid: string, user: User): Promise<any> {
       return await UserModel.updateOne({_id: uid}, {$set: user});
   }
}
