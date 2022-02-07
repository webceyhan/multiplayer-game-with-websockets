// eslint-disable-next-line no-undef
const api = createAPI();

// eslint-disable-next-line no-undef
Vue.createApp({
    data() {
        return api.state;
    },
    computed: {
        availableGames() {
            return this.games.filter((game) => game.players.length < 3);
        },
        canCreate() {
            return this.availableGames.length === 0;
        },
        players() {
            return this.game.players || [];
        },
        joined() {
            return this.game?.id;
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
        canJoin(gameId) {
            const game = this.games.find((game) => game.id === gameId);
            return game?.players.length < 3;
        },
        onCreate() {
            api.emit('create');
        },
        onJoin(gameId) {
            api.emit('join', { gameId });
        },
        onLeave(gameId) {
            api.emit('leave', { gameId });
        },
        onPlay(ballId) {
            api.emit('play', { gameId: this.game.id, ballId });
        },
    },
}).mount('#app');
