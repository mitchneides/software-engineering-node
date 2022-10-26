/**
 * @file Declares Tuit data type representing a tuit posted by a user.
 * Relates the tuit to the user that posted it as well as the datetime
 * that it was posted.
 */
import User from "./User";

/**
 * @typedef Tuit Represents tuit relationship between a user and a tuit.
 * @property {Tuit} tuit Tuit PK being bookmarked
 * @property {Date} postedOn Datetime of the posting.
 * @property {User} postedBy User authoring the tuit
 */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;

   constructor(tuit: string, postedOn: Date, postedBy: User) {
       this.tuit = tuit;
       this.postedOn = postedOn;
       this.postedBy = postedBy;
   }
}
