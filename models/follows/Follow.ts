/**
 * @file Declares Follow data type representing the relationship between one
 * user following another.
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between a user and another user
 * where one user follows another.
 * @property {User} followee User being followed by other user
 * @property {User} follower User that is following the other user
 */
export default interface Follow {
    followee: User,
    follower: User,
};