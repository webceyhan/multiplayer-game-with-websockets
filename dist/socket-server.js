"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const game_1 = require("./game");
const player_1 = require("./player");
const utils_1 = require("./utils");
const port = 9090;
// create websocket server
const wsServer = new ws_1.default.Server({ port });
console.log(`websocket server listening on ${port}`);
// define client connection handler
wsServer.on('connection', (ws) => {
    // create new player
    const player = new player_1.Player();
    // create new payload and send
    utils_1.sendMessage(ws, { method: 'connect', player });
    // define event listeners
    ws.on('open', () => console.log('opened!'));
    ws.on('close', () => console.log('closed!'));
    ws.on('message', (message) => {
        // when message received from the client
        const data = utils_1.parseMessage(message.toString());
        console.log(data);
        switch (data.method) {
            case 'create': {
                const game = game_1.Game.create();
                utils_1.sendMessage(ws, { method: 'create', game });
                break;
            }
            case 'join': {
                try {
                    const game = game_1.Game.find(data.gameId);
                    game.addPlayer(player);
                    broadcastGameState('join', game);
                }
                catch (error) {
                    console.log(error.message);
                }
                break;
            }
            case 'play': {
                const { gameId, ballId } = data;
                const game = game_1.Game.find(gameId);
                game.play(player.id, ballId);
                broadcastGameState('play', game);
                break;
            }
        }
    });
});
const broadcastGameState = (method, game) => {
    wsServer.clients.forEach((ws) => utils_1.sendMessage(ws, { method, game }));
};
