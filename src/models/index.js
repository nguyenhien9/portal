const sequelize = require("../config/sequelize.config");
const Customers = require("./customers.model");
const Services = require("./services.model");
const Staff = require("./staffs.model");
const ServiceBooking = require("./serviceBooking.model");

// Định nghĩa các mối quan hệ giữa các model
Customers.hasMany(ServiceBooking, {
  foreignKey: "customer_id",
  onDelete: "CASCADE",
});
ServiceBooking.belongsTo(Customers, { foreignKey: "customer_id" });

Services.hasMany(ServiceBooking, {
  foreignKey: "service_id",
  onDelete: "CASCADE",
});
ServiceBooking.belongsTo(Services, { foreignKey: "service_id" });

Staff.hasMany(ServiceBooking, { foreignKey: "staff_id", onDelete: "CASCADE" });
ServiceBooking.belongsTo(Staff, { foreignKey: "staff_id" });

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error({
      status: "failed",
      code:
        error instanceof Sequelize.ConnectionError
          ? ERROR_CODE.DB_CONNECTION_FAILED.code
          : ERROR_CODE.DB_SYNC_FAILED.code,
      message: error.message || ERROR_CODE.DB_CONNECTION_FAILED.msg,
    });
    throw error;
  }
};

module.exports = {
  connectToDB,
  sequelize,
  Customers,
  Services,
  Staff,
};
