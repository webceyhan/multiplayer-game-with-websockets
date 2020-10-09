import Websocket from 'ws';

import { guid, parseMessage, sendMessage } from './utils.mjs';

const port = 9090;

// define hashmaps
const games = {};
const maxPlayers = 3;
const playerColors = ['red', 'green', 'blue'];

// create websocket server
const wsServer = new Websocket.Server({ port });
console.log(`websocket server listening on ${port}`);

// define client connection handler
wsServer.on('connection', (ws) => {
    // generate new client id
    const clientId = guid();

    // create new payload and send
    sendMessage(ws, { clientId, method: 'connect' });

    // define event listeners
    ws.on('open', () => console.log('opened!'));
    ws.on('close', () => console.log('closed!'));
    ws.on('message', (message) => {
        // when message received from the client
        const data = parseMessage(message);
        console.log(data);

        switch (data.method) {
            case 'create': {
                const gameId = guid();
                const game = { id: gameId, balls: 20, clients: [], state: {} };

                games[gameId] = game;

                sendMessage(ws, { method: 'create', game });
                break;
            }

            case 'join': {
                const game = games[data.gameId];

                if (game.clients.length >= maxPlayers) {
                    // sorry max players reached!
                    return;
                }

                const color = playerColors[game.clients.length];
                game.clients.push({ clientId, color });

                broadcastGameState('join', game);

                break;
            }

            case 'play': {
                const { gameId, ballId, color } = data;
                const game = games[gameId];

                // update state
                game.state[ballId] = color;

                broadcastGameState('play', game);

                break;
            }
        }
    });
});

const broadcastGameState = (method, game) => {
    wsServer.clients.forEach((ws) => sendMessage(ws, { method, game }));
};
