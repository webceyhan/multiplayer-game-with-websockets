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
    div.style.width = '200px';
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
    btn.classList.add('btn', 'btn-light', 'flex-fill', 'w-25', 'p-5');

    btn.addEventListener('click', (e) => {
        btn.style.background = playerColor;

        sendMessage('play', { gameId, ballId });
    });

    return btn;
};

const initUI = () => {
    // disable controls
    joinBtn.classList.add('disabled');

    // clear div containers
    clearDiv(playersDiv);
    clearDiv(boardDiv);
};

/**
 * init events
 */
createBtn.addEventListener('click', (e) => {
    sendMessage('create');
    joinBtn.classList.remove('disabled');
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

const sendMessage = (method, message) => {
    ws.send(JSON.stringify({ method, ...message }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.method) {
        case 'connect':
            playerId = data.player.id;
            console.log(`client id set to ${playerId}`);
            break;

        case 'create':
            gameId = data.game.id;
            gameIdInput.value = gameId;

            console.log(
                `game created with id ${gameId} and ${data.game.balls} balls`
            );
            break;

        case 'join': {
            initUI();
            const game = data.game;

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
            const { state } = data.game;

            Object.entries(state).forEach(([ballId, color]) => {
                const ball = document.getElementById('ball' + ballId);
                ball.style.backgroundColor = color;
            });

            break;
        }
    }
};
