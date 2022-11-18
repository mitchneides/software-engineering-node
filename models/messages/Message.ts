/**
 * @file Declare Message data type representing a message from a user sent to
 * another user.
 */
import User from "../users/User";

/**
 * @typedef Message Represents message being sent from one user to another user
 * @property {string} message the contents of the message
 * @property {User} to User that is receiving the message
 * @property {User} from User that is sending the message
 * @property {Date} date Date of when the message was sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    date?: Date
};