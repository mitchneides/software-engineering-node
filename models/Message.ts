import User from "./User";

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