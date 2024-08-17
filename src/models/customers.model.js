const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Customers = sequelize.define("Customers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});
module.exports = Customers;
