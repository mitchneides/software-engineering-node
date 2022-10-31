"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
/**
 * @class LikeController Implements RESTful Web service API for Messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/messages for a user to message another user</li>
 *     <li>GET /api/users/:uid/messages/sent for a user to find all sent messages</li>
 *     <li>GET /api/users/:uid/messages/received for a user to find all received messages</li>
 *     <li>DELETE /api/messages/:mid for a user to delete a message</li>
 *     <li>GET /api/users/:from_uid/messages/sent/:to_uid for a user to find all sent messages
 *     to a particular user</li>
 *     <li>GET /api/users/:to_uid/messages/from/:from_uid for a user to find all received messages
 *     from a particular user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing tuit CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        /**
         * Creates a message instance from one specified user to another.
         * @param {Request} req Represents request from client, message in the body (message_text,
         * sending userID, receiving userID, sent date optional)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object of the message
         */
        this.userMessagesUser = (req, res) => MessageController.messageDao.userMessagesUser(req.body)
            .then(m => res.json(m));
        /**
         * Retrieves all messages sent by a particular user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid (primary key for the user)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the message objects
         */
        this.findAllSentMessages = (req, res) => MessageController.messageDao.findAllSentMessages(req.params.uid)
            .then(sents => res.json(sents));
        /**
         * Retrieves all messages received by a particular user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid (primary key for the user)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the message objects
         */
        this.findAllReceivedMessages = (req, res) => MessageController.messageDao.findAllReceivedMessages(req.params.uid)
            .then(receiveds => res.json(receiveds));
        /**
         * Removes a particular message instance.
         * @param {Request} req Represents request from client, including the path
         * parameter mid (primary key for the message)
         * @param {Response} res Represents response to client, including the
         * status of whether or not the deletion was successfull
         */
        this.deleteMessage = (req, res) => MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.send(status));
        /**
         * Retrieves all messages sent by a particular user to a particular user.
         * @param {Request} req Represents request from client, including the path
         * parameters from_uid (primary key for the sending user) and to_uid
         * (primary key for the receiving user)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the message objects
         */
        this.findAllMessagesTo = (req, res) => MessageController.messageDao.findAllMessagesTo(req.params.from_uid, req.params.to_uid)
            .then(sents => res.json(sents));
        /**
         * Retrieves all messages received by a particular user from a particular user.
         * @param {Request} req Represents request from client, including the path
         * parameters to_uid (primary key for the receiving user) and from_uid
         * (primary key for the sending user)
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON array of the message objects
         */
        this.findAllMessagesFrom = (req, res) => MessageController.messageDao.findAllMessagesFrom(req.params.to_uid, req.params.from_uid)
            .then(receiveds => res.json(receiveds));
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/messages", MessageController.messageController.userMessagesUser);
        app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllSentMessages);
        app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllReceivedMessages);
        app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
        app.get("/api/users/:from_uid/messages/sent/:to_uid", MessageController.messageController.findAllMessagesTo);
        app.get("/api/users/:to_uid/messages/from/:from_uid", MessageController.messageController.findAllMessagesFrom);
    }
    return MessageController.messageController;
};
