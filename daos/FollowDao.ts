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




    findAllCommonFollowings = async (uid1: string, uid2: string): Promise<User[]> => {
        var result1 = await FollowModel.find({$or: [{follower: uid1}, {follower: uid2}]})
                                       .where({$and: [{ 'followee': { $ne: uid1 } }, { 'followee': { $ne: uid2 } }]}))
                                       .populate("followee")
                                       .exec()
        var result2 = await FollowModel.find({$or: [{follower: uid1}, {follower: uid2}]})
                                       .where({$and: [{ 'followee': { $ne: uid1 } }, { 'followee': { $ne: uid2 } }]}))
                                       .populate("followee")
                                       .exec()
        // search results for duplicates

        // return result
        return result3;

    }



        FollowModel
            .find({$or: [{follower: uid1}, {follower: uid2}]})
            .where({$and: [{ 'followee': { $ne: uid1 } }, { 'followee': { $ne: uid2 } }]})
//             .sort('+followee')
            .populate("followee")
            .exec()

        response.send(array)

// idea: ??? .find within a .find possible?? ie:
// FollowModel.find(xyz).populate('followee').exec(function(err, followees) {
//      var flist = [];
//      FollowModel.find(xyz).populate('followee').exec(function(err, followees2) {
//           flist.push(followees2._id)
//      }
//
//  can I do multiple queries before sending the promise?
//}


}