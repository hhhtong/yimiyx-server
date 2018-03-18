"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const snake_naming_1 = require("../../../../../app/db/naming-strategy/snake-naming");
exports.default = {
    async connected() {
        return typeorm_1.createConnection(Object.assign({}, await typeorm_1.getConnectionOptions(), { namingStrategy: new snake_naming_1.SnakeNamingStrategy() }));
    }
};
