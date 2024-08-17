const ERROR_CODE = require("../constants/errorCode");
const Staff = require("../models/staffs.model");

const validateStaff = (req, res, next) => {
  const { staff_code, full_name, phone_number } = req.body;
  if (!staff_code || !full_name || !phone_number) {
    return res.status(400).json({
      success: "failed",
      code: ERROR_CODE.FIELD_REQUIRED.code,
      msg: ERROR_CODE.FIELD_REQUIRED.msg,
    });
  }
  // Kiểm tra định dạng staff_code (bắt đầu bằng "TA000")
  const sanitizedStaffCode = staff_code.replace(/\s+/g, "");
  const staffCodeRegex = /^TA00/;
  if (!staffCodeRegex.test(sanitizedStaffCode)) {
    return res.status(400).json({
      success: "failed",
      code: ERROR_CODE.STAFF_CODE_INVALID.code,
      msg: ERROR_CODE.STAFF_CODE_INVALID.msg,
    });
  }

  // Loại bỏ khoảng trắng và ký tự không cần thiết
  const sanitizedPhoneNumber = phone_number.replace(/\s+/g, "");

  // Kiểm tra định dạng số điện thoại (10 số và bắt đầu bằng số 0)
  const phoneRegex = /^0\d{9}$/;
  if (!phoneRegex.test(sanitizedPhoneNumber)) {
    return res.status(400).json({
      success: "failed",
      code: ERROR_CODE.PHONE_NUMBER_INVALID.code,
      msg: ERROR_CODE.PHONE_NUMBER_INVALID.message,
    });
  }

  // Kiểm tra các trường khác...

  next();
};

module.exports = validateStaff;
