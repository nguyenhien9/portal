const ERROR_CODE = require("../constants/errorCode");

const validateCustomer = (req, res, next) => {
  const { full_name, phone_number, address } = req.body;
  if (!full_name || !phone_number || !address) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.FIELD_REQUIRED.code,
      msg: ERROR_CODE.FIELD_REQUIRED.msg,
    });
  }
  // const customerCodeRegex = /^KH00/;
  // if (!customerCodeRegex.test(customer_code.replace(/\s+/g, ""))) {
  //   return res.status(400).json({
  //     success: "failed",
  //     code: ERROR_CODE.CUSTOMER_CODE_INVALID.code,
  //     msg: ERROR_CODE.CUSTOMER_CODE_INVALID.msg,
  //   });
  // }
  // Kiểm tra định dạng số điện thoại (10 số và bắt đầu bằng số 0)
  const phoneRegex = /^0\d{9}$/;
  if (!phoneRegex.test(phone_number.replace(/\s+/g, ""))) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.PHONE_NUMBER_INVALID.code,
      msg: ERROR_CODE.PHONE_NUMBER_INVALID.message,
    });
  }
  next();
};
module.exports = validateCustomer;
