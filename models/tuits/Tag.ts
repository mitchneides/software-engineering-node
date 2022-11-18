/**
 * @file Declare Tag data type representing a tag on a tuit.
 */

/**
 * @typedef Tag Represents a tag of a tuit
 * @property {string} tag The tag of a tuit
 */

export default class Tag {
    private tag: string = '';

    constructor(tag: string) {
        this.tag = tag;
    }

    get getTag(): string {
        return this.tag;
    }

    set setTag(value: string) {
        this.tag = value;
    }
}
