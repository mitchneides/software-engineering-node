import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/messages",
                    MessageController.messageController.userMessagesUser);
            app.get("/api/users/:uid/messages/sent",
                    MessageController.messageController.findAllSentMessages);
            app.get("/api/users/:uid/messages/received",
                    MessageController.messageController.findAllReceivedMessages);
            app.delete("/api/messages/:mid",
                    MessageController.messageController.deleteMessage);
            app.get("/api/users/:from_uid/messages/sent/:to_uid",
                    MessageController.messageController.findAllMessagesTo);
            app.get("/api/users/:to_uid/messages/from/:from_uid",
                    MessageController.messageController.findAllMessagesFrom);

        }
        return MessageController.messageController;
    }

    private constructor() {}

    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.body)
           .then(m => res.json(m));

    findAllSentMessages = (req: Request, res: Response) =>
       MessageController.messageDao.findAllSentMessages(req.params.uid)
           .then(sents => res.json(sents));

    findAllReceivedMessages = (req: Request, res: Response) =>
       MessageController.messageDao.findAllReceivedMessages(req.params.uid)
           .then(receiveds => res.json(receiveds));

    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
           .then(status => res.send(status));

    findAllMessagesTo = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesTo(req.params.from_uid, req.params.to_uid)
           .then(sents => res.json(sents));

    findAllMessagesFrom = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesFrom(req.params.to_uid, req.params.from_uid)
           .then(receiveds => res.json(receiveds));

}