const customerService = require("../services/customers.service");

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
    return res.status(200).json({
      status: "success",
      message: "Customers fetched successfully",
      data: result.data,
      totalPages: result.totalPages,
      totalCustomers: result.totalCustomers,
      page: result.page,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { customer_code, full_name, phone_number, address } = req.body;
    const result = await customerService.createCustomer({
      customer_code,
      full_name,
      phone_number,
      address,
    });
    if (result.status === "failed") {
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }
    res.status(201).json({
      status: "success",
      message: result.message,
      data: result.data,
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
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: result.message,
      data: result.data,
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
      return res.status(400).json({
        status: result.status,
        message: result.message,
      });
    }
    res.status(200).json({
      status: "success",
      message: result.message,
    });
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
