"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements DAO managing data storage of users. Uses mongoose to integrate with MongoDB
 */
const User_1 = __importDefault(require("../models/User"));
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
class UserDao {
    constructor() { }
    /**
     * Uses UserModel to retrieve all users in the database
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUserModels = yield UserModel_1.default.find();
            return allUserModels;
            //        .map(userObj =>
            //            new User(userObj.username, userObj.password, userObj.firstName,
            //                     userObj.lastName, userObj.email)
            //        )
        });
    }
    /**
     * Uses UserModel to retrieve a user by its ID
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when the user is retrieved from
     * database
     */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObj = yield UserModel_1.default.findById(uid);
                return new User_1.default(userObj.username, userObj.password, userObj.firstName, userObj.lastName, userObj.email);
            }
            catch (e) {
                return "User ID: " + uid + " does not match a user in the database";
            }
        });
    }
    /**
     * Inserts user instance into the database
     * @param {User} user user object to be entered
     * @returns Promise To be notified when user is inserted into the database
     */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObj = yield UserModel_1.default.create(user);
            return new User_1.default(userObj.username, userObj.password, userObj.firstName, userObj.lastName, userObj.email);
        });
    }
    /**
     * Deletes user instance from the database
     * @param {string} uid PK of the user
     * @returns Promise To be notified when instance is deleted from the database
     */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
     * Updates user instance in the database
     * @param {string} uid PK of the user
     * @param {User} user Updated body of the user
     * @returns Promise To be notified when instance is updated the database
     */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
}
exports.default = UserDao;
UserDao.userDao = null;
/**
 * Creates singleton DAO instance
 * @returns UserDao
 */
UserDao.getInstance = () => {
    if (UserDao.userDao == null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
