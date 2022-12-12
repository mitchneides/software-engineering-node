/**
 * @file Declare Stats data type representing a stats of a tuit.
 */

/**
 * @typedef Stats Represents a tuits Stats
 * @property {number} replies Number of replies for a tuit
 * @property {number} retuits Number of retuits for a tuit
 * @property {number} likes Number of likes for a tuit
 * @property {number} dislikes Number of dislikes for a tuit
 */
export default interface Stats {
    replies: number,
    retuits: number,
    likes: number,
    dislikes: number
}
