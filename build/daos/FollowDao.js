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
const FollowModel_1 = __importDefault(require("../mongoose/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Inserts follow instance into the database
         * @param {string} uid_follower User ID who is the follower
         * @param {string} uid_following User ID who is the followee (being followed)
         * @returns Promise To be notified when follow is inserted into the database
         */
        this.userFollowsUser = (uid_follower, uid_following) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ follower: uid_follower, followee: uid_following }); });
        /**
         * Deletes follow instance from the database
         * @param {string} fid Follow ID to be deleted
         * @returns Promise To be notified when instance is deleted from the database
         */
        this.userUnfollowsUser = (fid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ _id: fid }); });
        /**
         * Uses FollowModel to retrieve all users that follow the session user
         * @param {string} uid User ID who is requesting their followers list
         * @returns Promise To be notified when the follower users are retrieved from
         * database
         */
        this.findAllUserFollowers = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ followee: uid })
                .populate("follower")
                .exec();
        });
        /**
         * Uses FollowModel to retrieve all users that the session user follows
         * @param {string} uid User ID who is requesting their followings list
         * @returns Promise To be notified when the users are retrieved from
         * database
         */
        this.findAllUserFollowings = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ follower: uid })
                .populate("followee")
                .exec();
        });
        /**
         * Uses FollowModel to retrieve all users that follow 2 specified users
         * @param {string} uid1 User ID of one of the users
         * @param {string} uid2 User ID of the other user
         * @returns Promise To be notified when the common users are retrieved from
         * database
         */
        this.findAllCommonFollowers = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () {
            // find user1 followers list
            var followers1 = yield FollowModel_1.default
                .find({ $and: [{ followee: uid1 }, { 'follower': { $ne: uid2 } }] })
                .populate("follower")
                .exec();
            // find user2 followings list
            var followers2 = yield FollowModel_1.default
                .find({ $and: [{ followee: uid2 }, { 'follower': { $ne: uid1 } }] })
                .populate("follower")
                .exec();
            // map user1 followers
            var map = new Map();
            followers1.forEach(function (value) {
                // Key: _id of user, Value: User object
                map.set(value.follower._id.toString(), value);
            });
            // find common values between user1 and user2
            var common = new Array();
            followers2.forEach(function (value) {
                var v = value.follower._id.toString();
                if (map.get(v) != null) {
                    common.push(map.get(v));
                }
            });
            // return common users
            return common;
        });
        /**
         * Uses FollowModel to retrieve all users that 2 specified users follow in common
         * @param {string} uid1 User ID of one of the users
         * @param {string} uid2 User ID of the other user
         * @returns Promise To be notified when the common users are retrieved from
         * database
         */
        this.findAllCommonFollowings = (uid1, uid2) => __awaiter(this, void 0, void 0, function* () {
            // find user1 followings list
            var followings1 = yield FollowModel_1.default
                .find({ $and: [{ follower: uid1 }, { 'followee': { $ne: uid2 } }] })
                .populate("followee")
                .exec();
            // find user2 followings list
            var followings2 = yield FollowModel_1.default
                .find({ $and: [{ follower: uid2 }, { 'followee': { $ne: uid1 } }] })
                .populate("followee")
                .exec();
            // map user1 followings
            var map = new Map();
            followings1.forEach(function (value) {
                // Key: _id of user, Value: User object
                map.set(value.followee._id.toString(), value);
            });
            // find common values between user1 and user2
            var common = new Array();
            followings2.forEach(function (value) {
                var v = value.followee._id.toString();
                if (map.get(v) != null) {
                    common.push(map.get(v));
                }
            });
            // return common users
            return common;
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao == null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
