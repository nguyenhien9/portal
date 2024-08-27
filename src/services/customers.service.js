const { Op } = require("sequelize");
const ERROR_CODE = require("../constants/errorCode");
const Customers = require("../models/customers.model");
const generateRandomCode = require("../utils/helpers");
const moment = require("moment");
const getAllCustomers = async ({ page, limit, sortBy, order, filters }) => {
  try {
    // Tạo đối tượng `where` để sử dụng trong điều kiện lọc
    const where = {};
    if (filters) {
      if (filters.customer_code) {
        where.customer_code = filters.customer_code;
      }
      if (filters.name) {
        where.name = { [Op.like]: `%${filters.name}%` }; // Tìm kiếm theo tên với ký tự đại diện
      }
      if (filters.email) {
        where.email = { [Op.like]: `%${filters.email}%` }; // Tìm kiếm theo email với ký tự đại diện
      }
      if (filters.phone) {
        where.phone = { [Op.like]: `%${filters.phone}%` }; // Tìm kiếm theo số điện thoại với ký tự đại diện
      }
      if (filters.address) {
        where.address = { [Op.like]: `%${filters.address}%` }; // Tìm kiếm theo địa chỉ với ký tự đại diện
      }
      if (filters.created_at) {
        if (filters.created_at[Op.between]) {
          where.created_at = {
            [Op.between]: filters.created_at[Op.between],
          };
        } else if (filters.created_at[Op.gte]) {
          where.created_at = {
            [Op.gte]: filters.created_at[Op.gte],
          };
        } else if (filters.created_at[Op.lte]) {
          where.created_at = {
            [Op.lte]: filters.created_at[Op.lte],
          };
        }
      }
    }
    const offset = (page - 1) * limit;
    const { rows, count } = await Customers.findAndCountAll({
      where,
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const formattedCustomers = rows.map((customer) => {
      return {
        id: customer.id,
        customer_code: customer.customer_code,
        full_name: customer.full_name,
        phone_number: customer.phone_number,
        address: customer.address,
        created_at: moment(customer.createdAt).format("yyyy-MM-D"),
        updated_at: moment(customer.updated_at).format("yyyy-MM-D"),
      };
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      code: 200,
      message: "Customers fetched successfully",
      customers: formattedCustomers,
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
