const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js")
const userModel = require("./user.model.js");
const currencyModel = require("./currency.model.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

module.exports = {
    Sequelize,
    sequelize,
    user: userModel(sequelize, Sequelize),
    currency: currencyModel(sequelize, Sequelize)
};