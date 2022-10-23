import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

export default class TuitDao implements TuitDaoI {
   private static tuitDao: TuitDao | null = null;
   public static getInstance = () : TuitDao => {
       if (TuitDao.tuitDao == null) {
           TuitDao.tuitDao = new TuitDao();
       }
       return TuitDao.tuitDao;
   }

   private constructor() {}

   async findAllTuits(): Promise<Tuit[]> {
       const allTuitModels = await TuitModel.find();
       return allTuitModels.map(tuitObj =>
           new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy)
       )
   }
   async findTuitById(tid: string): Promise<any> {
       try {
           const tuitObj = await TuitModel.findById(tid);
           return new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
       } catch(e) {
           return "Tuit ID: " + tid + " does not match a tuit in the database";
       }
   }
   async findTuitsByUser(uid: string): Promise<Tuit[]> {
       return await TuitModel
                    .find({postedBy: uid})
                    .populate('tuit')
                    .exec();
   }
   async createTuit(tuit: Tuit): Promise<Tuit> {
       const tuitObj = await TuitModel.create(tuit);
       return new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
   }
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }
   async deleteTuit(tid: string): Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }
}
