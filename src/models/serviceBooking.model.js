const { DataTypes, DATE } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const ServiceBooking = sequelize.define("ServiceBooking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  booking_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Customers",
      key: "id",
    },
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Services",
      key: "id",
    },
    allowNull: false,
  },
  staff_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Staffs",
      key: "id",
    },
    allowNull: false,
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // 0: Đang chờ, 1: Hoàn thành, 2: Hủy bỏ
  },
  notes: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});

module.exports = ServiceBooking;
