import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import User from "../models/User";

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





    // ************ Need to figure out how to make these 2 queries (or change them)**************
    findAllCommonFollowers = async (uid1: string, uid2: string): Promise<User[]> =>
        FollowModel
            .find({$or: [{followee: uid1}, {followee: uid2}]})
            .populate("follower")
            .exec();

//             .find(
//                 {$and:
//                     {$or: [{followee: uid1}, {followee: uid2}]},
//
//                 }
//
//             )
//             .populate("follower")
//             .exec();




    findAllCommonFollowings = async (uid1: string, uid2: string): Promise<User[]> =>
        FollowModel
            .find({$or: [{follower: uid1}, {follower: uid2}]})
            .populate("followee")
            .then(f => console.log(f))
            .exec(f)



}