// eslint-disable-next-line no-undef
const api = createAPI();

// eslint-disable-next-line no-undef
Vue.createApp({
    data() {
        return api.state;
    },
    computed: {
        availableGames() {
            if (this.games?.length) {
                return this.games.filter((game) => game.players.length < 3);
            }
            return [];
        },
        canCreate() {
            return this.availableGames.length === 0;
        },
        ready() {
            return !!this.game.id;
        },
        joined() {
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
        onPlay(ballId) {
            api.emit('play', { gameId: this.game.id, ballId });
        },
    },
}).mount('#app');
