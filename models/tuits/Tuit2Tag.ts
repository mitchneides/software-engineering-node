/**
 * @file Declare Tuit to Tag type mapping a Tuit to a Tag.
 */

import Tuit from "./Tuit";

/**
 * @typedef Tuit2Tag Represents a tag of a tuit
 * @property {string} tag The tag of a tuit
 * @property {Tuit} tuit the tuit that will have a tag
 */

export default class Tuit2Tag {
    private tag: string = '';
    private tuit: Tuit | null = null;

    constructor(tag: string, tuit: Tuit | null) {
        this.tag = tag;
        this.tuit = tuit;
    }

    get getTag(): string {
        return this.tag;
    }

    set setTag(value: string) {
        this.tag = value;
    }

    get getTuit(): Tuit | null {
        return this.tuit;
    }

    set setTuit(value: Tuit | null) {
        this.tuit = value;
    }
}
