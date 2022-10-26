/**
 * @file Declares Message data type representing a direct message between 2 users,
 * where one user is sending ('from') and one user is receiving ('to').
 * The message also contains text and the datetime that it was sent.
 */
import User from "./User";

/**
 * @typedef Message Represents message relationship between 2 users,
 * where one user is sending ('from') and one user is receiving ('to').
 * @property {string} message_text The text of the message being sent.
 * @property {User} to The user receiving the message.
 * @property {User} from The user sending the message.
 * @property {Date} sentOn The datetime that the message was sent.
 */
export default class Message {
    private message_text: string = '';
    private to: User | null = null;
    private from: User | null = null;
    private sentOn: Date = new Date();

    constructor(message_text: string, to: User, from: User, sentOn: Date) {
        this.message_text = message_text;
        this.to = to;
        this.from = from;
        this.sentOn = sentOn;
    }
}