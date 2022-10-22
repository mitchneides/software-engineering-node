import User from "User";

export default class Message {
    message: String,
    to: User,
    from: User,
    sentOn: Date
}