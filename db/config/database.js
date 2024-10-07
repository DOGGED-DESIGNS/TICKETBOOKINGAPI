const Sequelize = require("sequelize");
const config = require("config");

const dbConfig = config.get("database");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  "dogged8000",
  {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
  }
);

module.exports = sequelize;

// databasename, username, password
