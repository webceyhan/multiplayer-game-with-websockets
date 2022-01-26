import { uuid } from '../utils';

export class Player {
    constructor(public id = uuid(), public color?: string) {}
}

export const MAX_PLAYERS = 3;

export const PLAYER_COLORS = ['red', 'green', 'blue'];
