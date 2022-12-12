/**
 * @file Declare Tuit data type representing a tuit posted by a user.
 */

import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} id The id of a tuit
 * @property {string} tuit The content of a tuit
 * @property {Date} postedOn Date the tuit was posted on
 * @property {User} postedBy User that the tuit was posted by
 */

export default interface Tuit {
    id: string,
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    stats: Stats,
}
