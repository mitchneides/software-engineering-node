/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
   private static tuitDao: TuitDao | null = null;

   /**
    * Creates singleton DAO instance
    * @returns TuitDao
    */
   public static getInstance = () : TuitDao => {
       if (TuitDao.tuitDao == null) {
           TuitDao.tuitDao = new TuitDao();
       }
       return TuitDao.tuitDao;
   }

   private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuits in the database
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
   async findAllTuits(): Promise<Tuit[]> {
       const allTuitModels = await TuitModel.find();
       return allTuitModels.map(tuitObj =>
           new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy)
       )
   }

    /**
     * Uses TuitModel to retrieve a tuit by its ID
     * @param {string} tid Primary key of the tuit
     * @returns Promise To be notified when the tuit is retrieved from
     * database
     */
   async findTuitById(tid: string): Promise<any> {
       try {
           const tuitObj = await TuitModel.findById(tid);
           return new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
       } catch(e) {
           return "Tuit ID: " + tid + " does not match a tuit in the database";
       }
   }

    /**
     * Uses TuitModel to retrieve all tuits by a specified user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
   async findTuitsByUser(uid: string): Promise<Tuit[]> {
       return await TuitModel
                    .find({postedBy: uid})
                    .populate('tuit')
                    .exec();
   }

   /**
    * Inserts tuit instance into the database
    * @param {Tuit} tuit body of tuit to be posted
    * @returns Promise To be notified when tuit is inserted into the database
    */
   async createTuit(tuit: Tuit): Promise<Tuit> {
       const tuitObj = await TuitModel.create(tuit);
       return new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
   }

    /**
     * Updates tuit instance in the database
     * @param {string} tid PK of the tuit
     * @param {Tuit} tuit Updated body of the tuit
     * @returns Promise To be notified when instance is updated the database
     */
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }

    /**
     * Deletes tuit instance from the database
     * @param {string} tid PK of the tuit
     * @returns Promise To be notified when instance is deleted from the database
     */
   async deleteTuit(tid: string): Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }
}
