import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from "../../../../../app/db/naming-strategy/snake-naming"


export default {
  async connected() {
    return createConnection({
      ...await getConnectionOptions(),
      namingStrategy: new SnakeNamingStrategy()
    })
  }
}
