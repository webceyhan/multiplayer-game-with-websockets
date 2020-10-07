import http from 'http';
import websocket from 'websocket';

import { guid, parseMessage, sendMessage } from './utils.mjs';

const port = 9090;

// define hashmaps
const clients = {};
const games = {};

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
    const id = guid();

    // add to clients hashmap
    clients[id] = { connection };

    // create new payload and send
    sendMessage(connection, { id, method: 'connect' });

    // define event listeners
    connection.on('open', () => console.log('opened!'));
    connection.on('close', () => console.log('closed!'));
    connection.on('message', (message) => {
        // when message received from the client
        const data = parseMessage(message);
        console.log(data);

        if (data.method === 'create') {
            const gameId = guid();
            games[gameId] = { id: gameId, balls: 20 };

            sendMessage(connection, { method: 'create', game: games[gameId] });
        }
    });
});
