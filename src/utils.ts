export { v1 as uuid } from 'uuid';

export interface Hash<T = any> {
    [key: string]: T;
}

export const parseMessage = (message: string) => {
    try {
        return JSON.parse(message);
    } catch (error) {
        return null;
    }
};

export const sendMessage = (ws: any, message: any) => {
    ws.send(JSON.stringify(message));
};
