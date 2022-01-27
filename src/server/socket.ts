import { Server } from 'ws';
import { createClient } from './socket/client';

export const createSocketServer = (port = 9090) => {
    // create websocket server
    const wss = new Server({ port });

    // define server handler
    wss.on('connection', (ws) => createClient(ws, wss));

    // define close handler
    wss.on('close', () => console.log('wss closed!'));

    // define error handler
    wss.on('error', (error) => console.log(`wss error: ${error}`));

    // define listen handler
    wss.on('listening', () =>
        console.log(`wss started at ws://localhost:${port}`)
    );

    return wss;
};
