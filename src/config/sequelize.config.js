const { Sequelize } = require("sequelize");
const dbConfig = require("./db.config");

// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    timezone: "+07:00",
  }
);
module.exports = sequelize;
