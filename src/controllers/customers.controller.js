const customerService = require("../services/customers.service");
const generateRandomCode = require("../utils/helpers");

const get = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "ASC",
    } = req.query;
    const result = await customerService.getAllCustomers({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order: order.toUpperCase(), // Đảm bảo 'ASC' hoặc 'DESC'
    });
    return res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.customers,
      totalPages: result.totalPages,
      totalCustomers: result.totalCustomers,
      page: result.page,
      limit: result.limit,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { full_name, phone_number, address } = req.body;
    const result = await customerService.createCustomer({
      full_name,
      phone_number,
      address,
    });
    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }
    res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.customer,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customer_code, full_name, phone_number, address } = req.body;
    const result = await customerService.updateCustomer(id, {
      customer_code,
      full_name,
      phone_number,
      address,
    });
    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }
    res.status(result.code).json({
      status: result.status,
      code: result.code,
      message: result.message,
      data: result.customer,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await customerService.deleteCustomer(id);
    if (result.status === "failed") {
      return res.status(result.code).json({
        status: result.status,
        code: result.code,
        message: result.message,
      });
    }
    res.status(result.code).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
};
