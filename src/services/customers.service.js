const Customers = require("../models/customers.model");

const createCustomer = async (dto) => {
  try {
    const existingCustomer = await Customers.findOne({
      where: { customer_code: dto.customer_code },
    });
    if (existingCustomer) {
      return {
        status: "failed",
        message: "Customer already exists",
      };
    }
    const newCustomer = await Customers.create({ ...dto });
    return {
      status: "success",
      message: "Create customer successfully.",
      data: newCustomer,
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

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
      message: "Customers fetched successfully",
      data: rows,
      totalPages: totalPages,
      totalCustomers: count,
      page: page,
    };
  } catch (error) {
    console.error("Error fetching all customers:", error);
    throw error;
  }
};

const updateCustomer = async (id, dto) => {
  try {
    const customer = await Customers.findByPk(id);
    console.log({ customer });
    if (!customer) {
      return {
        status: "failed",
        message: "Customer not found",
      };
    }

    // Cập nhật thông tin khách hàng
    await customer.update({ ...dto });

    return {
      status: "success",
      message: "Customer updated successfully.",
      data: customer,
    };
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

const deleteCustomer = async (id) => {
  try {
    const customer = await Customers.findByPk(id);
    if (!customer) {
      return {
        status: "failed",
        message: "Customer not found",
      };
    }

    // Xóa khách hàng
    await customer.destroy();

    return {
      status: "success",
      message: "Customer deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};
