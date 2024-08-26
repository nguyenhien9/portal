const customerService = require("../services/customers.service");
const generateRandomCode = require("../utils/helpers");

const get = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "ASC",
      customer_code,
      name,
      email,
      phone,
      address,
      fromDate,
      toDate,
    } = req.query;
    const validSortBy = ["createdAt", "updatedAt"];
    const validOrder = ["ASC", "DESC"];

    if (!validSortBy.includes(sortBy)) sortBy = "createdAt";
    if (!validOrder.includes(order.toUpperCase())) order = "ASC";

    // Tạo đối tượng filter từ các tham số lọc
    const filters = {};
    if (customer_code) filters.customer_code = customer_code;
    if (name) filters.name = name;
    if (email) filters.email = email;
    if (phone) filters.phone = phone;
    if (address) filters.address = address;
    if (fromDate || toDate) {
      filters.created_at = {};
      if (fromDate) filters.created_at[Op.gte] = new Date(fromDate);
      if (toDate) filters.created_at[Op.lte] = new Date(toDate);
    }
    const result = await customerService.getAllCustomers({
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      order: order.toUpperCase(), // Đảm bảo 'ASC' hoặc 'DESC'
      filters,
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
    const { full_name, phone_number, address } = req.body;
    const result = await customerService.updateCustomer(id, {
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
