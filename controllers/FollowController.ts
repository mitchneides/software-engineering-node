import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid/follows/:uid",
                    FollowController.followController.userFollowsUser);
            app.delete("/api/follows/:fid",
                    FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:uid/followers",
                    FollowController.followController.findAllUserFollowers);
            app.get("/api/users/:uid/following",
                    FollowController.followController.findAllUserFollowings);
            app.get("/api/users/:uid/commonFollowers/:uid",
                    FollowController.followController.findAllCommonFollowers);
            app.get("/api/users/:uid/commonFollowing/:uid",
                    FollowController.followController.findAllCommonFollowings);
        }
        return FollowController.followController;
    }

    private constructor() {}

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid_follower,
                                                   req.params.uid_following)
           .then(follow => res.json(follow));

    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.fid)
            .then(status => res.send(status));

    findAllUserFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllUserFollowers(req.params.uid)
            .then(followers => res.json(followers));

    findAllUserFollowings = (req: Request, res: Response) =>
        FollowController.followDao.findAllUserFollowings(req.params.uid)
            .then(followings => res.json(followings));

    findAllCommonFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllCommonFollowers(req.params.uid1, req.params.uid2)
            .then(users => res.json(users));

    findAllCommonFollowings = (req: Request, res: Response) =>
        FollowController.followDao.findAllCommonFollowings(req.params.uid1, req.params.uid2)
            .then(users => res.json(users));
};