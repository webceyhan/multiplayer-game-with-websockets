// eslint-disable-next-line no-undef
const api = createAPI();

// eslint-disable-next-line no-undef
Vue.createApp({
    data() {
        return api.state;
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
        onCreate() {
            api.emit('create');
        },
        onJoin() {
            api.emit('join', { gameId: this.game.id });
        },
        onPlay(ballId) {
            api.emit('play', { gameId: this.game.id, ballId });
        },
    },
}).mount('#app');
