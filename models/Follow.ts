/**
 * @file Declares Follow data type representing relationship between
 * 2 users, where a 'follower' follows a 'followee'.
 */
import User from "./User";

/**
 * @typedef Follow Represents a follow relationship between 2 users,
 * where a 'follower' follows a 'followee'
 * @property {User} follower User doing the following
 * @property {User} followee User being followed
 */
export default class Follow {
    follower: User | null = null
    followee: User | null = null
}