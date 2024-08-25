const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const Position = require("../constants/enum/position.enum");
const Staff = sequelize.define("Staff", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  staff_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Staff;
