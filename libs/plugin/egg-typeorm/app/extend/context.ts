import 'reflect-metadata';
import typeorm from 'typeorm';

module.exports = {
  get connectDB() {
    console.warn('############', this);

    if (!this.DB) {
      this.DB = typeorm.createConnection({
        type: "mariadb",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "test",
        synchronize: true,
        logging: false
      })
    }
    return this.DB
  }
};
