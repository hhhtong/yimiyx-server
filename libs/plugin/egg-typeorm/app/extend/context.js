"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.default = {
    get db() {
        if (!this.connection) {
            this.connection = typeorm_1.createConnection();
        }
        return this.connection;
    }
};
