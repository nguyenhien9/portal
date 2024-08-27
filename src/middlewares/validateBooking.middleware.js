const ERROR_CODE = require("../constants/errorCode");

const validateBooking = (req, res, next) => {
  const { customer_code, staff_code, service_name, status, booking_date } =
    req.body;
  if (!customer_code || !staff_code || !service_name || !status) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.FIELD_REQUIRED.code,
      msg: ERROR_CODE.FIELD_REQUIRED.msg,
    });
  }

  next();
};
module.exports = validateBooking;
