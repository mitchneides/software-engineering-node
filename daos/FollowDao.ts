/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/follows/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns {FollowDao} FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    constructor() {
    }

    /**
     * Uses FollowModel to retrieve all follow documents from follows collection.
     * @returns {Promise} Promise to be notified when the follows are retrieved from
     * database
     */
    findAllFollows = async (): Promise<Follow[]> =>
        FollowModel.find();

    /**
     * Uses FollowModel to retrieve all users followed by one user
     * @param uid User's primary key
     * @return {Promise} Promise to be notified when users that are followed by a user
     * is retrieved from database
     */
    findUsersFollowedByUser = async (uid: string): Promise<User[]> => {
        let follows = await  FollowModel
            .find({follower: uid})
            .populate("followee")
            .exec();
        return follows.map(follow => follow.followee);
    }

    /**
     * Uses FollowModel to retrieve all users following one user
     * @param uid User's primary key
     * @return {Promise} Promise to be notified when users that are following a user
     * is retrieved from database
     */
    findUsersFollowingUser = async (uid: string): Promise<User[]> => {
        let follows = await FollowModel
            .find({followee: uid})
            .populate("follower")
            .exec()
        return follows.map(follow => follow.follower);
    }

    /**
     * Inserts follow instance into the database.
     * @param {string} uid Primary key of user following other user
     * @param {string} ouid Primary key of user to be followed
     * @return {Promise} Promise to be notified when follow is added to
     * database
     */
    userFollowsUser = async (uid: string, ouid: string): Promise<Follow> =>
        FollowModel.create({follower: uid, followee: ouid});

    /**
     * Removes follow from the database.
     * @param {string} uid Primary key of user to unfollow other user
     * @param {string} ouid Primary key of user to be unfollowed
     * @return {Promise} Promise to be notified when follow is removed from
     * database
     */
    userUnfollowsUser = async (uid: string, ouid: string): Promise<any> =>
        FollowModel.deleteOne({follower: uid, followee:ouid});
}