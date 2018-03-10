import 'reflect-metadata';
import { createConnection } from 'typeorm';

export default {
  get db() {
    return createConnection();
  }
}
