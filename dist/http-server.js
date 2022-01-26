"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 9091;
// create app
const app = express_1.default();
// serve static client files
app.use(express_1.default.static('public'));
// listen
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
