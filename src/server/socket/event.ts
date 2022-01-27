import { WebSocket as Client, Server, RawData } from 'ws';

export type Event = { name: string; payload?: any };

export const parseEvent = (message: RawData) => {
    return JSON.parse(message.toString()) as Event;
};

export const emitEvent = (ws: Client, name: string, payload?: any) => {
    ws.send(JSON.stringify({ name, payload } as Event));
};

export const broadcastEvent = (wss: Server, name: string, payload?: any) => {
    wss.clients.forEach((ws) => emitEvent(ws, name, payload));
};
