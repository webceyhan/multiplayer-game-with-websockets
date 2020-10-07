import http from 'http';
import websocket from 'websocket';

import { guid, parseMessage, sendMessage } from './utils.mjs';

const port = 9090;

// define hashmaps
const clients = {};
const games = {};
const maxPlayers = 3;
const playerColors = ['red', 'green', 'blue'];

// create normal http server
const httpServer = http.createServer();

// start listening to port
httpServer.listen(port, () => {
    console.log(`websocket server listening on ${port}`);
});

// create websocket server based on the http server
const wsServer = new websocket.server({ httpServer });

// upgrade to websocket protocol on request
wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);

    // generate new client id
    const clientId = guid();

    // add to clients hashmap
    clients[clientId] = { connection };

    // create new payload and send
    sendMessage(connection, { clientId, method: 'connect' });

    // define event listeners
    connection.on('open', () => console.log('opened!'));
    connection.on('close', () => console.log('closed!'));
    connection.on('message', (message) => {
        // when message received from the client
        const data = parseMessage(message);
        console.log(data);

        switch (data.method) {
            case 'create': {
                const gameId = guid();
                const game = { id: gameId, balls: 20, clients: [], state: {} };

                games[gameId] = game;

                sendMessage(connection, { method: 'create', game });
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
                const { clientId, gameId, ballId, color } = data;
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
    game.clients.forEach((c) => {
        const ws = clients[c.clientId].connection;
        sendMessage(ws, { method, game });
    });
};
