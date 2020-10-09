const s4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

export const guid = () => {
    const groups = [
        s4() + s4(), // xxxxxxxx
        s4(), // xxxx
        '4' + s4().substring(0, 3), // 4xxx
        s4(), // xxx
        s4() + s4() + s4(), // xxxxxxxxxxxx
    ];

    // xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
    return groups.join('-').toLowerCase();
};

export const parseMessage = ( message) => {
    try {
        return JSON.parse(message);
    } catch (error) {
        return null;
    }
};

export const sendMessage = (ws, message) => {
    ws.send(JSON.stringify(message));
};
