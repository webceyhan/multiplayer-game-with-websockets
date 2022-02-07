import express from 'express';
import { createServer } from 'http';

export const createHttpServer = (port: any) => {
    // create app
    const app = express();
    const server = createServer(app);

    // serve static client files
    app.use(express.static('public'));

    // define catch-all route for app
    app.get('*', (req, res) => res.sendFile('index.html', { root: 'public' }));

    // listen
    server.listen(port, () => {
        console.log(`server started: http://localhost:${port}`);
    });

    return server;
};
