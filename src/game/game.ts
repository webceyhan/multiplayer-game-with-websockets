import { Hash, guid } from '../utils';
import { Player, MAX_PLAYERS, PLAYER_COLORS } from './player';

export class Game {
    static all: Hash<Game> = {};

    constructor(
        public id = guid(),
        public state: Hash = {},
        public players: Player[] = [],
        public balls = 20
    ) {}

    get isFull(): boolean {
        return this.players.length === MAX_PLAYERS;
    }

    addPlayer(player: Player): void {
        if (this.isFull) {
            throw 'game is full';
        }

        if (this.players.indexOf(player) >= 0) {
            throw 'player is already in game';
        }

        // set player color from the position in game
        player.color = PLAYER_COLORS[this.players.length];

        this.players.push(player);
    }

    play(playerId: string, ballId: number): void {
        // find player
        const player = this.players.find((p) => p.id == playerId);

        // throw error if player was not found
        if (!player) throw new Error('Player Not Found!');

        // update state
        this.state[`${ballId}`] = player.color;
    }

    // STATIC HELPERS //////////////////////////////////////////////////////////////////////////////

    static create(): Game {
        const game = new Game();

        Game.all[game.id] = game;

        return game;
    }

    static find(id: string): Game {
        return Game.all[id];
    }
}
