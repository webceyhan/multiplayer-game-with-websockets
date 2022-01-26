import { uuid } from '../utils';

type Color = 'blue' | 'green' | 'red';

export const MAX_PLAYERS = 3;

export const PLAYER_COLORS: Color[] = ['blue', 'green', 'red'];

export class Player {
    constructor(public id = uuid(), public color?: Color) {}
}
