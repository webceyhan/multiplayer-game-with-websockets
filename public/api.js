const createAPI = (port = 9090) => {
    // eslint-disable-next-line no-undef
    const state = Vue.reactive({
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
            case 'connect':
                state.player = payload;
                console.log(`client created: ${state.player.id}`);
                break;

            case 'create':
                state.game = payload;
                console.log(`game created" ${state.game.id} `);
                break;

            case 'join':
                state.game = payload;
                console.log(`player joined the game: ${state.game.id}`);
                break;

            case 'play': {
                state.game = payload;
                console.log('ball state change: ', state.game.state);
                break;
            }
        }
    };

    return { state, emit };
};
