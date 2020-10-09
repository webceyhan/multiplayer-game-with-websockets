import { Player } from './player.mjs';
import { guid } from './utils.mjs';

const MAX_PLAYERS = 3;
const PLAYER_COLORS = ['red', 'green', 'blue'];

export class Game {
    /** @type {{[key:string]: Game}} */
    static all = {};

    constructor() {
        /** @type {string} */
        this.id = guid();

        /** @type {Player[]} */
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
     * @param {Player} player
     * @returns {void}
     */
    addPlayer(player) {
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
