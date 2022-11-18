/**
 * @file Declare Topic data type representing a topic of a tuit.
 */

/**
 * @typedef Topic Represents the topic of a tuit
 * @property {string} topic The topic of a tuit
 */

export default class Topic {
    private topic: string = '';

    constructor(topic: string) {
        this.topic = topic;
    }

    get getTopic(): string {
        return this.topic;
    }

    set setTopic(value: string) {
        this.topic = value;
    }
}