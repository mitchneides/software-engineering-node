/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/messages/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage of Messages.
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns {MessageDao} MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all message documents from messages collection.
     * @returns {Promise} Promise to be notified when the messages are retrieved from
     * database
     */
    findAllMessages = async (): Promise<Message[]> =>
        MessageModel.find();

    /**
     * Uses MessageModel to retrieve messages received by user
     * @param uid User's primary key
     * @return {Promise} Promise to be notified when messages received by user
     * are retrieved from database
     */
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message")
            .exec();

    /**
     * Uses MessageModel to retrieve messages sent by user
     * @param uid User's primary key
     * @return {Promise} Promise to be notified when messages sent to user
     * are retrieved from database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message")
            .exec();

    /**
     * Uses MessageModel to remove a message from message collection in database
     * @param mid Primary key of message
     * @return {Promise} Promise to be notified when message is removed from database
     */
    userDeleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

    /**
     * Uses MessageModel to create a message instance in the database
     * @param {string} uid Primary key of user sending message
     * @param {string} ouid Primary key of user receiving message
     * @param {Message} message Message that is being sent from one user to another
     * user
     */
    userMessageUser = async (uid: string, ouid: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: ouid})
}