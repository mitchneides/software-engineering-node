/**
 * @file Implements DAO managing data storage of messages. Uses mongoose to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = () : MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {Message} message body of message to be sent
     * @returns Promise To be notified when message is inserted into the database
     */
    async userMessagesUser(message: Message): Promise<Message> {
       const messageObj = await MessageModel.create(message);
       return new Message(messageObj.message_text, messageObj.to,
                          messageObj.from, messageObj.sentOn);
   }

    /**
     * Uses MessageModel to retrieve all sent messages by a user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
   findAllSentMessages = async (uid: string): Promise<Message[]> =>
       MessageModel.find({from: uid})
                   .exec()

    /**
     * Uses MessageModel to retrieve all received messages of a user
     * @param {string} uid Primary key of the user
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
   findAllReceivedMessages = async (uid: string): Promise<Message[]> =>
       MessageModel.find({to: uid})
                   .exec()

    /**
     * Deletes message instance from the database
     * @param {string} mid PK of the message
     * @returns Promise To be notified when instance is deleted from the database
     */
   deleteMessage = async (mid: string): Promise<any> =>
       MessageModel.deleteOne({_id: mid})
                   .exec()

    /**
     * Uses MessageModel to retrieve all sent messages by a user to a specified user
     * @param {string} from_uid Primary key of the user sending
     * @param {string} to_uid Primary key of the user receiving
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
   findAllMessagesTo = async (from_uid: string, to_uid: string): Promise<Message[]> =>
       MessageModel.where("from").equals(from_uid)
                   .where("to").equals(to_uid)
                   .exec()

    /**
     * Uses MessageModel to retrieve all received messages by a user from a specified user
     * @param {string} to_uid Primary key of the user receiving
     * @param {string} from_uid Primary key of the user that sent
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
   findAllMessagesFrom = async (to_uid: string, from_uid: string): Promise<Message[]> =>
      MessageModel.where("to").equals(to_uid)
                  .where("from").equals(from_uid)
                  .exec()

}