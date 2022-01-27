import { uuid } from '../utils';

type Color = 'blue' | 'green' | 'red';

export const MAX_PLAYERS = 3;

const PLAYER_COLORS: Color[] = ['blue', 'green', 'red'];

export class Player {
    constructor(public id = uuid(), public number = 0) {}

    get name() {
        return `Player ${this.number}`;
    }

    get color() {
        return PLAYER_COLORS[this.number - 1];
    }

    join(players: Player[]) {
        players.push(this); // attach
        this.number = players.length; // assing nr
    }

    toJSON() {
        return {
            ...this,
            name: this.name,
            color: this.color,
        };
    }
}
