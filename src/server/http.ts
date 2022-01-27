import express from 'express';

export const createHttpServer = (port = 9091) => {
    // create app
    const app = express();

    // serve static client files
    app.use(express.static('public'));

    // listen
    app.listen(port, () => {
        console.log(`http server started at http://localhost:${port}`);
    });

    return app;
};
