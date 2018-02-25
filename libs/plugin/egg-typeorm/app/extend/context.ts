import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const connectDB = () => {
  if (!this.instanceDB) {
    this.instanceDB = createConnection()
  }
  return this.instanceDB
}
