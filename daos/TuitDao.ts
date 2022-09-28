import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
   async findAllTuits(): Promise<Tuit[]> {
       const allTuitModels = await TuitModel.find();
       return allTuitModels.map(tuitObj =>
           new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy)
       )
   }
   async findTuitById(tid: string): Promise<Tuit> {
       const tuitObj = await TuitModel.findById(tid);
       return new Tuit(tuitObj.tuit, tuitObj.postedOn, tuitObj.postedBy);
       // postedBy^ is now referencing an ID so how to connect this to the user now???
   }



   async findTuitsByUser(uid: string): Promise<Tuit[]> {
   // need help with this syntax ///////////////////////////////////////////////////////////
       return TuitModel
                .find({postedBy: uid})
                .populate('tuit')
                .exec();

   }
   async createTuit(tuit: Tuit): Promise<Tuit> {
       return await TuitModel.create(tuit);
   }
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }
   async deleteTuit(tid: string): Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }
}
