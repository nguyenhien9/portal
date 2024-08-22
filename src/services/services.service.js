const Services = require("../models/services.model");
const ERROR_CODE = require("../constants/errorCode");
const createService = async (dto) => {
  try {
    const existingService = await Services.findOne({
      where: { service_code: dto.service_code },
    });
    if (existingService) {
      return {
        status: "failed",
        code: ERROR_CODE.SERVICE_EXISTING.code,
        message: ERROR_CODE.SERVICE_EXISTING.msg,
      };
    }
    const newService = await Services.create({ ...dto });
    return {
      status: "success",
      message: "Create service successfully.",
      data: newService,
    };
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

const getAllServices = async ({ page, limit, sortBy, order }) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await Services.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      status: "success",
      message: "Services fetched successfully",
      services: rows,
      totalPages: totalPages,
      totalServices: count,
      limit: limit,
      page: page,
    };
  } catch (error) {
    console.error("Error fetching all services:", error);
    throw error;
  }
};

const updateService = async (id, dto) => {
  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return { status: "failed", message: "Service not found" };
    }

    // Cập nhật thông tin dịch vụ
    await service.update({ ...dto });

    return {
      status: "success",
      message: "Service updated successfully.",
      data: service,
    };
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

const deleteService = async (id) => {
  try {
    const service = await Services.findByPk(id);
    if (!service) {
      return { status: "failed", message: "Service not found" };
    }

    // Xóa dịch vụ
    await service.destroy();

    return {
      status: "success",
      message: "Service deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
