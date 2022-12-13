/**
 * @file Controller RESTful Web service API for dislikes resource
 */
import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";
import DislikeControllerI from "../interfaces/dislikes/DislikeControllerI";
import TuitDao from "../daos/TuitDao";
import LikeDao from "../daos/LikeDao";

/**
 * @class DislikeController Implements RESTful Web service API for dislikes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/dislikes to retrieve all the tuits disliked by a user</li>
 *     <li>GET /api/tuits/:tid/dislikes to retrieve all users that disliked a tuit</li>
 *
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing dislikes CRUD operations
 * @property {DislikeController} DislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return DislikeController
     */
    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();

            app.get("/api/users/:uid/dislikes",
                DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.put("/api/users/:uid/dislikes/:tid",
                DislikeController.dislikeController.userTogglesTuitDislikes);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all tuits disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were disliked
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao
        const uid = req.params.uid
        // @ts-ignore
        const profile = req.session['profile']
        const userId = uid === 'me' && profile ? profile._id: uid

        dislikeDao.findAllTuitsDislikedByUser(userId)
            .then(dislikes => {
                const likesNonNullTuits = dislikes.filter(dislike => dislike.tuit)
                const tuitsFromDislikes = likesNonNullTuits.map(dislike => dislike.tuit);
                res.json(tuitsFromDislikes);
            })
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userDislikesTuit(req.params.tid, req.params.uid)
            .then(dislike => res.json(dislike))

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is un-disliking
     * the tuit and the tuit being un-disliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the dislike was successful or not
     */
    userUnDislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUnDislikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status))

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const dislikeDao = DislikeController.dislikeDao
        const likeDao = DislikeController.likeDao
        const tuitDao = DislikeController.tuitDao
        const uid = req.params.uid
        const tid = req.params.tid
        // @ts-ignore
        const profile = req.session['profile']
        const userId = uid === 'me' && profile ?
            profile._id : uid
        try {
            // Check if user has already liked/disliked
            const priorLike = await likeDao.findUserLikesTuit(userId, tid)
            const priorDislike = await dislikeDao.findUserDislikesTuit(userId, tid)

            // Retrieve prior count of likes/dislikes
            const countLikes = await likeDao.countHowManyLikedTuit(tid)
            const countDislikes = await dislikeDao.countHowManyDislikedTuit(tid)

            const tuit = await tuitDao.findTuitById(tid)

            if (priorDislike) {
                // decrement dislike count
                await dislikeDao.userUnDislikesTuit(userId, tid)
                tuit.stats.dislikes = countDislikes - 1
            } else {
                if (priorLike) {
                    // decrement and undo like
                    await likeDao.userUnlikesTuit(userId, tid)
                    tuit.stats.likes = countLikes - 1
                }
                // increment dislike count
                await dislikeDao.userDislikesTuit(userId, tid)
                tuit.stats.dislikes = countDislikes + 1
            }
            await tuitDao.updateStats(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
}