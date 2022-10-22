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

}