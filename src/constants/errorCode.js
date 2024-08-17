const Staff = require("../models/staffs.model");

const ERROR_CODE = {
  FIELD_REQUIRED: {
    code: 100,
    msg: "All fields required!",
  },
  STAFF_CODE_INVALID: {
    code: 200,
    msg: "Staff code must start with TA00",
  },
  PHONE_NUMBER_INVALID: {
    code: 300,
    msg: "Invalid phone number",
  },
  SERVICE_CODE_INVALID: {
    code: 400,
    msg: "Service code must start with S00",
  },
  CUSTOMER_CODE_INVALID: {
    code: 500,
    msg: "Customer code must start with CUS00",
  },
  BOOKING_CODE_INVALID: {
    code: 600,
    msg: " Booking code must start with B00",
  },
};

module.exports = ERROR_CODE;
