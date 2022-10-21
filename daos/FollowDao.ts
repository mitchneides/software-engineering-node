import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = () : FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    userFollowsUser = async (uid_follower: string, uid_following: string): Promise<Follow> =>
        FollowModel.create({follower: uid_follower, followee: uid_following});
    userUnfollowsUser = async (fid: string): Promise<any> =>
        FollowModel.deleteOne({_id: fid});
    findAllUserFollowers = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({followee: uid})
            .populate("follower")
            .exec();
    findAllUserFollowings = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({follower: uid})
            .populate("followee")
            .exec();
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