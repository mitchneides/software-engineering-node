import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userMessagesUser (message: Message): Promise<Message>;
    findAllSentMessages (uid: string): Promise<Message[]>;
    findAllReceivedMessages (uid: string): Promise<Message[]>;
    deleteMessage (mid: string): Promise<any>;
    findAllMessagesTo (from_uid: string, to_uid: string): Promise<Message[]>;
    findAllMessagesFrom (from_uid: string, to_uid: string): Promise<Message[]>;
}