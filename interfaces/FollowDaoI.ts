import Follow from "../models/Follow";

export default interface FollowDaoI {
    userFollowsUser (uid_follower: string, uid_following: string): Promise<Follow>;
    userUnfollowsUser (fid: string): Promise<any>;
    findAllUserFollowers (uid: string): Promise<User[]>;
    findAllUserFollowings (uid: string): Promise<User[]>;
    findAllCommonFollowers (uid1: string, uid2: string): Promise<User[]>;
    findAllCommonFollowings (uid1: string, uid2: string): Promise<User[]>;
}