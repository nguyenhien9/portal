const ERROR_CODE = require("../constants/errorCode");
const Customers = require("../models/customers.model");
const generateRandomCode = require("../utils/helpers");
const getAllCustomers = async ({ page, limit, sortBy, order }) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await Customers.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      code: 200,
      message: "Customers fetched successfully",
      customers: rows,
      totalPages,
      totalCustomers: count,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching all customers:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};
const createCustomer = async (dto) => {
  try {
    let uniqueCode;
    let existingCustomer;
    do {
      uniqueCode = generateRandomCode("KH");
      existingCustomer = await Customers.findOne({
        where: { customer_code: uniqueCode },
      });
    } while (existingCustomer);

    dto.customer_code = uniqueCode;
    const newCustomer = await Customers.create({ ...dto });
    return {
      status: "success",
      code: 201,
      message: "Create customer successfully.",
      customer: newCustomer,
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};
const updateCustomer = async (id, dto) => {
  try {
    const customer = await Customers.findByPk(id);
    console.log({ customer });
    if (!customer) {
      return {
        status: "failed",
        code: ERROR_CODE.CUSTOMER_NOT_FOUND.code,
        message: ERROR_CODE.CUSTOMER_NOT_FOUND.msg,
      };
    }

    // Cập nhật thông tin khách hàng
    await customer.update({ ...dto });

    return {
      status: "success",
      code: 200,
      message: "Customer updated successfully.",
      customer,
    };
  } catch (error) {
    console.error("Error updating customer:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

const deleteCustomer = async (id) => {
  try {
    const customer = await Customers.findByPk(id);
    if (!customer) {
      return {
        status: "failed",
        code: ERROR_CODE.CUSTOMER_NOT_FOUND.code,
        message: ERROR_CODE.CUSTOMER_NOT_FOUND.msg,
      };
    }

    // Xóa khách hàng
    await customer.destroy();

    return {
      code: 204,
    };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return {
      status: "failed",
      code: ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      message: ERROR_CODE.INTERNAL_SERVER_ERROR.msg,
      error: error.message,
    };
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};
