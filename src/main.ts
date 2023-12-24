import { createHttpServer, createSocketServer } from './server';

const port = process.env.PORT || 3001;

const httpServer = createHttpServer(port);
const socketServer = createSocketServer(httpServer);
