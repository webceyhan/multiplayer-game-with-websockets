import { Server } from 'ws';
import { createClient } from './client';

export const createSocketServer = (httpServer: any) => {
    // create websocket server
    const wss = new Server({ server: httpServer });

    // define server handler
    wss.on('connection', (ws) => createClient(ws, wss));

    // define close handler
    wss.on('close', () => console.log('wss closed!'));

    // define error handler
    wss.on('error', (error) => console.log(`wss error: ${error}`));

    return wss;
};
