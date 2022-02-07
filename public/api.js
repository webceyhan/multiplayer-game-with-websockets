const createAPI = (port = location.port) => {
    // eslint-disable-next-line no-undef
    const state = Vue.reactive({
        games: [],
        game: {},
        player: {},
    });

    // create new socket connection
    const ws = new WebSocket(`ws://localhost:${port}`);

    // define event helpers
    const parse = (message) => JSON.parse(message.data);
    const emit = (name, payload) => ws.send(JSON.stringify({ name, payload }));

    ws.onmessage = (message) => {
        // parse event name and payload
        const { name, payload } = parse(message);

        switch (name) {
            case 'update-games':
                state.games = payload;
                break;

            case 'update-game':
                if (state.game.id === payload.id) {
                    state.game = payload;
                }
                break;

            case 'connect':
                state.player = payload;
                console.log(`client created: ${state.player.id}`);
                break;

            case 'join':
                state.game = payload;
                console.log(`player joined the game: ${state.game.id}`);
                break;

            case 'leave':
                state.game = {};                
                console.log(`player left the game`);
                break;
        }
    };

    return { state, emit };
};
