import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
   async findAllUsers(): Promise<User[]> {
       const allUserModels = await UserModel.find();
       return allUserModels.map(userObj =>
           new User(userObj.username, userObj.password, userObj.firstName,
                    userObj.lastName, userObj.email)
       )
   }
   async findUserById(uid: string): Promise<any> {
   // WORKS BUT crashes app if non-existent userID is passed in
       const userObj = await UserModel.findById(uid);
       return new User(userObj.username, userObj.password, userObj.firstName,
                       userObj.lastName, userObj.email);
   }
   async createUser(user: User): Promise<User> {
   // how to create through the API? Where is the object construction?
       return await UserModel.create(user);
   }
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }
   async updateUser(uid: string, user: User): Promise<any> {
       return await UserModel.updateOne({_id: uid}, {$set: user});
   }
}
