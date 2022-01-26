"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const utils_1 = require("./utils");
class Player {
    constructor(id = utils_1.guid(), color) {
        this.id = id;
        this.color = color;
    }
}
exports.Player = Player;
