import { guid } from '../utils';

export class Player {
    constructor(public id = guid(), public color?: string) {}
}
