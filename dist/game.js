"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const utils_1 = require("./utils");
const MAX_PLAYERS = 3;
const PLAYER_COLORS = ['red', 'green', 'blue'];
class Game {
    constructor(id = utils_1.guid(), state = {}, players = [], balls = 20) {
        this.id = id;
        this.state = state;
        this.players = players;
        this.balls = balls;
    }
    get isFull() {
        return this.players.length === MAX_PLAYERS;
    }
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
    play(playerId, ballId) {
        // find player
        const player = this.players.find((p) => p.id == playerId);
        // update state
        this.state[`${ballId}`] = player.color;
    }
    // STATIC HELPERS //////////////////////////////////////////////////////////////////////////////
    static create() {
        const game = new Game();
        Game.all[game.id] = game;
        return game;
    }
    static find(id) {
        return Game.all[id];
    }
}
exports.Game = Game;
Game.all = {};
