import { guid } from './utils.mjs';

export class Player {
    constructor() {
        /** @type {string} */
        this.id = guid();

        /** @type {string} */
        this.color = null;
    }
}
