const ERROR_CODE = require("../constants/errorCode");

const validateBooking = (req, res, next) => {
  const {
    booking_code,
    customer_code,
    staff_code,
    service_name,
    status,
    booking_date,
  } = req.body;
  if (
    !booking_code ||
    !customer_code ||
    !staff_code ||
    !service_name ||
    !status ||
    !booking_date
  ) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.FIELD_REQUIRED.code,
      msg: ERROR_CODE.FIELD_REQUIRED.msg,
    });
  }
  const bookingCodeRegex = /^BO00/;
  if (!bookingCodeRegex.test(booking_code.replace(/\s+/g, ""))) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.BOOKING_CODE_INVALID.code,
      msg: ERROR_CODE.BOOKING_CODE_INVALID.msg,
    });
  }

  next();
};
module.exports = validateBooking;
