require('reflect-metadata');
const typeorm = require('typeorm');

module.exports = {
  get initDB() {
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
