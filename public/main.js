/**
 * define constants
 */
let gameId = null;
let playerId = null;
let playerColor = null;

// DOM /////////////////////////////////////////////////////////////////////////////////////////////

/**
 * define elements
 */
const createBtn = document.getElementById('create-btn');
const joinBtn = document.getElementById('join-btn');
const gameIdInput = document.getElementById('game-id');
const playersDiv = document.getElementById('players');
const boardDiv = document.getElementById('board');

/**
 * helpers
 */
const clearDiv = (div) => {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
};

const createPlayer = ({ id, color }) => {
    const div = document.createElement('div');

    div.textContent = id;
    div.style.background = color;
    div.classList.add('list-group-item');

    return div;
};

const createBall = (ballId) => {
    const btn = document.createElement('button');

    btn.id = `ball${ballId}`;
    btn.tag = ballId;
    btn.textContent = ballId;
    // btn.style.width = '100px';
    // btn.style.height = '100px';
    btn.classList.add('btn', 'btn-secondary', 'border-dark', 'flex-fill', 'w-25', 'p-5');

    btn.addEventListener('click', (e) => {
        btn.style.background = playerColor;

        sendMessage('play', { gameId, ballId });
    });

    return btn;
};

const initUI = () => {
    // disable controls
    joinBtn.disabled = true;

    // clear div containers
    clearDiv(playersDiv);
    clearDiv(boardDiv);
};

/**
 * init events
 */
createBtn.addEventListener('click', (e) => {
    sendMessage('create');
    joinBtn.disabled = false;
});

joinBtn.addEventListener('click', (e) => {
    gameId = gameIdInput.value;
    sendMessage('join', { gameId });
});

/**
 * init UI
 */
initUI();

// WEBSOCKET LOGIC /////////////////////////////////////////////////////////////////////////////////

const ws = new WebSocket('ws://localhost:9090');

const sendMessage = (name, payload) => {
    ws.send(JSON.stringify({ name, payload }));
};

ws.onmessage = (message) => {
    const event = JSON.parse(message.data);

    switch (event.name) {
        case 'connect':
            playerId = event.payload.id;
            console.log(`client id set to ${playerId}`);
            break;

        case 'create':
            gameId = event.payload.id;
            gameIdInput.value = gameId;

            console.log(
                `game created with id ${gameId} and ${event.payload.balls} balls`
            );
            break;

        case 'join': {
            initUI();
            const game = event.payload;
            console.log(game);

            gameId = game.id;

            game.players.forEach((player) => {
                // set own color
                if (player.id == playerId) {
                    playerColor = player.color;
                }

                const playerDiv = createPlayer(player);
                playersDiv.appendChild(playerDiv);
            });

            // fill the board with balls
            for (let i = 0; i < game.balls; i++) {
                const ball = createBall(i + 1);
                boardDiv.appendChild(ball);
            }

            break;
        }

        case 'play': {
            const { state } = event.payload;

            Object.entries(state).forEach(([ballId, color]) => {
                const ball = document.getElementById('ball' + ballId);
                ball.style.backgroundColor = color;
            });

            break;
        }
    }
};
