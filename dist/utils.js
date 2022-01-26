"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.parseMessage = exports.guid = void 0;
const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
exports.guid = () => {
    const groups = [
        s4() + s4(),
        s4(),
        '4' + s4().substring(0, 3),
        s4(),
        s4() + s4() + s4(),
    ];
    // xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
    return groups.join('-').toLowerCase();
};
exports.parseMessage = (message) => {
    try {
        return JSON.parse(message);
    }
    catch (error) {
        return null;
    }
};
exports.sendMessage = (ws, message) => {
    ws.send(JSON.stringify(message));
};
