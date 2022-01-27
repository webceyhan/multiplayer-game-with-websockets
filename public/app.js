// eslint-disable-next-line no-undef
Vue.createApp({
    data() {
        return {
            game: {},
            player: {},
            ws: null,
        };
    },
    computed: {
        ready() {
            return !!this.game.id;
        },
        started() {
            return this.players.findIndex((p) => p.id === this.player.id) > -1;
        },
        players() {
            return this.game.players || [];
        },
        balls() {
            const amount = 20;
            const state = this.game.state || {};

            return Array(amount)
                .fill(null)
                .map((v, i) => state[i]);
        },
    },
    methods: {
        sendEvent(name, payload) {
            this.ws.send(JSON.stringify({ name, payload }));
        },
        onCreate() {
            this.sendEvent('create');
        },
        onJoin() {
            this.sendEvent('join', { gameId: this.game.id });
        },
        onPlay(ballId) {
            this.sendEvent('play', { gameId: this.game.id, ballId });
        },
    },
    created() {
        // create new socket connection
        this.ws = new WebSocket('ws://localhost:9090');

        this.ws.onmessage = (message) => {
            // parse event name and payload
            const { name, payload } = JSON.parse(message.data);

            switch (name) {
                case 'connect':
                    this.player = payload;
                    console.log(`client created: ${this.player.id}`);
                    break;

                case 'create':
                    this.game = payload;
                    console.log(`game created" ${this.game.id} `);
                    break;

                case 'join':
                    this.game = payload;
                    console.log(`player joined the game: ${this.game.id}`);
                    break;

                case 'play': {
                    this.game = payload;
                    console.log('ball state change: ', this.game.state);
                    break;
                }
            }
        };
    },
}).mount('#app');
