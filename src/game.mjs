import { guid } from './utils.mjs';

const MAX_PLAYERS = 3;
const PLAYER_COLORS = ['red', 'green', 'blue'];

export class Game {
    /** @type {{[key:string]: Game}} */
    static all = {};

    constructor() {
        /** @type {string} */
        this.id = guid();

        /** @type {{id:string, color:string}[]} */
        this.players = [];

        /** @type {number} */
        this.balls = 20;

        /** @type {{}} */
        this.state = {};
    }

    /**
     * @returns {boolean}
     */
    get isFull() {
        return this.players.length === MAX_PLAYERS;
    }

    /**
     * @param {string} playerId
     * @returns {void}
     */
    join(playerId) {
        if (this.isFull) {
            throw Error('game is full');
        }

        const index = this.players.length;
        const color = PLAYER_COLORS[index];

        this.players.push({ id: playerId, color });
    }

    /**
     * @param {string} playerId
     * @param {number} ballId
     * @returns {void}
     */
    play(playerId, ballId) {
        // find player
        const player = this.players.find((p) => p.id == playerId);

        // update state
        this.state[ballId] = player.color;
    }

    // STATIC HELPERS //////////////////////////////////////////////////////////////////////////////

    /**
     * @returns {void}
     */
    static create() {
        const game = new Game();

        Game.all[game.id] = game;

        return game;
    }

    /**
     * @param {string} id
     * @returns {Game}
     */
    static find(id) {
        return Game.all[id];
    }
}
