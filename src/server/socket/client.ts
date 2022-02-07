import { WebSocket, Server } from 'ws';
import { Game, Player } from '../../game';
import { emitEvent, broadcastEvent, parseEvent } from './event';

export const createClient = (ws: WebSocket, wss: Server) => {
    // create new player
    const player = new Player();

    // send player info and available games
    emitEvent(ws, 'connect', player);
    emitEvent(ws, 'update-games', Game.all);

    ws.on('close', () => {
        // remove player from all games
        Game.all.forEach((game) => game.removePlayer(player));
        broadcastEvent(wss, 'leave', Game.all);
    });

    ws.on('message', (message) => {
        // when message received from the client
        const event = parseEvent(message);

        switch (event.name) {
            case 'create': {
                Game.create();

                broadcastEvent(wss, 'update-games', Game.all);
                break;
            }

            case 'join': {
                try {
                    const { gameId } = event.payload;
                    const game = Game.find(gameId);

                    game?.addPlayer(player);

                    emitEvent(ws, 'join', game); // self
                    broadcastEvent(wss, 'update-game', game); // room
                } catch (error) {
                    console.log((error as any).message);
                }

                break;
            }

            case 'leave': {
                try {
                    const { gameId } = event.payload;
                    const game = Game.find(gameId);

                    game?.removePlayer(player);

                    emitEvent(ws, 'leave'); // self
                    broadcastEvent(wss, 'update-game', game); // room
                    broadcastEvent(wss, 'update-games', Game.all); // all
                } catch (error) {
                    console.log((error as any).message);
                }

                break;
            }

            case 'play': {
                const { gameId, ballId } = event.payload;
                const game = Game.find(gameId);

                game?.play(player.id, ballId);

                broadcastEvent(wss, 'update-game', game);
                break;
            }
        }
    });
};
