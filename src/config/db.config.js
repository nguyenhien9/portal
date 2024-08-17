require("dotenv").config();

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_NAME: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    min: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
