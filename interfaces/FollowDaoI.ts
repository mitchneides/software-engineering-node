import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser (uid_follower: string, uid_following: string): Promise<Follow>;
    userUnfollowsUser (fid: string): Promise<any>;
    findAllUserFollowers (uid: string): Promise<any[]>;
    findAllUserFollowings (uid: string): Promise<any[]>;
    findAllCommonFollowers (uid1: string, uid2: string): Promise<any[]>;
    findAllCommonFollowings (uid1: string, uid2: string): Promise<any[]>;
}