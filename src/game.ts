import { Player } from './player';
import { Hash, guid } from './utils';

const MAX_PLAYERS = 3;
const PLAYER_COLORS = ['red', 'green', 'blue'];

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
