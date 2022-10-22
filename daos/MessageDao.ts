import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
import User from "../models/User";
import UserModel from "../mongoose/UserModel";

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = () : MessageDao => {
        if (MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    async userMessagesUser(message: Message): Promise<Message> {
       const messageObj = await MessageModel.create(message);
       return new Message(messageObj.message_text, messageObj.to,
                          messageObj.from, messageObj.sentOn);
   }


}