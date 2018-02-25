"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.connectDB = () => {
    if (!this.instanceDB) {
        this.instanceDB = typeorm_1.createConnection();
    }
    return this.instanceDB;
};
