const ERROR_CODE = {
  // 1xx: Xác thực và đầu vào không hợp lệ
  FIELD_REQUIRED: {
    code: 100,
    msg: "All fields are required.",
  },
  INVALID_INPUT: {
    code: 101,
    msg: "Invalid input provided.",
  },
  STAFF_CODE_INVALID: {
    code: 102,
    msg: "Staff code must start with NV00.",
  },
  PHONE_NUMBER_INVALID: {
    code: 103,
    msg: "Invalid phone number format.",
  },
  STAFF_POSITION_INVALID: {
    code: 104,
    msg: "Customer position is not available.",
  },
  CUSTOMER_CODE_INVALID: {
    code: 105,
    msg: "Customer code must start with KH00.",
  },
  BOOKING_CODE_INVALID: {
    code: 106,
    msg: "Booking code must start with BO00.",
  },

  // 2xx: Lỗi kết nối hoặc tương tác với cơ sở dữ liệu
  DB_CONNECTION_FAILED: {
    code: 200,
    msg: "Failed to connect to the database.",
  },
  DB_SYNC_FAILED: {
    code: 201,
    msg: "Database synchronization failed.",
  },
  DB_QUERY_FAILED: {
    code: 202,
    msg: "Database query failed.",
  },
  TRANSACTION_FAILED: {
    code: 203,
    msg: "Database transaction failed.",
  },

  // 3xx: Tài nguyên đã tồn tại
  STAFF_EXISTING: {
    code: 300,
    msg: "Staff already exists.",
  },
  SERVICE_EXISTING: {
    code: 301,
    msg: "Service already exists.",
  },
  CUSTOMER_EXISTING: {
    code: 302,
    msg: "Customer already exists.",
  },
  BOOKING_EXISTING: {
    code: 303,
    msg: "Booking already exists.",
  },

  // 4xx: Tài nguyên không tồn tại hoặc không hợp lệ
  RESOURCE_NOT_FOUND: {
    code: 400,
    msg: "Requested resource not found.",
  },
  STAFF_NOT_FOUND: {
    code: 401,
    msg: "Staff not found.",
  },
  SERVICE_NOT_FOUND: {
    code: 402,
    msg: "Service not found.",
  },
  CUSTOMER_NOT_FOUND: {
    code: 403,
    msg: "Customer not found.",
  },
  BOOKING_NOT_FOUND: {
    code: 404,
    msg: "Booking not found.",
  },

  // 5xx: Lỗi nội bộ hệ thống
  INTERNAL_SERVER_ERROR: {
    code: 500,
    msg: "An unexpected error occurred. Please try again later.",
  },
  SERVICE_UNAVAILABLE: {
    code: 501,
    msg: "Service is temporarily unavailable. Please try again later.",
  },
  TIMEOUT_ERROR: {
    code: 502,
    msg: "Request timed out. Please try again later.",
  },
};

module.exports = ERROR_CODE;
