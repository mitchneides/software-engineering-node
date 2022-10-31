"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Message Represents message relationship between 2 users,
 * where one user is sending ('from') and one user is receiving ('to').
 * @property {string} message_text The text of the message being sent.
 * @property {User} to The user receiving the message.
 * @property {User} from The user sending the message.
 * @property {Date} sentOn The datetime that the message was sent.
 */
class Message {
    constructor(message_text, to, from, sentOn) {
        this.message_text = '';
        this.to = null;
        this.from = null;
        this.sentOn = new Date();
        this.message_text = message_text;
        this.to = to;
        this.from = from;
        this.sentOn = sentOn;
    }
}
exports.default = Message;
