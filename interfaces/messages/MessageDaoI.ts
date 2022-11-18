/**
 * @file Declares API for Messages related data access object methods
 */
import Message from "../../models/messages/Message";

export default interface MessageDaoI {
    findAllMessages(): Promise<Message[]>;

    userMessageUser(uid: string, ouid: string, message: Message): Promise<Message>;

    findAllMessagesSentByUser(uid: string): Promise<Message[]>;

    findAllMessagesReceivedByUser(uid: string): Promise<Message[]>;

    userDeleteMessage(mid: string): Promise<any>;
}