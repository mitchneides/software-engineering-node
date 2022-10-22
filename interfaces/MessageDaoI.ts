import Message from "../models/Message";

export default interface FollowDaoI {
    userMessagesUser (message: Message): Promise<Message>;
    findAllSentMessages (uid: string): Promise<Message[]>;
    findAllReceivedMessages (uid: string): Promise<Message[]>;
    deleteMessage (mid: string): Promise<any>;
//     findAllMessagesTo (from_uid: string, to_uid: string): Promise<Message[]>;
//     findAllMessagesFrom (from_uid: string, to_uid: string): Promise<Message[]>;
}