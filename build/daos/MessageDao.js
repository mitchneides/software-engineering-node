"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
const Message_1 = __importDefault(require("../models/Message"));
/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Uses MessageModel to retrieve all sent messages by a user
         * @param {string} uid Primary key of the user
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findAllSentMessages = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({ from: uid })
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all received messages of a user
         * @param {string} uid Primary key of the user
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findAllReceivedMessages = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({ to: uid })
                .exec();
        });
        /**
         * Deletes message instance from the database
         * @param {string} mid PK of the message
         * @returns Promise To be notified when instance is deleted from the database
         */
        this.deleteMessage = (mid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.deleteOne({ _id: mid })
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all sent messages by a user to a specified user
         * @param {string} from_uid Primary key of the user sending
         * @param {string} to_uid Primary key of the user receiving
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findAllMessagesTo = (from_uid, to_uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.where("from").equals(from_uid)
                .where("to").equals(to_uid)
                .exec();
        });
        /**
         * Uses MessageModel to retrieve all received messages by a user from a specified user
         * @param {string} to_uid Primary key of the user receiving
         * @param {string} from_uid Primary key of the user that sent
         * @returns Promise To be notified when the messages are retrieved from
         * database
         */
        this.findAllMessagesFrom = (to_uid, from_uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.where("to").equals(to_uid)
                .where("from").equals(from_uid)
                .exec();
        });
    }
    /**
     * Inserts message instance into the database
     * @param {Message} message body of message to be sent
     * @returns Promise To be notified when message is inserted into the database
     */
    userMessagesUser(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageObj = yield MessageModel_1.default.create(message);
            return new Message_1.default(messageObj.message_text, messageObj.to, messageObj.from, messageObj.sentOn);
        });
    }
}
exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao == null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
