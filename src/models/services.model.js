const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Services = sequelize.define("Services", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  service_code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  service_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
module.exports = Services;
