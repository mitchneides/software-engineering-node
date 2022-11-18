/**
 * @file Declares API for Follows related data access object methods
 */
import Follow from "../../models/follows/Follow";
import User from "../../models/users/User";

export default interface FollowDaoI {
    userFollowsUser(uid: string, ouid: string): Promise<Follow>;

    userUnfollowsUser(uid: string, ouid: string): Promise<any>;

    findUsersFollowedByUser(uid: string): Promise<User[]>;

    findUsersFollowingUser(uid: string): Promise<User[]>;

    findAllFollows(): Promise<Follow[]>;
}