"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.default = {
    get db() {
        return typeorm_1.createConnection();
    }
};
