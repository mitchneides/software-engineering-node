/**
 * @file Declare Tuit to Topic type mapping a Tuit to a Topic.
 */

import Tuit from "./Tuit";

/**
 * @typedef Tuit2Topic Represents the topic of a tuit
 * @property {string} topic The topic of a tuit
 * @property {Tuit} tuit the tuit that will have a topic
 */

export default class Tuit2Topic {
    private topic: string = '';
    private tuit: Tuit | null = null;

    constructor(topic: string, tuit: Tuit | null) {
        this.topic = topic;
        this.tuit = tuit;
    }

    get getTopic(): string {
        return this.topic;
    }

    set setTopic(value: string) {
        this.topic = value;
    }

    get getTuit(): Tuit | null {
        return this.tuit;
    }

    set setTuit(value: Tuit | null) {
        this.tuit = value;
    }
}