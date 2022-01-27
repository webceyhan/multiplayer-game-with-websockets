import { WebSocket, Server } from 'ws';
import { Game, Player } from '../../game';
import { emitEvent, broadcastEvent, parseEvent } from './event';

export const createClient = (ws: WebSocket, wss: Server) => {
    // create new player
    const player = new Player();

    // create new payload and send
    emitEvent(ws, 'connect', player);

    // define event listeners
    ws.on('open', () => console.log('opened!'));
    ws.on('close', () => console.log('closed!'));

    ws.on('message', (message) => {
        // when message received from the client
        const event = parseEvent(message);

        console.log(event);

        switch (event.name) {
            case 'create': {
                const game = Game.create();

                emitEvent(ws, 'create', game);
                break;
            }

            case 'join': {
                try {
                    const { gameId } = event.payload;
                    const game = Game.find(gameId);

                    game.addPlayer(player);

                    broadcastEvent(wss, 'join', game);
                } catch (error) {
                    console.log((error as any).message);
                }

                break;
            }

            case 'play': {
                const { gameId, ballId } = event.payload;
                const game = Game.find(gameId);

                game.play(player.id, ballId);

                broadcastEvent(wss, 'play', game);
                break;
            }
        }
    });
};
