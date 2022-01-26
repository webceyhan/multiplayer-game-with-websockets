import Websocket from 'ws';

import { Game } from './game';
import { Player } from './player';
import { parseMessage, sendMessage } from './utils';

const port = 9090;

// create websocket server
const wsServer = new Websocket.Server({ port });
console.log(`websocket server listening on ${port}`);

// define client connection handler
wsServer.on('connection', (ws) => {
    // create new player
    const player = new Player();

    // create new payload and send
    sendMessage(ws, { method: 'connect', player });

    // define event listeners
    ws.on('open', () => console.log('opened!'));
    ws.on('close', () => console.log('closed!'));
    ws.on('message', (message) => {
        // when message received from the client
        const data = parseMessage(message.toString());
        console.log(data);

        switch (data.method) {
            case 'create': {
                const game = Game.create();

                sendMessage(ws, { method: 'create', game });
                break;
            }

            case 'join': {
                try {
                    const game = Game.find(data.gameId);
                    game.addPlayer(player);

                    broadcastGameState('join', game);
                } catch (error) {
                    console.log((error as any).message);
                }

                break;
            }

            case 'play': {
                const { gameId, ballId } = data;
                const game = Game.find(gameId);

                game.play(player.id, ballId);
                broadcastGameState('play', game);
                break;
            }
        }
    });
});

const broadcastGameState = (method: string, game: Game) => {
    wsServer.clients.forEach((ws) => sendMessage(ws, { method, game }));
};
