const game = {};
const client = {};

const ws = new WebSocket('ws://localhost:9090');

const sendMessage = (method, message) => {
    ws.send(JSON.stringify({ method, ...message }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.method) {
        case 'connect':
            client.id = data.id
            console.log(`client id set to ${client.id}`);
            break;

        case 'create':
            game.id = data.game.id;
            game.balls = data.game.balls;            
            console.log(`game created with id ${game.id} and ${game.balls} balls`);
            break;
    }
};

// DOM /////////////////////////////////////////////////////////////////////////////////////////////

const createBtn = document.getElementById('create-btn');

createBtn.addEventListener('click', (e) => {
    sendMessage('create', { id: client.id });
});
