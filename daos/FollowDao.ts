/**
 * @file Implements DAO managing data storage of follows. Uses mongoose to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = () : FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts follow instance into the database
     * @param {string} uid_follower User ID who is the follower
     * @param {string} uid_following User ID who is the followee (being followed)
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async (uid_follower: string, uid_following: string): Promise<Follow> =>
        FollowModel.create({follower: uid_follower, followee: uid_following});

    /**
     * Deletes follow instance from the database
     * @param {string} fid Follow ID to be deleted
     * @returns Promise To be notified when instance is deleted from the database
     */
    userUnfollowsUser = async (fid: string): Promise<any> =>
        FollowModel.deleteOne({_id: fid});

    /**
     * Uses FollowModel to retrieve all users that follow the session user
     * @param {string} uid User ID who is requesting their followers list
     * @returns Promise To be notified when the follower users are retrieved from
     * database
     */
    findAllUserFollowers = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({followee: uid})
            .populate("follower")
            .exec();

    /**
     * Uses FollowModel to retrieve all users that the session user follows
     * @param {string} uid User ID who is requesting their followings list
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUserFollowings = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({follower: uid})
            .populate("followee")
            .exec();

    /**
     * Uses FollowModel to retrieve all users that follow 2 specified users
     * @param {string} uid1 User ID of one of the users
     * @param {string} uid2 User ID of the other user
     * @returns Promise To be notified when the common users are retrieved from
     * database
     */
    findAllCommonFollowers = async (uid1: string, uid2: string): Promise<User[]> => {
        // find user1 followers list
        var followers1 = await FollowModel
                                .find({$and: [{followee: uid1}, { 'follower': { $ne: uid2 } }]})
                                .populate("follower")
                                .exec()
        // find user2 followings list
        var followers2 = await FollowModel
                                .find({$and: [{followee: uid2}, { 'follower': { $ne: uid1 } }]})
                                .populate("follower")
                                .exec()
        // map user1 followers
        var map: Map<String, User> = new Map();
        followers1.forEach(function (value) {
            // Key: _id of user, Value: User object
            map.set(value.follower._id.toString(), value);
        });
        // find common values between user1 and user2
        var common = new Array();
        followers2.forEach(function (value) {
            var v = value.follower._id.toString()
            if (map.get(v) != null) {
                common.push(map.get(v));
            }
        });
        // return common users
        return common;
    }
    /**
     * Uses FollowModel to retrieve all users that 2 specified users follow in common
     * @param {string} uid1 User ID of one of the users
     * @param {string} uid2 User ID of the other user
     * @returns Promise To be notified when the common users are retrieved from
     * database
     */
    findAllCommonFollowings = async (uid1: string, uid2: string): Promise<User[]> => {
        // find user1 followings list
        var followings1 = await FollowModel
                                .find({$and: [{follower: uid1}, { 'followee': { $ne: uid2 } }]})
                                .populate("followee")
                                .exec()
        // find user2 followings list
        var followings2 = await FollowModel
                                .find({$and: [{follower: uid2}, { 'followee': { $ne: uid1 } }]})
                                .populate("followee")
                                .exec()
        // map user1 followings
        var map: Map<String, User> = new Map();
        followings1.forEach(function (value) {
            // Key: _id of user, Value: User object
            map.set(value.followee._id.toString(), value);
        });
        // find common values between user1 and user2
        var common = new Array();
        followings2.forEach(function (value) {
            var v = value.followee._id.toString()
            if (map.get(v) != null) {
                common.push(map.get(v));
            }
        });
        // return common users
        return common;
    }
}