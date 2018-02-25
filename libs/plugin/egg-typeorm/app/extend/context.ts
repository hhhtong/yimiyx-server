import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default {
  get db() {
    if (!this.connection) {
      this.connection = createConnection();
    }
    return this.connection;
  }
}
