import User from "./User";

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
