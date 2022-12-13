/**
 * @file Declares API for Dislikes related data access object methods
 */
import Dislike from "../../models/dislikes/Dislike";

export default interface DislikeDaoI {
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;

    userDislikesTuit(uid: string, tid: string): Promise<Dislike>;

    userUnDislikesTuit(uid: string, tid: string): Promise<any>;

    findUserDislikesTuit(uid: string, tid: string): Promise<any>

    countHowManyDislikedTuit(tid: string): Promise<any>
};
