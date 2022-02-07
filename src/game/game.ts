import { Hash, uuid } from '../utils';
import { Player, MAX_PLAYERS } from './player';

export class Game {
    static all: Game[] = [];

    constructor(
        public id = uuid(),
        public state: Hash = {},
        public players: Player[] = [],
        public balls = 20
    ) {}

    get isFull(): boolean {
        return this.players.length === MAX_PLAYERS;
    }

    hasPlayer(player: Player) {
        return this.players.indexOf(player) >= 0;
    }

    findPlayer(id: string) {
        const player = this.players.find((p) => p.id == id);

        // throw error if player was not found
        if (!player) throw new Error('Player Not Found!');

        return player;
    }

    addPlayer(player: Player): void {
        if (this.isFull) {
            throw 'game is full';
        }

        if (this.hasPlayer(player)) {
            throw 'player is already in game';
        }

        player.join(this.players);
    }

    removePlayer(player: Player): void {
        if (this.hasPlayer(player)) {
            player.leave(this.players);
        }
    }

    play(playerId: string, ballId: number): void {
        // update state
        this.state[`${ballId}`] = this.findPlayer(playerId).color;
    }

    // STATIC HELPERS //////////////////////////////////////////////////////////////////////////////

    static create(): Game {
        const game = new Game();

        Game.all.push(game);

        return game;
    }

    static find(id: string): Game | undefined {
        return Game.all.find((g) => g.id == id);
    }
}
