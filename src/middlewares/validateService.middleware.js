const ERROR_CODE = require("../constants/errorCode");
const Services = require("../models/services.model");

const validateService = (req, res, next) => {
  const { service_code, service_name } = req.body;
  if (!service_code || !service_name) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.FIELD_REQUIRED.code,
      msg: ERROR_CODE.FIELD_REQUIRED.msg,
    });
  }

  const serviceCodeRegex = /^DV00/;
  if (!serviceCodeRegex.test(service_code.replace(/\s+/g, ""))) {
    return res.status(400).json({
      status: "failed",
      code: ERROR_CODE.SERVICE_CODE_INVALID.code,
      msg: ERROR_CODE.SERVICE_CODE_INVALID.msg,
    });
  }

  next();
};
module.exports = validateService;
