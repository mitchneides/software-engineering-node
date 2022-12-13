/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import DislikeDaoI from "../interfaces/dislikes/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage of dislikes
 * @property {TuitDao} tuitDao Private single instance of UserDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao()
        }
        return DislikeDao.dislikeDao
    }

    private constructor() {
    }

    /**
     * Finds count of Users that disliked a Tuit.
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when the count is retrieved from the
     * database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid})

    /**
     * Finds all Tuits disliked by a User.
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the tuits are retrieved from the
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec()

    /**
     * Retrieves dislike of tuit by user if relation exists.
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @return Promise to be notified when dislike is found in database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid})

    /**
     * Inserts dislike document for a dislike by a given user of a given tuit
     * into the database.
     * @param {string} uid Primary key of User
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid})

    /**
     * Removes dislike document from the database.
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

}